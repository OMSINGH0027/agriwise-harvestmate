
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export default function FeatureCard({ icon: Icon, title, description, className }: FeatureCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={cn(
        'glass-card rounded-xl p-6 group transition-all duration-300 hover:shadow-md border border-border/50',
        isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8',
        className
      )}
      style={{ transitionDelay: isVisible ? '150ms' : '0ms' }}
    >
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary transition-transform duration-300 group-hover:scale-110">
        <Icon size={24} />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}
