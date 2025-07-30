import { isAdmin } from "@/app/api/auth/[...nextauth]/route";
import { MenuItem } from "@/models/MenuItem";
import mongoose from "mongoose";

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URL);
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();
    if (await isAdmin()) {
      const menuItemDoc = await MenuItem.create(data);
      return Response.json(menuItemDoc);
    } else {
      return Response.json({ error: "Unauthorized" }, { status: 403 });
    }
  } catch (err) {
    console.error("❌ POST /api/menu-items error:", err);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await connectDB();
    const { _id, ...data } = await req.json();
    if (await isAdmin()) {
      await MenuItem.findByIdAndUpdate(_id, data);
      return Response.json(true);
    } else {
      return Response.json({ error: "Unauthorized" }, { status: 403 });
    }
  } catch (err) {
    console.error("❌ PUT /api/menu-items error:", err);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const items = await MenuItem.find();
    return Response.json(items);
  } catch (err) {
    console.error("❌ GET /api/menu-items error:", err);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');
    if (await isAdmin()) {
      await MenuItem.deleteOne({ _id });
      return Response.json(true);
    } else {
      return Response.json({ error: "Unauthorized" }, { status: 403 });
    }
  } catch (err) {
    console.error("❌ DELETE /api/menu-items error:", err);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
