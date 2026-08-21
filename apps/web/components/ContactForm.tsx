'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { submitContactForm } from '../app/actions/contact';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');
    setErrors({});

    const formData = new FormData(e.currentTarget);

    try {
      const response = await submitContactForm(formData);

      if (response.success) {
        setStatus('success');
        setMessage(response.message);
        // Reset form
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
        setMessage(response.message);
        if (response.errors) {
          setErrors(response.errors);
        }
      }
    } catch (_error) {
      setStatus('error');
      setMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-2 bg-blueprint-dark border border-blueprint-light/30 rounded-lg focus:outline-none focus:border-blueprint-blue transition-colors"
          />
          {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-2 bg-blueprint-dark border border-blueprint-light/30 rounded-lg focus:outline-none focus:border-blueprint-blue transition-colors"
          />
          {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium mb-2">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            className="w-full px-4 py-2 bg-blueprint-dark border border-blueprint-light/30 rounded-lg focus:outline-none focus:border-blueprint-blue transition-colors"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full px-4 py-2 bg-blueprint-dark border border-blueprint-light/30 rounded-lg focus:outline-none focus:border-blueprint-blue transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium mb-2">
          Subject *
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          className="w-full px-4 py-2 bg-blueprint-dark border border-blueprint-light/30 rounded-lg focus:outline-none focus:border-blueprint-blue transition-colors"
        />
        {errors.subject && <p className="mt-1 text-sm text-red-400">{errors.subject}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className="w-full px-4 py-2 bg-blueprint-dark border border-blueprint-light/30 rounded-lg focus:outline-none focus:border-blueprint-blue transition-colors resize-none"
        />
        {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
      </div>

      {status === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400"
        >
          <CheckCircle className="h-5 w-5 flex-shrink-0" />
          <p>{message}</p>
        </motion.div>
      )}

      {status === 'error' && message && !Object.keys(errors).length && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400"
        >
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p>{message}</p>
        </motion.div>
      )}

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`
          w-full md:w-auto px-8 py-3 rounded-lg font-medium
          flex items-center justify-center gap-2
          transition-all duration-300
          ${
            isSubmitting
              ? 'bg-gray-700 cursor-not-allowed opacity-50'
              : 'bg-blueprint-blue hover:bg-blueprint-blue/80 text-white neon-border pulse-glow hover-lift'
          }
        `}
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-5 w-5" />
            Send Message
          </>
        )}
      </motion.button>
    </form>
  );
}
