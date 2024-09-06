import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb-adapter';
import User from '@/models/User.schema';

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json({ message: 'Profile completed successfully' }, { status: 201 });
  } catch (error) {
    console.error('Profile completion error:', error);
    return NextResponse.json({ message: 'An error occurred during profile completion' }, { status: 500 });
  }
}