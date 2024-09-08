'use client'
import { useState, useEffect } from 'react';

export default function HomePage() {
  const images = [
    'https://dc907dsvybtiecmv.public.blob.vercel-storage.com/1725765896911-JaTWP9hjHYUw9MVG6hXd1Ft6HdD3P0.png?t=1725766144868',
    // Add more image URLs here
    'https://dc907dsvybtiecmv.public.blob.vercel-storage.com/1725764155441-UpFKtZmVSyBoMSr0TSsH5tElXRnNmI.png?t=1725767146173',
    'https://dc907dsvybtiecmv.public.blob.vercel-storage.com/1725760530468-DGgwsqQJIIisqERPY9rpBQlcX1gYUj.png?t=1725767186386',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#4b0082] to-[#690060] text-white">
      <div className="container flex flex-col items-center justify-center gap-6 px-4 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Prevent Rhino Ads Ai
        </h1>

        <p className='text-white text-2xl'>Do you want ads that vibe with your vintage aesthetic?</p>
        <p className='text-white text-xl'>You can generate your personalised vintage theme ads!</p>
        <p className='text-white text-xl'>Here is an example we prepared eariler:</p>
        <img
          src={images[currentImageIndex]}
          width={500}
          height={500}
          alt={`Generated Image ${currentImageIndex + 1}`}
          className="max-w-full h-auto"
        />

        <p className='text-white text-xl'>Created with <a className='text-blue-300' href="https://data.gov.au/data/dataset/vic-crash-data-2021-2022">Victoria Public Crash Data</a></p>
      </div>
    </main>
  );
}
