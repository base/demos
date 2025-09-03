"use client";

import { sdk } from "@farcaster/frame-sdk";
import { useState, useEffect } from "react";
import * as htmlToImage from 'html-to-image';

interface ShareButtonProps {
  displayName: string;
}

export function ShareButton({ displayName }: ShareButtonProps) {
  const [status, setStatus] = useState<'idle' | 'capturing' | 'uploading' | 'ready' | 'sharing' | 'error'>('idle');
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Detect if user is on mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const captureAndSaveImage = async () => {
    // Reset state
    setStatus('capturing');
    setErrorMessage(null);
    
    // Get the collage element
    const collageContainer = document.getElementById('collage-container');
    
    if (!collageContainer) {
      setStatus('error');
      setErrorMessage('Could not find collage element');
      return;
    }
    
    try {
      // Create a dataUrl from the DOM node
      const dataUrl = await htmlToImage.toPng(collageContainer, {
        quality: 1.0,
        pixelRatio: isMobile ? 3 : 2, // Higher resolution for mobile
        cacheBust: true,
        backgroundColor: '#000000', // Explicitly set black background
        style: {
          transform: 'none',
          width: `${collageContainer.offsetWidth}px`,
          height: `${collageContainer.offsetHeight}px`,
          backgroundColor: '#000000' // Also set in style
        }
      });
      
      // Upload to server
      setStatus('uploading');

      const saveRes = await fetch("/api/save-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          displayName,
          imageData: dataUrl 
        }),
      });
  
      if (!saveRes.ok) {
        const errorText = await saveRes.text();
        throw new Error(`Image save failed: ${saveRes.status} - ${errorText}`);
      }
  
      const { blobUrl } = await saveRes.json();
      console.log("✅ Blob URL:", blobUrl);
      
      // Set state to ready for sharing
      setBlobUrl(blobUrl);
      setStatus('ready');
    } catch (error) {
      console.error("❌ Failed to capture and save image:", error);
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Unknown error occurred');
    }
  };

  const handleShare = async () => {
    if (!blobUrl) {
      return await captureAndSaveImage();
    }
    
    setStatus('sharing');
    
    try {
      // URL encode the displayName for the frame URL
      const encodedDisplayName = encodeURIComponent(displayName);
      const frameUrl = `${process.env.NEXT_PUBLIC_URL}/frame/${encodedDisplayName}`;
      
      await sdk.actions.composeCast({
        text: "Not financial advice. Just personal branding, this is my Zora Collage, whats yours?",
        embeds: [frameUrl],
      });
      
      setStatus('idle');
    } catch (error) {
      console.error("❌ Failed to share cast:", error);
      setStatus('error');
      setErrorMessage('Failed to share to Base App');
    }
  };

  // Button text based on status
  const getButtonText = () => {
    switch (status) {
      case 'capturing': return 'Capturing image...';
      case 'uploading': return 'Uploading...';
      case 'ready': return 'Share to Base App';
      case 'sharing': return 'Opening Base App...';
      case 'error': return 'Try again';
      default: return 'Create Shareable Image';
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={status === 'ready' ? handleShare : captureAndSaveImage}
        disabled={['capturing', 'uploading', 'sharing'].includes(status)}
        className="border border-gray-700 hover:border-lime-300 text-gray-400 py-3 px-4 md:px-6 font-mono tracking-wider transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
      >
        {getButtonText()}
      </button>
      {errorMessage && (
        <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
      )}
    </div>
  );
}