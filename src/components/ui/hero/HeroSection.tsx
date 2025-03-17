
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronRight, CloudSun, Sprout, CloudRain } from 'lucide-react';

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-nature-200/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-sky-200/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Floating Icons */}
      <div className="absolute top-20 left-10 md:left-24 opacity-20 animate-float">
        <Sprout size={56} className="text-nature-500" />
      </div>
      <div className="absolute top-40 right-10 md:right-32 opacity-20 animate-float" style={{ animationDelay: '2s' }}>
        <CloudSun size={64} className="text-sky-400" />
      </div>
      <div className="absolute bottom-20 left-1/3 opacity-20 animate-float" style={{ animationDelay: '1s' }}>
        <CloudRain size={48} className="text-sky-500" />
      </div>

      <div className="container-tight relative">
        <div className="flex flex-col items-center text-center">
          {/* Floating tag */}
          <div 
            className={`glass-card inline-flex items-center px-4 py-2 rounded-full mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4'
            }`}
          >
            <span className="inline-block w-2 h-2 rounded-full bg-nature-500 mr-2 animate-pulse-slow"></span>
            <span className="text-sm font-medium">AI-Powered Agricultural Solutions</span>
          </div>

          {/* Heading */}
          <h1 
            className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4'
            }`}
          >
            Empowering Farmers in the 
            <span className="text-primary ml-2">Climate Change Era</span>
          </h1>

          {/* Subheading */}
          <p 
            className={`text-lg md:text-xl text-muted-foreground max-w-3xl mb-8 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4'
            }`}
          >
            Navigate unpredictable weather patterns, rising temperatures, and agricultural challenges 
            with our AI-driven insights tailored for small and marginal farmers.
          </p>

          {/* CTA Buttons */}
          <div 
            className={`flex flex-col sm:flex-row items-center gap-4 mb-16 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4'
            }`}
          >
            <Link to="/login">
              <Button size="lg" className="rounded-full px-8 gap-2">
                Get Started
                <ChevronRight size={16} />
              </Button>
            </Link>
            <Link to="/#features">
              <Button variant="outline" size="lg" className="rounded-full px-8">
                Learn More
              </Button>
            </Link>
          </div>

          {/* Hero Image */}
          <div 
            className={`relative w-full max-w-5xl mx-auto transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
            }`}
          >
            <div className="aspect-[16/9] rounded-xl overflow-hidden border border-border/50 shadow-xl glass-card">
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <CloudSun size={48} className="text-primary mb-4" />
                  <p className="text-lg font-medium">Weather Analysis Dashboard Preview</p>
                  <p className="text-sm text-muted-foreground mt-2">Visualize climate patterns and receive AI-driven insights</p>
                </div>
              </div>
            </div>
            
            {/* Floating Card 1 */}
            <div className="absolute top-4 -left-4 md:-left-12 glass-card rounded-lg p-4 shadow-lg border border-border/50 max-w-[240px] hidden md:block">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-nature-100 flex items-center justify-center text-nature-700">
                  <Sprout size={16} />
                </div>
                <span className="font-medium text-sm">Crop Recommendations</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Smart suggestions based on your soil and local climate conditions
              </p>
            </div>
            
            {/* Floating Card 2 */}
            <div className="absolute -bottom-4 md:-bottom-8 right-4 md:right-12 glass-card rounded-lg p-4 shadow-lg border border-border/50 max-w-[240px] hidden md:block">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-700">
                  <CloudRain size={16} />
                </div>
                <span className="font-medium text-sm">Weather Alerts</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Timely notifications for extreme weather events and changing patterns
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
