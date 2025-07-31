import { isAdmin } from "@/libs/isAdmin";
import { Category } from "@/models/Category";
import mongoose from "mongoose";
export const dynamic = "force-dynamic";

// Helper to connect once
async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URL);
  }
}

export async function POST(req) {
  await connectDB();
  const { name } = await req.json();

  if (!(await isAdmin())) {
    return new Response(JSON.stringify({ error: "Not authorized" }), { status: 403 });
  }

  const categoryDoc = await Category.create({ name });
  return new Response(JSON.stringify(categoryDoc), { status: 201 });
}

export async function PUT(req) {
  await connectDB();
  const { _id, name } = await req.json();

  if (!(await isAdmin())) {
    return new Response(JSON.stringify({ error: "Not authorized" }), { status: 403 });
  }

  await Category.updateOne({ _id }, { name });
  return new Response(JSON.stringify(true), { status: 200 });
}

export async function GET() {
  await connectDB();

  const categories = await Category.find();
  return new Response(JSON.stringify(categories), { status: 200 });
}

export async function DELETE(req) {
  await connectDB();
  const url = new URL(req.url);
  const _id = url.searchParams.get('_id');

  if (!(await isAdmin())) {
    return new Response(JSON.stringify({ error: "Not authorized" }), { status: 403 });
  }

  await Category.deleteOne({ _id });
  return new Response(JSON.stringify(true), { status: 200 });
}
