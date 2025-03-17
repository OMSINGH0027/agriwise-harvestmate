
import { useState, useEffect } from 'react';
import { CloudSun, Cloud, CloudRain, Sun, CloudLightning } from 'lucide-react';

interface WeatherCardProps {
  day: string;
  condition: 'sunny' | 'cloudy' | 'partly-cloudy' | 'rainy' | 'stormy';
  temperature: number;
  precipitation: number;
  className?: string;
}

export default function WeatherCard({
  day,
  condition,
  temperature,
  precipitation,
  className = ''
}: WeatherCardProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const getIcon = () => {
    switch (condition) {
      case 'sunny':
        return <Sun className="text-amber-500" size={36} />;
      case 'cloudy':
        return <Cloud className="text-slate-400" size={36} />;
      case 'partly-cloudy':
        return <CloudSun className="text-sky-400" size={36} />;
      case 'rainy':
        return <CloudRain className="text-blue-500" size={36} />;
      case 'stormy':
        return <CloudLightning className="text-purple-500" size={36} />;
      default:
        return <CloudSun className="text-sky-400" size={36} />;
    }
  };

  const getBackgroundClass = () => {
    switch (condition) {
      case 'sunny':
        return 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30';
      case 'cloudy':
        return 'bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-950/30 dark:to-gray-950/30';
      case 'partly-cloudy':
        return 'bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-950/30 dark:to-blue-950/30';
      case 'rainy':
        return 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30';
      case 'stormy':
        return 'bg-gradient-to-br from-purple-50 to-slate-50 dark:from-purple-950/30 dark:to-slate-950/30';
      default:
        return 'bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-950/30 dark:to-blue-950/30';
    }
  };

  return (
    <div 
      className={`glass-card rounded-lg p-4 transition-all duration-500 ${className} ${getBackgroundClass()} ${
        isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
      }`}
    >
      <div className="flex flex-col items-center">
        <div className="text-sm font-medium mb-2">{day}</div>
        <div className="mb-3">{getIcon()}</div>
        <div className="text-xl font-semibold mb-1">{temperature}°C</div>
        <div className="text-xs text-muted-foreground flex items-center gap-1">
          <CloudRain size={12} />
          <span>{precipitation}% rain</span>
        </div>
      </div>
    </div>
  );
}
