import React, { useState, useEffect, useRef, useContext } from "react";
import LoadingCircle from "../LoadingCircle";
import { BoltIcon } from "../../icons";
import ConnectModal from "../ConnectModal";
import { GlobalContext } from "../../contexts/GlobalContext";
export default function ConnectButton({
  lit = false
}) {
  const {
    orbis,
    user,
    setUser
  } = useContext(GlobalContext);
  const [connecting, setConnecting] = useState(false);
  const [connectModalVis, setConnectModalVis] = useState(false);
  useEffect(() => {
    if (!user) {
      checkOrbisConnected();
    }
    async function checkOrbisConnected() {
      if (localStorage.getItem("ceramic-session")) {
        setConnecting(true);
      }
      let res = await orbis.isConnected();
      if (res && res.status == 200) {
        setUser(res.details);
      }
      setConnecting(false);
    }
  }, [user]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    className: "w-full inline-flex justify-center items-center border border-transparent bg-[#4E75F6] px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-[#3E67F0] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-full",
    onClick: () => setConnectModalVis(true)
  }, connecting ? /*#__PURE__*/React.createElement(LoadingCircle, null) : /*#__PURE__*/React.createElement(BoltIcon, {
    className: "mr-1"
  }), "Connect"), connectModalVis && /*#__PURE__*/React.createElement(ConnectModal, {
    orbis: orbis,
    lit: lit,
    hide: () => setConnectModalVis(false)
  }));

  /*return(
    <button className="inline-flex w-3/5 justify-center items-center border border-transparent bg-[#4E75F6] px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-[#3E67F0] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-full" onClick={connectWithMagic}>{connecting ? <LoadingCircle /> : <BoltIcon className="mr-1" /> }Connect</button>
  )*/
}