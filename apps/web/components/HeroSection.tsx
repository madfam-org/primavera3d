'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Layers, Zap } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <div className="relative z-10 flex items-center justify-center h-full">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-white drop-shadow-2xl">Primavera</span>
            <span className="bg-gradient-to-r from-blueprint-blue to-blueprint-light bg-clip-text text-transparent drop-shadow-lg">
              3D
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 mb-8 max-w-3xl mx-auto drop-shadow-lg font-medium">
            Transforming ideas into reality through advanced 3D modeling, parametric design, and
            digital fabrication
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center px-8 py-4 bg-blueprint-blue text-white rounded-lg font-semibold shadow-2xl hover:bg-blueprint-blue/90 hover:shadow-blueprint-blue/25 transition-all duration-300"
          >
            View Portfolio
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-lg font-semibold bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
          >
            Start a Project
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 text-gray-200">
            <Cpu className="h-6 w-6 text-blueprint-blue" />
            <span className="font-medium">CAD/CAM Expertise</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-gray-200">
            <Layers className="h-6 w-6 text-blueprint-blue" />
            <span className="font-medium">Parametric Design</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-gray-200">
            <Zap className="h-6 w-6 text-blueprint-blue" />
            <span className="font-medium">Rapid Prototyping</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
