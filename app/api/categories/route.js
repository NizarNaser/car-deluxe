// app/api/categories/route.js
import { NextResponse } from 'next/server'
import { dbConnect } from '@/lib/config/db'
import Category from '@/lib/models/Category'

// دالة GET - جلب التصنيفات
export async function GET() {
  await dbConnect()

  try {
    const categories = await Category.find({})
    return NextResponse.json(categories)
  } catch (error) {
    return NextResponse.json({ message: 'فشل جلب التصنيفات' }, { status: 500 })
  }
}

// دالة POST - إضافة كاتيغوري جديد
export async function POST(req) {
  await dbConnect()

  try {
    const body = await req.json()
    const { name } = body

    if (!name || name.trim() === '') {
      return NextResponse.json({ message: 'اسم التصنيف مطلوب' }, { status: 400 })
    }

    const exists = await Category.findOne({ name })
    if (exists) {
      return NextResponse.json({ message: 'التصنيف موجود بالفعل' }, { status: 409 })
    }

    const newCategory = new Category({ name })
    await newCategory.save()

    return NextResponse.json({ message: 'تم إضافة التصنيف بنجاح', category: newCategory }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'فشل إضافة التصنيف' }, { status: 500 })
  }
}

// DELETE - Remove category
export async function DELETE(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, msg: "Category ID is required" }, { status: 400 });
    }

    const deleted = await Category.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ success: false, msg: "Category not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, msg: "Category deleted" });
  } catch (error) {
    console.error("Delete Category Error:", error);
    return NextResponse.json({ success: false, msg: "Server Error" }, { status: 500 });
  }
}
