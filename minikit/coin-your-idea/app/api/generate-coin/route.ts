import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import crypto from 'crypto';
import clientPromise from '@/lib/mongodb';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Server-side environment variable
});

export async function POST(request: NextRequest) {
  try {
    const { idea, owner } = await request.json();
    if (!idea || !owner) {
      return NextResponse.json({ error: 'Idea and owner address required' }, { status: 400 });
    }
    
    const result = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `Generate parameters for a cryptocurrency coin based on the following idea.\nReturn JSON in this format:\n{\n  "name": "short name (max 3 words)",\n  "symbol": "ticker symbol (max 5 letters)"\n}`
        },
        { role: "user", content: idea }
      ]
    });

    const content = result.choices[0].message.content;
    let parsedContent;
    
    try {
      parsedContent = JSON.parse(content || '{}');
    } catch (e) {
      parsedContent = {
        name: idea.split(' ').slice(0, 3).join(' ').substring(0, 20) || "Idea Coin",
        symbol: idea.split(' ')
          .filter((w: string) => w)
          .slice(0, 3)
          .map((word: string) => word[0])
          .join('')
          .toUpperCase()
          .substring(0, 5) || "IDEA"
      };
    }

    // Generate unique ID
    const uniqueId = crypto.randomBytes(8).toString('hex');
    
    // Create metadata URL using request origin
    const origin = new URL(request.url).origin;
    const metadataUrl = `${origin}/api/coin-metadata/${uniqueId}`;
    
    // Store metadata
    await fetch(metadataUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: parsedContent.name,
        symbol: parsedContent.symbol,
        description: idea,
      }),
    });
    
    // Insert coin record into MongoDB
    const client = await clientPromise;
    const db = client.db();
    await db.collection('coins').insertOne({
      id: uniqueId,
      name: parsedContent.name,
      symbol: parsedContent.symbol,
      description: idea,
      metadataUrl,
      ownerAddress: owner,
      createdAt: new Date()
    });
    
    return NextResponse.json({
      name: parsedContent.name,
      symbol: parsedContent.symbol,
      metadataUrl
    });
    
  } catch (error) {
    console.error('Error generating coin parameters:', error);
    return NextResponse.json(
      { error: 'Failed to generate coin parameters' }, 
      { status: 500 }
    );
  }
} 