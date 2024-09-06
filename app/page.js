import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="text-3xl font-bold text-blue-600">NetWeaver</div>
        <nav>
          <Link href="/signin" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Sign In
          </Link>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Automate Your Social Media Content with AI
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            NetWeaver helps you create, schedule, and optimize your social media posts using advanced AI technology.
          </p>
          <Link href="/register" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full text-lg">
            Get Started
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            title="AI-Powered Content Creation" 
            description="Generate engaging posts tailored to your brand voice and audience."
          />
          <FeatureCard 
            title="Smart Scheduling" 
            description="Optimize post timing for maximum engagement across platforms."
          />
          <FeatureCard 
            title="Analytics Dashboard" 
            description="Track performance and gain insights to refine your strategy."
          />
        </div>
      </main>

      <footer className="container mx-auto px-4 py-8 text-center text-gray-500">
        © 2023 NetWeaver. All rights reserved.
      </footer>
    </div>
  );
}

function FeatureCard({ title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}