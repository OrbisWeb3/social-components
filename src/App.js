import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Orbis, Discussion, Chat, Inbox, defaultTheme, darkTheme } from "./lib";

const orbisOptions = {
  useLit: false,
  node: "https://node1.orbis.club",
  PINATA_GATEWAY: 'https://orbis.mypinata.cloud/ipfs/',
  PINATA_API_KEY: '194337be204670686a63',
  PINATA_SECRET_API_KEY: 'd69ee5685fec8cd9012e9e02d28c6d017d22770de68c703f72eb368537b609bf'
};

let _orbis = new Orbis({
  useLit: false,
  node: "https://node2.orbis.club",
  PINATA_GATEWAY: 'https://orbis.mypinata.cloud/ipfs/',
  PINATA_API_KEY: '194337be204670686a63',
  PINATA_SECRET_API_KEY: 'd69ee5685fec8cd9012e9e02d28c6d017d22770de68c703f72eb368537b609bf'
});

function App() {
  const [theme, setTheme] = useState(defaultTheme);
  const [selectedTheme, setSelectedTheme] = useState("white");

  return (
    <div className="App" className="flex flex-col" style={{paddingTop: 50, padding: 20, backgroundColor: "#000", justifyContent: "center", height: "100%"}}>
      <div className="w-full py-5 mt-10">

      </div>
      <div className="w-full justify-center flex">
        <div className="flex" style={{paddingTop: 40, maxWidth: 950}}>
          <Chat authMethods={["metamask", "wallet-connect", "google"]} defaultOrbis={_orbis} context="kjzl6cwe1jw14bkmib9zetk3z352cs0gy4km3y7u3bqoi93ffoxg3249nvt1ui3" options={{node: "https://node2.orbis.club", useLit: true}} />
        </div>
      </div>
    </div>
  );
}

export default App;
