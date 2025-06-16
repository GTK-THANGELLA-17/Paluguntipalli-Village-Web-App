
import { useState, useEffect } from 'react';
import { TrendingUp, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface ExchangeRates {
  USD: number;
  EUR: number;
  GBP: number;
  lastUpdated: string;
}

const CurrencyAPI = () => {
  const [rates, setRates] = useState<ExchangeRates | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        // Using a free currency API
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/INR');
        
        if (!response.ok) throw new Error("Currency data not available");
        
        const data = await response.json();
        setRates({
          USD: (1 / data.rates.USD).toFixed(2) as any,
          EUR: (1 / data.rates.EUR).toFixed(2) as any,
          GBP: (1 / data.rates.GBP).toFixed(2) as any,
          lastUpdated: new Date().toLocaleTimeString()
        });
        
      } catch (err) {
        console.error("Error fetching currency:", err);
        setError("Unable to fetch currency data");
        
        // Fallback sample data
        setRates({
          USD: 83.25,
          EUR: 89.50,
          GBP: 104.75,
          lastUpdated: new Date().toLocaleTimeString()
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCurrency();
    // Update every 30 minutes
    const interval = setInterval(fetchCurrency, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-48 rounded-lg"></div>;

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center text-lg text-gray-900 dark:text-white">
          <DollarSign className="mr-2 text-green-600" size={20} />
          Exchange Rates (INR)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {rates && (
            <>
              <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                <span className="font-medium text-gray-900 dark:text-white">USD</span>
                <span className="text-lg text-gray-900 dark:text-white">₹{rates.USD}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                <span className="font-medium text-gray-900 dark:text-white">EUR</span>
                <span className="text-lg text-gray-900 dark:text-white">₹{rates.EUR}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                <span className="font-medium text-gray-900 dark:text-white">GBP</span>
                <span className="text-lg text-gray-900 dark:text-white">₹{rates.GBP}</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">
                Last updated: {rates.lastUpdated}
              </p>
            </>
          )}
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </CardContent>
    </Card>
  );
};

export default CurrencyAPI;
