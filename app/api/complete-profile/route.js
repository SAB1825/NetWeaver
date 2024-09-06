import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User.schema';

export async function POST(req) {
  try {
    const { name, email, bio } = await req.json();
    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    existingUser.name = name;
    existingUser.bio = bio;
    await existingUser.save();

    return NextResponse.json({ message: 'Profile completed successfully' }, { status: 200 });
  } catch (error) {
    console.error('Profile completion error:', error);
    return NextResponse.json({ message: 'An error occurred during profile completion', error: error.toString() }, { status: 500 });
  }
}