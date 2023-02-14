import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Comments, defaultTheme, darkTheme } from "./lib";

let moonTheme = {
  bg: {
    main: "#1B1320",
    secondary: "#170f1c",
    tertiary: "#140918"
  },
  color: {
    main: "#fff",
    secondary: "#9BA2AB",
    tertiary: "#9a9c9f",
    green: "#66f4aa"
  },
  border: {
    main: "#34314a",
    secondary: "#1b182c"
  },
  badges: {
    main: {
      bg: "#323B49",
      color: "#C6CAD2"
    },
    twitter: {
      bg: "rgba(230, 241, 248,0.05)",
      color: "#1DA1F2"
    }
  }
}

function App() {
  const [theme, setTheme] = useState(defaultTheme);
  const [selectedTheme, setSelectedTheme] = useState("white");

  function selectTheme(_theme) {
    setSelectedTheme(_theme);
    switch (_theme) {
      case "white":
        setTheme(defaultTheme);
        break;
      case "dark":
        setTheme(darkTheme);
        break;
      case "dark_purple":
        setTheme(moonTheme);
        break;
    }
  }

  return (
    <div className="App" className="flex flex-col" style={{paddingTop: 50, padding: 20, backgroundColor: "#000", justifyContent: "center", height: "100%"}}>
      <div className="w-full py-5 mt-10">
        {/** Select pre-defined theme */}
        <div className="flex flex justify-center">
          <span className="isolate inline-flex rounded-md shadow-sm">
            <div className={`relative inline-flex items-center rounded-l-md border px-4 py-2 text-sm font-medium ${selectedTheme == "white" ? "bg-[#4E75F6] text-white" : "bg-transparent text-white" }`} onClick={() => selectTheme("white")} style={{borderColor: "#34314a"}}>White</div>
            <div className={`relative inline-flex -ml-px items-center border px-4 py-2 text-sm font-medium ${selectedTheme == "dark" ? "bg-[#4E75F6] text-white" : "bg-transparent text-white" }`} onClick={() => selectTheme("dark")} style={{borderColor: "#34314a"}}>Dark</div>
            <div className={`relative inline-flex -ml-px items-center rounded-r-md border px-4 py-2 text-sm font-medium ${selectedTheme == "dark_purple" ? "bg-[#4E75F6] text-white" : "bg-transparent text-white" }`} onClick={() => selectTheme("dark_purple")} style={{borderColor: "#34314a"}}>Purple</div>
          </span>
        </div>
      </div>
      <div className="w-full justify-center flex">
        <div className="flex" style={{paddingTop: 40, maxWidth: 750, width: "100%"}}>
          <Comments theme="kjzl6cwe1jw149wbqi4g5wrcc7dynyidmz2bvokqxc3r90l1g6mhslqjtpehqac" context="kjzl6cwe1jw14bfqkxc7uc1v2u4f9s1wsew70yzvk86fplfaqxoqe0po3fc1z63:test" options={{node: "https://node2.orbis.club", useLit: false}} />
        </div>
      </div>
    </div>
  );
}

export default App;
