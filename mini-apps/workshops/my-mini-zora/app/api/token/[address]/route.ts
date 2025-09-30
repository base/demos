
'use server'
import { getCoin } from "@zoralabs/coins-sdk";
import { base } from "viem/chains";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { address: string } }
) {
  const address = params.address;
  
  if (!address) {
    return NextResponse.json(
      { error: "Address is required" },
      { status: 400 }
    );
  }
  
  try {
    const response = await getCoin({
      address,
      chain: base.id,
    });
    
    const coin = response.data?.zora20Token;
    
    if (!coin) {
      return NextResponse.json(
        { error: "Token not found" },
        { status: 404 }
      );
    }
    
    // Handle complex image type or use placeholder
    let imagePath = "/placeholder.svg";
    if (coin.mediaContent?.previewImage) {
      if (typeof coin.mediaContent.previewImage === 'string') {
        imagePath = coin.mediaContent.previewImage;
      } else if (coin.mediaContent.previewImage.medium) {
        imagePath = coin.mediaContent.previewImage.medium;
      }
    }
    
    const tokenData = {
      tokenAddress: address,
      title: coin.name || "Unknown Token",
      holders: coin.uniqueHolders?.toString() || "Unknown",
      id: address.substring(0, 8),
      description: coin.description || "No description available",
      format: "TOKEN",
      size: coin.totalSupply || "N/A",
      created: coin.creatorAddress || "Unknown Creator",
      collection: coin.volume24h || "0",
      imagePath,
      // Include additional raw data that might be useful
      rawData: {
        id: address.substring(0, 8),
        name: coin.name,
        description: coin.description,
        address,
        symbol: coin.symbol,
        totalSupply: coin.totalSupply,
        totalVolume: coin.totalVolume,
        volume24h: coin.volume24h,
        createdAt: coin.createdAt,
        creatorAddress: coin.creatorAddress
      }
    };
    
    // Cache the response for 5 minutes (300 seconds)
    return NextResponse.json(
      { data: tokenData },
      { 
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        } 
      }
    );
    
  } catch (error) {
    console.error("Error fetching token data:", error);
    return NextResponse.json(
      { error: "Failed to fetch token data" },
      { status: 500 }
    );
  }
} 