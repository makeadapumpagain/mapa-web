// pages/index.tsx

import { useState, useEffect } from "react";
import { useWallet } from "@meshsdk/react";
import { CardanoWallet } from "@meshsdk/react";
import Image from "next/image";
import Swap from '@dexhunterio/swaps';
import '@dexhunterio/swaps/lib/assets/style.css';

// Utility function to format large numbers with K, M, B notation
const formatNumber = (num: number) => {
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + "B";
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
  return num.toString();
};

// Define tier thresholds and names
const tiers = [
  { name: "Fish", threshold: 0, imageUrl: "/images/fish.png" },
  { name: "Shrimp", threshold: 10_000_000, imageUrl: "/images/shrimp.png" },
  { name: "Dolphin", threshold: 50_000_000, imageUrl: "/images/dolphin.png" },
  { name: "Shark", threshold: 100_000_000, imageUrl: "/images/shark.png" },
  { name: "Whale", threshold: 1_000_000_000, imageUrl: "/images/whale.png" },
];

const Home: React.FC = () => {
  const { connected, wallet } = useWallet();
  const [loading, setLoading] = useState<boolean>(false);
  const [mapaQuantity, setMapaQuantity] = useState<number | null>(null);
  const [currentTier, setCurrentTier] = useState(tiers[0]);
  const [nextTier, setNextTier] = useState<null | typeof tiers[0]>(null);
  const [showWallet, setShowWallet] = useState(false);
  const [showSwap, setShowSwap] = useState(false);

  useEffect(() => {
    if (connected) {
      fetchMapaBalance();
    }
  }, [connected]);

  async function fetchMapaBalance() {
    if (wallet) {
      setLoading(true);
      try {
        const assets = await wallet.getBalance();
        const mapaToken = assets.find((token) => token.unit.includes("3f5a84bbf0196878e2b728a82a88061fecba7367620f4f4c1b38f183"));
        setMapaQuantity(mapaToken ? Number(mapaToken.quantity) : 0);
        calculateTier(Number(mapaToken?.quantity || 0));
      } catch (error) {
        console.error("Error fetching MAPA balance:", error);
      } finally {
        setLoading(false);
      }
    }
  }

  function calculateTier(balance: number) {
    let holderTier = tiers[0];
    let nextHolderTier = null;

    for (let i = 0; i < tiers.length; i++) {
      if (balance >= tiers[i].threshold) {
        holderTier = tiers[i];
        nextHolderTier = tiers[i + 1] || null;
      } else {
        break;
      }
    }

    setCurrentTier(holderTier);
    setNextTier(nextHolderTier);
  }

  function handleBitcoinClick() {
    alert("Xverse wallet integration coming soon!");
  }

  function handleCardanoClick() {
    setShowWallet(true);
  }

  function openSwapModal() {
    setShowSwap(true);
  }

  function closeSwapModal() {
    setShowSwap(false);
  }

  return (
    <div className="container">
      {!showWallet ? (
        <div className="landing">
          <Image
            src="https://cdn.pixabay.com/photo/2021/04/30/16/47/bitcoin-logo-6219385_1280.png"
            alt="Bitcoin Logo"
            width={150}
            height={150}
            className="landing-logo"
            onClick={handleBitcoinClick}
          />
          <Image
            src="https://w7.pngwing.com/pngs/844/873/png-transparent-cardano-zug-cryptocurrency-blockchain-ethereum-bitcoin-wallet-thumbnail.png"
            alt="Cardano Logo"
            width={150}
            height={150}
            className="landing-logo"
            onClick={handleCardanoClick}
          />
        </div>
      ) : (
        <div className="holder-tier">
          <CardanoWallet />
          {connected && (
            <div className="tier-display">
              <div className="tier-info">
                <div className="tier-image" style={{ backgroundImage: `url(${currentTier.imageUrl})` }}></div>
                <div className="tier-name">You are a <strong>{currentTier.name}</strong> holder!</div>
                <div className="balance">
                  MAPA Balance: <strong>{formatNumber(mapaQuantity || 0)}</strong>
                </div>
              </div>
              {nextTier && (
                <div className="next-tier-info">
                  <p>
                    Buy {formatNumber(nextTier.threshold - (mapaQuantity || 0))} MAPA to become a {nextTier.name}!
                  </p>
                  <button onClick={openSwapModal}>Buy MAPA on DexHunter</button>
                </div>
              )}
            </div>
          )}
          {loading && <p>Loading...</p>}
        </div>
      )}

      {/* Swap Modal */}
      {showSwap && (
        <div className="modal-overlay" onClick={closeSwapModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeSwapModal}>
              &times;
            </button>
            <Swap
              orderTypes={["SWAP","LIMIT"]}
              defaultToken="3f5a84bbf0196878e2b728a82a88061fecba7367620f4f4c1b38f1834d616b6541646150756d70416761696e"
              supportedTokens={["3f5a84bbf0196878e2b728a82a88061fecba7367620f4f4c1b38f1834d616b6541646150756d70416761696e"]}
              colors={{"background":"#ECEFFA","containers":"#F8F9FF","subText":"#98A3C9","mainText":"#0E120E","buttonText":"#FFFFFF","accent":"#007DFF"}}
              theme="dark"
              width="450"
              partnerCode="mapa616464723171786c7a3930357766353075703673737264666d3039746b707832743668706a373676796173637a68383036613466756c6379367977657a6c686867677478337767397a756461767470656a73667972787376687a657770377468736168666d6b37da39a3ee5e6b4b0d3255bfef95601890afd80709"
              partnerName="MAPA"
              displayType="FULL"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;