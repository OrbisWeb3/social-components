import React, { useState, useEffect, useRef, useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { Orbis } from "@orbisclub/orbis-sdk";
import { defaultTheme, getThemeValue } from "../../utils/themes";

/** For Magic */
import Web3 from 'web3';
import { Magic } from 'magic-sdk';
import { ConnectExtension } from '@magic-ext/connect';

/** Initialize the Orbis class object */
let orbis = new Orbis({
  useLit: false
});

/** Initialize Magic */
let magic;
let web3;
if (typeof window !== "undefined") {
  magic = new Magic('pk_live_2E6B3B065093108E', {
    network: 'mainnet',
    extensions: [new ConnectExtension()]
  });
  web3 = new Web3(magic.rpcProvider);
}
;
export default function OrbisProvider({
  context,
  children,
  theme
}) {
  const [user, setUser] = useState();
  return /*#__PURE__*/React.createElement(GlobalContext.Provider, {
    value: {
      user,
      setUser,
      orbis,
      magic,
      context,
      theme
    }
  }, children);
}