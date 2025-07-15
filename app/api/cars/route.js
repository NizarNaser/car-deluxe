import { dbConnect } from '@/lib/config/db';
import { NextResponse } from 'next/server';
import Car from '@/lib/models/Car';
import mongoose from 'mongoose';
import { put, del as deleteBlob } from '@vercel/blob';

await dbConnect();

/* ---------- GET (كما هو) ---------- */
export async function GET(request) {
  try {
    const { searchParams } = request.nextUrl;
    const carId     = searchParams.get('id');
    const categoryQ = searchParams.get('category');

    if (carId) {
      const car = await Car.findById(carId).populate('category', 'name');
      return NextResponse.json(car);
    }

    const query = categoryQ && categoryQ !== 'All' ? { category: categoryQ } : {};
    const cars  = await Car.find(query).populate('category', 'name');
    return NextResponse.json(cars);
  }
catch (err) {
  console.error('❌ /api/cars POST error:', {
    message: err.message,
    stack:   err.stack,
  });
  return NextResponse.json(
    { msg: 'Internal Server Error' },
    { status: 500 },
  );
}
}
/* ---------- POST (رفع سيارة جديدة) ---------- */
export async function POST(request) {
  const form = await request.formData();
  const { name, description, category } = Object.fromEntries(form);

  const files = form.getAll('images');          // ملفات الصور
  if (!name || !description || !category || !files.length) {
    return NextResponse.json({ success: false, msg: 'املأ جميع الحقول' }, { status: 400 });
  }

  // رفع كل صورة إلى Vercel Blob
  const uploadPromises = files.map(async (file) => {
    const buffer = Buffer.from(await file.arrayBuffer());
    const blob   = await put(`cars/${Date.now()}-${file.name}`, buffer, { access: 'public',token: process.env.BLOB_READ_WRITE_TOKEN, });
    return blob.url;                            // رابط الصورة النهائي
  });
  const imageUrls = await Promise.all(uploadPromises);

  const car = await Car.create({ name, description, category, images: imageUrls });
  return NextResponse.json({ success: true, msg: 'تمت إضافة السيارة', car }, { status: 201 });
}

/* ---------- DELETE (حذف سيارة) ---------- */
export async function DELETE(request) {
  try {
    const id  = request.nextUrl.searchParams.get('id');
    const car = await Car.findById(id);
    if (!car) return NextResponse.json({ success: false, msg: 'Car not found' }, { status: 404 });

    /* حذف الصور من Vercel Blob */
    await Promise.all(
      (car.images || []).map(async (url) => {
        const key = url.split('/').slice(-2).join('/'); // cars/xxxxx.jpg
        try { await deleteBlob(key); } catch {}         // تجاهل الخطأ لو لم يجد الملف
      })
    );

    await Car.findByIdAndDelete(id);
    return NextResponse.json({ success: true, msg: 'Car Deleted' });
  }
  catch (err) {
    console.error('❌ /api/cars DELETE error:', {
      message: err.message,
      stack:   err.stack,
    });
    return NextResponse.json(
      { msg: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

/* ---------- PUT (تحديث سيارة) ---------- */
export async function PUT(request) {
  const form = await request.formData();
  const id   = request.nextUrl.searchParams.get('id');

  const car = await Car.findById(id);
  if (!car) return NextResponse.json({ success: false, msg: 'Car not found' }, { status: 404 });

  /* 1) حذف الصور التي اختارها المستخدم */
  const deleted = JSON.parse(form.get('deletedImages') || '[]');  // مصفوفة URLs
  await Promise.all(
    deleted.map(async (url) => {
      const key = url.split('/').slice(-2).join('/');
      try { await deleteBlob(key); } catch {}
    })
  );

  /* 2) الصور المتبقية */
  const remaining = car.images.filter((url) => !deleted.includes(url));

  /* 3) رفع الصور الجديدة */
  const newFiles   = form.getAll('images');
  const uploadNew  = newFiles.map(async (file) => {
    const buffer = Buffer.from(await file.arrayBuffer());
    const blob   = await put(`cars/${Date.now()}-${file.name}`, buffer, { access: 'public' });
    return blob.url;
  });
  const newUrls = await Promise.all(uploadNew);

  /* 4) بيانات التحديث */
  const updated = {
    name:        form.get('name')        || car.name,
    description: form.get('description') || car.description,
    images:      [...remaining, ...newUrls],
  };

  const cat = form.get('category');
  if (cat && mongoose.Types.ObjectId.isValid(cat)) updated.category = cat;

  await Car.findByIdAndUpdate(id, updated);
  return NextResponse.json({ success: true, msg: 'Car updated successfully' });
}

/* ---------- إعداد Next.js ---------- */
export const config = {
  api: {
    bodyParser: false,        // نمنع BodyParser لأننا نستعمل formData
  },
};
