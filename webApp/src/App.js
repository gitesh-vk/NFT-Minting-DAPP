import "./App.css";
import MyImage from './img/myImage.png';
import Button from '@mui/material/Button';
 
import { useEffect, useState } from "react";
import { Contract, BrowserProvider } from "ethers";
import NFT from "./abi/horoscopeNFT.json";
 
const NFT_CONTRACT_ADDRESS = "0x5c512A1eaF19a7A55909F6749345152f58B46d17";
 
function App() {
  const [isWalletInstalled, setIsWalletInstalled] = useState(false);
  const [date, setDate] = useState("1992-08-31");
  const [zodiacSign, setZodiacSign] = useState(null);
 
  // state for whether the app is minting or not.
  const [isMinting, setIsMinting] = useState(false);
 
  const [NFTContract, setNFTContract] = useState(null);
 
  const [account, setAccount] = useState(null);
 
  useEffect(() => {
    if (window.ethereum) {
      setIsWalletInstalled(true);
    }
  }, []);
 
  function handleDateInput({ target }) {
    setDate(target.value);
  }
 
  async function connectWallet() {
    window.ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .then((accounts) => {
        setAccount(accounts[0]);
      })
      .catch((error) => {
        alert("Something went wrong");
      });
  }
 
  useEffect(() => {
    calculateZodiacSign(date);
  }, [date]);
 
 
  function calculateZodiacSign(date) {
    let dateObject = new Date(date);
    let day = dateObject.getDate();
    let month = dateObject.getMonth();
    if (month == 0) {
      if (day >= 20) {
        setZodiacSign("Aquarius");
      } else {
        setZodiacSign("Capricorn");
      }
    } else if (month == 1) {
      if (day >= 19) {
        setZodiacSign("Pisces");
      } else {
        setZodiacSign("Aquarius");
      }
    } else if (month == 2) {
      if (day >= 21) {
        setZodiacSign("Aries");
      } else {
        setZodiacSign("Pisces");
      }
    } else if (month == 3) {
      if (day >= 20) {
        setZodiacSign("Taurus");
      } else {
        setZodiacSign("Aries");
      }
    } else if (month == 4) {
      if (day >= 21) {
        setZodiacSign("Gemini");
      } else {
        setZodiacSign("Taurus");
      }
    } else if (month == 5) {
      if (day >= 21) {
        setZodiacSign("Cancer");
      } else {
        setZodiacSign("Gemini");
      }
    } else if (month == 6) {
      if (day >= 23) {
        setZodiacSign("Leo");
      } else {
        setZodiacSign("Cancer");
      }
    } else if (month == 7) {
      if (day >= 23) {
        setZodiacSign("Virgo");
      } else {
        setZodiacSign("Leo");
      }
    } else if (month == 8) {
      if (day >= 23) {
        setZodiacSign("Libra");
      } else {
        setZodiacSign("Virgo");
      }
    } else if (month == 9) {
      if (day >= 23) {
        setZodiacSign("Scorpio");
      } else {
        setZodiacSign("Libra");
      }
    } else if (month == 10) {
      if (day >= 22) {
        setZodiacSign("Sagittarius");
      } else {
        setZodiacSign("Scorpio");
      }
    } else if (month == 11) {
      if (day >= 22) {
        setZodiacSign("Capricorn");
      } else {
        setZodiacSign("Sagittarius");
      }
    }
  }
 
  useEffect(() => {
    function initNFTContract() {
      const provider = new BrowserProvider(window.ethereum);
      provider.getSigner().then((signer) => {
        setNFTContract(new Contract(NFT_CONTRACT_ADDRESS, NFT.abi, signer));
      }).catch((error) => {
        console.error("Error initializing contract:", error);
      });
    }
    initNFTContract();
  }, [account]);
 
  async function mintNFT() {
    setIsMinting(true);
    try {
      const transaction = await NFTContract.mintNFT(account, zodiacSign);
  
      // Wait for the transaction to be confirmed
      await transaction.wait();
  
      // Transaction is confirmed, you can perform any additional actions here if needed
    } catch (e) {
      console.error(e);
    } finally {
      alert("Minting Successful")
      setIsMinting(false);
    }
  }
  
  if (account === null) {
    return (
      <div className="App">
      <article class="main">
      <img src={MyImage} alt="Description of the image" style={{ width: '500px', height: '500px' }} />
    
  </article>
  <section class="side">
    <h1>Horoscope NFT Minting Dapp</h1>
    <h3>"Welcome to the NFT minting platform! To create your unique NFT, kindly link your cryptocurrency wallet securely."</h3>
    
    <p align="left">"Step into the NFT creation zone! Connect your cryptocurrency wallet to mint your exclusive digital collectible." <br /><br />

"Get started on minting your NFT! Simply link your cryptocurrency wallet to initiate the creation process."<br /><br />

"Begin the journey of minting your one-of-a-kind NFT! Connect your cryptocurrency wallet to unlock the artistic process."<br /><br />

"Ready to make your mark in the world of NFTs? Link your cryptocurrency wallet to start minting your own digital masterpiece."<br /><br />

"Welcome to the NFT minting platform! Connect your cryptocurrency wallet now and transform your creativity into a unique digital asset."</p>
        <br />
        {isWalletInstalled ? (
          <Button variant="contained" color="secondary" onClick={connectWallet}>Connect Wallet</Button>
        ) : (
          <p>Install Metamask wallet</p>
        )}
  </section>
        
      </div>
    );
  }
  return (
    <div className="App">
      <article class="main">
      <img src={MyImage} alt="Description of the image" style={{ width: '500px', height: '500px' }} />
    
  </article>

  <section class="side">

      <h1>Horoscope NFT Minting Dapp</h1>
      <p>Connected as: {account}</p>
 
      <input onChange={handleDateInput} value={date} type="date" id="dob" />
      <br />
      <br />
      {zodiacSign ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMinYMin meet"
          viewBox="0 0 300 300"
          width="400px"
          height="400px"
        >
          <style>{`.base { fill: white; font-family: serif; font-size: 24px;`}</style>
          <rect width="100%" height="100%" fill="black" />
          <text
            x="50%"
            y="50%"
            class="base"
            dominant-baseline="middle"
            text-anchor="middle"
          >
            {zodiacSign}
          </text>
        </svg>
      ) : null}
 
      <br />
      <br />
      <Button variant="contained" color="secondary" disabled={isMinting} onClick={mintNFT}>
        {isMinting ? "Minting..." : "Mint"}
      </Button>
      </section>
    </div>
  );
}
export default App;