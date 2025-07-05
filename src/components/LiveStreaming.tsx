
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Play, Users, Calendar, Clock, ArrowLeft, Radio, Globe, Smartphone } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface LiveStreamingProps {
  onClose?: () => void;
}

const LiveStreaming: React.FC<LiveStreamingProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const [activeStream, setActiveStream] = useState<string | null>(null);

  // Mock live streaming data - in production, this would come from your streaming API
  const liveStreams = [
    {
      id: '1',
      title: 'Sankranti Festival Celebrations 2024',
      description: 'Join us live for the grand Sankranti festival celebrations with traditional dances, music, and festivities',
      isLive: true,
      viewers: 1250,
      streamUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
      thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80',
      startTime: '10:00 AM',
      category: 'Festival'
    },
    {
      id: '2',
      title: 'Village Council Meeting',
      description: 'Monthly village council meeting discussing community development projects',
      isLive: false,
      viewers: 0,
      streamUrl: '',
      thumbnail: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80',
      startTime: '6:00 PM',
      category: 'Community'
    },
    {
      id: '3',
      title: 'Cultural Performance Evening',
      description: 'Traditional folk songs and dances performed by village artists',
      isLive: false,
      viewers: 0,
      streamUrl: '',
      thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80',
      startTime: 'Tomorrow 7:00 PM',
      category: 'Cultural'
    }
  ];

  const upcomingEvents = [
    {
      title: 'Ugadi Celebrations',
      date: 'March 22, 2024',
      time: '9:00 AM'
    },
    {
      title: 'Harvest Festival',
      date: 'April 14, 2024', 
      time: '8:00 AM'
    },
    {
      title: 'Village Fair',
      date: 'May 1, 2024',
      time: '6:00 AM'
    }
  ];

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-blue-50 to-white dark:from-[#1a1a1a] dark:to-[#252525] min-h-screen">
      <div className="container mx-auto px-4">
        {onClose && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <Button
              onClick={onClose}
              variant="outline"
              className="flex items-center gap-2 transition-colors bg-white dark:bg-black dark:text-white hover:bg-heritage hover:text-white"
            >
              <ArrowLeft size={16} />
              Back to Features
            </Button>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Radio className="text-heritage mr-3 animate-pulse" size={36} />
            <h2 className="section-title text-[#000000] dark:text-white">
              Live Streaming
            </h2>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Watch our village festivals, cultural events, and community gatherings live from anywhere in the world
          </p>
        </motion.div>

        {/* Live Streams Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {liveStreams.map((stream, index) => (
                <Card key={stream.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="relative">
                    <img 
                      src={stream.thumbnail} 
                      alt={stream.title}
                      className="w-full h-48 sm:h-64 object-cover"
                    />
                    {stream.isLive && (
                      <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        LIVE
                      </div>
                    )}
                    {stream.isLive && (
                      <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                        <Users size={14} />
                        {stream.viewers.toLocaleString()}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Button
                        onClick={() => setActiveStream(stream.id)}
                        className="bg-white/90 text-black hover:bg-white"
                        disabled={!stream.isLive}
                      >
                        <Play className="mr-2" size={18} />
                        {stream.isLive ? 'Watch Live' : 'Coming Soon'}
                      </Button>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg mb-2">{stream.title}</CardTitle>
                        <CardDescription className="text-gray-600 dark:text-gray-400">
                          {stream.description}
                        </CardDescription>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        stream.category === 'Festival' ? 'bg-orange-100 text-orange-800' :
                        stream.category === 'Community' ? 'bg-blue-100 text-blue-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {stream.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        {stream.startTime}
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Upcoming Events */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="text-heritage" size={20} />
                    Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="border-l-4 border-heritage pl-4 py-2">
                      <h4 className="font-medium text-gray-800 dark:text-gray-200">{event.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{event.date}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">{event.time}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* How to Watch */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="text-heritage" size={20} />
                    How to Watch
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Smartphone className="text-heritage mt-1" size={18} />
                    <div>
                      <h4 className="font-medium text-sm">Mobile & Desktop</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Watch directly on this website</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Play className="text-heritage mt-1" size={18} />
                    <div>
                      <h4 className="font-medium text-sm">YouTube Live</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Available on our YouTube channel</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Radio className="text-heritage mt-1" size={18} />
                    <div>
                      <h4 className="font-medium text-sm">Social Media</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Follow us for live updates</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-heritage/10 to-heritage/5 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            Never Miss Our Celebrations
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Subscribe to notifications to get alerts when we go live for festivals, cultural events, and community gatherings
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-heritage hover:bg-heritage/90">
              <Radio className="mr-2" size={18} />
              Enable Notifications
            </Button>
            <Button variant="outline" className="flex items-center gap-2 transition-colors bg-white dark:bg-black dark:text-white hover:bg-heritage hover:text-white">
              <Globe className="mr-2" size={18} />
              Follow on Social Media
            </Button>
          </div>
        </motion.div>

        {/* Active Stream Modal */}
        {activeStream && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setActiveStream(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden max-w-4xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-lg font-bold">Live Stream</h3>
                <Button variant="ghost" onClick={() => setActiveStream(null)}>
                  ×
                </Button>
              </div>
              <div className="aspect-video">
                <iframe
                  src={liveStreams.find(s => s.id === activeStream)?.streamUrl}
                  className="w-full h-full"
                  allowFullScreen
                  title="Live Stream"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default LiveStreaming;
