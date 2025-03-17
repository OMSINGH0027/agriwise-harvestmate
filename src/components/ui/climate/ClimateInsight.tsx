
import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, ThermometerSun, CloudRain, Wind } from 'lucide-react';

interface ClimateInsightProps {
  title: string;
  value: string | number;
  change?: number;
  type: 'temperature' | 'rainfall' | 'wind' | 'humidity';
  className?: string;
}

export default function ClimateInsight({ 
  title, 
  value, 
  change, 
  type,
  className = ''
}: ClimateInsightProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const getIcon = () => {
    switch (type) {
      case 'temperature':
        return <ThermometerSun size={20} />;
      case 'rainfall':
        return <CloudRain size={20} />;
      case 'wind':
        return <Wind size={20} />;
      case 'humidity':
        return <CloudRain size={20} />;
      default:
        return <ThermometerSun size={20} />;
    }
  };

  const getColor = () => {
    switch (type) {
      case 'temperature':
        return 'text-amber-500 bg-amber-50 dark:bg-amber-950/40';
      case 'rainfall':
        return 'text-sky-500 bg-sky-50 dark:bg-sky-950/40';
      case 'wind':
        return 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40';
      case 'humidity':
        return 'text-blue-500 bg-blue-50 dark:bg-blue-950/40';
      default:
        return 'text-primary bg-primary/10';
    }
  };

  const getChangeIndicator = () => {
    if (!change) return null;
    
    const isPositive = change > 0;
    const Icon = isPositive ? TrendingUp : TrendingDown;
    const color = type === 'temperature' 
      ? (isPositive ? 'text-red-500' : 'text-blue-500')
      : (isPositive ? 'text-green-500' : 'text-orange-500');
    
    return (
      <div className={`flex items-center gap-1 text-xs ${color}`}>
        <Icon size={12} />
        <span>{Math.abs(change)}%</span>
      </div>
    );
  };

  return (
    <div 
      className={`glass-card rounded-lg p-4 transition-all duration-500 ${className} ${
        isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="text-sm font-medium text-muted-foreground">{title}</div>
        <div className={`rounded-full p-1.5 ${getColor()}`}>
          {getIcon()}
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div className="text-2xl font-semibold">{value}</div>
        {getChangeIndicator()}
      </div>
    </div>
  );
}
