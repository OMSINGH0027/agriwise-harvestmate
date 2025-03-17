
import { CloudSun, Sprout, TrendingUp, CloudRain, Users, MapPin } from 'lucide-react';
import FeatureCard from './FeatureCard';

export default function FeaturesSection() {
  const features = [
    {
      icon: CloudSun,
      title: 'Climate Analysis',
      description: 'Advanced AI models analyze climate patterns to provide actionable insights specific to your region.',
    },
    {
      icon: Sprout,
      title: 'Crop Recommendations',
      description: 'Get AI-powered suggestions for optimal crops based on your soil type and local climate conditions.',
    },
    {
      icon: TrendingUp,
      title: 'Yield Prediction',
      description: 'Predictive analytics to estimate crop yields based on historical data and current conditions.',
    },
    {
      icon: CloudRain,
      title: 'Weather Alerts',
      description: 'Timely notifications for extreme weather events so you can take preventive measures.',
    },
    {
      icon: Users,
      title: 'Farmer Community',
      description: 'Connect with other farmers in your region to share insights and best practices.',
    },
    {
      icon: MapPin,
      title: 'Localized Insights',
      description: 'Region-specific recommendations tailored to your exact location and farming conditions.',
    },
  ];

  return (
    <section id="features" className="py-24 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-secondary/50 to-transparent" />
      </div>

      <div className="container-wide">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Smart Solutions for Climate Challenges
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform provides AI-driven tools specifically designed to help small and
            marginal farmers navigate the complexities of changing climate patterns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              className=""
            />
          ))}
        </div>
      </div>
    </section>
  );
}
