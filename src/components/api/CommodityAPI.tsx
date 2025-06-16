
import { useState, useEffect } from 'react';
import { Wheat, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface CommodityPrice {
  name: string;
  price: number;
  unit: string;
  change: number;
}

const CommodityAPI = () => {
  const [commodities, setCommodities] = useState<CommodityPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCommodities = async () => {
      try {
        // Simulating API call with sample agricultural commodity data
        // In real implementation, you would use actual commodity price APIs
        const sampleData = [
          { name: "Rice", price: 2800, unit: "₹/quintal", change: 2.5 },
          { name: "Wheat", price: 2200, unit: "₹/quintal", change: -1.2 },
          { name: "Tomato", price: 45, unit: "₹/kg", change: 8.5 },
          { name: "Onion", price: 35, unit: "₹/kg", change: -3.1 },
          { name: "Milk", price: 55, unit: "₹/litre", change: 1.8 }
        ];
        
        setCommodities(sampleData);
        
      } catch (err) {
        console.error("Error fetching commodity data:", err);
        setError("Unable to fetch commodity prices");
      } finally {
        setLoading(false);
      }
    };

    fetchCommodities();
    // Update every hour
    const interval = setInterval(fetchCommodities, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="animate-pulse bg-gray-200 h-48 rounded-lg"></div>;

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Wheat className="mr-2 text-yellow-600" size={20} />
          Market Prices
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {commodities.map((item, index) => (
            <div key={index} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
              <div>
                <span className="font-medium text-sm">{item.name}</span>
                <p className="text-xs text-gray-600">{item.unit}</p>
              </div>
              <div className="text-right">
                <span className="font-bold">{item.price}</span>
                <div className="flex items-center text-xs">
                  {item.change > 0 ? (
                    <TrendingUp className="text-green-600 mr-1" size={12} />
                  ) : (
                    <TrendingDown className="text-red-600 mr-1" size={12} />
                  )}
                  <span className={item.change > 0 ? "text-green-600" : "text-red-600"}>
                    {item.change > 0 ? "+" : ""}{item.change}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </CardContent>
    </Card>
  );
};

export default CommodityAPI;
