
import { useState, useEffect } from 'react';
import { Heart, Calendar, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface HealthUpdate {
  type: 'vaccination' | 'camp' | 'emergency' | 'awareness';
  title: string;
  date: string;
  location: string;
  time: string;
}

const HealthAPI = () => {
  const [updates, setUpdates] = useState<HealthUpdate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHealthUpdates = async () => {
      try {
        const sampleUpdates = [
          {
            type: 'vaccination' as const,
            title: "Child Immunization Drive",
            date: "Tomorrow",
            location: "Primary Health Center",
            time: "9:00 AM - 4:00 PM"
          },
          {
            type: 'camp' as const,
            title: "Free Health Checkup Camp",
            date: "This Weekend",
            location: "Community Hall",
            time: "8:00 AM - 2:00 PM"
          },
          {
            type: 'awareness' as const,
            title: "Diabetes Awareness Program",
            date: "Next Week",
            location: "Village Square",
            time: "5:00 PM - 7:00 PM"
          }
        ];
        
        setUpdates(sampleUpdates);
        
      } catch (err) {
        console.error("Error fetching health updates:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHealthUpdates();
    const interval = setInterval(fetchHealthUpdates, 12 * 60 * 60 * 1000); // Twice daily
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-48 rounded-lg"></div>;

  const getTypeIcon = (type: HealthUpdate['type']) => {
    switch (type) {
      case 'vaccination': return '💉';
      case 'camp': return '🏥';
      case 'emergency': return '🚨';
      case 'awareness': return '📋';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center text-lg text-gray-900 dark:text-white">
          <Heart className="mr-2 text-red-600" size={20} />
          Health Updates
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {updates.map((update, index) => (
            <div key={index} className="p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center">
                  <span className="mr-2">{getTypeIcon(update.type)}</span>
                  <h4 className="font-medium text-sm text-gray-900 dark:text-white">{update.title}</h4>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center text-xs text-gray-600 dark:text-gray-300">
                  <Calendar size={12} className="mr-1" />
                  {update.date} • {update.time}
                </div>
                <div className="flex items-center text-xs text-gray-600 dark:text-gray-300">
                  <MapPin size={12} className="mr-1" />
                  {update.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthAPI;
