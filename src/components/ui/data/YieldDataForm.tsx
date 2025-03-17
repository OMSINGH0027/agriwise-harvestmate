
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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Sprout, Save, TrendingUp } from 'lucide-react';

interface YieldDataFormValues {
  cropType: string;
  harvestDate: string;
  fieldLocation: string;
  areaHarvested: string;
  totalYield: string;
  yieldPerAcre: string;
  qualityGrade: string;
  notes: string;
}

export default function YieldDataForm() {
  const [yieldHistoryData, setYieldHistoryData] = useState([
    { name: 'Rice', current: 4.2, previous: 3.8 },
    { name: 'Wheat', current: 3.5, previous: 3.2 },
    { name: 'Maize', current: 5.1, previous: 4.8 },
    { name: 'Vegetables', current: 18.5, previous: 16.2 },
    { name: 'Cotton', current: 2.8, previous: 2.5 },
  ]);

  const form = useForm<YieldDataFormValues>({
    defaultValues: {
      cropType: '',
      harvestDate: '',
      fieldLocation: '',
      areaHarvested: '',
      totalYield: '',
      yieldPerAcre: '',
      qualityGrade: '',
      notes: ''
    }
  });

  const onSubmit = (data: YieldDataFormValues) => {
    console.log('Yield data submitted:', data);
    // Here you would typically send this data to your backend
    
    // Update the chart data for demonstration
    const existingCropIndex = yieldHistoryData.findIndex(crop => crop.name.toLowerCase() === data.cropType.toLowerCase());
    
    if (existingCropIndex >= 0) {
      const updatedData = [...yieldHistoryData];
      updatedData[existingCropIndex] = {
        ...updatedData[existingCropIndex],
        previous: updatedData[existingCropIndex].current,
        current: parseFloat(data.yieldPerAcre)
      };
      setYieldHistoryData(updatedData);
    } else {
      setYieldHistoryData([
        ...yieldHistoryData,
        {
          name: data.cropType,
          current: parseFloat(data.yieldPerAcre),
          previous: 0
        }
      ]);
    }
    
    form.reset();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-nature-100 flex items-center justify-center text-nature-700">
              <Sprout size={16} />
            </div>
            <CardTitle>Crop Yield Data</CardTitle>
          </div>
          <CardDescription>
            Record your harvest results and track productivity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="cropType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Crop Type</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Rice, Wheat, Maize" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="harvestDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Harvest Date</FormLabel>
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
                  name="fieldLocation"
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
                  name="areaHarvested"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Area Harvested (acres)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" min="0" placeholder="e.g., 5.5" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="totalYield"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Yield (kg)</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" placeholder="e.g., 4500" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="yieldPerAcre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Yield Per Acre (tonnes)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" min="0" placeholder="e.g., 3.5" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="qualityGrade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quality Grade</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., A, B, Premium" {...field} required />
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
                    <FormLabel>Harvest Notes</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Any observations about the harvest..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full">
                <Save size={16} className="mr-2" />
                Save Yield Data
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-nature-100 flex items-center justify-center text-nature-700">
              <TrendingUp size={16} />
            </div>
            <CardTitle>Yield Comparison</CardTitle>
          </div>
          <CardDescription>
            Compare current yields with previous season
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ChartContainer 
              config={{ 
                current: { color: '#10b981' },
                previous: { color: '#9ca3af' }
              }}
            >
              <BarChart data={yieldHistoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'Tonnes per Acre', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="previous" name="Previous Season" fill="var(--color-previous)" />
                <Bar dataKey="current" name="Current Season" fill="var(--color-current)" />
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
