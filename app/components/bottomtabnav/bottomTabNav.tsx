'use client';

import Link from 'next/link';
import './bottomTabNav.css'
import Image from 'next/image';
import { useState } from 'react';
import tokenImg from '../../static/token.png'


const BottomTabNav = () => {
  const [selectedPage, setSelectedPage] = useState<string>('AirDrop');
  console.log('selectedpage:',selectedPage)
  return (
    <nav className="bottom-tab-nav">
      <Link
       className={`nav-button ${selectedPage === 'AirDrop' ? 'selected' : ''}`} 
       href="/pages/airdrop"
        onClick={() => setSelectedPage('AirDrop')}
        >
      <Image
          src={tokenImg}
          alt=""
          //fill
          height={35}
          style={{ objectFit: 'cover' }}
        />
      AirDrop
      </Link>
{/*       <Link className='nav-button' href="/">
      Home
      </Link>
      <Link className='nav-button' href="/pages/wallet">
      Wallet
      </Link>
      <Link className='nav-button' href="/pages/settings">
      Settings
      </Link> */}
    </nav>
  );
};
export default BottomTabNav;
