"use client";

import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { FaDownload, FaShareAlt } from 'react-icons/fa';
export const dynamic = 'force-dynamic';

const Page = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        const response = await fetch("/api/fetch-data");
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        console.log("Fetched data:", result);
        setData(result);
      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Add this function inside the Page component
  const getImageUrl = (url: string) => {
    return `${url}?t=${new Date().getTime()}`;
  };

  const handleDownload = (url: string, id: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `image-${id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = (url: string, text: string) => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this image!',
        text: text,
        url: url,
      }).catch((error) => console.log('Error sharing', error));
    } else {
      alert('Web Share API is not supported in your browser. You can copy the URL manually.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-[#4b0082] to-[#690060] text-white">

    <div className="p-6 max-w-4xl mx-auto bg-gray-900">
      <h1 className="text-5xl font-bold mb-6 text-center text-white">Gallery</h1>
      <ul className="space-y-6">
        {data.map((item) => (
          <li
            key={item.id}
            className="p-4 bg-gray-800 border rounded-lg shadow-md flex flex-col items-start"
          >
            <strong className="text-lg font-semibold text-white">Sentence:</strong>{" "}
            <p className="mb-2 text-gray-200">{item.sentence}</p>
            <strong className="text-lg font-semibold text-white">Image Describe:</strong>{" "}
            <p className="mb-2 text-gray-200">{item.imgdescribe}</p>
            {item.url ? (
              <>
                <Link href={`/gallery/${item.id}`} passHref>
                  <img
                    src={getImageUrl(item.url)}
                    alt={`Generated image for ID: ${item.id}`}
                    className="mt-2 mb-2 rounded-lg border border-gray-300 cursor-pointer"
                    width={480}
                  />
                </Link>
                <div className="flex space-x-4 mt-2">
                  <button
                    onClick={() => handleDownload(item.url, item.id)}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    <FaDownload className="mr-2" /> Download
                  </button>
                  <button
                    onClick={() => handleShare(item.url, item.sentence)}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                  >
                    <FaShareAlt className="mr-2" /> Share
                  </button>
                </div>
              </>
            ) : (
              <p className="text-gray-500">No image available</p>
            )}

          </li>
        ))}
      </ul>
    </div>
    </main>
  );
};

export default Page;
