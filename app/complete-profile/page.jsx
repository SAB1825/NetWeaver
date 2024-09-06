"use client"
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CompleteProfile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      const email = searchParams.get('email');
      if (!email) {
        router.push('/signin');
      } else {
        setEmail(email);
      }
    } else if (status === "authenticated") {
      setName(session.user.name || '');
      setEmail(session.user.email || '');
    }
  }, [session, status, searchParams, router]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('/api/create-user', {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          name: name,
          bio,
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        router.push('/dashboard');
      } else {
        const data = await response.json();
        setError(data.message || 'Profile completion failed');
      }
    } catch (error) {
      setError('An error occurred during profile completion');
    }
  }

  if (status === "loading") {
    return <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex items-center justify-center">Loading...</div>;
  }

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
            Complete Your Profile
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-gray-300 mb-6"
          >
            Please provide some additional information to complete your profile.
          </motion.p>
          
          <form onSubmit={handleSubmit} className="mb-4">
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="w-full p-2 mb-4 bg-gray-700 rounded"
              required
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-2 mb-4 bg-gray-700 rounded"
              required
              readOnly
            />
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself"
              className="w-full p-2 mb-4 bg-gray-700 rounded h-32"
            />
            <button 
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Complete Profile
            </button>
          </form>
        </motion.div>
      </main>

      <footer className="container mx-auto px-4 py-8 text-center text-gray-400">
        © 2023 NetWeaver. All rights reserved.
      </footer>
    </div>
  );
}