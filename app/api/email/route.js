import { dbConnect } from '@/lib/config/db';
import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";

const connectDB = async () => {
  try {
    await dbConnect();
  } catch (error) {
    console.error("DB connection error:", error);
    throw new Error("Database connection failed");
  }
};

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ success: false, msg: "Email is invalid" }, { status: 400 });
    }

    await connectDB();

    const existing = await EmailModel.findOne({ email });
    if (existing) {
      return NextResponse.json({ success: false, msg: "Email already subscribed" }, { status: 409 });
    }

    await EmailModel.create({ email });
    return NextResponse.json({ success: true, msg: "Email saved" });
  } catch (error) {
    console.error("Email API Error:", error);
    return NextResponse.json({ success: false, msg: "Server Error" }, { status: 500 });
  }
}

export async function GET(request) {
  await connectDB();
  const emails = await EmailModel.find({}).sort({ createdAt: -1 });
  return NextResponse.json(emails);
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ success: false, msg: "ID is required" }, { status: 400 });
  }

  await connectDB();
  const deleted = await EmailModel.findByIdAndDelete(id);

  if (!deleted) {
    return NextResponse.json({ success: false, msg: "Email not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, msg: "Email deleted" });
}
