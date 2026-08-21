import { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Primavera3D for your 3D modeling and digital fabrication needs.',
};

export default function ContactPage() {
  return (
    <main className="bp-page">
      <div className="bp-container bp-section">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="bp-text-h1">Get in Touch</h1>
            <p className="bp-text-body max-w-2xl mx-auto">
              Ready to bring your ideas to life? Contact us to discuss your project and discover how
              we can help transform your vision into reality.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h2 className="bp-text-h2">Contact Information</h2>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Mail className="h-5 w-5 text-blueprint-blue mt-1" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a
                        href="mailto:info@primavera3d.pro"
                        className="text-gray-400 hover:text-blueprint-blue transition-colors"
                      >
                        info@primavera3d.pro
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="h-5 w-5 text-blueprint-blue mt-1" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <a
                        href="tel:+1234567890"
                        className="text-gray-400 hover:text-blueprint-blue transition-colors"
                      >
                        +1 (234) 567-890
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin className="h-5 w-5 text-blueprint-blue mt-1" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-gray-400">
                        Austin, Texas
                        <br />
                        United States
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock className="h-5 w-5 text-blueprint-blue mt-1" />
                    <div>
                      <p className="font-medium">Business Hours</p>
                      <p className="text-gray-400">
                        Monday - Friday
                        <br />
                        9:00 AM - 6:00 PM CST
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Response Promise */}
              <div className="glass-light p-6 rounded-lg neon-border pulse-glow">
                <h3 className="font-semibold mb-2">Quick Response</h3>
                <p className="text-sm text-gray-300">
                  We typically respond to all inquiries within 24 hours during business days.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="glass-card p-8 rounded-xl hover-lift gradient-overlay">
                <h2 className="text-2xl font-semibold mb-6 neon-text">Send Us a Message</h2>
                <ContactForm />
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-20 border-t border-gray-800 pt-12">
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="glass-card p-6 rounded-lg hover-lift gradient-overlay scale-in">
                <h3 className="font-semibold mb-2">What services do you offer?</h3>
                <p className="text-gray-400 text-sm">
                  We specialize in 3D modeling, parametric design, digital fabrication, CNC
                  machining, and rapid prototyping for various industries.
                </p>
              </div>
              <div className="glass-card p-6 rounded-lg hover-lift gradient-overlay scale-in">
                <h3 className="font-semibold mb-2">How long does a typical project take?</h3>
                <p className="text-gray-400 text-sm">
                  Project timelines vary based on complexity. Simple projects may take 1-2 weeks,
                  while complex ones can take 4-8 weeks or more.
                </p>
              </div>
              <div className="glass-card p-6 rounded-lg hover-lift gradient-overlay scale-in">
                <h3 className="font-semibold mb-2">Do you work with international clients?</h3>
                <p className="text-gray-400 text-sm">
                  Yes, we work with clients worldwide. We can collaborate remotely and ship finished
                  products internationally.
                </p>
              </div>
              <div className="glass-card p-6 rounded-lg hover-lift gradient-overlay scale-in">
                <h3 className="font-semibold mb-2">What file formats do you accept?</h3>
                <p className="text-gray-400 text-sm">
                  We work with all major CAD formats including STEP, STL, OBJ, IGES, as well as
                  design files from software like Rhino, Fusion 360, and SolidWorks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
