
import { useState, useEffect } from 'react';
import { GraduationCap, Calendar, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface SchoolUpdate {
  type: 'holiday' | 'exam' | 'event' | 'notice';
  title: string;
  date: string;
  description: string;
}

const SchoolAPI = () => {
  const [updates, setUpdates] = useState<SchoolUpdate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchoolUpdates = async () => {
      try {
        // Simulating school updates API
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const sampleUpdates = [
          {
            type: 'notice' as const,
            title: "Parent-Teacher Meeting",
            date: tomorrow.toLocaleDateString(),
            description: "Monthly PTM scheduled for all classes"
          },
          {
            type: 'holiday' as const,
            title: "Republic Day Holiday",
            date: "26/01/2025",
            description: "School will remain closed"
          },
          {
            type: 'exam' as const,
            title: "Annual Examinations",
            date: "15/02/2025",
            description: "Final exams start for classes 1-10"
          },
          {
            type: 'event' as const,
            title: "Science Exhibition",
            date: "05/02/2025",
            description: "Students showcase science projects"
          }
        ];
        
        setUpdates(sampleUpdates);
        
      } catch (err) {
        console.error("Error fetching school updates:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchoolUpdates();
    const interval = setInterval(fetchSchoolUpdates, 24 * 60 * 60 * 1000); // Daily
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-48 rounded-lg"></div>;

  const getTypeIcon = (type: SchoolUpdate['type']) => {
    switch (type) {
      case 'holiday': return '🏖️';
      case 'exam': return '📝';
      case 'event': return '🎉';
      case 'notice': return '📢';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center text-lg text-gray-900 dark:text-white">
          <GraduationCap className="mr-2 text-blue-600" size={20} />
          School Updates
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
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <Calendar size={12} className="mr-1" />
                  {update.date}
                </div>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300">{update.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SchoolAPI;
