import { Storage } from '@google-cloud/storage';
import uniqid from 'uniqid';
import path from 'path';
import 'dotenv/config';

export async function POST(req) {
  const data = await req.formData();
  if (data.get('file')) {
    // Upload the file
    const file = data.get('file');

    const storage = new Storage({
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
      keyFilename: process.env.GOOGLE_CLOUD_KEYFILE,
    });

    const bucketName = process.env.GOOGLE_CLOUD_BUCKET_NAME;
    const bucket = storage.bucket(bucketName);

    const ext = path.extname(file.name);
    const newFileName = uniqid() + ext;

    const chunks = [];
    for await (const chunk of file.stream()) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    const blob = bucket.file(newFileName);
    const blobStream = blob.createWriteStream({
      resumable: false,
      contentType: file.type,
    });

    return new Promise((resolve, reject) => {
      blobStream.on('error', (err) => {
        console.error(err);
        reject(new Response(JSON.stringify({ error: 'Upload failed' }), { status: 500 }));
      });

      blobStream.on('finish', async () => {
        // Generate a signed URL for the uploaded file
        const options = {
          version: 'v4',
          action: 'read',
          expires: Date.now() + 1000 * 60 * 60 * 24 * 2, // 2 days
        };

        try {
          const [url] = await blob.getSignedUrl(options);
          resolve(new Response(JSON.stringify(url), { status: 200 }));
        } catch (err) {
          console.error(err);
          reject(new Response(JSON.stringify({ error: 'Failed to generate signed URL' }), { status: 500 }));
        }
      });

      blobStream.end(buffer);
    });
  } else {
    return new Response(JSON.stringify({ error: 'No file provided' }), { status: 400 });
  }
}
