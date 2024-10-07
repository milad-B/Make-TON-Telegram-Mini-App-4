'use client'


import BottomTabNav from './components/bottomtabnav/bottomTabNav';
import './page.css'

export default function Home() {
  
  
  return (
    <main className="main">

      <div className="flex-grow">
        {/* Your main content goes here */}
        <h1>Welcome to the Home Page</h1>

      </div>
      <BottomTabNav  />
    </main>
  );
}