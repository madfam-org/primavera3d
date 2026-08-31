'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, User } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: string;
  client: string;
  year: number;
  thumbnail: string;
  tags: string[];
  description: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  viewMode: 'grid' | 'list';
}

export default function ProjectCard({ project, index, viewMode }: ProjectCardProps) {
  if (viewMode === 'list') {
    return (
      <motion.article
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        className="bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-colors"
      >
        <Link href={`/portfolio/${project.id}`} className="flex flex-col md:flex-row">
          <div className="md:w-64 h-48 md:h-auto bg-gray-800 relative">
            <div className="absolute inset-0 blueprint-grid opacity-10" />
          </div>
          <div className="flex-1 p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="text-sm text-blueprint-blue font-medium">{project.category}</span>
                <h3 className="text-2xl font-bold mt-1">{project.title}</h3>
              </div>
              <span className="text-sm text-gray-400">{project.year}</span>
            </div>
            <p className="text-gray-400 mb-4">{project.description}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {project.client}
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="px-2 py-1 bg-gray-800 rounded text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
    >
      <Link href={`/portfolio/${project.id}`}>
        <div className="aspect-[4/3] relative overflow-hidden bg-gray-800">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/80 z-10" />
          <div className="absolute inset-0 blueprint-grid opacity-10" />
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-blueprint-blue font-medium">{project.category}</span>
            <span className="text-sm text-gray-400 flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {project.year}
            </span>
          </div>

          <h3 className="text-xl font-bold mb-2 group-hover:text-blueprint-light transition-colors">
            {project.title}
          </h3>

          <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>

          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <User className="h-3 w-3" />
              {project.client}
            </span>
            <div className="flex gap-1">
              {project.tags.slice(0, 2).map(tag => (
                <span key={tag} className="text-xs px-2 py-1 bg-gray-800 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
