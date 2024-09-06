"use client"
import { FaGoogle } from 'react-icons/fa';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
export default function SignIn() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-100 to-white ">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold text-blue-600">NetWeaver</Link>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Sign In</h1>
          <p className="text-gray-600 mb-6">Welcome back! Sign in to your account.</p>
          <button 
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })} 
            className="w-full flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full text-lg transition-colors"
          >
            <FaGoogle className="mr-2" />
            Sign in with Google
          </button>
        </div>
      </main>

      <footer className="container mx-auto px-4 py-8 text-center text-gray-500">
        © 2023 NetWeaver. All rights reserved.
      </footer>
    </div>
  )
}

