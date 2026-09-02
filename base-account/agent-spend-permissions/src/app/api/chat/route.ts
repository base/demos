// src/app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { generateChatResponse, ChatMessage } from '@/lib/openai'
import { readSessionAddress } from '@/lib/session'

export async function POST(request: NextRequest) {
  try {
    // Verify the session cookie's signature rather than just checking that a
    // cookie is present. The previous check accepted any non-empty value.
    const userAddress = readSessionAddress(request)
    if (!userAddress) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const { messages } = await request.json()
    
    if (!Array.isArray(messages)) {
      return NextResponse.json({ error: 'Messages must be an array' }, { status: 400 })
    }

    // Generate chat response with function calling
    const response = await generateChatResponse(messages as ChatMessage[])
    
    const choice = response.choices[0]
    
    if (choice.message.tool_calls) {
      // Handle function calls - return the tool call details to frontend for execution
      const toolCall = choice.message.tool_calls[0]
      
      if (toolCall.function.name === 'search_jobs') {
        return NextResponse.json({
          message: choice.message.content || 'I\'ll turn that background into a few targeted job searches now.',
          toolCall: true,
          details: {
            function: {
              name: toolCall.function.name,
              arguments: toolCall.function.arguments,
            }
          },
        })
      }
    }
    
    // Regular chat response
    return NextResponse.json({
      message: choice.message.content,
      toolCall: false,
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json({ error: 'Failed to process chat request' }, { status: 500 })
  }
}