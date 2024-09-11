'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export type ImageItem = {
  id: string;
  url: string;
  sentence: string;
  imgdescribe: string;
  blob?: {
      url?: string;
  };
};


export default function HomePage() {
  const [accident, setAccident] = useState<ImageItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAccident = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json() as ImageItem;
      setAccident(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-[#4b0082] to-[#690060] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">

        <div className="flex flex-col items-center gap-4">
          <button
            onClick={fetchAccident}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {loading ? 'Loading. Please hold...' : 'Generate Accident Ad'}
          </button>
          {error && <p className="text-red-500">{error}</p>}
          {accident?.blob?.url && (
            <div className="flex flex-col items-center gap-4 w-full max-w-2xl">
              <Image
                src={accident.blob.url}
                width={500}
                height={500}
                alt="Generated Image"
                className="max-w-full h-auto"
              />
              <p className='text-white'>Here is the ad! It is added to Gallery. Now generate another!</p>

              <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-80 w-full text-black text-sm whitespace-pre-wrap">
                {accident?.sentence}
              </pre>

            </div>
            
          )}
          
        </div>
      </div>
    </main>
  );
}
