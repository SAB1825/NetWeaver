import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User.schema';

export async function POST(req) {
  try {
    console.log('Starting registration process');
    const { name, email, password } = await req.json();
    console.log('Received data:', { name, email });

    console.log('Connecting to database...');
    await dbConnect();
    console.log('Connected to database');

    console.log('Checking for existing user');
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists:', email);
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    console.log('Hashing password');
    const hashedPassword = await bcrypt.hash(password, 12);

    console.log('Creating new user');
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    console.log('Saving user to database');
    const savedUser = await newUser.save();
    console.log('User saved successfully:', savedUser);

    return NextResponse.json({ message: 'User registered successfully', email: savedUser.email }, { status: 201 });
  } catch (error) {
    console.error('Detailed registration error:', error);
    return NextResponse.json({ message: 'An error occurred during registration', error: error.toString() }, { status: 500 });
  }
}