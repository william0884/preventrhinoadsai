"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { FaDownload, FaShareAlt } from 'react-icons/fa';
import type { ImageItem } from '../../../types/image';
import Image from 'next/image';

const ImagePage = () => {
  const { id } = useParams();
  const [item, setItem] = useState<ImageItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`/api/fetch-data/${id as string}`);
        if (!response.ok) throw new Error('Failed to fetch item');
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const result: ImageItem = await response.json();
        setItem(result);
      } catch (err) {
        console.error('Error fetching item:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchItem().catch(err => {
      console.error('Error in fetchItem:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setLoading(false);
    });
  }, [id]);

  const handleDownload = () => {
    if (item && item.url) {
      const link = document.createElement('a');
      link.href = item.url;
      link.download = `image-${item.id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleShare = () => {
    if (navigator.share && item?.url) {
      navigator.share({
        title: 'Check out this image!',
        text: item.sentence,
        url: window.location.href,
      }).catch((error) => console.log('Error sharing', error));
    } else {
      alert('Web Share API is not supported in your browser. You can copy the URL manually.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!item) return <p>Item not found</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Link href="/gallery" className="text-blue-500 hover:underline mb-4 block">
        &larr; Back to Gallery
      </Link>
      <h1 className="text-3xl font-bold mb-6">Image Details</h1>
      <div className="bg-white border rounded-lg shadow-md p-6">
        <Image
          src={item.url}
          alt={`Generated image for ID: ${item.id}`}
          width={500}
          height={300}
          layout="responsive"
          className="mb-4 rounded-lg border border-gray-300"
        />
        <p className="mb-2"><strong>Sentence:</strong> {item.sentence}</p>
        <p className="mb-2"><strong>Image Description:</strong> {item.imgdescribe}</p>
        <div className="flex space-x-4 mt-4">
          <button
            onClick={handleDownload}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            <FaDownload className="mr-2" /> Download
          </button>
          <button
            onClick={handleShare}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            <FaShareAlt className="mr-2" /> Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImagePage;