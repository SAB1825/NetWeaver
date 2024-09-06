'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function ErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full"
      >
        <h1 className="text-3xl font-bold text-red-500 mb-4">Registration Error</h1>
        <p className="text-gray-300 mb-4">An error occurred during registration:</p>
        <p className="bg-gray-700 p-4 rounded text-red-400 mb-6">{error}</p>
        <div className="flex justify-between">
          <Link href="/register" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors">
            Try Again
          </Link>
          <Link href="/signin" className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors">
            Sign In
          </Link>
        </div>
      </motion.div>
    </div>
  )
}