import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Calendar, Clock, ArrowLeft, Radio, Globe, Smartphone, Play, ExternalLink, Youtube, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface LiveStreamingProps {
  onClose?: () => void;
}

// Paste your YouTube Live URL here before deploying, or set VITE_YOUTUBE_LIVE_URL in Vercel.
// Supported formats: https://www.youtube.com/watch?v=VIDEO_ID, https://youtu.be/VIDEO_ID, /live/VIDEO_ID, or /embed/VIDEO_ID.
const YOUTUBE_LIVE_URL = import.meta.env.VITE_YOUTUBE_LIVE_URL || '';
const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@PaluguntipalliVillage';

type StreamStatus = 'live' | 'scheduled' | 'info';

interface StreamItem {
  id: string;
  title: string;
  description: string;
  status: StreamStatus;
  youtubeUrl?: string;
  thumbnail: string;
  startTime: string;
  category: string;
}

const getYouTubeEmbedUrl = (url: string): string => {
  if (!url.trim()) return '';

  try {
    const parsed = new URL(url.trim());
    let videoId = '';

    if (parsed.hostname.includes('youtu.be')) {
      videoId = parsed.pathname.split('/').filter(Boolean)[0] || '';
    } else if (parsed.pathname.includes('/embed/')) {
      videoId = parsed.pathname.split('/embed/')[1]?.split('/')[0] || '';
    } else if (parsed.pathname.includes('/live/')) {
      videoId = parsed.pathname.split('/live/')[1]?.split('/')[0] || '';
    } else {
      videoId = parsed.searchParams.get('v') || '';
    }

    if (!videoId) return url;

    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1`;
  } catch {
    return url;
  }
};

const LiveStreaming: React.FC<LiveStreamingProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const [activeStream, setActiveStream] = useState<string | null>(null);
  const youtubeEmbedUrl = useMemo(() => getYouTubeEmbedUrl(YOUTUBE_LIVE_URL), []);
  const hasLiveUrl = Boolean(youtubeEmbedUrl);

  const liveStreams: StreamItem[] = [
    {
      id: 'peerla-panduga-2026',
      title: 'Peerla Panduga Festival Live 2026',
      description: 'Watch the Paluguntipalli Peerla Panduga and Pedda Sarigesu festival live from the village during the June 25 to 26, 2026 celebrations.',
      status: hasLiveUrl ? 'live' : 'scheduled',
      youtubeUrl: YOUTUBE_LIVE_URL,
      thumbnail: '/Live Streaming/pedda sarigesu 1.jpg',
      startTime: 'June 25 to 26, 2026',
      category: 'Festival'
    },
    {
      id: 'festival-updates',
      title: 'Festival Updates & Highlights',
      description: 'Important festival timings, photos, and video highlights will be updated here as the 2026 celebrations continue.',
      status: 'info',
      thumbnail: 'Live Streaming/VILLAGE START.jpg',
      startTime: 'During festival days',
      category: 'Updates'
    }
  ];

  const upcomingEvents = [
    {
      title: 'Peerla Panduga 2026',
      date: 'June 25, 2026',
      time: 'Festival celebrations begin'
    },
    {
      title: 'Pedda Sarigesu 2026',
      date: 'June 26, 2026',
      time: 'Main village gathering and rituals'
    },
    {
      title: 'Festival Photos & Videos',
      date: 'June 25 to 26, 2026',
      time: 'Updated after events'
    }
  ];

  const activeStreamItem = liveStreams.find((stream) => stream.id === activeStream);

  const openYouTube = () => {
    window.open(YOUTUBE_LIVE_URL || YOUTUBE_CHANNEL_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="feature-section-shell py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-blue-50 to-white dark:from-[#1a1a1a] dark:to-[#252525] min-h-screen">
      <div className="feature-container container mx-auto px-3 sm:px-4 lg:px-6">
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
              className="min-h-11 w-full justify-center gap-2 bg-white transition-colors hover:bg-heritage hover:text-white dark:bg-black dark:text-white sm:w-auto"
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
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-0 mb-4">
            <Radio className="text-heritage animate-pulse sm:mr-3" size={36} />
            <h2 className="section-title text-[#000000] dark:text-white">
              Live Streaming
            </h2>
          </div>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Watch Paluguntipalli village festivals and community events live through the official YouTube live stream.
          </p>
        </motion.div>

        {hasLiveUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 overflow-hidden rounded-2xl border-4 border-heritage bg-black shadow-2xl"
          >
            <div className="aspect-video w-full">
              <iframe
                src={youtubeEmbedUrl}
                className="h-full w-full"
                title="Paluguntipalli Peerla Panduga YouTube Live 2026"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </motion.div>
        )}

        {!hasLiveUrl && (
          <Card className="mb-8 border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-900 dark:text-orange-100">
                <Youtube size={22} />
                YouTube Live link not added yet
              </CardTitle>
              <CardDescription className="text-orange-800 dark:text-orange-200">
                Paste your YouTube Live URL into <code>YOUTUBE_LIVE_URL</code> in <code>src/components/LiveStreaming.tsx</code>, or add <code>VITE_YOUTUBE_LIVE_URL</code> in Vercel. After deploy, visitors will watch the live video directly on this page.
              </CardDescription>
            </CardHeader>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {liveStreams.map((stream) => (
                <Card key={stream.id} className="feature-card overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="relative">
                    <img
                      src={stream.thumbnail}
                      alt={stream.title}
                      className="h-44 w-full object-cover sm:h-56 lg:h-64"
                    />
                    {stream.status === 'live' && (
                      <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        LIVE ON YOUTUBE
                      </div>
                    )}
                    {stream.status === 'scheduled' && (
                      <div className="absolute top-4 left-4 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        READY FOR LINK
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-100 sm:opacity-0 sm:hover:opacity-100 transition-opacity">
                      <Button
                        onClick={() => stream.status === 'live' ? setActiveStream(stream.id) : openYouTube()}
                        className="bg-white/95 text-black hover:bg-white"
                      >
                        <Play className="mr-2" size={18} />
                        {stream.status === 'live' ? 'Watch Live' : stream.status === 'scheduled' ? 'Add / Open YouTube' : 'View Updates'}
                      </Button>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <CardTitle className="text-lg mb-2">{stream.title}</CardTitle>
                        <CardDescription className="text-gray-600 dark:text-gray-400">
                          {stream.description}
                        </CardDescription>
                      </div>
                      <span className={`w-fit px-2 py-1 rounded-full text-xs font-medium ${
                        stream.category === 'Festival' ? 'bg-orange-100 text-orange-800' :
                        stream.category === 'Updates' ? 'bg-blue-100 text-blue-800' :
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

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="text-heritage" size={20} />
                    2026 Festival Schedule
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
                      <p className="text-xs text-gray-600 dark:text-gray-400">Watch directly on this page after the YouTube live link is added.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Youtube className="text-heritage mt-1" size={18} />
                    <div>
                      <h4 className="font-medium text-sm">YouTube Live</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">The live stream is embedded from YouTube for better device compatibility.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ExternalLink className="text-heritage mt-1" size={18} />
                    <div>
                      <h4 className="font-medium text-sm">Fallback Link</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">If embedding is blocked, open the stream directly in YouTube.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-heritage/10 to-heritage/5 rounded-2xl p-5 sm:p-8"
        >
          <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            Peerla Panduga 2026 Live Coverage
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            The June 25 to 26, 2026 festival live stream will be available here once the YouTube Live link is added and deployed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={openYouTube} className="bg-heritage hover:bg-heritage/90">
              <Youtube className="mr-2" size={18} />
              Open YouTube
            </Button>
            <Button variant="outline" className="flex items-center gap-2 transition-colors bg-white dark:bg-black dark:text-white hover:bg-heritage hover:text-white">
              <Globe className="mr-2" size={18} />
              Share Festival Updates
            </Button>
          </div>
        </motion.div>

        {activeStreamItem && activeStreamItem.status === 'live' && youtubeEmbedUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/85 flex items-center justify-center z-50 p-3 sm:p-4"
            onClick={() => setActiveStream(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden max-w-5xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
                <h3 className="text-base sm:text-lg font-bold">{activeStreamItem.title}</h3>
                <Button variant="ghost" size="icon" onClick={() => setActiveStream(null)} aria-label="Close live stream">
                  <X size={20} />
                </Button>
              </div>
              <div className="aspect-video bg-black">
                <iframe
                  src={youtubeEmbedUrl}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  title={activeStreamItem.title}
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