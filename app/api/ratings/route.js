import { dbConnect } from '@/lib/config/db';
import Rating from '@/lib/models/Rating';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export async function GET(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get('postId');
  const email = searchParams.get('email');

  const rating = await Rating.findOne({ postId, userEmail: email });
  return NextResponse.json(rating || {});
}

export async function POST(req) {
  await dbConnect();
  const body = await req.json();
  const { postId, rating, userEmail } = body;

  const existing = await Rating.findOne({ postId, userEmail });
  if (existing) {
    existing.rating = rating;
    await existing.save();
    return NextResponse.json(existing);
  }

  const newRating = await Rating.create({ postId, rating, userEmail });
  return NextResponse.json(newRating, { status: 201 });
}
