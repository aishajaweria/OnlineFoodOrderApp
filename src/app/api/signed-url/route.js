import { Storage } from '@google-cloud/storage';
import { NextResponse } from 'next/server';

const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  keyFilename: process.env.GOOGLE_CLOUD_KEYFILE,
});

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const fileName = searchParams.get('file');

  if (!fileName) {
    return NextResponse.json({ error: 'Missing file parameter' }, { status: 400 });
  }

  try {
    const options = {
      version: 'v4',
      action: 'read',
      expires: Date.now() + 2 * 24 * 60 * 60 * 1000, // 2 days
    };

    const [url] = await storage
      .bucket(process.env.GOOGLE_CLOUD_BUCKET_NAME)
      .file(fileName)
      .getSignedUrl(options);

    return NextResponse.json({ url });
  } catch (err) {
    console.error('Failed to generate signed URL:', err);
    return NextResponse.json({ error: 'Failed to generate signed URL' }, { status: 500 });
  }
}
