"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AnalyticsData {
    overview: {
        totalMembers: number;
        activeMembersToday: number;
        potBalance: number;
        totalSharesCirculating: number;
    };
    today: {
        joins: number;
        raids: number;
        betrayals: number;
        revenue: number;
    };
    last7Days: {
        joins: number;
        raids: number;
        betrayals: number;
        avgDailyActiveUsers: number;
    };
    topHolders: Array<{
        rank: number;
        address: string;
        shares: number;
        pctOfTotal: number;
    }>;
    raidStats: {
        totalRaids: number;
        successRate: number;
        avgSharesStolen: number;
    };
    revenueBreakdown: {
        joinFees: number;
        raidFees: number;
        totalRevenue: number;
    };
}

export default function AnalyticsDashboard() {
    const [data, setData] = useState<AnalyticsData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/analytics')
            .then(res => res.json())
            .then(setData)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white">
                Loading analytics...
            </div>
        );
    }

    if (!data) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white">
                Failed to load analytics
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-red-500">Base Cartel Analytics</h1>
                <p className="text-zinc-400 mt-2">Internal health metrics and performance data</p>
            </header>

            {/* Overview Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-zinc-400">Total Members</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-white">{data.overview.totalMembers}</div>
                        <p className="text-xs text-green-500 mt-1">
                            +{data.today.joins} today
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-zinc-400">Pot Balance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-green-500">
                            ${data.overview.potBalance.toLocaleString()}
                        </div>
                        <p className="text-xs text-zinc-500 mt-1">USDC</p>
                    </CardContent>
                </Card>

                <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-zinc-400">Active Today</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-blue-500">
                            {data.overview.activeMembersToday}
                        </div>
                        <p className="text-xs text-zinc-500 mt-1">
                            7d avg: {data.last7Days.avgDailyActiveUsers}
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-zinc-400">Total Shares</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-purple-500">
                            {data.overview.totalSharesCirculating.toLocaleString()}
                        </div>
                        <p className="text-xs text-zinc-500 mt-1">Circulating</p>
                    </CardContent>
                </Card>
            </div>

            {/* Activity Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-white">Today&apos;s Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-zinc-400">Joins</span>
                                <span className="text-xl font-bold text-white">{data.today.joins}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-zinc-400">Raids</span>
                                <span className="text-xl font-bold text-red-500">{data.today.raids}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-zinc-400">Betrayals</span>
                                <span className="text-xl font-bold text-orange-500">{data.today.betrayals}</span>
                            </div>
                            <div className="flex justify-between items-center border-t border-zinc-800 pt-4">
                                <span className="text-zinc-400">Revenue</span>
                                <span className="text-xl font-bold text-green-500">
                                    ${data.today.revenue} USDC
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-white">Last 7 Days</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-zinc-400">Joins</span>
                                <span className="text-xl font-bold text-white">{data.last7Days.joins}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-zinc-400">Raids</span>
                                <span className="text-xl font-bold text-red-500">{data.last7Days.raids}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-zinc-400">Betrayals</span>
                                <span className="text-xl font-bold text-orange-500">
                                    {data.last7Days.betrayals}
                                </span>
                            </div>
                            <div className="flex justify-between items-center border-t border-zinc-800 pt-4">
                                <span className="text-zinc-400">Avg Daily Active</span>
                                <span className="text-xl font-bold text-blue-500">
                                    {data.last7Days.avgDailyActiveUsers}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Raid Stats & Revenue */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-white">Raid Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-zinc-400">Total Raids</span>
                                <span className="text-xl font-bold text-white">
                                    {data.raidStats.totalRaids.toLocaleString()}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-zinc-400">Success Rate</span>
                                <span className="text-xl font-bold text-green-500">
                                    {data.raidStats.successRate}%
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-zinc-400">Avg Shares Stolen</span>
                                <span className="text-xl font-bold text-red-500">
                                    {data.raidStats.avgSharesStolen}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-white">Revenue Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-zinc-400">Join Fees</span>
                                <span className="text-xl font-bold text-white">
                                    ${data.revenueBreakdown.joinFees.toLocaleString()}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-zinc-400">Raid Fees</span>
                                <span className="text-xl font-bold text-white">
                                    ${data.revenueBreakdown.raidFees.toLocaleString()}
                                </span>
                            </div>
                            <div className="flex justify-between items-center border-t border-zinc-800 pt-4">
                                <span className="text-zinc-400 font-bold">Total Revenue</span>
                                <span className="text-2xl font-bold text-green-500">
                                    ${data.revenueBreakdown.totalRevenue.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Top Holders */}
            <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                    <CardTitle className="text-white">Top Share Holders</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {data.topHolders.map((holder) => (
                            <div
                                key={holder.rank}
                                className="flex items-center justify-between p-3 bg-zinc-800 rounded-lg"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="text-2xl">
                                        {holder.rank === 1 && '🥇'}
                                        {holder.rank === 2 && '🥈'}
                                        {holder.rank === 3 && '🥉'}
                                        {holder.rank > 3 && `#${holder.rank}`}
                                    </div>
                                    <div>
                                        <div className="font-mono text-sm text-white">{holder.address}</div>
                                        <div className="text-xs text-zinc-500">
                                            {holder.pctOfTotal}% of total supply
                                        </div>
                                    </div>
                                </div>
                                <div className="text-xl font-bold text-purple-500">
                                    {holder.shares.toLocaleString()}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

