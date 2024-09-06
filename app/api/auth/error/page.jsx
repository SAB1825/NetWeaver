'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function ErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  let errorMessage = 'An unknown error occurred.'
  let actionMessage = ''

  if (error === 'OAuthAccountNotLinked') {
    errorMessage = 'This Google account is not linked to an existing account.'
    actionMessage = 'Please sign in with your email and password, or register a new account.'
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Authentication Error</h1>
        <p className="text-gray-300 mb-4">{errorMessage}</p>
        {actionMessage && <p className="text-gray-300 mb-4">{actionMessage}</p>}
        <div className="flex justify-between">
          <Link href="/signin" className="mt-6 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Sign In
          </Link>
          <Link href="/register" className="mt-6 inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}