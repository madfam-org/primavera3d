'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Parametric Pavilion',
    category: 'Architecture',
    description: 'A modular pavilion design using computational algorithms',
    image: '/api/placeholder/600/400',
    tags: ['Grasshopper', 'Rhino', 'CNC'],
  },
  {
    id: 2,
    title: 'Custom Prosthetics',
    category: 'Medical',
    description: '3D-printed prosthetic limbs tailored to individual patients',
    image: '/api/placeholder/600/400',
    tags: ['3D Scanning', 'Fusion 360', 'SLS'],
  },
  {
    id: 3,
    title: 'Automotive Components',
    category: 'Engineering',
    description: 'Lightweight parts for electric vehicle prototypes',
    image: '/api/placeholder/600/400',
    tags: ['CATIA', 'FEA', 'Carbon Fiber'],
  },
];

export default function FeaturedProjects() {
  return (
    <section className="py-20 bg-blueprint-dark blueprint-grid">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 neon-text">Featured Projects</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore our latest work in 3D design and digital fabrication
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative glass-card rounded-lg overflow-hidden hover-lift gradient-overlay neon-border transition-all duration-300"
            >
              <div className="aspect-[4/3] relative overflow-hidden bg-gray-800 blueprint-sheet">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/80 z-10" />
              </div>

              <div className="p-6">
                <span className="text-sm text-blueprint-accent font-medium">
                  {project.category}
                </span>
                <h3 className="text-xl font-bold mt-2 mb-2 group-hover:text-blueprint-light transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 bg-gray-800 text-gray-400 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                href={`/portfolio/${project.id}`}
                className="absolute inset-0 z-20"
                aria-label={`View ${project.title} project`}
              />
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center px-6 py-3 text-blueprint-accent hover:text-blueprint-light glass-light rounded-lg hover-lift neon-border transition-all duration-300"
          >
            View All Projects
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
