
import { useState, useEffect } from 'react';
import { Building2, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface ServiceStatus {
  service: string;
  status: 'Active' | 'Maintenance' | 'Offline';
  location: string;
  hours: string;
}

const GovernmentAPI = () => {
  const [services, setServices] = useState<ServiceStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        // Simulating government services API (removed bus schedules)
        const sampleServices = [
          {
            service: "Village Secretary Office",
            status: 'Active' as const,
            location: "Main Village Center",
            hours: "9:00 AM - 5:00 PM"
          },
          {
            service: "Aadhaar Center",
            status: 'Active' as const,
            location: "Near Post Office",
            hours: "10:00 AM - 4:00 PM"
          },
          {
            service: "Bank ATM",
            status: 'Maintenance' as const,
            location: "Village Square",
            hours: "24/7 (when active)"
          },
          {
            service: "Post Office",
            status: 'Active' as const,
            location: "Central Road",
            hours: "10:00 AM - 4:00 PM"
          },
          {
            service: "Primary Health Center",
            status: 'Active' as const,
            location: "Health Complex",
            hours: "8:00 AM - 6:00 PM"
          }
        ];
        
        setServices(sampleServices);
        
      } catch (err) {
        console.error("Error fetching government services:", err);
        setError("Unable to fetch service status");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
    // Update every 30 minutes
    const interval = setInterval(fetchServices, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-48 rounded-lg"></div>;

  const getStatusIcon = (status: ServiceStatus['status']) => {
    switch (status) {
      case 'Active':
        return <CheckCircle className="text-green-600" size={16} />;
      case 'Maintenance':
        return <Clock className="text-yellow-600" size={16} />;
      case 'Offline':
        return <XCircle className="text-red-600" size={16} />;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center text-lg text-gray-900 dark:text-white">
          <Building2 className="mr-2 text-purple-600" size={20} />
          Public Services
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {services.map((service, index) => (
            <div key={index} className="p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-sm text-gray-900 dark:text-white">{service.service}</h4>
                <div className="flex items-center">
                  {getStatusIcon(service.status)}
                  <span className="ml-1 text-xs text-gray-900 dark:text-white">{service.status}</span>
                </div>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">{service.location}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{service.hours}</p>
            </div>
          ))}
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </CardContent>
    </Card>
  );
};

export default GovernmentAPI;
