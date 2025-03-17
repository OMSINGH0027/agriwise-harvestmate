
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import LoginForm from '@/components/auth/LoginForm';
import { Sprout } from 'lucide-react';

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-5xl flex flex-col md:flex-row items-center glass-card rounded-xl overflow-hidden shadow-lg border border-border/50">
          {/* Left section with image/illustration */}
          <div className="w-full md:w-1/2 bg-gradient-to-br from-nature-100 to-nature-50 dark:from-nature-900/50 dark:to-nature-800/50 p-8 md:p-12 flex flex-col items-center justify-center text-center">
            <div className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
            }`}>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/90 text-primary mb-6">
                <Sprout size={32} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Welcome to AgriWise
              </h2>
              <p className="text-muted-foreground mb-6">
                AI-driven agricultural insights to help you navigate climate change and optimize your farming practices.
              </p>
              <div className="w-24 h-1 bg-primary/20 rounded-full mx-auto"></div>
            </div>
          </div>

          {/* Right section with login form */}
          <div className="w-full md:w-1/2 p-8 md:p-12">
            <div className={`transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
            }`}>
              <LoginForm />
              
              <p className="text-center text-sm text-muted-foreground mt-8">
                By continuing, you agree to our{' '}
                <Link to="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link to="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
