
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
import { Droplet, Save, BookOpen } from 'lucide-react';
import { ChartContainer } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SoilDataFormValues {
  location: string;
  date: string;
  phLevel: string;
  nitrogenContent: string;
  phosphorusContent: string;
  potassiumContent: string;
  organicMatter: string;
  soilType: string;
  notes: string;
}

export default function SoilDataForm() {
  const [soilHistoryData, setSoilHistoryData] = useState([
    { name: 'Field A', ph: 6.5, nitrogen: 56, phosphorus: 38, potassium: 42 },
    { name: 'Field B', ph: 7.2, nitrogen: 45, phosphorus: 52, potassium: 38 },
    { name: 'Field C', ph: 5.8, nitrogen: 65, phosphorus: 32, potassium: 55 },
  ]);

  const form = useForm<SoilDataFormValues>({
    defaultValues: {
      location: '',
      date: new Date().toISOString().split('T')[0],
      phLevel: '',
      nitrogenContent: '',
      phosphorusContent: '',
      potassiumContent: '',
      organicMatter: '',
      soilType: '',
      notes: ''
    }
  });

  const onSubmit = (data: SoilDataFormValues) => {
    console.log('Soil data submitted:', data);
    // Here you would typically send this data to your backend
    
    // Add to visualized data (for demo purposes)
    setSoilHistoryData([
      ...soilHistoryData,
      { 
        name: data.location, 
        ph: parseFloat(data.phLevel), 
        nitrogen: parseFloat(data.nitrogenContent), 
        phosphorus: parseFloat(data.phosphorusContent), 
        potassium: parseFloat(data.potassiumContent) 
      }
    ]);
    
    form.reset({
      location: '',
      date: new Date().toISOString().split('T')[0],
      phLevel: '',
      nitrogenContent: '',
      phosphorusContent: '',
      potassiumContent: '',
      organicMatter: '',
      soilType: '',
      notes: ''
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
              <Droplet size={16} />
            </div>
            <CardTitle>Soil Composition Data</CardTitle>
          </div>
          <CardDescription>
            Record detailed information about your soil's composition
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Field Location</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., North Field" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sample Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="phLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>pH Level (0-14)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.1" min="0" max="14" placeholder="e.g., 6.5" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="soilType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Soil Type</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Clay, Sandy, Loam" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="nitrogenContent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nitrogen (ppm)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 42" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phosphorusContent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phosphorus (ppm)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 35" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="potassiumContent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Potassium (ppm)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 28" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="organicMatter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organic Matter (%)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" min="0" max="100" placeholder="e.g., 3.5" {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Notes</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Any observations or additional information..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full">
                <Save size={16} className="mr-2" />
                Save Soil Data
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
              <BookOpen size={16} />
            </div>
            <CardTitle>Soil History</CardTitle>
          </div>
          <CardDescription>
            View historical soil composition data across your fields
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ChartContainer 
              config={{ 
                ph: { color: '#3b82f6' },
                nitrogen: { color: '#10b981' },
                phosphorus: { color: '#f59e0b' },
                potassium: { color: '#ef4444' }
              }}
            >
              <BarChart data={soilHistoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="ph" name="pH Level" fill="var(--color-ph)" />
                <Bar dataKey="nitrogen" name="Nitrogen" fill="var(--color-nitrogen)" />
                <Bar dataKey="phosphorus" name="Phosphorus" fill="var(--color-phosphorus)" />
                <Bar dataKey="potassium" name="Potassium" fill="var(--color-potassium)" />
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
