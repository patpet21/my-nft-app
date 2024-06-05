import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import './App.css';

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
    const nftAddress = '0xe8a9D19C6D0A7BFc67E11b29Ab509238ba864cDd';
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
          window.location.href = "https://t.me/+EKLrlXqQo6o3OWJk";
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
    <div className="App">
      <header className="navbar">
        <div className="logo">
          <img src="https://d1yei2z3i6k35z.cloudfront.net/2979038/6619aeb4176de_Progettosenzatitolo83.png" alt="Logo" className="img-fluid" />
        </div>
        <nav>
          <ul>
            <li><a className="nav-link" href="#hero">Home</a></li>
            <li><a className="nav-link" href="#about">About</a></li>
            <li><a className="nav-link" href="#tokenomics">Tokenomics</a></li>
            <li><a className="nav-link" href="#roadmap">Roadmap</a></li>
            <li className="nav-btn">
              <button className="btn-dark-blue" style={{ width: '100px' }}>
                <a href="https://t.me/metaland_discovery" target="_blank" rel="noreferrer">Audit</a>
              </button>
            </li>
            <li className="nav-btn">
              <button className="btn-dark-blue" style={{ width: '100px' }}>
                <a href="https://t.me/metaland_discovery" target="_blank" rel="noreferrer">KYC</a>
              </button>
            </li>
          </ul>
        </nav>
      </header>
      <div className="container">
        <div className="box">
          <h1>Login with MetaMask</h1>
          {account ? (
            <p>Connected as {account}</p>
          ) : (
            <button onClick={connectMetaMask}>Connect MetaMask</button>
          )}
          {hasNFT && <p>Redirecting...</p>}
        </div>
        <div className="box">
          <img src="https://d1yei2z3i6k35z.cloudfront.net/2979038/665e42fcb5ddb_Progettosenzatitolo-2024-06-03T182543.555.png" alt="NFT" className="img-fluid" />
          <p>Buy one of our NFTs</p>
          <button className="btn-dark-blue">
            <a href="https://opensea.io/collection/metalandluminar/overview" target="_blank" rel="noreferrer">Buy NFT</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
