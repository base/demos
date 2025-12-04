import prisma from './prisma';

export interface ClanMemberStats {
    address: string;
    handle?: string;
    joinedAt: Date;
    shares: number;
    raidsBy: number;
    highStakesBy: number;
}

export interface ClanSummary {
    address: string;
    directInvitesUsed: number;
    maxInvites: number | string; // number or "∞"
    remainingInvites: number | string;
    totalClanMembers: number;
    clanTotalShares: number;
    clanRaidCount: number;
    directInvitees: ClanMemberStats[];
}

export async function getClanSummary(address: string): Promise<ClanSummary> {
    // 1. Fetch Direct Invitees
    const directReferrals = await prisma.cartelReferral.findMany({
        where: { referrerAddress: address },
        include: {
            user: {
                select: {
                    username: true,
                    shares: true,
                    // We might need to join with CartelEvent to get raid counts
                }
            }
        }
    });

    // 2. Fetch Stats for each direct invitee
    const directInvitees: ClanMemberStats[] = [];
    for (const ref of directReferrals) {
        // Count raids
        const raidsBy = await prisma.cartelEvent.count({
            where: { attacker: ref.userAddress, type: 'RAID' }
        });
        const highStakesBy = await prisma.cartelEvent.count({
            where: { attacker: ref.userAddress, type: 'HIGH_STAKES_RAID' }
        });

        directInvitees.push({
            address: ref.userAddress,
            handle: ref.user.username || undefined,
            joinedAt: ref.joinedAt,
            shares: ref.user.shares || 0,
            raidsBy,
            highStakesBy
        });
    }

    // 3. Calculate Clan Totals (Depth 2 for now as per spec)
    // Direct members are Depth 1.
    // Their invitees are Depth 2.

    let totalClanMembers = directReferrals.length;
    let clanTotalShares = directInvitees.reduce((sum, m) => sum + m.shares, 0);
    let clanRaidCount = directInvitees.reduce((sum, m) => sum + m.raidsBy + m.highStakesBy, 0);

    // Fetch Depth 2
    const directAddresses = directReferrals.map(r => r.userAddress);
    if (directAddresses.length > 0) {
        const depth2Referrals = await prisma.cartelReferral.findMany({
            where: { referrerAddress: { in: directAddresses } },
            include: { user: { select: { shares: true } } }
        });

        totalClanMembers += depth2Referrals.length;
        clanTotalShares += depth2Referrals.reduce((sum, r) => sum + (r.user.shares || 0), 0);

        // Count raids for depth 2 (optional, but good for total stats)
        const depth2Addresses = depth2Referrals.map(r => r.userAddress);
        if (depth2Addresses.length > 0) {
            const depth2Raids = await prisma.cartelEvent.count({
                where: { attacker: { in: depth2Addresses }, type: { in: ['RAID', 'HIGH_STAKES_RAID'] } }
            });
            clanRaidCount += depth2Raids;
        }
    }

    // 4. Invites Logic
    // In a real app, we'd read from contract `invites[address]`.
    // For now, we'll assume max 3, unless founder.
    // Founder check (hardcoded or env)
    const isFounder = address.toLowerCase() === process.env.NEXT_PUBLIC_DEPLOYER_ADDRESS?.toLowerCase();
    const maxInvites = isFounder ? "∞" : 3;
    const directInvitesUsed = directReferrals.length;

    let remainingInvites: number | string = 0;
    if (maxInvites === "∞") {
        remainingInvites = "∞";
    } else {
        remainingInvites = Math.max(0, (maxInvites as number) - directInvitesUsed);
    }

    return {
        address,
        directInvitesUsed,
        maxInvites,
        remainingInvites,
        totalClanMembers,
        clanTotalShares,
        clanRaidCount,
        directInvitees
    };
}

export async function indexReferral(userAddress: string, referrerAddress: string, season: number = 1) {
    // Upsert user to ensure they exist
    await prisma.user.upsert({
        where: { walletAddress: userAddress },
        create: { walletAddress: userAddress },
        update: {}
    });

    // Upsert referrer
    await prisma.user.upsert({
        where: { walletAddress: referrerAddress },
        create: { walletAddress: referrerAddress },
        update: {}
    });

    // Create referral record
    await prisma.cartelReferral.create({
        data: {
            userAddress,
            referrerAddress,
            season
        }
    });
}

export interface ClanTreeNode {
    address: string;
    handle?: string;
    shares: number;
    children: ClanTreeNode[];
}

export async function getClanTree(address: string, depth: number = 2): Promise<ClanTreeNode> {
    // Fetch root user
    const user = await prisma.user.findUnique({
        where: { walletAddress: address },
        select: { username: true, shares: true }
    });

    const node: ClanTreeNode = {
        address,
        handle: user?.username || undefined,
        shares: user?.shares || 0,
        children: []
    };

    if (depth > 0) {
        const referrals = await prisma.cartelReferral.findMany({
            where: { referrerAddress: address },
            select: { userAddress: true }
        });

        for (const ref of referrals) {
            const childNode = await getClanTree(ref.userAddress, depth - 1);
            node.children.push(childNode);
        }
    }

    return node;
}
