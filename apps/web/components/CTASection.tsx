'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, MessageSquare } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-blueprint-dark blueprint-grid">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Build Something{' '}
            <span className="bg-gradient-to-r from-blueprint-blue to-blueprint-light bg-clip-text text-transparent">
              Extraordinary?
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Let&apos;s transform your ideas into reality with cutting-edge 3D technology and expert
            craftsmanship.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-blueprint-blue text-white rounded-lg neon-border pulse-glow hover-lift transition-all duration-300"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Get a Quote
            </Link>
            <Link
              href="/schedule"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-blueprint-blue text-blueprint-light rounded-lg glass-light hover-lift neon-border transition-all duration-300"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Schedule Consultation
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-12 flex flex-wrap justify-center gap-8 text-gray-400"
          >
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-blueprint-blue">100+</span>
              <span>Projects Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-blueprint-blue">50+</span>
              <span>Happy Clients</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-blueprint-blue">5+</span>
              <span>Years Experience</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
