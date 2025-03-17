
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { 
  Droplet, 
  Thermometer, 
  Sprout, 
  Leaf, 
  Search,
  TestTube
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { cropRecommendationDataset } from '@/data/crop-dataset';

interface RecommendationFormValues {
  soilPh: string;
  nitrogen: string;
  phosphorus: string;
  potassium: string;
  temperature: string;
  humidity: string;
  rainfall: string;
  region: string;
}

export default function CropRecommendation() {
  const [recommendedCrops, setRecommendedCrops] = useState<Array<{name: string; confidence: number; description: string}>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RecommendationFormValues>({
    defaultValues: {
      soilPh: "6.5",
      nitrogen: "50",
      phosphorus: "30",
      potassium: "40",
      temperature: "25",
      humidity: "60",
      rainfall: "120",
      region: "plains"
    }
  });

  const onSubmit = (data: RecommendationFormValues) => {
    setIsLoading(true);
    
    // Simulate processing time
    setTimeout(() => {
      // Convert string values to numbers
      const n = parseFloat(data.nitrogen);
      const p = parseFloat(data.phosphorus);
      const k = parseFloat(data.potassium);
      const ph = parseFloat(data.soilPh);
      const temp = parseFloat(data.temperature);
      const humidity = parseFloat(data.humidity);
      const rainfall = parseFloat(data.rainfall);
      
      // Simple recommendation algorithm based on our dataset
      const recommendations = recommendCrops(n, p, k, ph, temp, humidity, rainfall, data.region);
      
      setRecommendedCrops(recommendations);
      setIsLoading(false);
      
      toast({
        title: "Analysis Complete",
        description: "We've analyzed your farm conditions and found some crop recommendations.",
      });
    }, 1500);
  };

  // Simple recommendation algorithm
  const recommendCrops = (
    n: number, 
    p: number, 
    k: number, 
    ph: number, 
    temp: number, 
    humidity: number, 
    rainfall: number,
    region: string
  ) => {
    // Filter and score crops based on input parameters
    return cropRecommendationDataset
      .map(crop => {
        // Calculate a simple score based on how well the conditions match
        let score = 0;
        
        // pH match (0-20 points)
        if (ph >= crop.phMin && ph <= crop.phMax) {
          score += 20;
        } else {
          // Partial score for near matches
          const phDistance = Math.min(Math.abs(ph - crop.phMin), Math.abs(ph - crop.phMax));
          if (phDistance < 1) score += 15;
          else if (phDistance < 2) score += 10;
        }
        
        // NPK requirements (0-30 points)
        if (n >= crop.nitrogenMin && p >= crop.phosphorusMin && k >= crop.potassiumMin) {
          score += 30;
        } else {
          // Partial score for close NPK values
          const nScore = n >= crop.nitrogenMin ? 10 : (n >= crop.nitrogenMin * 0.7 ? 5 : 0);
          const pScore = p >= crop.phosphorusMin ? 10 : (p >= crop.phosphorusMin * 0.7 ? 5 : 0);
          const kScore = k >= crop.potassiumMin ? 10 : (k >= crop.potassiumMin * 0.7 ? 5 : 0);
          score += nScore + pScore + kScore;
        }
        
        // Temperature match (0-20 points)
        if (temp >= crop.tempMin && temp <= crop.tempMax) {
          score += 20;
        } else {
          // Partial score for near temperature
          const tempDistance = Math.min(Math.abs(temp - crop.tempMin), Math.abs(temp - crop.tempMax));
          if (tempDistance < 5) score += 10;
        }
        
        // Rainfall match (0-20 points)
        if (rainfall >= crop.rainfallMin && rainfall <= crop.rainfallMax) {
          score += 20;
        } else {
          // Partial score for near rainfall
          const rainDistance = Math.min(Math.abs(rainfall - crop.rainfallMin), Math.abs(rainfall - crop.rainfallMax));
          if (rainDistance < 20) score += 10;
        }
        
        // Humidity match (0-10 points)
        if (humidity >= crop.humidityMin && humidity <= crop.humidityMax) {
          score += 10;
        }
        
        // Region bonus (0 or 10 points)
        if (crop.regions.includes(region)) {
          score += 10;
        }
        
        // Convert score to percentage
        const confidence = Math.round(score) / 1.1; // Max score is 110
        
        return {
          name: crop.name,
          confidence: confidence > 100 ? 100 : confidence,
          description: crop.description
        };
      })
      .filter(crop => crop.confidence > 40) // Only recommend crops above 40% confidence
      .sort((a, b) => b.confidence - a.confidence) // Sort by confidence (highest first)
      .slice(0, 5); // Top 5 recommendations
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20 pb-12">
        <div className="container-wide">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Crop Recommendation</h1>
              <p className="text-muted-foreground mt-1">
                Get personalized crop suggestions based on your farm's conditions
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Input Form */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-nature-100 flex items-center justify-center text-nature-700">
                      <Leaf size={16} />
                    </div>
                    <CardTitle className="text-xl">Farm Conditions</CardTitle>
                  </div>
                  <CardDescription>
                    Enter your soil and climate details for personalized recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <div className="space-y-4">
                        <h3 className="font-medium flex items-center gap-2 text-sm">
                          <TestTube size={16} className="text-amber-600" />
                          Soil Properties
                        </h3>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="soilPh"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Soil pH</FormLabel>
                                <FormControl>
                                  <Input type="number" step="0.1" min="0" max="14" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="region"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Region Type</FormLabel>
                                <Select 
                                  onValueChange={field.onChange} 
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select region" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="plains">Plains</SelectItem>
                                    <SelectItem value="coastal">Coastal</SelectItem>
                                    <SelectItem value="hills">Hills/Mountain</SelectItem>
                                    <SelectItem value="delta">Delta</SelectItem>
                                    <SelectItem value="desert">Desert</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4">
                          <FormField
                            control={form.control}
                            name="nitrogen"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nitrogen (N)</FormLabel>
                                <FormControl>
                                  <Input type="number" min="0" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="phosphorus"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phosphorus (P)</FormLabel>
                                <FormControl>
                                  <Input type="number" min="0" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="potassium"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Potassium (K)</FormLabel>
                                <FormControl>
                                  <Input type="number" min="0" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <h3 className="font-medium flex items-center gap-2 text-sm mt-2">
                          <Thermometer size={16} className="text-red-600" />
                          Climate Conditions
                        </h3>
                        
                        <div className="grid grid-cols-1 gap-4">
                          <FormField
                            control={form.control}
                            name="temperature"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Temperature (°C)</FormLabel>
                                <FormControl>
                                  <Input type="number" min="-10" max="50" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="humidity"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Humidity (%)</FormLabel>
                                <FormControl>
                                  <Input type="number" min="0" max="100" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="rainfall"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Rainfall (mm/month)</FormLabel>
                                <FormControl>
                                  <Input type="number" min="0" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      
                      <Button type="submit" className="w-full gap-2" disabled={isLoading}>
                        {isLoading ? (
                          <>Loading...</>
                        ) : (
                          <>
                            <Search size={16} />
                            <span>Get Recommendations</span>
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
            
            {/* Results Section */}
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-nature-100 flex items-center justify-center text-nature-700">
                      <Sprout size={16} />
                    </div>
                    <CardTitle className="text-xl">Crop Recommendations</CardTitle>
                  </div>
                  <CardDescription>
                    Based on your farm's soil and climate conditions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="py-20 flex flex-col items-center justify-center text-center">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
                      </div>
                      <h3 className="text-lg font-medium">Analyzing your data...</h3>
                      <p className="text-muted-foreground mt-1">
                        We're finding the best crops for your conditions
                      </p>
                    </div>
                  ) : recommendedCrops.length > 0 ? (
                    <div className="space-y-6">
                      {recommendedCrops.map((crop, index) => (
                        <div 
                          key={index} 
                          className="flex flex-col md:flex-row gap-4 pb-6 border-b last:border-0 last:pb-0"
                        >
                          <div className="flex-shrink-0 w-full md:w-24 h-24 rounded-lg bg-nature-100 flex items-center justify-center text-nature-700">
                            <Sprout size={36} />
                          </div>
                          <div className="flex-grow">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                              <h3 className="text-xl font-semibold">{crop.name}</h3>
                              <div className="flex items-center gap-2">
                                <div className="h-2 w-24 bg-gray-200 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full rounded-full ${
                                      crop.confidence > 80 ? 'bg-green-500' : 
                                      crop.confidence > 60 ? 'bg-yellow-500' : 'bg-orange-400'
                                    }`}
                                    style={{ width: `${crop.confidence}%` }}
                                  />
                                </div>
                                <span className="text-sm font-medium">
                                  {Math.round(crop.confidence)}% match
                                </span>
                              </div>
                            </div>
                            <p className="text-muted-foreground">{crop.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-16 flex flex-col items-center justify-center text-center">
                      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                        <Sprout size={24} className="text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium">No recommendations yet</h3>
                      <p className="text-muted-foreground mt-1 max-w-md">
                        Enter your farm's soil and climate details to get personalized crop recommendations
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
