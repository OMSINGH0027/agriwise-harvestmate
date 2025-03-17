import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ClimateInsight from '@/components/ui/climate/ClimateInsight';
import WeatherCard from '@/components/ui/weather/WeatherCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, RefreshCw, Bell, Settings, Sprout, Calendar, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const insights = [
    { title: 'Current Temperature', value: '28°C', change: 2.3, type: 'temperature' as const },
    { title: 'Rainfall (Monthly)', value: '42mm', change: -15, type: 'rainfall' as const },
    { title: 'Wind Speed', value: '12km/h', change: 5, type: 'wind' as const },
    { title: 'Humidity', value: '65%', change: 8, type: 'humidity' as const },
  ];

  const weatherForecast = [
    { day: 'Today', condition: 'partly-cloudy', temperature: 28, precipitation: 20 },
    { day: 'Tomorrow', condition: 'sunny', temperature: 32, precipitation: 5 },
    { day: 'Wed', condition: 'rainy', temperature: 26, precipitation: 70 },
    { day: 'Thu', condition: 'cloudy', temperature: 27, precipitation: 35 },
    { day: 'Fri', condition: 'stormy', temperature: 25, precipitation: 85 },
  ] as const;

  const recommendedCrops = [
    { name: 'Rice', suitability: 'High', notes: 'Current conditions are ideal' },
    { name: 'Maize', suitability: 'Medium', notes: 'Consider drought-resistant varieties' },
    { name: 'Vegetables', suitability: 'High', notes: 'Good for short-term cultivation' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20 pb-12">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Farm Dashboard</h1>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <MapPin size={14} />
                <span>Farmville District, CA</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="gap-1">
                <RefreshCw size={14} />
                <span>Refresh</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Bell size={16} />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Settings size={16} />
              </Button>
            </div>
          </div>

          {isLoading && (
            <div className="w-full py-24 flex justify-center items-center">
              <div className="flex flex-col items-center gap-3 animate-pulse">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <RefreshCw size={24} className="text-primary animate-spin" />
                </div>
                <p className="text-muted-foreground">Loading your farm insights...</p>
              </div>
            </div>
          )}

          {!isLoading && (
            <div className="space-y-8">
              <section className={`transition-all duration-500 ${
                isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
              }`}>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <span>Climate Insights</span>
                  <span className="text-xs py-0.5 px-2 rounded-full bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300">
                    Updated Today
                  </span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {insights.map((insight, index) => (
                    <ClimateInsight
                      key={index}
                      title={insight.title}
                      value={insight.value}
                      change={insight.change}
                      type={insight.type}
                      className=""
                    />
                  ))}
                </div>
              </section>

              <section className={`transition-all duration-500 delay-100 ${
                isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
              }`}>
                <h2 className="text-xl font-semibold mb-4">Weather Forecast</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {weatherForecast.map((day, index) => (
                    <WeatherCard
                      key={index}
                      day={day.day}
                      condition={day.condition}
                      temperature={day.temperature}
                      precipitation={day.precipitation}
                      className=""
                    />
                  ))}
                </div>
              </section>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <section className={`transition-all duration-500 delay-200 ${
                  isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
                }`}>
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-nature-100 flex items-center justify-center text-nature-700">
                            <Sprout size={16} />
                          </div>
                          <CardTitle>Crop Recommendations</CardTitle>
                        </div>
                      </div>
                      <CardDescription>
                        Based on current climate conditions and soil analysis
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recommendedCrops.map((crop, index) => (
                          <div key={index} className="flex items-center gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                            <div className="w-10 h-10 rounded-full bg-nature-100 flex items-center justify-center text-nature-700">
                              <Sprout size={18} />
                            </div>
                            <div className="flex-grow">
                              <div className="flex items-center justify-between">
                                <div className="font-medium">{crop.name}</div>
                                <div className={`text-xs py-0.5 px-2 rounded-full ${
                                  crop.suitability === 'High' 
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                    : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                                }`}>
                                  {crop.suitability} Suitability
                                </div>
                              </div>
                              <div className="text-sm text-muted-foreground mt-1">{crop.notes}</div>
                            </div>
                          </div>
                        ))}
                        
                        <Button variant="outline" className="w-full mt-2">
                          View All Recommendations
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </section>

                <section className={`transition-all duration-500 delay-300 ${
                  isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
                }`}>
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-700">
                            <Calendar size={16} />
                          </div>
                          <CardTitle>Upcoming Activities</CardTitle>
                        </div>
                      </div>
                      <CardDescription>
                        Recommended actions for the next 7 days
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 pb-3 border-b border-border">
                          <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-700">
                            <TrendingUp size={18} />
                          </div>
                          <div className="flex-grow">
                            <div className="flex items-center justify-between">
                              <div className="font-medium">Prepare for heavy rainfall</div>
                              <div className="text-xs py-0.5 px-2 rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                                High Priority
                              </div>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">Ensure proper drainage in fields</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 pb-3 border-b border-border">
                          <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-700">
                            <Calendar size={18} />
                          </div>
                          <div className="flex-grow">
                            <div className="flex items-center justify-between">
                              <div className="font-medium">Apply fertilizer</div>
                              <div className="text-xs py-0.5 px-2 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                                Medium Priority
                              </div>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">Best day is tomorrow before rainfall</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 pb-3 border-b border-border">
                          <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-700">
                            <Sprout size={18} />
                          </div>
                          <div className="flex-grow">
                            <div className="flex items-center justify-between">
                              <div className="font-medium">Check for pests</div>
                              <div className="text-xs py-0.5 px-2 rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                                Low Priority
                              </div>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">Humid conditions may increase pest activity</div>
                          </div>
                        </div>
                        
                        <Button variant="outline" className="w-full mt-2">
                          View All Activities
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </section>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
