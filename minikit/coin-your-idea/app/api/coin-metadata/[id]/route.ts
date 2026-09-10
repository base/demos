import { NextRequest, NextResponse } from 'next/server';
import { PROJECT_URL } from '@/lib/constants';

// Simple in-memory store for demo purposes
const metadataStore: Record<string, any> = {};

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const data = await request.json();
    
    // Store metadata with environment-specific image URL
    metadataStore[id] = {
      name: data.name,
      symbol: data.symbol,
      description: data.description,
      image: process.env.ENV === 'local' 
        ? "https://i.imgur.com/tdvjX6c.png"
        : `${PROJECT_URL}/api/generateImage?idea=${data.description}`
    };
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to store metadata' }, { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Return stored metadata or fallback with environment-specific image URL
    if (metadataStore[id]) {
      return NextResponse.json(metadataStore[id]);
    }
    
    return NextResponse.json({
      name: "Banger Coin",
      symbol: "BANGER",
      description: "A coin created from a banger",
      image: process.env.ENV === 'local' 
        ? "https://i.imgur.com/tdvjX6c.png"
        : `${PROJECT_URL}/api/generateImage?idea=A coin created from a banger`
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve metadata' }, { status: 500 });
  }
} 