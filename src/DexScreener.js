import React from 'react';

const DexScreener = () => {
  return (
    <div className="box">
      <h2>Dex Screener Embed</h2>
      <p>Explore the real-time data directly from Dex Screener in a dark theme.</p>
      <div className="iframe-container">
        <iframe 
          src="https://dexscreener.com/base/0x4ce23d2ef5951f80c82f099de7249bfcddfb41ec?embed=1&theme=dark" 
          allowFullScreen
          title="Dex Screener"
        ></iframe>
      </div>
    </div>
  );
};

export default DexScreener;
