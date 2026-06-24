import { useState, useEffect } from 'react';
import { Newspaper, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

interface NewsItem {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

const NewsAPI = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const today = new Date();

    setNews([
      {
        title: 'Andhra Pradesh rural news and public updates',
        description: 'Open the latest Andhra Pradesh and rural development updates from Google News.',
        url: 'https://news.google.com/search?q=Andhra%20Pradesh%20rural%20development',
        publishedAt: today.toISOString(),
        source: { name: 'Google News' }
      },
      {
        title: 'Agriculture and weather updates for farmers',
        description: 'Follow agriculture, weather, and market-related updates useful for village communities.',
        url: 'https://news.google.com/search?q=Andhra%20Pradesh%20agriculture%20weather%20farmers',
        publishedAt: today.toISOString(),
        source: { name: 'Google News' }
      },
      {
        title: 'Digital services and local community information',
        description: 'Find current information about digital services, local development, and community notices.',
        url: 'https://news.google.com/search?q=Andhra%20Pradesh%20digital%20services%20villages',
        publishedAt: today.toISOString(),
        source: { name: 'Google News' }
      }
    ]);
    setLoading(false);
  }, []);

  if (loading) return <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-48 rounded-lg" />;

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center text-lg text-gray-900 dark:text-white">
          <Newspaper className="mr-2 text-blue-600" size={20} />
          Daily News
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {news.slice(0, 3).map((article, index) => (
            <div key={index} className="border-b border-gray-200 dark:border-gray-600 pb-2 last:border-b-0">
              <h4 className="font-medium text-sm line-clamp-2 mb-1 text-gray-900 dark:text-white">{article.title}</h4>
              <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 mb-2">{article.description}</p>
              <div className="flex justify-between items-center gap-3">
                <span className="text-xs text-gray-500 dark:text-gray-400">{article.source.name}</span>
                <Button size="sm" variant="outline" asChild>
                  <a href={article.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${article.title}`}>
                    <ExternalLink size={12} />
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsAPI;