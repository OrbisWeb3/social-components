import React, { useRef, useContext, useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import useOrbis from "../../hooks/useOrbis";
import { GlobalContext } from "../../contexts/GlobalContext";
import LoadingCircle from "../LoadingCircle";
import Modal from "../Modal";
import Button from "../Button";
import { defaultTheme, getThemeValue } from "../../utils/themes";
import { sleep } from "../../utils";

/** Manage WalletConnect */
import { EthereumProvider } from '@walletconnect/ethereum-provider';

/** Modal for users to connect: Options displayed can be enabled / disabled with the parameters */
export default function ConnectModal({ lit = false, title = "Connect to join the discussion", description = "You must be connected to share posts or reactions.", hide, authMethods }) {
  const { orbis, theme } = useOrbis();
  const wrapperRef = useRef(null);

  /** Is triggered when clicked outside the component */
  useOutsideClick(wrapperRef, () => hide());

  return(
    <Modal hide={() => hide()} title={title} description={description} width={370}>
      <div style={{display: "flex", flexDirection: "column"}}>
        {/** Connect with Metamask (only if window.ethereum is available) */}
        {authMethods.includes("metamask") &&
          <WalletButton lit={lit} type="metamask" label={<><MetamaskIcon className="mr-2" /> Metamask</>} bg="#F18F62" hoverColor="#F48552" callback={hide} />
        }

        {/** Connect with WalletConnect */}
        {authMethods.includes("wallet-connect") &&
          <WalletButton lit={lit} type="wallet-connect" label={<><WalletConnectIcon className="mr-2" /> WalletConnect</>} bg="#468DEE" hoverColor="#3280EB" callback={hide} />
        }

        {/** Connect with Phantom */}
        {authMethods.includes("phantom") &&
          <WalletButton lit={lit} type="phantom" label={<><PhantomIcon className="mr-2" /> Phantom</>} bg="#6450E3" hoverColor="#4B34DD" callback={hide} />
        }

        {/** Connect with Email */}
        {authMethods.includes("email") &&
          <WalletButton lit={lit} type="email" label={<><EmailIcon className="mr-2" /> Email</>} bg="#000" hoverColor="#F48552" callback={hide} />
        }
      </div>
    </Modal>
  )
}

/** Will render one connect button based on its type */
const WalletButton = ({ lit, callback, type, label, bg, hoverColor }) => {
  const { orbis, magic, user, setUser, setCredentials } = useOrbis();
  const [status, setStatus] = useState(0);

  async function connect() {
    setStatus(1);
    let provider;
    let chain = "ethereum";

    /** Select provider based on the user's choice */
    let res;
    switch (type) {
      /** Metamask */
      case "metamask":
        provider = window.ethereum;
        res = await orbis.connect_v2({provider: provider, chain: chain, lit: lit});
        break;

      /** Wallet Connect */
      case "wallet-connect":
        /** Enable session (triggers QR Code modal) *//** Create WalletConnect Provider */

        /** Initiate the WC provider */
        const wc_provider = await EthereumProvider.init({
          projectId: '9fe6eef52f4985e5849a5c1e2c80fabb', // required
          chains: [1], // required
          showQrModal: true // requires @walletconnect/modal
        });
        await wc_provider.enable();

        //await wc_provider.enable();
        res = await orbis.connect(wc_provider, false);
        break;

      /** Phantom */
      case "phantom":
        const isPhantomInstalled = window.phantom?.solana?.isPhantom;
        if(!isPhantomInstalled) {
          alert("Phantom is not installed on this browser.");
          setStatus(3);
          await sleep(1500);
          setStatus(0);
          return;
        }
        provider = window.phantom?.solana;
        chain = "solana";

        res = await orbis.connect_v2({provider: provider, chain: chain, lit: lit});
        break;

      /** Using Magic to connect */
      case "email":
        res = await orbis.connect_v2({
          provider: magic.rpcProvider,
          chain: "ethereum",
          lit: lit
        });
        break;
    }

    /** Connect to Orbis */
    try {
      if(res.status == 200) {
        /** Save new user object in state */
        setUser(res.details);
        setStatus(2);

        /** Retrieve credentials for this user */
        loadCredentials(res.details.did);

        /** Save provider type in localStorage */
        localStorage.setItem("provider-type", type);
        callback();
      } else {
        alert("Error connecting to Orbis");
        console.log("Error connecting to Orbis: ", res);
        setStatus(3);
        await sleep(1500);
        setStatus(0);
      }
    } catch(e) {
      alert("Error calling Orbis connect function.");
    }
  }

  /** Load credentials for the connected user */
  async function loadCredentials(did) {
    let { data, error, status } = await orbis.api.rpc("get_verifiable_credentials", {
	    q_subject: did,
	    q_min_weight: 10
	  });

    if(data && data.length > 0) {
      setCredentials(data);
    } else {
      fetchCredentials(did);
    }
  }

  /** Will query our API to fetch credentials for this did */
  async function fetchCredentials(did) {
    console.log("Fetching credentials for a did.")
    let res = await fetch("https://api.orbis.club/mint-credentials/" + did, {
      method: 'GET'
    });
    let result = await res.json();
    if(result.status == 200) {
      await sleep(3000);
      loadCredentials(did);
    }
  }

  return(
    <Button style={{width: "100%", justifyContent: "center", backgroundColor: bg, marginTop: "0.75rem", paddingTop: "0.75rem", paddingBottom: "0.75rem", fontWeight: "500", fontSize: 15, color: "#FFF"}} onClick={() => connect()}>{status == 1 ? <LoadingCircle /> : label}</Button>
  )
}

const MetamaskIcon = ({className}) => {
  return(
    <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: "0.5rem"}}>
      <g clipPath="url(#clip0_970_803)">
      <path d="M25.2066 0L14.2219 8.1279L16.2646 3.3379L25.2066 0Z" fill="#E17726"/>
      <path d="M0.819135 0.00952148L9.73724 3.33842L11.6768 8.19122L0.819135 0.00952148ZM20.786 17.2857L25.6411 17.3781L23.9443 23.1423L18.02 21.5112L20.786 17.2857ZM5.21394 17.2857L7.96964 21.5112L2.05534 23.1424L0.368835 17.3781L5.21394 17.2857Z" fill="#E27625"/>
      <path d="M11.4131 6.95529L11.6115 13.3636L5.67444 13.0935L7.36324 10.5457L7.38464 10.5212L11.4131 6.95529ZM14.5254 6.88379L18.6154 10.5214L18.6366 10.5458L20.3254 13.0936L14.3896 13.3636L14.5254 6.88379ZM8.14354 17.3045L11.3853 19.8304L7.61954 21.6485L8.14354 17.3045ZM17.8571 17.3041L18.3702 21.6486L14.6149 19.8302L17.8571 17.3041Z" fill="#E27625"/>
      <path d="M14.6978 19.5923L18.5085 21.4375L14.9638 23.1221L15.0006 22.0087L14.6978 19.5923ZM11.3011 19.5931L11.0102 21.9905L11.0341 23.1208L7.48114 21.4375L11.3011 19.5931Z" fill="#D5BFB2"/>
      <path d="M10.2007 14.2L11.1965 16.2928L7.80621 15.2996L10.2007 14.2ZM15.7992 14.2002L18.205 15.2996L14.8036 16.2925L15.7992 14.2002Z" fill="#233447"/>
      <path d="M8.4026 17.2829L7.8546 21.7869L4.9173 17.3814L8.4026 17.2829ZM17.5976 17.283L21.083 17.3814L18.1347 21.7871L17.5976 17.283ZM20.4112 12.8386L17.8747 15.4237L15.919 14.53L14.9827 16.4984L14.3689 13.1135L20.4112 12.8386ZM5.5875 12.8386L11.631 13.1135L11.0171 16.4984L10.0806 14.5303L8.1353 15.4238L5.5875 12.8386Z" fill="#CC6228"/>
      <path d="M5.41663 12.3082L8.28643 15.2203L8.38583 18.0952L5.41663 12.3082ZM20.5863 12.303L17.6117 18.1003L17.7237 15.2203L20.5863 12.303ZM11.4907 12.4856L11.6062 13.2126L11.8916 15.0237L11.7081 20.5862L10.8406 16.1177L10.8403 16.0715L11.4907 12.4856ZM14.5078 12.4755L15.1599 16.0715L15.1596 16.1177L14.2899 20.5974L14.2555 19.4769L14.1198 14.9907L14.5078 12.4755Z" fill="#E27525"/>
      <path d="M17.9788 15.1045L17.8817 17.6023L14.8543 19.961L14.2423 19.5286L14.9283 15.9951L17.9788 15.1045ZM8.03174 15.1045L11.0716 15.9951L11.7576 19.5286L11.1456 19.961L8.11814 17.6021L8.03174 15.1045Z" fill="#F5841F"/>
      <path d="M6.90179 20.8857L10.775 22.7209L10.7586 21.9372L11.0827 21.6527H14.9161L15.2519 21.9362L15.2271 22.7193L19.0758 20.8903L17.203 22.4379L14.9385 23.9932H11.0516L8.78859 22.4315L6.90179 20.8857Z" fill="#C0AC9D"/>
      <path d="M14.4204 19.3479L14.968 19.7348L15.2889 22.2952L14.8245 21.9031H11.1769L10.7213 22.3031L11.0317 19.735L11.5795 19.3479H14.4204Z" fill="#161616"/>
      <path d="M24.4814 0.225098L25.8 4.1808L24.9765 8.1805L25.5629 8.6328L24.7694 9.2382L25.3658 9.6988L24.5761 10.4179L25.0609 10.769L23.7743 12.2716L18.4973 10.7351L18.4516 10.7106L14.6489 7.5028L24.4814 0.225098ZM1.51861 0.225098L11.3512 7.5028L7.54841 10.7106L7.50271 10.7351L2.22571 12.2716L0.939112 10.769L1.42351 10.4182L0.634312 9.6988L1.22951 9.2387L0.424112 8.6316L1.03261 8.179L0.200012 4.181L1.51861 0.225098Z" fill="#763E1A"/>
      <path d="M18.2392 10.3991L23.8305 12.027L25.647 17.6256H20.8546L17.5526 17.6672L19.954 12.9864L18.2392 10.3991ZM7.7608 10.3991L6.0457 12.9864L8.4474 17.6672L5.1469 17.6256H0.363098L2.1694 12.0271L7.7608 10.3991ZM16.5384 3.31128L14.9745 7.53518L14.6426 13.2412L14.5156 15.0297L14.5055 19.5985H11.4944L11.4846 15.0383L11.3572 13.2397L11.0252 7.53518L9.4615 3.31128H16.5384Z" fill="#F5841F"/>
      </g>
      <defs>
      <clipPath id="clip0_970_803">
      <rect width="25.6" height="24" fill="white" transform="translate(0.200012)"/>
      </clipPath>
      </defs>
    </svg>
  )
}

const WalletConnectIcon = ({className}) => {
  return(
    <svg width="28" height="16" viewBox="0 0 28 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: "0.5rem"}}>
      <path d="M6.29178 3.1261C10.5489 -1.04203 17.4512 -1.04203 21.7083 3.1261L22.2208 3.62772C22.2714 3.67672 22.3115 3.73538 22.3389 3.80019C22.3664 3.86501 22.3805 3.93468 22.3805 4.00506C22.3805 4.07545 22.3664 4.14511 22.3389 4.20993C22.3115 4.27475 22.2714 4.3334 22.2208 4.38241L20.4682 6.09846C20.4165 6.14859 20.3474 6.17662 20.2755 6.17662C20.2035 6.17662 20.1344 6.14859 20.0828 6.09846L19.3776 5.40813C16.4077 2.5003 11.5924 2.5003 8.62257 5.40813L7.86752 6.14741C7.81589 6.19754 7.74676 6.22557 7.67481 6.22557C7.60285 6.22557 7.53373 6.19754 7.4821 6.14741L5.72943 4.43136C5.67891 4.38235 5.63875 4.3237 5.61132 4.25888C5.58389 4.19406 5.56976 4.12439 5.56976 4.05401C5.56976 3.98363 5.58389 3.91396 5.61132 3.84914C5.63875 3.78432 5.67891 3.72567 5.72943 3.67666L6.29178 3.1261ZM25.3332 6.67495L26.8929 8.20229C26.9435 8.25128 26.9837 8.30993 27.0111 8.37475C27.0386 8.43957 27.0527 8.50925 27.0527 8.57964C27.0527 8.65003 27.0386 8.7197 27.0111 8.78452C26.9837 8.84934 26.9435 8.90799 26.8929 8.95698L19.8594 15.8437C19.7562 15.9439 19.6179 16 19.474 16C19.3301 16 19.1918 15.9439 19.0886 15.8437L14.0965 10.956C14.0707 10.931 14.0361 10.9169 14.0002 10.9169C13.9642 10.9169 13.9296 10.931 13.9038 10.956L8.91172 15.8435C8.80847 15.9437 8.67022 15.9998 8.52631 15.9998C8.3824 15.9998 8.24415 15.9437 8.14089 15.8435L1.10699 8.95716C1.05648 8.90816 1.01631 8.8495 0.988886 8.78469C0.961459 8.71987 0.947327 8.6502 0.947327 8.57982C0.947327 8.50943 0.961459 8.43977 0.988886 8.37495C1.01631 8.31013 1.05648 8.25148 1.10699 8.20247L2.66696 6.67513C2.77021 6.57489 2.90846 6.51881 3.05238 6.51881C3.19629 6.51881 3.33454 6.57489 3.43779 6.67513L8.43005 11.5624C8.45586 11.5875 8.49042 11.6015 8.5264 11.6015C8.56238 11.6015 8.59694 11.5875 8.62275 11.5624L13.6146 6.67495C13.7179 6.57471 13.8561 6.51863 14.0001 6.51863C14.144 6.51863 14.2822 6.57471 14.3855 6.67495L19.3776 11.5626C19.4034 11.5877 19.4379 11.6017 19.4739 11.6017C19.5099 11.6017 19.5444 11.5877 19.5703 11.5626L24.5623 6.67513C24.6656 6.57489 24.8038 6.51881 24.9477 6.51881C25.0917 6.51881 25.2299 6.57489 25.3332 6.67513V6.67495Z" fill="white"/>
    </svg>
  )
}

const PhantomIcon = ({className}) => {
  return(
    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: "0.5rem"}}>
      <g clipPath="url(#clip0_970_832)">
      <path d="M10.5 20C16.0228 20 20.5 15.5228 20.5 10C20.5 4.47715 16.0228 0 10.5 0C4.97715 0 0.5 4.47715 0.5 10C0.5 15.5228 4.97715 20 10.5 20Z" fill="url(#paint0_linear_970_832)"/>
      <path d="M17.6589 10.1217H15.8961C15.8961 6.52916 12.9735 3.61694 9.36812 3.61694C5.80739 3.61694 2.91246 6.45787 2.84161 9.98893C2.76831 13.6389 6.20485 16.8085 9.8683 16.8085H10.3291C13.5589 16.8085 17.8878 14.2891 18.5641 11.2195C18.689 10.6536 18.2405 10.1217 17.6589 10.1217ZM6.74842 10.2818C6.74842 10.7622 6.35408 11.1552 5.87194 11.1552C5.3898 11.1552 4.99548 10.762 4.99548 10.2818V8.86893C4.99548 8.38851 5.3898 7.99557 5.87194 7.99557C6.35408 7.99557 6.74842 8.38851 6.74842 8.86893V10.2818ZM9.79183 10.2818C9.79183 10.7622 9.39754 11.1552 8.91542 11.1552C8.43324 11.1552 8.03895 10.762 8.03895 10.2818V8.86893C8.03895 8.38851 8.43342 7.99557 8.91542 7.99557C9.39754 7.99557 9.79183 8.38851 9.79183 8.86893V10.2818Z" fill="url(#paint1_linear_970_832)"/>
      </g>
      <defs>
      <linearGradient id="paint0_linear_970_832" x1="10.5" y1="0" x2="10.5" y2="20" gradientUnits="userSpaceOnUse">
      <stop stopColor="#534BB1"/>
      <stop offset="1" stopColor="#551BF9"/>
      </linearGradient>
      <linearGradient id="paint1_linear_970_832" x1="10.7128" y1="3.61694" x2="10.7128" y2="16.8085" gradientUnits="userSpaceOnUse">
      <stop stopColor="white"/>
      <stop offset="1" stopColor="white" stopOpacity="0.82"/>
      </linearGradient>
      <clipPath id="clip0_970_832">
      <rect width="20" height="20" fill="white" transform="translate(0.5)"/>
      </clipPath>
      </defs>
    </svg>
  )
}

const EmailIcon = ({className}) => {
  return(
    <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: "0.5rem"}}>
      <path d="M0.5 5.6691V14.25C0.5 15.9069 1.84315 17.25 3.5 17.25H18.5C20.1569 17.25 21.5 15.9069 21.5 14.25V5.6691L12.5723 11.1631C11.6081 11.7564 10.3919 11.7564 9.42771 11.1631L0.5 5.6691Z" fill="#FFF"/>
      <path d="M21.5 3.90783V3.75C21.5 2.09315 20.1569 0.75 18.5 0.75H3.5C1.84315 0.75 0.5 2.09315 0.5 3.75V3.90783L10.2139 9.88558C10.696 10.1823 11.304 10.1823 11.7861 9.88558L21.5 3.90783Z" fill="#FFF"/>
    </svg>

  )
}
