import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const idea = searchParams.get('idea') || 'Default idea';
    
    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 40,
            color: 'white',
            background: 'linear-gradient(to bottom right, #663399, #FF6B6B)',
            width: '100%',
            height: '100%',
            padding: 40,
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '15px',
          }}
        >
          <div style={{ fontSize: 60, fontWeight: 'bold', marginBottom: 20 }}>This is a Coined Idea</div>
          <div style={{ 
            padding: '20px', 
            background: 'rgba(0,0,0,0.3)', 
            borderRadius: '10px',
            maxWidth: '80%',
            wordWrap: 'break-word'
          }}>
            {idea}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('Error generating image:', error);
    return new Response('Error generating image', { status: 500 });
  }
} 