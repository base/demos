'use client';

import InvitesDashboard from "@/components/InvitesDashboard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';

export default function InvitesPage() {
    const searchParams = useSearchParams();
    const address = searchParams.get('address') || undefined;

    return (
        <div className="min-h-screen bg-[#0B0E12] pb-24">
            {/* Nav Header */}
            <div className="sticky top-0 z-10 bg-[#0B0E12]/80 backdrop-blur-md border-b border-white/5 px-4 py-3 flex items-center justify-between">
                <Link href="/">
                    <Button variant="ghost" className="text-zinc-400 hover:text-white pl-0 gap-2">
                        ← Back
                    </Button>
                </Link>
                <div className="font-bold text-white">INVITES</div>
                <div className="w-16"></div> {/* Spacer for center alignment */}
            </div>

            <div className="container max-w-md mx-auto p-4 pt-6">
                <InvitesDashboard address={address} />
            </div>
        </div>
    );
}
