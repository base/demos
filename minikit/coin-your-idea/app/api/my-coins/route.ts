import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const owner = searchParams.get('owner');
    if (!owner) {
      return NextResponse.json({ error: 'Owner address is required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();
    const coins = await db
      .collection('coins')
      .find({ ownerAddress: owner })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(coins);
  } catch (error) {
    console.error('Error fetching coins:', error);
    return NextResponse.json({ error: 'Failed to fetch coins' }, { status: 500 });
  }
} 