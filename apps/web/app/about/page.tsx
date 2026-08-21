'use client';

import { motion } from 'framer-motion';
import { Users, Lightbulb, Award, Target } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Precision Engineering',
    description:
      'Every design is meticulously crafted with CAD-level accuracy and attention to detail.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation Driven',
    description: "We push the boundaries of what's possible with cutting-edge 3D technologies.",
  },
  {
    icon: Users,
    title: 'Collaborative Partnership',
    description: 'Working closely with clients to transform ideas into tangible reality.',
  },
  {
    icon: Award,
    title: 'Excellence Standard',
    description: 'Committed to delivering the highest quality in every project we undertake.',
  },
];

const stats = [
  { number: '150+', label: 'Projects Completed' },
  { number: '8+', label: 'Years Experience' },
  { number: '25+', label: 'Industries Served' },
  { number: '98%', label: 'Client Satisfaction' },
];

export default function AboutPage() {
  return (
    <main className="bp-page blueprint-stage">
      {/* Technical depth overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/5 to-black/20" />

      {/* Hero Section */}
      <section className="bp-section relative">
        <div className="bp-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="bp-text-h1">
              About{' '}
              <span className="bg-gradient-to-r from-blueprint-blue to-blueprint-light bg-clip-text text-transparent">
                Primavera3D
              </span>
            </h1>
            <p className="bp-text-body max-w-3xl mx-auto">
              We are a cutting-edge digital fabrication studio specializing in parametric design, 3D
              modeling, and advanced manufacturing solutions that bridge the gap between imagination
              and reality.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="bp-section">
        <div className="bp-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="bp-text-h2 neon-text">Our Story</h2>
              <div className="space-y-6">
                <p className="bp-text-body">
                  Founded by a team of engineers and designers passionate about the intersection of
                  computational design and digital fabrication, Primavera3D emerged from the belief
                  that technology should amplify human creativity, not replace it.
                </p>
                <p className="bp-text-body">
                  From our studio in Austin, Texas, we work with clients worldwide to solve complex
                  design challenges through parametric modeling, generative algorithms, and
                  precision manufacturing.
                </p>
                <p className="bp-text-body">
                  Every project we undertake is guided by the principles of sustainable design,
                  technical excellence, and the pursuit of solutions that are both beautiful and
                  functional.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bp-card-base bp-card-interactive blueprint-sheet"
            >
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="text-3xl font-bold text-blueprint-blue mb-2">{stat.number}</div>
                    <div className="bp-text-muted text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bp-section bg-gradient-to-b from-transparent to-gray-900/50">
        <div className="bp-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="bp-text-h2 neon-text">Our Values</h2>
            <p className="bp-text-body max-w-2xl mx-auto">
              The principles that guide our approach to every project and partnership
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bp-card-base bp-card-interactive blueprint-sheet"
                >
                  <Icon className="h-12 w-12 text-blueprint-blue mb-4" />
                  <h3 className="bp-text-h3">{value.title}</h3>
                  <p className="bp-text-body">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bp-section">
        <div className="bp-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center bp-card-base bp-card-interactive blueprint-grid max-w-4xl mx-auto"
          >
            <h2 className="bp-text-h2">Ready to Build Something Extraordinary?</h2>
            <p className="bp-text-body mb-8">
              Let&apos;s collaborate to bring your most ambitious ideas to life through the power of
              computational design and digital fabrication.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-blueprint-blue text-white rounded-lg font-semibold shadow-2xl hover:bg-blueprint-blue/90 hover:shadow-blueprint-blue/25 bp-transition-normal"
              >
                Start a Project
              </a>
              <a
                href="/portfolio"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-lg font-semibold bg-white/10 backdrop-blur-sm hover:bg-white/20 bp-transition-normal"
              >
                View Our Work
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
