import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Discussion, Inbox, defaultTheme, darkTheme } from "./lib";

function App() {
  const [theme, setTheme] = useState(defaultTheme);
  const [selectedTheme, setSelectedTheme] = useState("white");


  return (
    <div className="App" className="flex flex-col" style={{paddingTop: 50, padding: 20, backgroundColor: "#000", justifyContent: "center", height: "100%"}}>
      <div className="w-full py-5 mt-10">

      </div>
      <div className="w-full justify-center flex">
        <div className="flex" style={{paddingTop: 40, maxWidth: 950}}>
          <Discussion context="kjzl6cwe1jw146lrrwfwc56epyxa1z3xxs95sfl5xi3luzux2jvi1arcw7onbpp" options={{node: "https://node2.orbis.club", useLit: true}} />
        </div>
      </div>
    </div>
  );
}

export default App;
