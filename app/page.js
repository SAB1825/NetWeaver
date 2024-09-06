'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="text-3xl font-bold text-blue-400">NetWeaver</div>
        <nav>
          <Link href="/signin" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Sign In
          </Link>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-bold text-blue-300 mb-4"
          >
            Automate Your Social Media Content with AI
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-300 mb-8"
          >
            NetWeaver helps you create, schedule, and optimize your social media posts using advanced AI technology.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/signin" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full text-lg">
              Get Started
            </Link>
          </motion.div>
        </div>

        <div className="mt-16">
          <FeatureCards items={features} />
        </div>
      </main>

      <footer className="container mx-auto px-4 py-8 text-center text-gray-400">
        © 2023 NetWeaver. All rights reserved.
      </footer>
    </div>
  );
}

const FeatureCards = ({ items }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {items.map((item, idx) => (
        <FeatureCard key={idx} {...item} index={idx} />
      ))}
    </div>
  );
};

const FeatureCard = ({ title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      className="bg-gray-800 p-6 rounded-lg shadow-lg"
    >
      <motion.h3
        className="text-xl font-bold mb-2 text-blue-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
      >
        {title}
      </motion.h3>
      <motion.p
        className="text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

const features = [
  {
    title: "AI-Powered Content Creation",
    description: "Generate engaging posts tailored to your brand voice and audience.",
  },
  {
    title: "Smart Scheduling",
    description: "Optimize post timing for maximum engagement across platforms.",
  },
  {
    title: "Analytics Dashboard",
    description: "Track performance and gain insights to refine your strategy.",
  },
];