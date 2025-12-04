import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from 'date-fns';

interface NewsItem {
    id: string;
    headline: string;
    timestamp: string;
    type: string;
    txHash?: string;
}

export default function NewsBulletin() {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchNews = async () => {
        try {
            const res = await fetch('/api/cartel/news?limit=10');
            const data = await res.json();
            if (data.news) {
                setNews(data.news);
            }
        } catch (error) {
            console.error("Failed to fetch news:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
        const interval = setInterval(fetchNews, 60000); // Poll every minute
        return () => clearInterval(interval);
    }, []);

    return (
        <Card className="card-glow border-blue-900/30 bg-zinc-900/50">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm text-blue-400 font-bold flex items-center gap-2">
                    📰 Cartel Headlines
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 max-h-[250px] overflow-y-auto custom-scrollbar">
                {loading && news.length === 0 ? (
                    <div className="text-center text-zinc-500 text-xs py-4">Loading headlines...</div>
                ) : news.length === 0 ? (
                    <div className="text-center text-zinc-500 text-xs py-4">No news yet. Raids and retires will show up here.</div>
                ) : (
                    <div className="space-y-3">
                        {news.map((item) => (
                            <div key={item.id} className="border-l-2 border-blue-500/30 pl-3 py-1">
                                <p className="text-xs text-zinc-300 leading-snug font-medium">
                                    {item.headline}
                                </p>
                                <div className="flex justify-between items-center mt-1">
                                    <span className="text-[10px] text-zinc-600">
                                        {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
                                    </span>
                                    {item.txHash && (
                                        <a
                                            href={`https://sepolia.basescan.org/tx/${item.txHash}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[10px] text-blue-500/70 hover:text-blue-400"
                                        >
                                            View Tx
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
