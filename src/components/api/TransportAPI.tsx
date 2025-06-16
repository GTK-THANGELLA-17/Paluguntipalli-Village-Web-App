
import { useState, useEffect } from 'react';
import { Bus, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface BusSchedule {
  route: string;
  departure: string;
  arrival: string;
  status: 'On Time' | 'Delayed' | 'Cancelled';
}

const TransportAPI = () => {
  const [buses, setBuses] = useState<BusSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransport = async () => {
      try {
        // Simulating transport API with local bus data
        const currentTime = new Date();
        const sampleBuses = [
          {
            route: "Paluguntipalli - Prakasam",
            departure: "08:30 AM",
            arrival: "10:15 AM",
            status: 'On Time' as const
          },
          {
            route: "Paluguntipalli - Guntur",
            departure: "09:45 AM",
            arrival: "12:30 PM",
            status: 'On Time' as const
          },
          {
            route: "Paluguntipalli - Vijayawada",
            departure: "06:15 AM",
            arrival: "09:45 AM",
            status: 'Delayed' as const
          },
          {
            route: "Local Village Route",
            departure: "Every 30 min",
            arrival: "Circular",
            status: 'On Time' as const
          }
        ];
        
        setBuses(sampleBuses);
        
      } catch (err) {
        console.error("Error fetching transport data:", err);
        setError("Unable to fetch transport schedules");
      } finally {
        setLoading(false);
      }
    };

    fetchTransport();
    // Update every 15 minutes
    const interval = setInterval(fetchTransport, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="animate-pulse bg-gray-200 h-48 rounded-lg"></div>;

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Bus className="mr-2 text-blue-600" size={20} />
          Bus Schedules
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {buses.map((bus, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-3 py-2">
              <h4 className="font-medium text-sm">{bus.route}</h4>
              <div className="flex justify-between items-center mt-1">
                <div className="flex items-center text-xs text-gray-600">
                  <Clock size={12} className="mr-1" />
                  {bus.departure} → {bus.arrival}
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  bus.status === 'On Time' ? 'bg-green-100 text-green-800' :
                  bus.status === 'Delayed' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {bus.status}
                </span>
              </div>
            </div>
          ))}
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </CardContent>
    </Card>
  );
};

export default TransportAPI;
