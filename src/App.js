import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import './App.css';
import logo from './logo.png'; // Assicurati di avere un'immagine logo.png nella cartella src
import DexScreener from './DexScreener';
import Disclaimer from './Disclaimer';

const App = () => {
  const [account, setAccount] = useState(null);
  const [hasNFT, setHasNFT] = useState(false);
  const [web3, setWeb3] = useState(null);

  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3Instance.eth.getAccounts();
        setWeb3(web3Instance);
        setAccount(accounts[0]);
        console.log('Connected account:', accounts[0]);
      } catch (error) {
        console.error('User denied account access', error);
      }
    } else {
      console.error('MetaMask not detected');
    }
  };

  useEffect(() => {
    const nftAddress = '0xe8a9D19C6D0A7BFc67E11b29Ab509238ba864cDd'; // Indirizzo del contratto NFT
    const nftAbi = [
      {
        "constant": true,
        "inputs": [{"name": "owner", "type": "address"}],
        "name": "balanceOf",
        "outputs": [{"name": "", "type": "uint256"}],
        "type": "function"
      }
    ];

    const checkNftOwnership = async () => {
      if (!account || !web3) return;

      console.log('Checking NFT ownership for account:', account);

      try {
        const contract = new web3.eth.Contract(nftAbi, nftAddress);
        const balance = await contract.methods.balanceOf(account).call();
        console.log('NFT balance:', balance.toString());
        if (balance > 0) {
          console.log('Access granted');
          setHasNFT(true);
          window.location.href = "https://t.me/+EKLrlXqQo6o3OWJk"; // Link del gruppo privato su Telegram
        } else {
          console.log('Access denied');
          setHasNFT(false);
        }
      } catch (error) {
        console.error('Error checking NFT ownership:', error);
      }
    };

    if (account) {
      checkNftOwnership();
    }
  }, [account, web3]);

  return (
    <div>
      <header className="navbar">
        <div className="logo">
          <img src={logo} alt="Logo" className="img-fluid" />
        </div>
        <nav>
          <ul>
            <li><a className="nav-link" href="#hero">Home</a></li>
            <li><a className="nav-link" href="#about">About</a></li>
            <li><a className="nav-link" href="#tokenomics">Tokenomics</a></li>
            <li><a className="nav-link" href="#roadmap">Roadmap</a></li>
            <li className="nav-btn">
              <button className="btn-dark-blue" style={{ width: '100px' }}>
                <a href="https://github.com/interfinetwork/project-delivery-data/blob/main/GrokElo/GrokElo_AuditReport_InterFi.pdf" target="_blank" rel="noreferrer">Audit</a>
              </button>
            </li>
            <li className="nav-btn">
              <button className="btn-dark-blue" style={{ width: '100px' }}>
                <a href="https://pinksale.notion.site/GrokElo-KYC-Verification-eb841ffe481b4b59a4ed647743bd203d?pvs=4" target="_blank" rel="noreferrer">KYC</a>
              </button>
            </li>
            <li className="icon-social-desktop">
              <div className="filename-1-frame" style={{ marginLeft: '70px' }}>
                <a href="https://twitter.com/techaddict0x" target="_blank" rel="noreferrer">
                  <img className="filename-1-icon2" alt="" src="https://path-to-your-image/filename-12.svg" width="35" />
                </a>
              </div>
            </li>
            <li className="icon-social-desktop">
              <div className="filename-1-frame">
                <a href="https://t.me/GrokElo" target="_blank" rel="noreferrer">
                  <img className="filename-1-icon2" alt="" src="https://path-to-your-image/telegram2.svg" width="35" />
                </a>
              </div>
            </li>
          </ul>
        </nav>
      </header>
      <div className="container">
        <div className="box">
          <div className="box-item">
            <h1>Login with MetaMask</h1>
            {account ? (
              <p>Connected as {account}</p>
            ) : (
              <button onClick={connectMetaMask}>Connect MetaMask</button>
            )}
            {hasNFT && <p>Redirecting...</p>}
          </div>
          <div className="box-item">
            <img src="https://d1yei2z3i6k35z.cloudfront.net/2979038/665e42fcb5ddb_Progettosenzatitolo-2024-06-03T182543.555.png" alt="NFT" className="img-fluid" />
            <p>Buy one of our NFTs</p>
            <button className="btn-dark-blue">
              <a href="https://opensea.io/collection/metalandluminar/overview" target="_blank" rel="noreferrer">Buy NFT</a>
            </button>
          </div>
        </div>
      </div>

      <section id="hero" className="d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1" data-aos="fade-up" data-aos-delay="200">
              <h1 className="font-family-orbitron-normal">WELCOME TO</h1>
              <h1 className="font-family-orbitron-normal">MEXA TOKEN - $MXA!</h1>
              <h5 className="mt-4">MEXA is a Token for the Metaland ecosystem, enhancing user interaction by allowing purchases of exclusive digital items and access to special events. It features a dynamic supply that adapts to community growth, ensuring scalability and active engagement.</h5>
              <div className="col-md-12 col-lg-12 d-flex">
                <div className="">
                  <a href="https://app.uniswap.org/swap?outputCurrency=0xa40132FB78b4C3DfB77d953fBC212E84d3C865Ae&chain=base" target="_blank" rel="noreferrer">
                    <button className="btn-sky-blue" style={{ width: '150px', marginTop: '15px' }}>
                      Buy Now
                    </button>
                  </a>
                </div>
                <div className="">
                  <a href="https://metaland-team.gitbook.io/metaland-usdmxa" target="_blank" rel="noreferrer">
                    <button className="btn-dark-blue" style={{ width: '150px', marginTop: '15px' }}>
                      Whitepaper
                    </button>
                  </a>
                </div>
              </div>
              <div className="justify-content-center mt-3">
                <a href="https://www.metalandspace.xyz" target="_blank" rel="noreferrer">
                  <button className="btn-dark-blue" style={{ width: '150px' }}>
                    MetaLand Ecosystem
                  </button>
                </a>
              </div>
            </div>

            <div className="col-lg-6 order-1 order-lg-2 hero-img for-desktok-frog-img" data-aos="zoom-in" data-aos-delay="200">
              <img src="https://d1yei2z3i6k35z.cloudfront.net/2979038/66333ac82e0ef_LogoMexa500x5001.png" className="img img-fluid animated mxacoin" alt="MXA Coin" width="400" />
            </div>
          </div>
          <div className="col-lg-6 order-1 order-lg-2 for-mobile-frog-img" data-aos="zoom-in" data-aos-delay="200">
            <img src="https://d1yei2z3i6k35z.cloudfront.net/2979038/66333ac82e0ef_LogoMexa500x5001.png" className="img img-fluid animated mxacoin" alt="MXA Coin" />
          </div>
        </div>
      </section>

      <DexScreener />
      <Disclaimer />
    </div>
  );
};

export default App;



