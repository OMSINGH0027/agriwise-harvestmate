
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
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart2, Save, TrendingUp, ShoppingCart } from 'lucide-react';

interface MarketDataFormValues {
  cropType: string;
  marketDate: string;
  marketLocation: string;
  pricePerUnit: string;
  unit: string;
  demandLevel: string;
  supplyLevel: string;
  isFutures: boolean;
  futuresDate?: string;
  notes: string;
}

export default function MarketDataForm() {
  const [marketTrendData, setMarketTrendData] = useState([
    { month: 'Jan', rice: 15.2, wheat: 14.5, maize: 12.8, vegetables: 25.4 },
    { month: 'Feb', rice: 15.8, wheat: 14.2, maize: 12.5, vegetables: 24.8 },
    { month: 'Mar', rice: 16.3, wheat: 14.8, maize: 13.2, vegetables: 26.1 },
    { month: 'Apr', rice: 16.7, wheat: 15.3, maize: 13.8, vegetables: 27.5 },
    { month: 'May', rice: 16.5, wheat: 15.1, maize: 14.2, vegetables: 28.2 },
    { month: 'Jun', rice: 16.2, wheat: 14.7, maize: 13.9, vegetables: 27.8 },
  ]);

  const form = useForm<MarketDataFormValues>({
    defaultValues: {
      cropType: '',
      marketDate: new Date().toISOString().split('T')[0],
      marketLocation: '',
      pricePerUnit: '',
      unit: '',
      demandLevel: '',
      supplyLevel: '',
      isFutures: false,
      futuresDate: '',
      notes: ''
    }
  });

  const watchIsFutures = form.watch('isFutures');

  const onSubmit = (data: MarketDataFormValues) => {
    console.log('Market data submitted:', data);
    // Here you would typically send this data to your backend
    
    // Update chart data (for demonstration purposes)
    if (['rice', 'wheat', 'maize', 'vegetables'].includes(data.cropType.toLowerCase())) {
      const cropName = data.cropType.toLowerCase();
      const month = new Date(data.marketDate).toLocaleString('default', { month: 'short' });
      
      // Check if the month exists in data
      const monthIndex = marketTrendData.findIndex(item => item.month === month);
      
      if (monthIndex >= 0) {
        // Update existing month data
        const updatedData = [...marketTrendData];
        updatedData[monthIndex] = {
          ...updatedData[monthIndex],
          [cropName]: parseFloat(data.pricePerUnit)
        };
        setMarketTrendData(updatedData);
      } else {
        // Add new month data
        const newMonthData: any = { month };
        newMonthData[cropName] = parseFloat(data.pricePerUnit);
        setMarketTrendData([...marketTrendData, newMonthData]);
      }
    }
    
    form.reset({
      cropType: '',
      marketDate: new Date().toISOString().split('T')[0],
      marketLocation: '',
      pricePerUnit: '',
      unit: '',
      demandLevel: '',
      supplyLevel: '',
      isFutures: false,
      futuresDate: '',
      notes: ''
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
              <ShoppingCart size={16} />
            </div>
            <CardTitle>Market Price Data</CardTitle>
          </div>
          <CardDescription>
            Record market prices and demand trends for your crops
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
                  name="marketDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Market Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="marketLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Market Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Central Market, District Market" {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="pricePerUnit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price per Unit</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" min="0" placeholder="e.g., 15.50" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="unit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., kg, tonne, quintal" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="demandLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Demand Level</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., High, Medium, Low" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="supplyLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Supply Level</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., High, Medium, Low" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="isFutures"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4">
                      <FormControl>
                        <Checkbox 
                          checked={field.value} 
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Is this a futures contract?</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                
                {watchIsFutures && (
                  <FormField
                    control={form.control}
                    name="futuresDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Futures Contract Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} required={watchIsFutures} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
              
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Market Notes</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Any observations about market conditions..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full">
                <Save size={16} className="mr-2" />
                Save Market Data
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
              <TrendingUp size={16} />
            </div>
            <CardTitle>Price Trends</CardTitle>
          </div>
          <CardDescription>
            View historical price trends for major crops
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ChartContainer 
              config={{ 
                rice: { color: '#f59e0b' },
                wheat: { color: '#d97706' },
                maize: { color: '#fcd34d' },
                vegetables: { color: '#10b981' }
              }}
            >
              <LineChart data={marketTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis label={{ value: 'Price per Kg ($)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="rice" name="Rice" stroke="var(--color-rice)" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="wheat" name="Wheat" stroke="var(--color-wheat)" />
                <Line type="monotone" dataKey="maize" name="Maize" stroke="var(--color-maize)" />
                <Line type="monotone" dataKey="vegetables" name="Vegetables" stroke="var(--color-vegetables)" />
              </LineChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
