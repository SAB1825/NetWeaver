"use client"
import { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to complete-profile page with email as a query parameter
        router.push(`/complete-profile?email=${encodeURIComponent(data.email)}`);
      } else {
        console.error('Registration error:', data);
        setError(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('An error occurred during registration');
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const result = await signIn("google", { 
        callbackUrl: "/dashboard",
        redirect: false
      });
      
      if (result?.error) {
        router.push(`/auth/error?error=${encodeURIComponent(result.error)}`);
      } else if (result?.url) {
        router.push(result.url);
      }
    } catch (error) {
      console.error('Google registration error:', error);
      router.push(`/auth/error?error=${encodeURIComponent('An error occurred during Google registration')}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold text-blue-400">NetWeaver</Link>
      </header>

      <main className="container mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto bg-gray-800 p-8 rounded-lg shadow-lg"
        >
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl font-bold text-blue-300 mb-6"
          >
            Register
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-gray-300 mb-6"
          >
            Create your account to get started.
          </motion.p>
          
          <form onSubmit={handleRegister} className="mb-4">
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 mb-4 bg-gray-700 rounded"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-4 bg-gray-700 rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-4 bg-gray-700 rounded"
              required
            />
            <button 
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Register
            </button>
          </form>

          <div className="text-center mb-4">
            <span className="text-gray-400">or</span>
          </div>

          <motion.button 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            onClick={handleGoogleRegister} 
            className="w-full flex items-center justify-center bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-full text-lg transition-colors mb-4"
          >
            <FaGoogle className="mr-2" />
            Register with Google
          </motion.button>

          <p className="text-center text-gray-400">
            Already have an account? <Link href="/signin" className="text-blue-400 hover:underline">Sign In</Link>
          </p>
        </motion.div>
      </main>

      <footer className="container mx-auto px-4 py-8 text-center text-gray-400">
        © 2023 NetWeaver. All rights reserved.
      </footer>
    </div>
  )
}