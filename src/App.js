import { useEffect, useState } from 'react';
import twitterLogo from './assets/twitter-logo.svg';
import './App.css';

// Constants
const TWITTER_HANDLE = '@aar2dee21';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const STARSHIP_IMAGES = [
  "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gq.com%2Fstory%2Fwhen-is-star-wars-going-to-kill-the-millennium-falcon&psig=AOvVaw0IsjQ2x_Qv4Ab8nOw1ryv_&ust=1637005470249000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCMDdu97OmPQCFQAAAAAdAAAAABAN",
  "https://www.teslarati.com/wp-content/uploads/2021/03/Starship-SN10-030221-SpaceX-flip-burn-1-edit-c.jpg",
  "https://hips.hearstapps.com/pop.h-cdn.co/assets/16/26/4000x2000/landscape-1467144815-starshipenterprise.jpg?resize=980:*",
  "https://1.bp.blogspot.com/-mc7DADIp_tg/V1xcL2udqsI/AAAAAAAAaZQ/oYPNUuiYBx81MA49fwD4V-VTXB9uuUmegCLcB/s1600/Arie-1B2001.jpg",
  "https://cdn.mos.cms.futurecdn.net/J63UVXVf7hKkKiSkcrgeYF-970-80.jpg",
  "https://www.denofgeek.com/wp-content/uploads/2019/09/battlestar-galactica-reboot.jpeg",
  "https://cdn.mos.cms.futurecdn.net/CFjbzhVTR7w7rjec4K8JL8-1024-80.jpg.webp",
  "https://cdnb.artstation.com/p/assets/images/images/018/786/631/large/hangar-b-productions-sa-43-7.jpg?1560729690",
  "https://st.renderu.com/artwork/522578",
  "https://lumiere-a.akamaihd.net/v1/images/ISD-Gallery-1_a016bea1.jpeg",
  "https://lumiere-a.akamaihd.net/v1/images/e6d_ia_2581_47f64de7.jpeg?region=254%2C0%2C1426%2C802",
  "https://media.moddb.com/cache/images/mods/1/14/13461/thumb_620x2000/cis_munificent_0.jpg",
];

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log("Phantom wallet found!");

          const response = await solana.connect({ onlyIfTrusted: true });
          console.log(
            'Connected with Public Key:', 
            response.publicKey.toString()
          );
          setWalletAddress(response.publicKey.toString());

        }
      } else {
        alert("Solana object not found. Get a Phantom wallet.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async() => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log("Connected with public key:", response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  const renderNotConnectedContainer = () => (
    <button className="cta-button connect-wallet-button" onClick={connectWallet}>Connect to Wallet</button>
  );

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">Starship Stan 🚀</p>
          <p className="sub-text">
            Answer some Star Wars trivia to mint a new starship name NFT ✨
          </p>
          {/* Render your connect to wallet button right here */}
          {!walletAddress && renderNotConnectedContainer()}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built by @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
