'use client';

import { Filter, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FilterOptions {
  categories: string[];
  technologies: string[];
  materials: string[];
  years: number[];
}

interface SelectedFilters {
  categories: string[];
  technologies: string[];
  materials: string[];
  years: number[];
}

interface ProjectFiltersProps {
  options: FilterOptions;
  onFilterChange: (filters: SelectedFilters) => void;
}

export default function ProjectFilters({ options, onFilterChange }: ProjectFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    categories: [],
    technologies: [],
    materials: [],
    years: [],
  });

  const toggleFilter = (type: keyof SelectedFilters, value: string | number) => {
    setSelectedFilters(prev => {
      const current = prev[type] as (string | number)[];
      const updated = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];

      const newFilters = { ...prev, [type]: updated } as SelectedFilters;
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const clearFilters = () => {
    const emptyFilters = {
      categories: [],
      technologies: [],
      materials: [],
      years: [],
    };
    setSelectedFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  const activeFilterCount = Object.values(selectedFilters).flat().length;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors relative"
      >
        <Filter className="h-5 w-5" />
        <span>Filters</span>
        {activeFilterCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-blueprint-blue text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {activeFilterCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 h-full w-96 bg-gray-900 z-50 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Filters</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="w-full mb-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    Clear All Filters
                  </button>
                )}

                {/* Category Filters */}
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-gray-400 mb-3">CATEGORY</h3>
                  <div className="space-y-2">
                    {options.categories.map(category => (
                      <label key={category} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedFilters.categories.includes(category)}
                          onChange={() => toggleFilter('categories', category)}
                          className="rounded border-gray-600 bg-gray-800 text-blueprint-blue focus:ring-blueprint-blue"
                        />
                        <span className="text-gray-300">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Technology Filters */}
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-gray-400 mb-3">TECHNOLOGY</h3>
                  <div className="space-y-2">
                    {options.technologies.map(tech => (
                      <label key={tech} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedFilters.technologies.includes(tech)}
                          onChange={() => toggleFilter('technologies', tech)}
                          className="rounded border-gray-600 bg-gray-800 text-blueprint-blue focus:ring-blueprint-blue"
                        />
                        <span className="text-gray-300">{tech}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Material Filters */}
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-gray-400 mb-3">MATERIAL</h3>
                  <div className="space-y-2">
                    {options.materials.map(material => (
                      <label key={material} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedFilters.materials.includes(material)}
                          onChange={() => toggleFilter('materials', material)}
                          className="rounded border-gray-600 bg-gray-800 text-blueprint-blue focus:ring-blueprint-blue"
                        />
                        <span className="text-gray-300">{material}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Year Filters */}
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-gray-400 mb-3">YEAR</h3>
                  <div className="space-y-2">
                    {options.years.map(year => (
                      <label key={year} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedFilters.years.includes(year)}
                          onChange={() => toggleFilter('years', year)}
                          className="rounded border-gray-600 bg-gray-800 text-blueprint-blue focus:ring-blueprint-blue"
                        />
                        <span className="text-gray-300">{year}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
