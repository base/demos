// app/api/zora-tokens/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getProfile, getProfileBalances } from '@zoralabs/coins-sdk'

export async function GET(req: NextRequest) {
  const handle = req.nextUrl.searchParams.get('handle')

  if (!handle) {
    return NextResponse.json({ error: 'Missing Zora handle' }, { status: 400 })
  }

  // Clean up the handle input (remove @ if present)
  const cleanHandle = handle.trim().replace(/^@/, '')

  try {
    const [profileRes, balancesRes] = await Promise.all([
      getProfile({ identifier: cleanHandle }),
      getProfileBalances({ identifier: cleanHandle }),
    ])


    // Extract profile information using the correct structure
    const profileData = profileRes?.data 
    
    if (!profileData?.profile) {
      console.log('Zora profile not found')
      return NextResponse.json({ error: 'Zora profile not found' }, { status: 404 })
    }
    
    const displayName =
      profileData?.profile?.displayName ||
      profileData?.profile?.handle ||
      cleanHandle

    

    // Extract coin balances - properly navigate the response structure
    const balanceEdges = balancesRes?.data?.profile?.coinBalances?.edges || []
    
    // Map edges to a simpler format
    const coinBalances = balanceEdges.map(edge => edge.node)
    
    const topTokens = coinBalances
      .filter((node) => 
        Number(node.balance) > 0 && 
        node.coin?.mediaContent?.previewImage
      )
      .sort((a, b) => 
        Number(b.balance || 0) - Number(a.balance || 0)
      )
      .slice(0, 5)

    const tokens = topTokens.map(({ coin, balance }) => {
      // Extract the medium-quality image URL from the previewImage object
      const previewImageObj = coin?.mediaContent?.previewImage;
      const originalImageUrl = previewImageObj?.medium || previewImageObj?.small || '/placeholder.svg';
      
      // Debug: Log the extraction process
      console.log('🔗 [ZORA-API] Token:', coin?.name);
      console.log('  📋 previewImage object:', JSON.stringify(previewImageObj, null, 2));
      console.log('  🖼️ Extracted URL (medium):', previewImageObj?.medium);
      console.log('  🖼️ Final imageUrl:', originalImageUrl);
      
      return {
        address: coin?.address || '',
        name: coin?.name || 'Unknown Token',
        symbol: coin?.symbol || '???',
        imageUrl: originalImageUrl,
        balance,
      };
    })

    // Include profile image if available
    const profileImage = profileData?.profile?.avatar?.medium || null

    console.log('✅ [ZORA-API] Returning', tokens.length, 'tokens for user:', displayName);
    console.log('📋 [ZORA-API] Summary of all image URLs:');
    tokens.forEach((token, index) => {
      console.log(`  ${index + 1}. ${token.name}: ${token.imageUrl}`);
    });

    return NextResponse.json({
      tokens,
      displayName,
      profileImage,
      profileHandle: profileData?.profile?.handle,
    })
  } catch (error) {
    console.error('Zora API error:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch from Zora',
      tokens: [],
      displayName: cleanHandle
    }, { status: 500 })
  }
}

export type ZoraToken = {
  address: string
  name: string
  symbol: string
  imageUrl: string
  balance: string
}

export type ZoraTokenResponse = {
  tokens: ZoraToken[]
  displayName: string
  profileImage: string | null 
  profileHandle: string | null
}