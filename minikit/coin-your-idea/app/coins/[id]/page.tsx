"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface CoinMetadata {
  name: string;
  symbol: string;
  description: string;
  image: string;
}

export const dynamic = 'force-dynamic';

export default function CoinPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [metadata, setMetadata] = useState<CoinMetadata | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/coin-metadata/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load metadata');
        return res.json();
      })
      .then(setMetadata)
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!metadata) {
    return <div className="text-center">Loading...</div>;
  }

  const { name, symbol, description, image } = metadata;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
      <div className="max-w-md bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">
          {name} ({symbol})
        </h1>
        <p className="mb-4">{description}</p>
        {image && (
          <Image
            src={image}
            alt={`${name} image`}
            width={1200}
            height={630}
            className="w-full h-auto rounded"
          />
        )}
      </div>
    </main>
  );
} 