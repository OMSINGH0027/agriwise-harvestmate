
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
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { ChartContainer } from '@/components/ui/chart';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Droplet, 
  Thermometer, 
  Wind, 
  Sprout, 
  BarChart2, 
  FileText, 
  Plus,
  Save,
  Database
} from 'lucide-react';
import SoilDataForm from '@/components/ui/data/SoilDataForm';
import ClimateDataForm from '@/components/ui/data/ClimateDataForm';
import YieldDataForm from '@/components/ui/data/YieldDataForm';
import MarketDataForm from '@/components/ui/data/MarketDataForm';

export default function DataCollection() {
  const [activeTab, setActiveTab] = useState('soil');
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20 pb-12">
        <div className="container-wide">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Data Collection</h1>
              <p className="text-muted-foreground mt-1">
                Record and analyze your farm's data to make informed decisions
              </p>
            </div>
            <Button className="gap-1">
              <Database size={16} />
              <span>Export Data</span>
            </Button>
          </div>
          
          {/* Data Collection Tabs */}
          <Tabs defaultValue="soil" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
              <TabsTrigger value="soil" className="gap-2">
                <Droplet size={16} />
                <span>Soil Data</span>
              </TabsTrigger>
              <TabsTrigger value="climate" className="gap-2">
                <Thermometer size={16} />
                <span>Climate Data</span>
              </TabsTrigger>
              <TabsTrigger value="yield" className="gap-2">
                <Sprout size={16} />
                <span>Yield Data</span>
              </TabsTrigger>
              <TabsTrigger value="market" className="gap-2">
                <BarChart2 size={16} />
                <span>Market Trends</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="soil" className="space-y-6">
              <SoilDataForm />
            </TabsContent>
            
            <TabsContent value="climate" className="space-y-6">
              <ClimateDataForm />
            </TabsContent>
            
            <TabsContent value="yield" className="space-y-6">
              <YieldDataForm />
            </TabsContent>
            
            <TabsContent value="market" className="space-y-6">
              <MarketDataForm />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
