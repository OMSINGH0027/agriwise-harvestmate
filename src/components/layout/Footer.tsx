
import { Link } from 'react-router-dom';
import { Sprout, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '/#features' },
        { name: 'Pricing', href: '/#pricing' },
        { name: 'Testimonials', href: '/#testimonials' },
        { name: 'FAQ', href: '/#faq' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About', href: '/#about' },
        { name: 'Blog', href: '/blog' },
        { name: 'Careers', href: '/careers' },
        { name: 'Contact', href: '/#contact' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Community', href: '/community' },
        { name: 'Help Center', href: '/help' },
        { name: 'Privacy', href: '/privacy' },
        { name: 'Terms', href: '/terms' },
      ],
    },
  ];

  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container-wide py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Column */}
          <div className="flex flex-col">
            <Link to="/" className="flex items-center gap-2 text-primary font-semibold text-xl mb-4">
              <Sprout size={24} />
              <span>AgriWise</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6 max-w-md">
              Empowering small and marginal farmers with AI-driven solutions to navigate climate change and optimize agricultural practices.
            </p>
            <div className="flex flex-col gap-3 text-sm">
              <a href="mailto:contact@agriwise.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Mail size={16} />
                <span>contact@agriwise.com</span>
              </a>
              <a href="tel:+123456789" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Phone size={16} />
                <span>+1 (234) 567-890</span>
              </a>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin size={16} />
                <span>123 Agriculture Lane, Farmville, CA 94123</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((column) => (
            <div key={column.title} className="flex flex-col">
              <h3 className="font-medium text-sm mb-4 text-foreground">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center border-t border-border/50 mt-12 pt-6 text-sm text-muted-foreground">
          <p>© {currentYear} AgriWise. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary transition-colors">
              Twitter
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              LinkedIn
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Facebook
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
