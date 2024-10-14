'use client'
import { useState, useEffect } from 'react';

export default function HomePage() {
  const images = [
    'https://preventrhinoadsai.s3.ap-southeast-2.amazonaws.com/1728940503125.png?t=1728940543235&w=1080&q=75',
    // Add more image URLs here
    'https://preventrhinoadsai.s3.ap-southeast-2.amazonaws.com/1728940332830.png?t=1728940543235&w=1080&q=75',
    'https://preventrhinoadsai.s3.ap-southeast-2.amazonaws.com/1728940540395.png?t=1728940543235&w=1080&q=75',
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

        <p className='text-white text-xl'>Created with <a className='text-blue-300' href="https://discover.data.vic.gov.au/dataset/victoria-road-crash-data">Victoria Public Crash Data</a></p>
      </div>
    </main>
  );
}
