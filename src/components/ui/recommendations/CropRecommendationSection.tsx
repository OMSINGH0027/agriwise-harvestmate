
import { Link } from 'react-router-dom';
import { Sprout } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function CropRecommendationSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-transparent to-secondary/20">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Smart Crop Recommendations
            </h2>
            <p className="text-muted-foreground text-lg">
              Our AI-powered system analyzes your soil composition, climate data, and regional factors
              to provide personalized crop recommendations that maximize your yield potential.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/crop-recommendation">
                <Button size="lg" className="rounded-lg">
                  Get Recommendations
                </Button>
              </Link>
              <Link to="/data-collection">
                <Button variant="outline" size="lg" className="rounded-lg">
                  Input Your Data
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Card className="w-full max-w-md shadow-lg border-border/50 overflow-hidden">
              <div className="p-6 bg-secondary/30">
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <Sprout size={28} />
                </div>
                <h3 className="text-2xl font-semibold mb-2">Crop Recommendations</h3>
                <p className="text-muted-foreground">
                  Get AI-powered suggestions for optimal crops based on your soil type and local climate conditions.
                </p>
              </div>
              <CardContent className="p-6 bg-card">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-sm">Soil composition and pH analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-sm">Temperature and rainfall patterns</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-sm">Region-specific crop varieties</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-sm">Market demand analysis</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
