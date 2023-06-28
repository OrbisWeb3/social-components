import React, { useState, useEffect, useRef, useContext } from "react";
import LoadingCircle from "../LoadingCircle";
import { BoltIcon } from "../../icons";
import { GlobalContext } from "../../contexts/GlobalContext";
import { defaultTheme, getThemeValue, getStyle } from "../../utils/themes";
import useOrbis from "../../hooks/useOrbis";

/** Manage WalletConnect */
import { EthereumProvider } from '@walletconnect/ethereum-provider';

/** Import CSS */
import styles from './ConnectButton.module.css';

export default function ConnectButton({ icon = <BoltIcon style={{marginRight: "0.25rem"}} />, lit = false, litOnly = false, title = "Connect", style }) {
  const { orbis, magic, user, theme, setUser, setCredentials, connecting, setConnecting, setConnectModalVis } = useOrbis();

  async function connectToLit() {
    console.log("Enter connectToLit()");

    /** Show loading state */
    setConnecting(true);

    /** Get provider type in localStorage and Initiate provider netowrk */
    let chain = "ethereum";
    let providerType = localStorage.getItem("provider-type");
    let provider;

    switch (providerType) {
      /** Metamask */
      case "metamask":
        provider = window.ethereum;
        break;

      /** Magic */
      case "email":
        provider = magic.rpcProvider;
        break;

      /** Wallet Connect */
      case "wallet-connect":
        /** Create WalletConnect Provider */
        const wc_provider = await EthereumProvider.init({
          projectId: '9fe6eef52f4985e5849a5c1e2c80fabb', // required
          chains: [1], // required
          showQrModal: true // requires @walletconnect/modal
        });
        await wc_provider.enable();

        /** Enable session (triggers QR Code modal) */
        break;

      /** Phantom */
      case "phantom":
        provider = window.phantom?.solana;
        chain = "solana";
        break;

      /** Default: Metamask */
      default:
        provider = window.ethereum;
        break;
    }

    /** Connect only to Lit protocol */
    let res = await orbis.connectLit(provider);

    if(res.status == 200) {
      console.log("Success connecting to Lit!:", res);

      /** Save new user object in state */
      let _user = {...user};
      _user.hasLit = true;
      setConnecting(false);
      setUser(_user);
    } else {
      console.log("Error connecting to Lit: ", res);
    }
  }

  /** Will either trigger the Lit connection or show the connect modal with the different wallets options */
  function submit() {
    if(litOnly) {
      connectToLit()
    } else {
      setConnectModalVis(true)
    }
  }

  return(
    <>
      <button className={styles.connectBtn} style={style ? style : {...getStyle("button-main", theme, "main"), ...getThemeValue("font", theme, "buttons"), width: "100%", textAlign: "center"}} onClick={() => submit()}>{connecting ? <LoadingCircle style={{marginRight: 5}} /> : icon }{title}</button>
    </>
  )

  /*return(
    <button className="inline-flex w-3/5 justify-center items-center border border-transparent bg-[#4E75F6] px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-[#3E67F0] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-full" onClick={connectWithMagic}>{connecting ? <LoadingCircle /> : <BoltIcon className="mr-1" /> }Connect</button>
  )*/
}
