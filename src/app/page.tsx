'use client';

import React, { useState } from 'react';
import { AccidentRecord } from '@/types/accident';

export default function HomePage() {
  const [accident, setAccident] = useState<AccidentRecord | null>(null);
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
      const data: AccidentRecord = await response.json();
      setAccident(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Prevent Rhino Ads Ai
        </h1>
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={fetchAccident}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {loading ? 'Loading. Please hold...' : 'Generate Accident Ad'}
          </button>
          {error && <p className="text-red-500">{error}</p>}
          {accident && (
            <div className="flex flex-col items-center gap-4 w-full max-w-2xl">
              <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-80 w-full text-black text-sm whitespace-pre-wrap">
                {accident.sentence}
              </pre>
              <img
                src={accident.blob.url}
                width={500}
                height={500}
                alt="Generated Image"
                className="max-w-full h-auto"
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
