'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Grid3X3, List } from 'lucide-react';
import ProjectCard from '@/components/ProjectCard';
// import ProjectFilters from '@/components/ProjectFilters'; // TODO: Implement filters

const categories = ['All', 'Architecture', 'Product Design', 'Medical', 'Engineering', 'Art'];

const projects = [
  {
    id: '1',
    title: 'Parametric Pavilion',
    category: 'Architecture',
    client: 'City of Austin',
    year: 2024,
    thumbnail: '/api/placeholder/400/300',
    tags: ['Grasshopper', 'Rhino', 'CNC', 'Wood'],
    description: 'A modular pavilion using computational design algorithms',
  },
  {
    id: '2',
    title: 'Custom Prosthetics',
    category: 'Medical',
    client: 'MedTech Solutions',
    year: 2024,
    thumbnail: '/api/placeholder/400/300',
    tags: ['3D Scanning', 'Fusion 360', 'SLS', 'Nylon'],
    description: '3D-printed prosthetic limbs tailored to patients',
  },
  {
    id: '3',
    title: 'Electric Vehicle Parts',
    category: 'Engineering',
    client: 'EV Innovations',
    year: 2023,
    thumbnail: '/api/placeholder/400/300',
    tags: ['CATIA', 'FEA', 'Carbon Fiber', 'CNC'],
    description: 'Lightweight components for EV prototypes',
  },
  {
    id: '4',
    title: 'Furniture Collection',
    category: 'Product Design',
    client: 'Modern Living Co',
    year: 2024,
    thumbnail: '/api/placeholder/400/300',
    tags: ['Fusion 360', 'CNC', 'Plywood', 'Parametric'],
    description: 'Customizable furniture with parametric design',
  },
  {
    id: '5',
    title: 'Kinetic Sculpture',
    category: 'Art',
    client: 'Art Museum',
    year: 2023,
    thumbnail: '/api/placeholder/400/300',
    tags: ['Arduino', '3D Printing', 'Metal', 'Motors'],
    description: 'Interactive sculpture responding to viewer movement',
  },
  {
    id: '6',
    title: 'Modular Housing',
    category: 'Architecture',
    client: 'Housing Authority',
    year: 2023,
    thumbnail: '/api/placeholder/400/300',
    tags: ['BIM', 'Prefab', 'Sustainable', 'CLT'],
    description: 'Affordable modular housing system',
  },
];

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-blueprint-dark text-white pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-10" />
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our{' '}
              <span className="bg-gradient-to-r from-blueprint-blue to-blueprint-light bg-clip-text text-transparent">
                Portfolio
              </span>
            </h1>
            <p className="text-xl text-gray-300">
              Explore our diverse range of projects showcasing innovation in 3D design and digital
              fabrication
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="sticky top-0 z-40 bg-gray-900/95 backdrop-blur-lg border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blueprint-blue transition-colors"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    selectedCategory === category
                      ? 'bg-blueprint-blue text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${
                  viewMode === 'grid' ? 'bg-blueprint-blue text-white' : 'bg-gray-800 text-gray-400'
                }`}
                aria-label="Grid view"
              >
                <Grid3X3 className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${
                  viewMode === 'list' ? 'bg-blueprint-blue text-white' : 'bg-gray-800 text-gray-400'
                }`}
                aria-label="List view"
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <AnimatePresence mode="wait">
            {filteredProjects.length > 0 ? (
              <motion.div
                key={`${selectedCategory}-${searchQuery}-${viewMode}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                    : 'flex flex-col gap-6'
                }
              >
                {filteredProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    viewMode={viewMode}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <Filter className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl text-gray-400">No projects found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your filters or search query</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results Count */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-400 mt-8 text-center"
          >
            Showing {filteredProjects.length} of {projects.length} projects
          </motion.p>
        </div>
      </section>
    </main>
  );
}
