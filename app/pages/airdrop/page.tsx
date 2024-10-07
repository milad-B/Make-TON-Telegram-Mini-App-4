'use client'
import Link from 'next/link';

import BottomTabNav from '../../components/bottomtabnav/bottomTabNav';

import './page.css'
import Image from 'next/image';
import airDropImg from '../../static/hmstrAirDrop.jpg'
import achiveImg from '../../static/achive.png'
import tokenImg from '../../static/token.png'
import buttonImg from '../../static/buttonImg.png'
import { useState } from 'react';

export default function AirDrop() {
  const [selectedTab, setSelectedTab] = useState<string>('Tokens');
    return (
      <main className="main">
      <Image
        src={airDropImg}
        alt="Description of the image"
        //fill
        height={400}
        style={{ objectFit: 'cover' }}
      />
    
      <div className='select-tab'>
        <div className='tab-selector'>
        <div className={`tab-selector-button ${selectedTab === 'Tokens' ? 'selected' : ''}`}
          onClick={()=>setSelectedTab('Tokens')}
          >
            <h6>
            Tokens
              </h6> 
          </div>
          <div className={`tab-selector-button ${selectedTab === 'Withdrawal' ? 'selected' : ''}`}
          onClick={()=>setSelectedTab('Withdrawal')}
          >
            <h6>
            Withdrawal
            </h6>
            
          </div>

        </div>
        {
        selectedTab==='Tokens'?
        (<div className='tokens-tab'>
          <div className='token-table'>
          <p><h6>Total $HMSTR </h6>   <h6>  </h6>   <h1>985215</h1> </p>
          <p><h6>Claimed </h6>   <h6>  </h6>   <h1>0</h1> </p>
          </div>
          <div className='table-list'>
          <Image
              src={achiveImg}
              alt=""
              //fill
              height={40}
              style={{ objectFit: 'cover' }}
            />
            <div className='table-list-detail'>
              <h1>100 Days Reward</h1>
              <h1>
              <Image
                  src={tokenImg}
                  alt="Description of the image"
                  //fill
                  height={20}
                  style={{ objectFit: 'cover', margin:'3px' }}
                />
                985215
                </h1>

            </div>
          </div>
        </div>)
        :
        (
          <div className='tokens-tab'>
            <Link className='withdraw-button' href="/pages/wallet">
            <Image
              src={buttonImg}
              alt=""
              //fill

              style={{ objectFit: 'cover', width:'90%' }}
            />
            </Link>



          </div>
        )


        }

      </div>

    
    <BottomTabNav  />
  </main>
    );
  }