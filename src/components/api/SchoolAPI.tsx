import { useState, useEffect } from 'react';
import { GraduationCap, Calendar } from 'lucide-react';
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
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const sampleUpdates: SchoolUpdate[] = [
        {
          type: 'notice',
          title: 'School Notice Board',
          date: today.toLocaleDateString(),
          description: 'Local school updates are shown here when available.'
        },
        {
          type: 'holiday',
          title: 'Festival Period Advisory',
          date: '25/06/2026 - 26/06/2026',
          description: 'Families should check with the school for festival-period class timings.'
        },
        {
          type: 'event',
          title: 'Community Learning Activities',
          date: tomorrow.toLocaleDateString(),
          description: 'Students are encouraged to participate in safe community and cultural learning activities.'
        }
      ];

      setUpdates(sampleUpdates);
      setLoading(false);
    };

    fetchSchoolUpdates();
    const interval = setInterval(fetchSchoolUpdates, 24 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-48 rounded-lg" />;

  const getTypeIcon = (type: SchoolUpdate['type']) => {
    switch (type) {
      case 'holiday': return 'Holiday';
      case 'exam': return 'Exam';
      case 'event': return 'Event';
      case 'notice': return 'Notice';
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
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-blue-50 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                    {getTypeIcon(update.type)}
                  </span>
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