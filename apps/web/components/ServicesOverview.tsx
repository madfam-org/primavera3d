'use client';

import { motion } from 'framer-motion';
import { Printer, Box, PenTool, Settings, Monitor, Package } from 'lucide-react';

const services = [
  {
    icon: Box,
    title: '3D Modeling',
    description: 'Custom 3D models for products, architecture, and visualization',
  },
  {
    icon: PenTool,
    title: 'Parametric Design',
    description: 'Flexible, data-driven designs that adapt to your requirements',
  },
  {
    icon: Printer,
    title: '3D Printing',
    description: 'High-quality prototypes and production parts in various materials',
  },
  {
    icon: Settings,
    title: 'CNC Machining',
    description: 'Precision machining for metal, wood, and composite materials',
  },
  {
    icon: Monitor,
    title: 'Digital Twin',
    description: 'Virtual representations of physical products and systems',
  },
  {
    icon: Package,
    title: 'Mass Customization',
    description: 'Scalable solutions for personalized product manufacturing',
  },
];

export default function ServicesOverview() {
  return (
    <section className="py-20 bg-gray-900 blueprint-sheet">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 neon-text">Our Services</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Comprehensive digital fabrication solutions tailored to your needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card rounded-lg p-6 hover-lift gradient-overlay scale-in neon-border blueprint-sheet transition-all duration-300"
              >
                <Icon className="h-12 w-12 text-blueprint-blue mb-4" />
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
