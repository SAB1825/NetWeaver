"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export const HoverEffect = ({ items }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {items.map((item, idx) => (
        <motion.div
          key={idx}
          className="relative group h-96"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          onHoverStart={() => setHoveredIndex(idx)}
          onHoverEnd={() => setHoveredIndex(null)}
        >
          <div className="absolute inset-0 rounded-lg overflow-hidden">
            <Image
              src={item.image}
              alt={item.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
          </div>
          <div className="relative h-full flex flex-col justify-end p-6 text-white">
            <motion.h3
              className="text-2xl font-bold mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {item.title}
            </motion.h3>
            <motion.p
              className="text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              {item.description}
            </motion.p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};