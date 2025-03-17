
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Thermometer, Cloud, Droplet, Wind, Save, BarChart2 } from 'lucide-react';

interface ClimateDataFormValues {
  date: string;
  location: string;
  temperature: string;
  rainfall: string;
  humidity: string;
  windSpeed: string;
  notes: string;
}

export default function ClimateDataForm() {
  const [climateHistoryData, setClimateHistoryData] = useState([
    { name: 'Jan', temperature: 22, rainfall: 65, humidity: 75, windSpeed: 8 },
    { name: 'Feb', temperature: 24, rainfall: 45, humidity: 72, windSpeed: 10 },
    { name: 'Mar', temperature: 27, rainfall: 35, humidity: 68, windSpeed: 12 },
    { name: 'Apr', temperature: 29, rainfall: 20, humidity: 65, windSpeed: 14 },
    { name: 'May', temperature: 32, rainfall: 15, humidity: 60, windSpeed: 15 },
    { name: 'Jun', temperature: 30, rainfall: 30, humidity: 70, windSpeed: 11 },
  ]);

  const form = useForm<ClimateDataFormValues>({
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      location: '',
      temperature: '',
      rainfall: '',
      humidity: '',
      windSpeed: '',
      notes: ''
    }
  });

  const onSubmit = (data: ClimateDataFormValues) => {
    console.log('Climate data submitted:', data);
    // Here you would typically send this data to your backend
    
    // Add to visualized data (for demo purposes)
    const month = new Date(data.date).toLocaleString('default', { month: 'short' });
    setClimateHistoryData([
      ...climateHistoryData,
      { 
        name: month, 
        temperature: parseFloat(data.temperature), 
        rainfall: parseFloat(data.rainfall), 
        humidity: parseFloat(data.humidity), 
        windSpeed: parseFloat(data.windSpeed) 
      }
    ]);
    
    form.reset({
      date: new Date().toISOString().split('T')[0],
      location: '',
      temperature: '',
      rainfall: '',
      humidity: '',
      windSpeed: '',
      notes: ''
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-700">
              <Thermometer size={16} />
            </div>
            <CardTitle>Climate Data</CardTitle>
          </div>
          <CardDescription>
            Record temperature, rainfall, humidity and wind data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Field Station 1" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="temperature"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <span className="flex items-center gap-1">
                          <Thermometer size={14} />
                          Temperature (°C)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input type="number" step="0.1" placeholder="e.g., 28.5" {...field} required />
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
                      <FormLabel>
                        <span className="flex items-center gap-1">
                          <Cloud size={14} />
                          Rainfall (mm)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input type="number" step="0.1" placeholder="e.g., 42.5" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="humidity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <span className="flex items-center gap-1">
                          <Droplet size={14} />
                          Humidity (%)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input type="number" min="0" max="100" placeholder="e.g., 65" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="windSpeed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <span className="flex items-center gap-1">
                          <Wind size={14} />
                          Wind Speed (km/h)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input type="number" step="0.1" placeholder="e.g., 12.5" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weather Notes</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Any additional weather observations..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full">
                <Save size={16} className="mr-2" />
                Save Climate Data
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-700">
              <BarChart2 size={16} />
            </div>
            <CardTitle>Climate Trends</CardTitle>
          </div>
          <CardDescription>
            View historical climate data and identify patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ChartContainer 
              config={{ 
                temperature: { color: '#ef4444' },
                rainfall: { color: '#3b82f6' },
                humidity: { color: '#8b5cf6' },
                windSpeed: { color: '#10b981' }
              }}
            >
              <LineChart data={climateHistoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="temperature" name="Temperature (°C)" stroke="var(--color-temperature)" activeDot={{ r: 8 }} />
                <Line yAxisId="right" type="monotone" dataKey="rainfall" name="Rainfall (mm)" stroke="var(--color-rainfall)" />
                <Line yAxisId="left" type="monotone" dataKey="humidity" name="Humidity (%)" stroke="var(--color-humidity)" />
                <Line yAxisId="left" type="monotone" dataKey="windSpeed" name="Wind Speed (km/h)" stroke="var(--color-windSpeed)" />
              </LineChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
