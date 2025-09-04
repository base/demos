import { NextRequest } from "next/server";
import { put } from "@vercel/blob";

// Force dynamic rendering to ensure fresh image generation on each request
export const dynamic = "force-dynamic";

/**
 * POST handler for saving captured images to Blob storage
 * @param request - The incoming HTTP request with displayName and base64 image data
 * @returns JSON with the blob URL
 */
export async function POST(request: NextRequest) {
  try {
    // Extract the displayName and imageData from the request body
    const { displayName, imageData } = await request.json();
    
    if (!displayName) {
      return new Response("Missing displayName parameter", { status: 400 });
    }
    
    if (!imageData) {
      return new Response("Missing imageData parameter", { status: 400 });
    }
    
    // Ensure imageData is properly formatted (should be a data URL)
    if (!imageData.startsWith('data:image/')) {
      return new Response("Invalid image data format", { status: 400 });
    }
    
    // Convert the base64 data URL to a buffer
    const base64Data = imageData.split(',')[1];
    const buffer = Buffer.from(base64Data, 'base64');
    
    // Convert buffer to ReadableStream for Vercel Blob
    const readableStream = new ReadableStream({
      start(controller) {
        controller.enqueue(new Uint8Array(buffer));
        controller.close();
      },
    });

    // Remove spaces and URL encode the displayName to handle special characters like parentheses
    const cleanDisplayName = displayName.replace(/\s+/g, '');
    const encodedDisplayName = encodeURIComponent(cleanDisplayName);

    // Save the image to Vercel Blob with encoded filename
    const blob = await put(`images/${encodedDisplayName}.png`, readableStream, {
      access: "public",
      contentType: "image/png",
      allowOverwrite: true,
    });

    // Return the blob URL
    return Response.json({ blobUrl: blob.url });
  } catch (err: unknown) {
    console.error("❌ API error in /api/save-image:", err);
    return new Response(`Failed to save image: ${err instanceof Error ? err.message : String(err)}`, {
      status: 500,
    });
  }
}
