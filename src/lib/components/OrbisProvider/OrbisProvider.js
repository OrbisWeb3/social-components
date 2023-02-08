import React, { useState, useEffect, useRef, useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { Orbis } from "@orbisclub/orbis-sdk";
import { defaultTheme, getThemeValue } from "../../utils/themes";

/** For Magic */
import Web3 from 'web3';
import { Magic } from 'magic-sdk';
import { ConnectExtension } from '@magic-ext/connect';

/** Initialize Magic */
let magic;
let web3;
if (typeof window !== "undefined") {
  magic = new Magic('pk_live_2E6B3B065093108E', {
    network: 'mainnet',
    extensions: [new ConnectExtension()]
  });
  web3 = new Web3(magic.rpcProvider);
};


export default function OrbisProvider({ context, children, theme = defaultTheme, options }) {
  const [user, setUser] = useState();
  const [orbis, setOrbis] = useState(new Orbis(options ? options : null));
  const [activeTheme, setActiveTheme] = useState(theme);

  useEffect(() => {
    if(theme) {
      /** theme object passed is alredy in the JSON format, use it directly */
      if(typeof theme === 'object') {
        setActiveTheme(theme);
      } else {
        loadStyle();
      }
    }

    async function loadStyle() {
      let styleStream = await orbis.ceramic.loadStream(theme);
      setActiveTheme(styleStream.content?.theme);
    }
  }, [theme, orbis])

  useEffect(() => {
    console.log("activeTheme updated to:", activeTheme);
  }, [activeTheme]);

  return(
    <GlobalContext.Provider value={{ user, setUser, orbis, magic, context, theme: activeTheme }}>
      {children}
    </GlobalContext.Provider>
  )
}
