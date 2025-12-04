"use client";

import { useSearchParams } from 'next/navigation';
import CartelDashboard from "~/components/CartelDashboard";
import { Suspense } from 'react';

import { useState } from 'react';
import Leaderboard from "@/components/Leaderboard";
import { Button } from "@/components/ui/button";

function QADashboard() {
    const searchParams = useSearchParams();
    const address = searchParams.get('address') || "0x0000000000000000000000000000000000000000";
    const [currentView, setCurrentView] = useState<"dashboard" | "leaderboard">("dashboard");

    return (
        <div className="pb-20">
            <div className="bg-red-900/20 text-red-500 p-2 text-center text-xs font-bold border-b border-red-900/50">
                QA MODE - Viewing as {address}
            </div>

            {currentView === "dashboard" ? <CartelDashboard address={address} /> : <Leaderboard />}

            <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 p-4 flex justify-around z-50">
                <Button
                    variant={currentView === "dashboard" ? "default" : "ghost"}
                    onClick={() => setCurrentView("dashboard")}
                    className="w-32"
                >
                    🏠 Base
                </Button>
                <Button
                    variant={currentView === "leaderboard" ? "default" : "ghost"}
                    onClick={() => setCurrentView("leaderboard")}
                    className="w-32"
                >
                    🏆 Rank
                </Button>
            </div>
        </div>
    );
}

export default function QAPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <QADashboard />
        </Suspense>
    );
}
