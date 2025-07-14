import { dbConnect } from "@/lib/config/db";
import { NextResponse } from "next/server"
import Car from "@/lib/models/Car";
import fs from "fs";
import { writeFile, mkdir } from "fs/promises";
import mongoose from "mongoose";
import path from "path";
const connectDB = async () => {
    try {
        await dbConnect();
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};
connectDB();

// get all cars
// get all cars  – مع دعم الفلترة بالـ category
export async function GET(request) {
  try {
    const { searchParams } = request.nextUrl;
    const carId     = searchParams.get('id');
    const categoryQ = searchParams.get('category');

    console.log("GET /api/cars → carId:", carId, "category:", categoryQ);

    if (carId) {
      const car = await Car.findById(carId).populate('category', 'name');
      console.log("Car found:", car?._id);
      return NextResponse.json(car);
    }

    const query =
      categoryQ && categoryQ !== 'All'
        ? { category: categoryQ }            // قد يكون ObjectId أو نص
        : {};

    console.log("Query filter:", query);

    const cars = await Car.find(query).populate('category', 'name');
    console.log("Cars count:", cars.length);

    return NextResponse.json(cars);

  } catch (err) {
    console.error("GET /api/cars error:", err);
    return NextResponse.json(
      { success: false, msg: "Server error" },
      { status: 500 }
    );
  }
}

// upload car
export async function POST(request) {
  const formData = await request.formData();

  const name = formData.get("name");
  const description = formData.get("description");
  const category = formData.get("category");

  if (!name || !description || !category) {
    return new Response(JSON.stringify({ success: false, msg: "املأ جميع الحقول" }), { status: 400 });
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  try {
    await mkdir(uploadDir, { recursive: true });
  } catch (err) {
    console.error("Failed to create upload directory:", err);
  }

  const images = [];
  const imageFiles = formData.getAll("images");

  for (const file of imageFiles) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.name}`;
    const filePath = path.join(uploadDir, fileName);

    await writeFile(filePath, buffer);
    images.push(`/uploads/${fileName}`);
  }

  const newCar = await Car.create({ name, description, category, images });

  return new Response(JSON.stringify({ success: true, msg: "تمت إضافة السيارة", car: newCar }), { status: 201 });
}


  

export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    const car = await Car.findById(id);

    if (!car) {
      return NextResponse.json({ success: false, msg: "Car not found" }, { status: 404 });
    }

    if (car.image && typeof car.image === "string") {
      const imagePath = path.join(process.cwd(), "public", car.image.replace(/^\/+/, ""));
      
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Car.findByIdAndDelete(id);

    return NextResponse.json({ success: true, msg: "Car Deleted" });

  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json({ success: false, msg: "Server error" }, { status: 500 });
  }
}

// update car
export async function PUT(request) {
  const formData = await request.formData();
  const id = request.nextUrl.searchParams.get("id");

  const existingCar = await Car.findById(id);
  if (!existingCar) {
    return NextResponse.json({ success: false, msg: "Car not found" }, { status: 404 });
  }

  /** 1) حذف الصور المطلوبة */
  const deletedImages = JSON.parse(formData.get("deletedImages") || "[]");
  for (const img of deletedImages) {
    const fullPath = path.join(process.cwd(), "public", img.replace(/^\/+/, ""));
    if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
  }

  /** 2) احتفاظ بالباقي */
  const remainingImages = existingCar.images.filter((img) => !deletedImages.includes(img));

  /** 3) رفع الصور الجديدة */
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await fs.promises.mkdir(uploadDir, { recursive: true });

  const newImages = formData.getAll("images");
  const timestamp = Date.now();
  const imageUrls = [];

  for (const file of newImages) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${timestamp}_${file.name}`;
    const fullPath = path.join(uploadDir, fileName);
    await writeFile(fullPath, buffer);
    imageUrls.push(`/uploads/${fileName}`);
  }

  /** 4) إعداد بيانات التحديث */
  const updatedData = {
    name: formData.get("name"),
    description: formData.get("description"),
    images: [...remainingImages, ...imageUrls],
  };

  // فحص category إن وُجدت
  const cat = formData.get("category");
  if (cat && mongoose.Types.ObjectId.isValid(cat)) {
    updatedData.category = cat;
  }

  /** 5) تنفيذ التحديث */
  await Car.findByIdAndUpdate(id, updatedData);

  return NextResponse.json({ success: true, msg: "Car updated successfully" });
}


  
