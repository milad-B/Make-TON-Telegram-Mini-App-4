'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import loadingImg from './static/loading-img.jpg';
import loadingImg1 from './static/loading-img1.jpg';

import './page.css'

export default function Home() {
  const [currentImage, setCurrentImage] = useState<string>('loading');
  const router = useRouter();

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setCurrentImage('loading1');
    }, 3000);

    const timer2 = setTimeout(() => {
      router.push('/pages/airdrop');
    }, 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [router]);

  return (
    <main className="main">
      {currentImage === 'loading' && (
        <Image src={loadingImg} alt="Loading" style={{ objectFit: 'cover', height:'100%' }} />
      )}
      {currentImage === 'loading1' && (
        <Image src={loadingImg1} alt="Loading" style={{ objectFit: 'cover', height:'100%' }} />
      )}
    </main>
  );
}
