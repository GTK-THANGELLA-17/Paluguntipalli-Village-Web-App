import { useEffect, useState } from 'react';
import { DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface ExchangeRates {
  USD: string;
  EUR: string;
  GBP: string;
  lastUpdated: string;
}

const fallbackRates = (): ExchangeRates => ({
  USD: '83.25',
  EUR: '89.50',
  GBP: '104.75',
  lastUpdated: new Date().toLocaleTimeString()
});

const CurrencyAPI = () => {
  const [rates, setRates] = useState<ExchangeRates | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/INR');
        if (!response.ok) throw new Error('Currency data not available');

        const data = await response.json();
        setRates({
          USD: (1 / data.rates.USD).toFixed(2),
          EUR: (1 / data.rates.EUR).toFixed(2),
          GBP: (1 / data.rates.GBP).toFixed(2),
          lastUpdated: new Date().toLocaleTimeString()
        });
        setError(null);
      } catch {
        setError('Showing fallback currency reference');
        setRates(fallbackRates());
      } finally {
        setLoading(false);
      }
    };

    fetchCurrency();
    const interval = window.setInterval(fetchCurrency, 30 * 60 * 1000);
    return () => window.clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="h-48 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />;
  }

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
              {(['USD', 'EUR', 'GBP'] as const).map(currency => (
                <div key={currency} className="flex items-center justify-between rounded bg-gray-50 p-2 dark:bg-gray-700">
                  <span className="font-medium text-gray-900 dark:text-white">{currency}</span>
                  <span className="text-lg text-gray-900 dark:text-white">INR {rates[currency]}</span>
                </div>
              ))}
              <p className="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">
                Last updated: {rates.lastUpdated}
              </p>
            </>
          )}
        </div>
        {error && <p className="mt-2 text-sm text-amber-600 dark:text-amber-300">{error}</p>}
      </CardContent>
    </Card>
  );
};

export default CurrencyAPI;
