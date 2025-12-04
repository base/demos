import { NextResponse } from 'next/server';

// Sample badge metadata for Season 1, Rank 1 (Kingpin)
export async function GET(
    request: Request,
    { params }: { params: Promise<{ season: string; rank: string }> }
) {
    const { season, rank } = await params;
    const rankNum = parseInt(rank);
    const seasonNum = parseInt(season);

    const tier = getTier(rankNum);

    const metadata = {
        name: `Base Cartel - Season ${seasonNum} - Rank #${rankNum}`,
        description: `This badge certifies that the holder achieved Rank #${rankNum} in Base Cartel Season ${seasonNum}. ${tier.description}`,
        image: `${process.env.NEXT_PUBLIC_URL}/api/metadata/season/${seasonNum}/badge/${rankNum}.png`,
        external_url: `${process.env.NEXT_PUBLIC_URL}?season=${seasonNum}&rank=${rankNum}`,
        attributes: [
            { trait_type: 'Season', value: seasonNum },
            { trait_type: 'Rank', value: rankNum },
            { trait_type: 'Tier', value: tier.name },
            { trait_type: 'Badge Type', value: 'Seasonal Leaderboard' },
            { trait_type: 'Color', value: tier.color },
        ],
    };

    return NextResponse.json(metadata, {
        headers: {
            'Cache-Control': 'public, max-age=31536000, immutable',
        },
    });
}

function getTier(rank: number) {
    if (rank === 1) {
        return {
            name: 'Kingpin',
            description: 'The undisputed ruler of the cartel.',
            color: '#FFD700',
        };
    } else if (rank <= 3) {
        return {
            name: 'Underboss',
            description: 'Among the elite leadership of the cartel.',
            color: '#C0C0C0',
        };
    } else if (rank <= 10) {
        return {
            name: 'Capo',
            description: 'A respected lieutenant in the organization.',
            color: '#CD7F32',
        };
    } else if (rank <= 50) {
        return {
            name: 'Soldier',
            description: 'A proven member of the cartel.',
            color: '#4169E1',
        };
    } else {
        return {
            name: 'Associate',
            description: 'A recognized contributor to the cartel.',
            color: '#8B7355',
        };
    }
}
