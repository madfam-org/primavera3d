import Link from 'next/link';
import { Mail, MapPin, Phone, Linkedin, Twitter, Github } from 'lucide-react';

const footerLinks = {
  services: [
    { label: '3D Modeling', href: '/services#modeling' },
    { label: 'Parametric Design', href: '/services#parametric' },
    { label: '3D Printing', href: '/services#printing' },
    { label: 'CNC Machining', href: '/services#cnc' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
  ],
  resources: [
    { label: 'Documentation', href: '/docs' },
    { label: 'Materials Guide', href: '/materials' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'FAQ', href: '/faq' },
  ],
};

const socialLinks = [
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-auto">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Primavera3D</h3>
            <p className="text-gray-400 mb-6 max-w-sm">
              Transforming ideas into reality through advanced 3D modeling, 
              parametric design, and digital fabrication.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-blueprint-blue" />
                <span>Austin, TX 78701</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-blueprint-blue" />
                <span>+1 (512) 555-0123</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-blueprint-blue" />
                <a href="mailto:hello@primavera3d.pro" className="hover:text-white transition-colors">
                  hello@primavera3d.pro
                </a>
              </div>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Ecosystem Links */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-400 mb-6">
            <span className="text-gray-500">MADFAM Ecosystem:</span>
            <a href="https://cotiza.studio" className="hover:text-white transition-colors">Cotiza</a>
            <span className="text-gray-600">·</span>
            <a href="https://yantra4d.com" className="hover:text-white transition-colors">Yantra4D</a>
            <span className="text-gray-600">·</span>
            <a href="https://forgesight.quest" className="hover:text-white transition-colors">Forgesight</a>
            <span className="text-gray-600">·</span>
            <a href="https://forj.design" className="hover:text-white transition-colors">Forj</a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Primavera3D. By{' '}
            <a href="https://madfam.io" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Innovaciones MADFAM
            </a>
            .
          </div>
          
          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all"
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-6 text-sm">
            <a href="https://madfam.io/privacy" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="https://madfam.io/terms" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="https://status.madfam.io" className="text-gray-400 hover:text-white transition-colors">
              Status
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}