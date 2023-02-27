import React, { useState, useEffect, useRef, useContext } from "react";
import LoadingCircle from "../LoadingCircle";
import { BoltIcon } from "../../icons";
import { GlobalContext } from "../../contexts/GlobalContext";
import { defaultTheme, getThemeValue, getStyle } from "../../utils/themes";
import useOrbis from "../../hooks/useOrbis";

/** Import CSS */
import styles from './ConnectButton.module.css';

export default function ConnectButton({ lit = false }) {
  const { orbis, user, theme, setUser, setCredentials, connecting, setConnectModalVis } = useOrbis();

  return(
    <>
      <button className={styles.connectBtn} style={{...getStyle("button-main", theme, "main"), ...getThemeValue("font", theme, "buttons"), width: "100%", textAlign: "center"}} onClick={() => setConnectModalVis(true)}>{connecting ? <LoadingCircle /> : <BoltIcon style={{marginRight: "0.25rem"}} /> }Connect</button>
    </>
  )

  /*return(
    <button className="inline-flex w-3/5 justify-center items-center border border-transparent bg-[#4E75F6] px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-[#3E67F0] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-full" onClick={connectWithMagic}>{connecting ? <LoadingCircle /> : <BoltIcon className="mr-1" /> }Connect</button>
  )*/
}
