import React, { useContext, useRef, useEffect, useState } from 'react';
import { decryptString, Orbis } from '@orbisclub/orbis-sdk';
export { Orbis } from '@orbisclub/orbis-sdk';
import 'react-string-replace';
import { getAddressFromDid } from '@orbisclub/orbis-sdk/utils/index.js';
import ReactTimeAgo from 'react-time-ago';
import { marked } from 'marked';
import WalletConnectProvider$1 from '@walletconnect/web3-provider';
import Web3 from 'web3';
import { Magic } from 'magic-sdk';
import { ConnectExtension } from '@magic-ext/connect';
import TimeAgo from 'javascript-time-ago';
export { default as TimeAgo } from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';

const defaultTheme = {
  font: {
    main: {
      fontFamily: "Inter",
      fontSize: 15,
      fontWeight: 500
    },
    secondary: {
      fontFamily: "Inter",
      fontSize: 15
    },
    actions: {
      fontFamily: "Inter",
      fontSize: 12
    },
    buttons: {
      fontFamily: "Inter",
      fontSize: 14,
      fontWeight: 500
    },
    input: {
      fontFamily: "Inter",
      fontSize: 14
    },
    badges: {
      fontFamily: "Inter",
      fontSize: 12,
      fontWeight: 500
    }
  },
  bg: {
    main: "#FFF",
    secondary: "#f8fafc",
    tertiary: "#f3f4f6"
  },
  color: {
    main: "#0D1E33",
    secondary: "#798496",
    tertiary: "#d1d5db",
    quattro: "#F1F2F3",
    green: "#35c67b",
    active: "#4E75F6"
  },
  border: {
    main: "#E0E2E5",
    secondary: "#eaeaea"
  },
  button: {
    main: {
      bg: "#4E75F6",
      color: "#FFF"
    },
    secondary: {
      bg: "#efefef",
      color: "#333"
    },
    green: {
      bg: "#6ee7b7",
      color: "#374151"
    },
    red: {
      bg: "#ffc7c7",
      color: "#a02323"
    }
  },
  badges: {
    main: {
      bg: "#E0E2E5",
      color: "#465466"
    },
    red: {
      bg: "#ffc7c7",
      color: "#a02323"
    },
    twitter: {
      bg: "rgb(88 92 96 / 5%)",
      color: "#1DA1F2"
    },
    uniswap: {
      bg: "#FFE5F1",
      color: "#FF007A"
    },
    thegraph: {
      bg: "#dfeff9",
      color: "#226AD8"
    },
    sushiswap: {
      bg: "#efe6ff",
      color: "#CC63AF"
    },
    hop: {
      bg: "#FDEFFF",
      color: "#D064D1"
    },
    lido: {
      bg: "#fee7e2",
      color: "#273852"
    },
    opensea: {
      bg: "#e3f2ff",
      color: "#2081E2"
    },
    snapshot: {
      bg: "#FFFBEC",
      color: "#273852"
    },
    sismo: {
      bg: "#F1F4FF",
      color: "#13203D"
    },
    active_wallet_mainnet: {
      bg: "#F8F8F8",
      color: "#34341F"
    },
    active_wallet_polygon: {
      bg: "#F4EEFF",
      color: "#8247E5"
    },
    active_wallet_arbitrum: {
      bg: "#E7F5FF",
      color: "#2D374B"
    },
    active_wallet_optimism: {
      bg: "#FFF8F8",
      color: "#FF0420"
    },
    x2y2: {
      bg: "#E2FAFF",
      color: "#4652D4"
    },
    looksrare: {
      bg: "#EFFFF6",
      color: "#000000"
    },
    email: {
      bg: "#F5F1CA",
      color: "#2A150F"
    }
  }
};
const darkTheme = {
  font: {
    main: {
      fontFamily: "Inter",
      fontSize: 15,
      fontWeight: 500
    },
    secondary: {
      fontFamily: "Inter",
      fontSize: 15
    },
    actions: {
      fontFamily: "Inter",
      fontSize: 12
    },
    buttons: {
      fontFamily: "Inter",
      fontSize: 14,
      fontWeight: 500
    },
    input: {
      fontFamily: "Inter",
      fontSize: 14
    },
    badges: {
      fontFamily: "Inter",
      fontSize: 12,
      fontWeight: 500
    }
  },
  bg: {
    main: "#1D1F20",
    secondary: "#252626",
    tertiary: "#323334"
  },
  color: {
    main: "#fff",
    secondary: "#9BA2AB",
    tertiary: "#d1d5db",
    quattro: "#F1F2F3",
    green: "#35c67b",
    active: "#4E75F6"
  },
  border: {
    main: "#323B49",
    secondary: "#1b182c"
  },
  button: {
    main: {
      bg: "#4E75F6",
      color: "#FFF"
    },
    secondary: {
      bg: "#efefef",
      color: "#333"
    },
    green: {
      bg: "#6ee7b7",
      color: "#374151"
    },
    red: {
      bg: "#ffc7c7",
      color: "#a02323"
    }
  },
  badges: {
    main: {
      bg: "#2D3643",
      color: "#9BA2AB"
    },
    red: {
      bg: "#ffc7c7",
      color: "#a02323"
    },
    twitter: {
      bg: "rgb(88 92 96 / 5%)",
      color: "#1DA1F2"
    },
    uniswap: {
      bg: "#FFE5F1",
      color: "#FF007A"
    },
    thegraph: {
      bg: "#dfeff9",
      color: "#226AD8"
    },
    sushiswap: {
      bg: "#efe6ff",
      color: "#CC63AF"
    },
    hop: {
      bg: "#FDEFFF",
      color: "#D064D1"
    },
    lido: {
      bg: "#fee7e2",
      color: "#273852"
    },
    opensea: {
      bg: "#e3f2ff",
      color: "#2081E2"
    },
    snapshot: {
      bg: "#FFFBEC",
      color: "#273852"
    },
    sismo: {
      bg: "#F1F4FF",
      color: "#13203D"
    },
    active_wallet_mainnet: {
      bg: "#F8F8F8",
      color: "#34341F"
    },
    active_wallet_polygon: {
      bg: "#F4EEFF",
      color: "#8247E5"
    },
    active_wallet_arbitrum: {
      bg: "#E7F5FF",
      color: "#2D374B"
    },
    active_wallet_optimism: {
      bg: "#FFF8F8",
      color: "#FF0420"
    },
    x2y2: {
      bg: "#E2FAFF",
      color: "#4652D4"
    },
    looksrare: {
      bg: "#EFFFF6",
      color: "#000000"
    },
    email: {
      bg: "#F5F1CA",
      color: "#2A150F"
    }
  }
};
function getThemeValue(type, theme, data) {
  var _theme$bg, _theme$bg3, _theme$color2, _theme$border2, _theme$bg4, _theme$bg5, _theme$bg6, _theme$border3, _theme$border4, _theme$badges, _theme$badges$main, _theme$badges2, _theme$badges2$main, _theme$badges3, _theme$badges3$red, _theme$badges4, _theme$badges4$red, _theme$badges5, _theme$badges5$twitte, _theme$badges6, _theme$badges6$twitte, _theme$button, _theme$button$main, _theme$button2, _theme$button2$main, _theme$button3, _theme$button3$main, _theme$button4, _theme$button4$main, _theme$button5, _theme$button5$second, _theme$button6, _theme$button6$second, _theme$button7, _theme$button7$green, _theme$button8, _theme$button8$green, _theme$color3, _theme$button9, _theme$button9$red, _theme$button10, _theme$button10$red, _theme$font, _theme$font$main, _theme$font2, _theme$font2$main, _theme$font3, _theme$font3$main, _theme$font4, _theme$font4$secondar, _theme$font5, _theme$font5$secondar, _theme$font6, _theme$font6$actions, _theme$font7, _theme$font7$actions, _theme$font8, _theme$font8$buttons, _theme$font9, _theme$font9$buttons, _theme$font10, _theme$font10$buttons, _theme$font11, _theme$font11$input, _theme$font12, _theme$font12$input, _theme$font13, _theme$font13$badges, _theme$font14, _theme$font14$badges, _theme$font15, _theme$font15$badges;
  let bgMain = theme !== null && theme !== void 0 && (_theme$bg = theme.bg) !== null && _theme$bg !== void 0 && _theme$bg.main ? theme.bg.main : defaultTheme.bg.main;
  let bgTertiary = theme !== null && theme !== void 0 && (_theme$bg3 = theme.bg) !== null && _theme$bg3 !== void 0 && _theme$bg3.tertiary ? theme.bg.tertiary : defaultTheme.bg.tertiary;
  switch (type) {
    case "input":
      return {
        background: data ? bgTertiary : bgMain,
        color: theme !== null && theme !== void 0 && (_theme$color2 = theme.color) !== null && _theme$color2 !== void 0 && _theme$color2.main ? theme.color.main : defaultTheme.color.main,
        border: theme !== null && theme !== void 0 && (_theme$border2 = theme.border) !== null && _theme$border2 !== void 0 && _theme$border2.main ? theme.border.main : defaultTheme.border.main
      };
    case "bg":
      switch (data) {
        case "main":
          return theme !== null && theme !== void 0 && (_theme$bg4 = theme.bg) !== null && _theme$bg4 !== void 0 && _theme$bg4.main ? theme.bg.main : defaultTheme.bg.main;
        case "secondary":
          return theme !== null && theme !== void 0 && (_theme$bg5 = theme.bg) !== null && _theme$bg5 !== void 0 && _theme$bg5.secondary ? theme.bg.secondary : defaultTheme.bg.secondary;
        case "tertiary":
          return theme !== null && theme !== void 0 && (_theme$bg6 = theme.bg) !== null && _theme$bg6 !== void 0 && _theme$bg6.tertiary ? theme.bg.tertiary : defaultTheme.bg.tertiary;
        default:
          return null;
      }
    case "color":
      if (theme && theme["color"] && theme["color"][data]) {
        return theme["color"][data];
      } else if (defaultTheme && defaultTheme["color"] && defaultTheme["color"][data]) {
        return defaultTheme["color"][data];
      } else {
        return null;
      }
    case "border":
      switch (data) {
        case "main":
          return theme !== null && theme !== void 0 && (_theme$border3 = theme.border) !== null && _theme$border3 !== void 0 && _theme$border3.main ? theme.border.main : defaultTheme.border.main;
        case "secondary":
          return theme !== null && theme !== void 0 && (_theme$border4 = theme.border) !== null && _theme$border4 !== void 0 && _theme$border4.secondary ? theme.border.secondary : defaultTheme.border.secondary;
        default:
          return null;
      }
    case "badges":
      switch (data) {
        case "main":
          return {
            background: theme !== null && theme !== void 0 && (_theme$badges = theme.badges) !== null && _theme$badges !== void 0 && (_theme$badges$main = _theme$badges.main) !== null && _theme$badges$main !== void 0 && _theme$badges$main.bg ? theme.badges.main.bg : defaultTheme.badges.main.bg,
            color: theme !== null && theme !== void 0 && (_theme$badges2 = theme.badges) !== null && _theme$badges2 !== void 0 && (_theme$badges2$main = _theme$badges2.main) !== null && _theme$badges2$main !== void 0 && _theme$badges2$main.color ? theme.badges.main.color : defaultTheme.badges.main.color
          };
        case "red":
          return {
            background: theme !== null && theme !== void 0 && (_theme$badges3 = theme.badges) !== null && _theme$badges3 !== void 0 && (_theme$badges3$red = _theme$badges3.red) !== null && _theme$badges3$red !== void 0 && _theme$badges3$red.bg ? theme.badges.red.bg : defaultTheme.badges.red.bg,
            color: theme !== null && theme !== void 0 && (_theme$badges4 = theme.badges) !== null && _theme$badges4 !== void 0 && (_theme$badges4$red = _theme$badges4.red) !== null && _theme$badges4$red !== void 0 && _theme$badges4$red.color ? theme.badges.red.color : defaultTheme.badges.red.color
          };
        case "twitter":
          return {
            background: theme !== null && theme !== void 0 && (_theme$badges5 = theme.badges) !== null && _theme$badges5 !== void 0 && (_theme$badges5$twitte = _theme$badges5.twitter) !== null && _theme$badges5$twitte !== void 0 && _theme$badges5$twitte.bg ? theme.badges.twitter.bg : defaultTheme.badges.twitter.bg,
            color: theme !== null && theme !== void 0 && (_theme$badges6 = theme.badges) !== null && _theme$badges6 !== void 0 && (_theme$badges6$twitte = _theme$badges6.twitter) !== null && _theme$badges6$twitte !== void 0 && _theme$badges6$twitte.color ? theme.badges.twitter.color : defaultTheme.badges.twitter.color
          };
        default:
          return null;
      }
    case "button":
      switch (data) {
        case "primary":
          return {
            background: theme !== null && theme !== void 0 && (_theme$button = theme.button) !== null && _theme$button !== void 0 && (_theme$button$main = _theme$button.main) !== null && _theme$button$main !== void 0 && _theme$button$main.bg ? theme.button.main.bg : defaultTheme.button.main.bg,
            color: theme !== null && theme !== void 0 && (_theme$button2 = theme.button) !== null && _theme$button2 !== void 0 && (_theme$button2$main = _theme$button2.main) !== null && _theme$button2$main !== void 0 && _theme$button2$main.color ? theme.button.main.color : defaultTheme.button.main.color
          };
        case "main":
          return {
            background: theme !== null && theme !== void 0 && (_theme$button3 = theme.button) !== null && _theme$button3 !== void 0 && (_theme$button3$main = _theme$button3.main) !== null && _theme$button3$main !== void 0 && _theme$button3$main.bg ? theme.button.main.bg : defaultTheme.button.main.bg,
            color: theme !== null && theme !== void 0 && (_theme$button4 = theme.button) !== null && _theme$button4 !== void 0 && (_theme$button4$main = _theme$button4.main) !== null && _theme$button4$main !== void 0 && _theme$button4$main.color ? theme.button.main.color : defaultTheme.button.main.color
          };
        case "secondary":
          return {
            background: theme !== null && theme !== void 0 && (_theme$button5 = theme.button) !== null && _theme$button5 !== void 0 && (_theme$button5$second = _theme$button5.secondary) !== null && _theme$button5$second !== void 0 && _theme$button5$second.bg ? theme.button.secondary.bg : defaultTheme.button.secondary.bg,
            color: theme !== null && theme !== void 0 && (_theme$button6 = theme.button) !== null && _theme$button6 !== void 0 && (_theme$button6$second = _theme$button6.secondary) !== null && _theme$button6$second !== void 0 && _theme$button6$second.color ? theme.button.secondary.color : defaultTheme.button.secondary.color
          };
        case "green":
          return {
            background: theme !== null && theme !== void 0 && (_theme$button7 = theme.button) !== null && _theme$button7 !== void 0 && (_theme$button7$green = _theme$button7.green) !== null && _theme$button7$green !== void 0 && _theme$button7$green.bg ? theme.button.green.bg : defaultTheme.button.green.bg,
            color: theme !== null && theme !== void 0 && (_theme$button8 = theme.button) !== null && _theme$button8 !== void 0 && (_theme$button8$green = _theme$button8.green) !== null && _theme$button8$green !== void 0 && _theme$button8$green.color ? theme.button.green.color : defaultTheme.button.green.color
          };
        case "green-transparent":
          return {
            background: "transparent",
            color: theme !== null && theme !== void 0 && (_theme$color3 = theme.color) !== null && _theme$color3 !== void 0 && _theme$color3.green ? theme.color.green : defaultTheme.color.green
          };
        case "red":
          return {
            background: theme !== null && theme !== void 0 && (_theme$button9 = theme.button) !== null && _theme$button9 !== void 0 && (_theme$button9$red = _theme$button9.red) !== null && _theme$button9$red !== void 0 && _theme$button9$red.bg ? theme.button.red.bg : defaultTheme.button.red.bg,
            color: theme !== null && theme !== void 0 && (_theme$button10 = theme.button) !== null && _theme$button10 !== void 0 && (_theme$button10$red = _theme$button10.red) !== null && _theme$button10$red !== void 0 && _theme$button10$red.color ? theme.button.red.color : defaultTheme.button.red.color
          };
      }
      break;
    case "font":
      switch (data) {
        case "main":
          return {
            fontFamily: theme !== null && theme !== void 0 && (_theme$font = theme.font) !== null && _theme$font !== void 0 && (_theme$font$main = _theme$font.main) !== null && _theme$font$main !== void 0 && _theme$font$main.fontFamily ? theme.font.main.fontFamily : defaultTheme.font.main.fontFamily,
            fontSize: theme !== null && theme !== void 0 && (_theme$font2 = theme.font) !== null && _theme$font2 !== void 0 && (_theme$font2$main = _theme$font2.main) !== null && _theme$font2$main !== void 0 && _theme$font2$main.fontSize ? theme.font.main.fontSize : defaultTheme.font.main.fontSize,
            fontWeight: theme !== null && theme !== void 0 && (_theme$font3 = theme.font) !== null && _theme$font3 !== void 0 && (_theme$font3$main = _theme$font3.main) !== null && _theme$font3$main !== void 0 && _theme$font3$main.fontWeight ? theme.font.main.fontWeight : defaultTheme.font.main.fontWeight
          };
        case "secondary":
          return {
            fontFamily: theme !== null && theme !== void 0 && (_theme$font4 = theme.font) !== null && _theme$font4 !== void 0 && (_theme$font4$secondar = _theme$font4.secondary) !== null && _theme$font4$secondar !== void 0 && _theme$font4$secondar.fontFamily ? theme.font.secondary.fontFamily : defaultTheme.font.secondary.fontFamily,
            fontSize: theme !== null && theme !== void 0 && (_theme$font5 = theme.font) !== null && _theme$font5 !== void 0 && (_theme$font5$secondar = _theme$font5.secondary) !== null && _theme$font5$secondar !== void 0 && _theme$font5$secondar.fontSize ? theme.font.secondary.fontSize : defaultTheme.font.secondary.fontSize
          };
        case "actions":
          return {
            fontFamily: theme !== null && theme !== void 0 && (_theme$font6 = theme.font) !== null && _theme$font6 !== void 0 && (_theme$font6$actions = _theme$font6.actions) !== null && _theme$font6$actions !== void 0 && _theme$font6$actions.fontFamily ? theme.font.actions.fontFamily : defaultTheme.font.actions.fontFamily,
            fontSize: theme !== null && theme !== void 0 && (_theme$font7 = theme.font) !== null && _theme$font7 !== void 0 && (_theme$font7$actions = _theme$font7.actions) !== null && _theme$font7$actions !== void 0 && _theme$font7$actions.fontSize ? theme.font.actions.fontSize : defaultTheme.font.actions.fontSize
          };
        case "buttons":
          return {
            fontFamily: theme !== null && theme !== void 0 && (_theme$font8 = theme.font) !== null && _theme$font8 !== void 0 && (_theme$font8$buttons = _theme$font8.buttons) !== null && _theme$font8$buttons !== void 0 && _theme$font8$buttons.fontFamily ? theme.font.buttons.fontFamily : defaultTheme.font.buttons.fontFamily,
            fontSize: theme !== null && theme !== void 0 && (_theme$font9 = theme.font) !== null && _theme$font9 !== void 0 && (_theme$font9$buttons = _theme$font9.buttons) !== null && _theme$font9$buttons !== void 0 && _theme$font9$buttons.fontSize ? theme.font.buttons.fontSize : defaultTheme.font.buttons.fontSize,
            fontWeight: theme !== null && theme !== void 0 && (_theme$font10 = theme.font) !== null && _theme$font10 !== void 0 && (_theme$font10$buttons = _theme$font10.buttons) !== null && _theme$font10$buttons !== void 0 && _theme$font10$buttons.fontWeight ? theme.font.buttons.fontWeight : defaultTheme.font.buttons.fontWeight
          };
        case "input":
          return {
            fontFamily: theme !== null && theme !== void 0 && (_theme$font11 = theme.font) !== null && _theme$font11 !== void 0 && (_theme$font11$input = _theme$font11.input) !== null && _theme$font11$input !== void 0 && _theme$font11$input.fontFamily ? theme.font.input.fontFamily : defaultTheme.font.input.fontFamily,
            fontSize: theme !== null && theme !== void 0 && (_theme$font12 = theme.font) !== null && _theme$font12 !== void 0 && (_theme$font12$input = _theme$font12.input) !== null && _theme$font12$input !== void 0 && _theme$font12$input.fontSize ? theme.font.input.fontSize : defaultTheme.font.input.fontSize
          };
        case "badges":
          return {
            fontFamily: theme !== null && theme !== void 0 && (_theme$font13 = theme.font) !== null && _theme$font13 !== void 0 && (_theme$font13$badges = _theme$font13.badges) !== null && _theme$font13$badges !== void 0 && _theme$font13$badges.fontFamily ? theme.font.badges.fontFamily : defaultTheme.font.badges.fontFamily,
            fontSize: theme !== null && theme !== void 0 && (_theme$font14 = theme.font) !== null && _theme$font14 !== void 0 && (_theme$font14$badges = _theme$font14.badges) !== null && _theme$font14$badges !== void 0 && _theme$font14$badges.fontSize ? theme.font.badges.fontSize : defaultTheme.font.badges.fontSize,
            fontWeight: theme !== null && theme !== void 0 && (_theme$font15 = theme.font) !== null && _theme$font15 !== void 0 && (_theme$font15$badges = _theme$font15.badges) !== null && _theme$font15$badges !== void 0 && _theme$font15$badges.fontWeight ? theme.font.badges.fontWeight : defaultTheme.font.badges.fontWeight
          };
      }
      break;
  }
}
function getStyle(type, theme, data) {
  switch (type) {
    case "input":
      return {
        borderColor: getThemeValue("input", theme).border,
        fontSize: 14,
        color: getThemeValue("input", theme, data).color,
        backgroundColor: getThemeValue("input", theme, data).background
      };
    case "button-main":
      return getThemeValue("button", theme, "main");
    case "button-secondary":
      return {
        color: getThemeValue("color", theme, "main")
      };
    case "button":
      switch (data) {
        case "main":
          return getThemeValue("button", theme, "main");
        case "secondary":
          return {
            color: getThemeValue("color", theme, "main")
          };
        case "green":
          return {
            color: getThemeValue("color", theme, "main")
          };
      }
      break;
    case "badge":
      if (theme && theme["badges"] && theme["badges"][data]) {
        return {
          backgroundColor: theme["badges"][data]["bg"],
          color: theme["badges"][data]["color"]
        };
      } else if (defaultTheme && defaultTheme["badges"] && defaultTheme["badges"][data]) {
        return {
          backgroundColor: defaultTheme["badges"][data]["bg"],
          color: defaultTheme["badges"][data]["color"]
        };
      } else {
        return null;
      }
  }
}

const GlobalContext = React.createContext({
  orbis: null,
  user: null,
  magic: null,
  context: null,
  setUser: null,
  theme: defaultTheme,
  accessRules: null
});

function useOrbis() {
  const {
    orbis,
    user,
    setUser,
    credentials,
    setCredentials,
    theme,
    context,
    accessRules,
    hasAccess,
    connecting,
    setConnecting,
    magic,
    connectModalVis,
    setConnectModalVis
  } = useContext(GlobalContext);
  return {
    orbis,
    user,
    setUser,
    credentials,
    setCredentials,
    theme,
    context,
    accessRules,
    hasAccess,
    connecting,
    setConnecting,
    magic,
    connectModalVis,
    setConnectModalVis
  };
}

var styles = {"btnPrimary":"_1sKPO"};

const Button = ({
  color,
  style,
  children,
  onClick
}) => {
  const {
    orbis,
    user,
    theme
  } = useOrbis();
  return /*#__PURE__*/React.createElement("button", {
    className: styles.btnPrimary,
    style: {
      ...getThemeValue("button", theme, color),
      ...getThemeValue("font", theme, "buttons"),
      ...style
    },
    onClick: onClick ? () => onClick() : null
  }, children);
};

function getTimestamp() {
  const cur_timestamp = Math.round(new Date().getTime() / 1000).toString();
  return cur_timestamp;
}
const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};
function shortAddress(_address) {
  if (!_address) {
    return "-";
  }
  const _firstChars = _address.substring(0, 5);
  const _lastChars = _address.substr(_address.length - 5);
  return _firstChars.concat('-', _lastChars);
}
async function getNFTs(address, page, network) {
  let res = await fetch('https://app.orbis.club/api/nfts/get', {
    method: 'POST',
    body: JSON.stringify({
      address: address,
      page: page,
      network: network
    })
  });
  let nfts = await res.json();
  if (nfts && nfts.results && nfts.results.length > 0) {
    return nfts.results;
  } else {
    return [];
  }
}
function checkCredentialOwnership(user_credentials, cred_identifier) {
  let has_vc = false;
  user_credentials.forEach((user_cred, i) => {
    if (user_cred.identifier == cred_identifier) {
      has_vc = true;
    }
  });
  return has_vc;
}
async function getTokenBalance(token, account, successCallback) {
  let res = await fetch('https://api.orbis.club/get-balance', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: token,
      account: account
    })
  });
  let balanceResult = await res.json();
  if (balanceResult && balanceResult.balance && token.minBalance) {
    console.log("balanceResult.balance:", balanceResult.balance);
    console.log("token.minBalance:", token.minBalance);
    if (balanceResult.balance >= parseFloat(token.minBalance)) {
      successCallback();
    }
  }
}

var styles$1 = {"LoadingCircle":"_1fzax","spin":"_esDdM"};

function LoadingCircle({
  style
}) {
  return /*#__PURE__*/React.createElement("svg", {
    className: styles$1.LoadingCircle,
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    style: style
  }, /*#__PURE__*/React.createElement("circle", {
    style: {
      opacity: 0.25
    },
    cx: "12",
    cy: "12",
    r: "10",
    stroke: "currentColor",
    strokeWidth: "4"
  }), /*#__PURE__*/React.createElement("path", {
    style: {
      opacity: 0.75
    },
    fill: "currentColor",
    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  }));
}

const Logo = ({
  color: _color = "#000",
  className
}) => {
  return /*#__PURE__*/React.createElement("svg", {
    width: "85",
    height: "30",
    viewBox: "0 0 85 30",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: className
  }, /*#__PURE__*/React.createElement("path", {
    d: "M40.585 16.5286C40.585 17.5495 40.4368 18.4799 40.1404 19.3197C39.844 20.1595 39.4241 20.8758 38.8807 21.4686C38.3373 22.0614 37.6786 22.5225 36.9047 22.8518C36.1472 23.1811 35.3074 23.3458 34.3853 23.3458C33.4632 23.3458 32.6234 23.1811 31.8659 22.8518C31.1084 22.5225 30.458 22.0614 29.9146 21.4686C29.3712 20.8758 28.9431 20.1595 28.6302 19.3197C28.3338 18.4799 28.1856 17.5495 28.1856 16.5286C28.1856 15.5077 28.3338 14.5855 28.6302 13.7622C28.9431 12.9224 29.3712 12.2061 29.9146 11.6133C30.4745 11.0205 31.1331 10.5677 31.8906 10.2548C32.6481 9.92547 33.4796 9.7608 34.3853 9.7608C35.291 9.7608 36.1225 9.92547 36.88 10.2548C37.6539 10.5677 38.3126 11.0205 38.856 11.6133C39.3994 12.2061 39.8193 12.9224 40.1157 13.7622C40.4286 14.5855 40.585 15.5077 40.585 16.5286ZM37.5222 16.5286C37.5222 15.2442 37.2423 14.2315 36.6824 13.4905C36.139 12.733 35.3733 12.3543 34.3853 12.3543C33.3973 12.3543 32.6234 12.733 32.0635 13.4905C31.5201 14.2315 31.2484 15.2442 31.2484 16.5286C31.2484 17.8295 31.5201 18.8586 32.0635 19.6161C32.6234 20.3736 33.3973 20.7523 34.3853 20.7523C35.3733 20.7523 36.139 20.3736 36.6824 19.6161C37.2423 18.8586 37.5222 17.8295 37.5222 16.5286ZM51.0246 12.7742C50.7776 12.6919 50.4318 12.6095 49.9872 12.5272C49.5591 12.4284 49.0568 12.379 48.4805 12.379C48.1512 12.379 47.7971 12.4119 47.4184 12.4778C47.0561 12.5437 46.8009 12.6013 46.6527 12.6507V23H43.664V10.6994C44.2403 10.4853 44.9566 10.2877 45.8129 10.1066C46.6856 9.909 47.6489 9.8102 48.7028 9.8102C48.9004 9.8102 49.1309 9.82667 49.3944 9.8596C49.6579 9.87607 49.9213 9.909 50.1848 9.9584C50.4483 9.99133 50.7035 10.0407 50.9505 10.1066C51.1975 10.156 51.3951 10.2054 51.5433 10.2548L51.0246 12.7742ZM62.1969 16.5039C62.1969 15.236 61.9417 14.2315 61.4312 13.4905C60.9372 12.7495 60.1468 12.379 59.06 12.379C58.566 12.379 58.0967 12.4531 57.6521 12.6013C57.224 12.7495 56.8782 12.9142 56.6147 13.0953V20.53C56.8288 20.5794 57.1005 20.6288 57.4298 20.6782C57.7756 20.7111 58.1873 20.7276 58.6648 20.7276C59.7681 20.7276 60.6326 20.3571 61.2583 19.6161C61.8841 18.8586 62.1969 17.8212 62.1969 16.5039ZM65.2597 16.5533C65.2597 17.5907 65.1033 18.5293 64.7904 19.3691C64.494 20.1924 64.0577 20.9005 63.4813 21.4933C62.9215 22.0861 62.2381 22.5389 61.4312 22.8518C60.6244 23.1647 59.7105 23.3211 58.6895 23.3211C57.7015 23.3211 56.7547 23.247 55.849 23.0988C54.9598 22.9506 54.2188 22.7859 53.626 22.6048V4.3268L56.6147 3.8328V10.5265C56.9605 10.3454 57.3804 10.1807 57.8744 10.0325C58.3849 9.8843 58.9448 9.8102 59.554 9.8102C60.4597 9.8102 61.2666 9.97487 61.9746 10.3042C62.6992 10.6171 63.3002 11.0699 63.7777 11.6627C64.2553 12.2555 64.6175 12.9718 64.8645 13.8116C65.128 14.6349 65.2597 15.5488 65.2597 16.5533ZM71.3533 23H68.3646V10.0819H71.3533V23ZM71.6744 6.3028C71.6744 6.86267 71.4933 7.30727 71.131 7.6366C70.7687 7.96593 70.3406 8.1306 69.8466 8.1306C69.3361 8.1306 68.8998 7.96593 68.5375 7.6366C68.1752 7.30727 67.9941 6.86267 67.9941 6.3028C67.9941 5.72647 68.1752 5.27363 68.5375 4.9443C68.8998 4.61497 69.3361 4.4503 69.8466 4.4503C70.3406 4.4503 70.7687 4.61497 71.131 4.9443C71.4933 5.27363 71.6744 5.72647 71.6744 6.3028ZM78.4019 20.8511C79.1923 20.8511 79.7686 20.7605 80.1309 20.5794C80.4931 20.3818 80.6743 20.0525 80.6743 19.5914C80.6743 19.1633 80.4767 18.8092 80.0815 18.5293C79.7027 18.2494 79.0688 17.9447 78.1796 17.6154C77.6362 17.4178 77.1339 17.212 76.6729 16.9979C76.2283 16.7674 75.8413 16.5039 75.512 16.2075C75.1826 15.9111 74.9192 15.5571 74.7216 15.1454C74.5404 14.7173 74.4499 14.1986 74.4499 13.5893C74.4499 12.4037 74.8862 11.4733 75.759 10.7982C76.6317 10.1066 77.8173 9.7608 79.3158 9.7608C80.0732 9.7608 80.7978 9.8349 81.4894 9.9831C82.181 10.1148 82.6997 10.2466 83.0455 10.3783L82.5021 12.7989C82.1727 12.6507 81.7528 12.519 81.2424 12.4037C80.7319 12.272 80.1391 12.2061 79.464 12.2061C78.8547 12.2061 78.3607 12.3131 77.982 12.5272C77.6032 12.7248 77.4139 13.0377 77.4139 13.4658C77.4139 13.6799 77.4468 13.8692 77.5127 14.0339C77.595 14.1986 77.7267 14.355 77.9079 14.5032C78.089 14.6349 78.3278 14.7749 78.6242 14.9231C78.9206 15.0548 79.2828 15.1948 79.711 15.343C80.419 15.6065 81.0201 15.8699 81.5141 16.1334C82.0081 16.3804 82.4115 16.6686 82.7244 16.9979C83.0537 17.3108 83.2925 17.673 83.4407 18.0847C83.5889 18.4964 83.663 18.9904 83.663 19.5667C83.663 20.8017 83.2019 21.7403 82.2798 22.3825C81.3741 23.0082 80.0732 23.3211 78.3772 23.3211C77.241 23.3211 76.3271 23.2223 75.6355 23.0247C74.9439 22.8436 74.4581 22.6954 74.1782 22.5801L74.6969 20.0854C75.1415 20.2665 75.6684 20.4394 76.2777 20.6041C76.9034 20.7688 77.6115 20.8511 78.4019 20.8511Z",
    fill: _color
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "11.5",
    cy: "11.5",
    r: "10.4",
    stroke: _color,
    strokeWidth: "2.2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "11.5",
    cy: "22.5",
    r: "6.4",
    stroke: _color,
    strokeWidth: "2.2"
  }));
};
const BoltIcon = ({
  color: _color2 = "#FFF",
  className,
  style
}) => {
  return /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "16",
    viewBox: "0 0 16 18",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: className,
    style: style
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9.98337 0.907179C10.0546 0.574607 9.89318 0.235712 9.59001 0.0815249C9.28684 -0.0726625 8.91787 -0.0035371 8.69108 0.249936L0.191082 9.74994C-0.00614659 9.97037 -0.0553972 10.2861 0.065334 10.5562C0.186065 10.8262 0.454227 11 0.750013 11H7.32227L6.01666 17.0929C5.9454 17.4255 6.10685 17.7644 6.41002 17.9185C6.71318 18.0727 7.08215 18.0036 7.30894 17.7501L15.8089 8.25013C16.0062 8.0297 16.0554 7.71393 15.9347 7.4439C15.814 7.17388 15.5458 7.00003 15.25 7.00003H8.67775L9.98337 0.907179Z",
    fill: _color2
  }));
};
const ReplyIcon = ({
  type
}) => {
  switch (type) {
    case "line":
      return /*#__PURE__*/React.createElement("svg", {
        width: "14",
        height: "11",
        viewBox: "0 0 17 13",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        style: {
          marginRight: "0.25rem"
        }
      }, /*#__PURE__*/React.createElement("path", {
        d: "M6.40127 10.375L0.691272 6.27502C0.556779 6.19554 0.445325 6.08238 0.3679 5.94669C0.290476 5.81101 0.249756 5.65749 0.249756 5.50127C0.249756 5.34505 0.290476 5.19152 0.3679 5.05584C0.445325 4.92015 0.556779 4.80699 0.691272 4.72752L6.40127 0.625016C6.53739 0.544955 6.69226 0.502334 6.85017 0.501478C7.00808 0.500622 7.16341 0.541561 7.30039 0.620141C7.43736 0.69872 7.55111 0.812142 7.63008 0.948893C7.70905 1.08564 7.75043 1.24085 7.75002 1.39877V3.00002C9.62502 3.00002 15.25 3.00002 16.5 13C13.375 7.37502 7.75002 8.00002 7.75002 8.00002V9.60127C7.75002 10.3013 6.99252 10.7238 6.40127 10.3763V10.375Z",
        stroke: "currentColor",
        strokeWidth: "1.5",
        strokeLinecap: "round"
      }));
    case "full":
      return /*#__PURE__*/React.createElement("svg", {
        width: "15",
        height: "12",
        viewBox: "0 0 17 13",
        fill: "currentColor",
        xmlns: "http://www.w3.org/2000/svg",
        style: {
          marginRight: "0.25rem"
        }
      }, /*#__PURE__*/React.createElement("path", {
        d: "M6.40127 10.375L0.691272 6.27502C0.556779 6.19554 0.445325 6.08238 0.3679 5.94669C0.290476 5.81101 0.249756 5.65749 0.249756 5.50127C0.249756 5.34505 0.290476 5.19152 0.3679 5.05584C0.445325 4.92015 0.556779 4.80699 0.691272 4.72752L6.40127 0.625016C6.53739 0.544955 6.69226 0.502334 6.85017 0.501478C7.00808 0.500622 7.16341 0.541561 7.30039 0.620141C7.43736 0.69872 7.55111 0.812142 7.63008 0.948893C7.70905 1.08564 7.75043 1.24085 7.75002 1.39877V3.00002C9.62502 3.00002 15.25 3.00002 16.5 13C13.375 7.37502 7.75002 8.00002 7.75002 8.00002V9.60127C7.75002 10.3013 6.99252 10.7238 6.40127 10.3763V10.375Z",
        fill: "currentColor"
      }));
    default:
      return null;
  }
};
const LikeIcon = ({
  type
}) => {
  switch (type) {
    case "line":
      return /*#__PURE__*/React.createElement("svg", {
        width: "15",
        height: "15",
        viewBox: "0 0 15 15",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        style: {
          marginRight: "0.25rem"
        }
      }, /*#__PURE__*/React.createElement("path", {
        d: "M13.875 4.84375C13.875 3.08334 12.3884 1.65625 10.5547 1.65625C9.18362 1.65625 8.00666 2.45403 7.5 3.59242C6.99334 2.45403 5.81638 1.65625 4.44531 1.65625C2.61155 1.65625 1.125 3.08334 1.125 4.84375C1.125 9.95831 7.5 13.3438 7.5 13.3438C7.5 13.3438 13.875 9.95831 13.875 4.84375Z",
        stroke: "currentColor",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }));
    case "full":
      return /*#__PURE__*/React.createElement("svg", {
        width: "15",
        height: "15",
        viewBox: "0 0 16 15",
        fill: "currentColor",
        xmlns: "http://www.w3.org/2000/svg",
        style: {
          marginRight: "0.25rem"
        }
      }, /*#__PURE__*/React.createElement("path", {
        d: "M7.65298 13.9149L7.6476 13.9121L7.62912 13.9024C7.61341 13.8941 7.59102 13.8822 7.56238 13.8667C7.50511 13.8358 7.42281 13.7907 7.31906 13.732C7.11164 13.6146 6.81794 13.4425 6.46663 13.2206C5.76556 12.7777 4.82731 12.1314 3.88539 11.3197C2.04447 9.73318 0 7.35227 0 4.5C0 2.01472 2.01472 0 4.5 0C5.9144 0 7.17542 0.652377 8 1.67158C8.82458 0.652377 10.0856 0 11.5 0C13.9853 0 16 2.01472 16 4.5C16 7.35227 13.9555 9.73318 12.1146 11.3197C11.1727 12.1314 10.2344 12.7777 9.53337 13.2206C9.18206 13.4425 8.88836 13.6146 8.68094 13.732C8.57719 13.7907 8.49489 13.8358 8.43762 13.8667C8.40898 13.8822 8.38659 13.8941 8.37088 13.9024L8.3524 13.9121L8.34702 13.9149L8.34531 13.9158C8.13 14.03 7.87 14.03 7.65529 13.9161L7.65298 13.9149Z"
      }));
  }
};
const MenuHorizontal = ({
  color: _color3 = "#FFF",
  className
}) => {
  return /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "3",
    viewBox: "0 0 14 3",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: className
  }, /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M0.75 1.5C0.75 0.809644 1.30964 0.25 2 0.25C2.69036 0.25 3.25 0.809644 3.25 1.5C3.25 2.19036 2.69036 2.75 2 2.75C1.30964 2.75 0.75 2.19036 0.75 1.5ZM5.75 1.5C5.75 0.809644 6.30964 0.25 7 0.25C7.69036 0.25 8.25 0.809644 8.25 1.5C8.25 2.19036 7.69036 2.75 7 2.75C6.30964 2.75 5.75 2.19036 5.75 1.5ZM10.75 1.5C10.75 0.809644 11.3096 0.25 12 0.25C12.6904 0.25 13.25 0.809644 13.25 1.5C13.25 2.19036 12.6904 2.75 12 2.75C11.3096 2.75 10.75 2.19036 10.75 1.5Z",
    fill: "#798496"
  }));
};
const CheckIcon = ({
  color: _color4 = "#0F172A",
  style
}) => {
  return /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "13",
    viewBox: "0 0 16 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    style: style
  }, /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M14.7045 1.15347C15.034 1.4045 15.0976 1.87509 14.8466 2.20457L6.84657 12.7046C6.71541 12.8767 6.51627 12.9838 6.30033 12.9983C6.08439 13.0129 5.87271 12.9334 5.71967 12.7804L1.21967 8.28037C0.926777 7.98748 0.926777 7.5126 1.21967 7.21971C1.51256 6.92682 1.98744 6.92682 2.28033 7.21971L6.17351 11.1129L13.6534 1.29551C13.9045 0.966029 14.3751 0.902435 14.7045 1.15347Z",
    fill: _color4,
    stroke: _color4,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
};
const EmptyStateComments = () => {
  const {
    theme
  } = useContext(GlobalContext);
  return /*#__PURE__*/React.createElement("svg", {
    width: "500",
    viewBox: "0 0 522 260",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    style: {
      maxWidth: "65%"
    }
  }, /*#__PURE__*/React.createElement("g", {
    filter: "url(#filter0_dd_999_7901)"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "18.5",
    y: "7",
    width: "427",
    height: "124",
    rx: "24",
    fill: getThemeValue("bg", theme, "tertiary")
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "80.4999",
    cy: "68.9999",
    r: "17.7778",
    fill: getThemeValue("border", theme, "secondary")
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "80.5",
    cy: "69",
    r: "26.6667",
    stroke: "#B291F4",
    strokeWidth: "6.66667"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "124.5",
    y: "42",
    width: "289",
    height: "18",
    rx: "9",
    fill: getThemeValue("border", theme, "secondary")
  }), /*#__PURE__*/React.createElement("rect", {
    x: "124.5",
    y: "78",
    width: "183",
    height: "18",
    rx: "9",
    fill: getThemeValue("border", theme, "secondary")
  }), /*#__PURE__*/React.createElement("rect", {
    x: "19",
    y: "7.5",
    width: "426",
    height: "123",
    rx: "23.5",
    stroke: getThemeValue("border", theme, "secondary")
  })), /*#__PURE__*/React.createElement("g", {
    filter: "url(#filter1_dd_999_7901)"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "76.5",
    y: "107",
    width: "427",
    height: "124",
    rx: "24",
    fill: getThemeValue("bg", theme, "tertiary")
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "138.5",
    cy: "169",
    r: "17.7778",
    fill: getThemeValue("border", theme, "secondary")
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "138.5",
    cy: "169",
    r: "26.6667",
    stroke: "#4E75F6",
    strokeWidth: "6.66667"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "182.5",
    y: "142",
    width: "289",
    height: "18",
    rx: "9",
    fill: getThemeValue("border", theme, "secondary")
  }), /*#__PURE__*/React.createElement("rect", {
    x: "182.5",
    y: "178",
    width: "183",
    height: "18",
    rx: "9",
    fill: getThemeValue("border", theme, "secondary")
  }), /*#__PURE__*/React.createElement("rect", {
    x: "77",
    y: "107.5",
    width: "426",
    height: "123",
    rx: "23.5",
    stroke: getThemeValue("border", theme, "secondary")
  })), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("filter", {
    id: "filter0_dd_999_7901",
    x: "0.5",
    y: "0",
    width: "463",
    height: "160",
    filterUnits: "userSpaceOnUse",
    colorInterpolationFilters: "sRGB"
  }, /*#__PURE__*/React.createElement("feFlood", {
    floodOpacity: "0",
    result: "BackgroundImageFix"
  }), /*#__PURE__*/React.createElement("feColorMatrix", {
    in: "SourceAlpha",
    type: "matrix",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
    result: "hardAlpha"
  }), /*#__PURE__*/React.createElement("feMorphology", {
    radius: "2",
    operator: "erode",
    in: "SourceAlpha",
    result: "effect1_dropShadow_999_7901"
  }), /*#__PURE__*/React.createElement("feOffset", {
    dy: "11"
  }), /*#__PURE__*/React.createElement("feGaussianBlur", {
    stdDeviation: "10"
  }), /*#__PURE__*/React.createElement("feColorMatrix", {
    type: "matrix",
    values: "0 0 0 0 0.0509804 0 0 0 0 0.117647 0 0 0 0 0.2 0 0 0 0.04 0"
  }), /*#__PURE__*/React.createElement("feBlend", {
    mode: "normal",
    in2: "BackgroundImageFix",
    result: "effect1_dropShadow_999_7901"
  }), /*#__PURE__*/React.createElement("feColorMatrix", {
    in: "SourceAlpha",
    type: "matrix",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
    result: "hardAlpha"
  }), /*#__PURE__*/React.createElement("feMorphology", {
    radius: "14",
    operator: "erode",
    in: "SourceAlpha",
    result: "effect2_dropShadow_999_7901"
  }), /*#__PURE__*/React.createElement("feOffset", {
    dy: "14"
  }), /*#__PURE__*/React.createElement("feGaussianBlur", {
    stdDeviation: "6"
  }), /*#__PURE__*/React.createElement("feColorMatrix", {
    type: "matrix",
    values: "0 0 0 0 0.0509804 0 0 0 0 0.117647 0 0 0 0 0.2 0 0 0 0.08 0"
  }), /*#__PURE__*/React.createElement("feBlend", {
    mode: "normal",
    in2: "effect1_dropShadow_999_7901",
    result: "effect2_dropShadow_999_7901"
  }), /*#__PURE__*/React.createElement("feBlend", {
    mode: "normal",
    in: "SourceGraphic",
    in2: "effect2_dropShadow_999_7901",
    result: "shape"
  })), /*#__PURE__*/React.createElement("filter", {
    id: "filter1_dd_999_7901",
    x: "58.5",
    y: "100",
    width: "463",
    height: "160",
    filterUnits: "userSpaceOnUse",
    colorInterpolationFilters: "sRGB"
  }, /*#__PURE__*/React.createElement("feFlood", {
    floodOpacity: "0",
    result: "BackgroundImageFix"
  }), /*#__PURE__*/React.createElement("feColorMatrix", {
    in: "SourceAlpha",
    type: "matrix",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
    result: "hardAlpha"
  }), /*#__PURE__*/React.createElement("feMorphology", {
    radius: "2",
    operator: "erode",
    in: "SourceAlpha",
    result: "effect1_dropShadow_999_7901"
  }), /*#__PURE__*/React.createElement("feOffset", {
    dy: "11"
  }), /*#__PURE__*/React.createElement("feGaussianBlur", {
    stdDeviation: "10"
  }), /*#__PURE__*/React.createElement("feColorMatrix", {
    type: "matrix",
    values: "0 0 0 0 0.0509804 0 0 0 0 0.117647 0 0 0 0 0.2 0 0 0 0.04 0"
  }), /*#__PURE__*/React.createElement("feBlend", {
    mode: "normal",
    in2: "BackgroundImageFix",
    result: "effect1_dropShadow_999_7901"
  }), /*#__PURE__*/React.createElement("feColorMatrix", {
    in: "SourceAlpha",
    type: "matrix",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
    result: "hardAlpha"
  }), /*#__PURE__*/React.createElement("feMorphology", {
    radius: "14",
    operator: "erode",
    in: "SourceAlpha",
    result: "effect2_dropShadow_999_7901"
  }), /*#__PURE__*/React.createElement("feOffset", {
    dy: "14"
  }), /*#__PURE__*/React.createElement("feGaussianBlur", {
    stdDeviation: "6"
  }), /*#__PURE__*/React.createElement("feColorMatrix", {
    type: "matrix",
    values: "0 0 0 0 0.0509804 0 0 0 0 0.117647 0 0 0 0 0.2 0 0 0 0.08 0"
  }), /*#__PURE__*/React.createElement("feBlend", {
    mode: "normal",
    in2: "effect1_dropShadow_999_7901",
    result: "effect2_dropShadow_999_7901"
  }), /*#__PURE__*/React.createElement("feBlend", {
    mode: "normal",
    in: "SourceGraphic",
    in2: "effect2_dropShadow_999_7901",
    result: "shape"
  }))));
};
const EditIcon = () => {
  return /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "15",
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    style: {
      marginLeft: "0.25rem"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M15.2984 1.20163C14.5295 0.432789 13.283 0.432789 12.5141 1.20163L11.6463 2.06949L14.4305 4.85373L15.2984 3.98587C16.0672 3.21702 16.0672 1.97048 15.2984 1.20163Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M13.635 5.64922L10.8508 2.86499L4.55015 9.16562C4.08755 9.62821 3.74751 10.1988 3.56075 10.8258L2.96091 12.8394C2.90195 13.0374 2.95621 13.2517 3.10225 13.3977C3.2483 13.5438 3.46264 13.598 3.66059 13.5391L5.67426 12.9392C6.30123 12.7525 6.8718 12.4124 7.33439 11.9498L13.635 5.64922Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M2.9375 3.43749C1.69486 3.43749 0.6875 4.44485 0.6875 5.68749V13.5625C0.6875 14.8051 1.69486 15.8125 2.9375 15.8125H10.8125C12.0551 15.8125 13.0625 14.8051 13.0625 13.5625V9.62499C13.0625 9.31433 12.8107 9.06249 12.5 9.06249C12.1893 9.06249 11.9375 9.31433 11.9375 9.62499V13.5625C11.9375 14.1838 11.4338 14.6875 10.8125 14.6875H2.9375C2.31618 14.6875 1.8125 14.1838 1.8125 13.5625V5.68749C1.8125 5.06617 2.31618 4.56249 2.9375 4.56249H6.875C7.18566 4.56249 7.4375 4.31065 7.4375 3.99999C7.4375 3.68933 7.18566 3.43749 6.875 3.43749H2.9375Z",
    fill: "currentColor"
  }));
};
const LogoutIcon = () => {
  return /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 20 20",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3.63604 3.63604C0.12132 7.15076 0.12132 12.8492 3.63604 16.364C7.15076 19.8787 12.8492 19.8787 16.364 16.364C19.8787 12.8492 19.8787 7.15076 16.364 3.63604M10 1V10",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
};
const TwitterIcon = ({
  style
}) => {
  return /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "12",
    viewBox: "0 0 512 417",
    fill: "currentColor",
    xmlns: "http://www.w3.org/2000/svg",
    style: style
  }, /*#__PURE__*/React.createElement("path", {
    d: "M459.584 104.552C459.883 109.053 459.883 113.576 459.883 118.12C459.883 256.936 354.197 417 161.003 417V416.915C103.936 417 48.0427 400.659 0 369.832C8.29867 370.835 16.64 371.325 25.0027 371.347C72.32 371.389 118.272 355.517 155.456 326.291C110.507 325.437 71.0827 296.125 57.3227 253.331C73.0667 256.36 89.28 255.741 104.747 251.539C55.7227 241.64 20.48 198.568 20.48 148.563C20.48 148.115 20.48 147.667 20.48 147.24C35.0933 155.389 51.4347 159.891 68.16 160.381C21.9947 129.555 7.744 68.1573 35.6267 20.1573C88.96 85.7787 167.659 125.672 252.117 129.917C243.648 93.4373 255.232 55.208 282.496 29.544C324.8 -10.2427 391.339 -8.19466 431.125 34.1093C454.656 29.48 477.205 20.84 497.835 8.61601C489.984 32.936 473.579 53.5867 451.648 66.728C472.491 64.232 492.821 58.664 512 50.1733C497.899 71.272 480.149 89.6827 459.584 104.552Z"
  }));
};
const GoogleIcon = ({
  style
}) => {
  return /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    style: style
  }, /*#__PURE__*/React.createElement("path", {
    d: "M14.9529 8.36099C14.9529 7.82917 14.9052 7.31781 14.8166 6.8269H7.75293V9.73144H11.7893C11.612 10.6655 11.0802 11.4564 10.2825 11.9882V13.8769H12.7166C14.1347 12.5678 14.9529 10.6451 14.9529 8.36099Z",
    fill: "#4285F4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7.75307 15.6907C9.77807 15.6907 11.4758 15.0225 12.7167 13.8771L10.2826 11.9885C9.61444 12.4385 8.76216 12.7112 7.75307 12.7112C5.80307 12.7112 4.14625 11.3953 3.55307 9.62256H1.05762V11.5589C2.29171 14.0066 4.82125 15.6907 7.75307 15.6907Z",
    fill: "#34A853"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3.55293 9.61569C3.40293 9.16569 3.31429 8.68842 3.31429 8.19069C3.31429 7.69297 3.40293 7.2157 3.55293 6.7657V4.82935H1.05748C0.546112 5.83843 0.25293 6.97706 0.25293 8.19069C0.25293 9.40432 0.546112 10.543 1.05748 11.552L3.00066 10.0384L3.55293 9.61569Z",
    fill: "#FBBC05"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7.75307 3.67702C8.85762 3.67702 9.83943 4.05884 10.6235 4.7952L12.7713 2.64748C11.469 1.43385 9.77807 0.690674 7.75307 0.690674C4.82125 0.690674 2.29171 2.37476 1.05762 4.82929L3.55307 6.76565C4.14625 4.99293 5.80307 3.67702 7.75307 3.67702Z",
    fill: "#EA4335"
  }));
};
const GithubIcon = ({
  style
}) => {
  return /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 12 12",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    style: style
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6.37305 0.746338C3.3343 0.746338 0.873048 3.2699 0.873048 6.38559C0.872424 7.56943 1.2354 8.7234 1.91047 9.68381C2.58554 10.6442 3.53843 11.3623 4.63395 11.7361C4.90895 11.7852 5.0118 11.616 5.0118 11.4677C5.0118 11.334 5.00465 10.8902 5.00465 10.4177C3.62305 10.6788 3.26555 10.0725 3.15555 9.75505C3.0934 9.59264 2.82555 9.09243 2.5918 8.95822C2.3993 8.85277 2.1243 8.59167 2.58465 8.5849C3.01805 8.57757 3.32715 8.99375 3.43055 9.16292C3.92555 10.0156 4.71645 9.77591 5.03215 9.62816C5.08055 9.26161 5.22465 9.01518 5.38305 8.87419C4.1593 8.73321 2.88055 8.24655 2.88055 6.08953C2.88055 5.47598 3.0934 4.96901 3.4443 4.5737C3.3893 4.43272 3.1968 3.85469 3.4993 3.0793C3.4993 3.0793 3.95965 2.93155 5.0118 3.65788C5.45953 3.53047 5.92214 3.46634 6.3868 3.46728C6.8543 3.46728 7.3218 3.53044 7.7618 3.65732C8.8134 2.92422 9.2743 3.07986 9.2743 3.07986C9.5768 3.85526 9.3843 4.43328 9.3293 4.57426C9.67965 4.96901 9.89305 5.46921 9.89305 6.08953C9.89305 8.25388 8.6077 8.73321 7.38395 8.87419C7.58305 9.05014 7.7552 9.38849 7.7552 9.91746C7.7552 10.6714 7.74805 11.2776 7.74805 11.4683C7.74805 11.616 7.85145 11.7919 8.12645 11.7356C9.21821 11.3576 10.1669 10.6381 10.839 9.67844C11.5111 8.71873 11.8727 7.56708 11.873 6.38559C11.873 3.2699 9.4118 0.746338 6.37305 0.746338Z",
    fill: "currentColor"
  }));
};
const UniswapIcon = () => {
  return /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "14",
    viewBox: "0 0 13 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    style: {
      marginRight: 3
    }
  }, /*#__PURE__*/React.createElement("g", {
    clipPath: "url(#clip0_1366_5768)"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3.68764 1.88679C3.5231 1.86141 3.5161 1.85878 3.59399 1.8474C3.74278 1.82465 4.09288 1.85528 4.33444 1.91217C4.89809 2.04521 5.41098 2.38655 5.95888 2.99309L6.10417 3.15413L6.31248 3.12087C7.18946 2.98084 8.08045 3.09199 8.82703 3.43421C9.03271 3.52873 9.35655 3.71603 9.39593 3.76417C9.40994 3.77993 9.43357 3.87795 9.44845 3.98386C9.50446 4.34971 9.47733 4.62891 9.36442 4.83809C9.30316 4.95187 9.29966 4.98775 9.34079 5.08578C9.36046 5.12615 9.39107 5.16019 9.42914 5.18402C9.4672 5.20785 9.51119 5.22051 9.5561 5.22057C9.74165 5.22057 9.94121 4.92299 10.0331 4.50812L10.0699 4.3427L10.1425 4.42498C10.5425 4.87485 10.8558 5.48751 10.9092 5.92338L10.9232 6.03716L10.8567 5.93388C10.76 5.7757 10.6301 5.64042 10.476 5.5374C10.2082 5.36148 9.92458 5.30109 9.17537 5.2617C8.49794 5.22669 8.11459 5.16893 7.73473 5.04552C7.08793 4.83546 6.76235 4.55714 5.99389 3.55587C5.65255 3.11037 5.44249 2.86443 5.23243 2.66663C4.75543 2.21588 4.28718 1.97957 3.68764 1.88767V1.88679Z",
    fill: "#FF007A"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9.54938 2.87939C9.56601 2.58181 9.60627 2.38489 9.68854 2.20546C9.70657 2.16012 9.72915 2.11672 9.75593 2.07593C9.76031 2.07593 9.7463 2.12844 9.72442 2.19233C9.66491 2.36738 9.6544 2.60545 9.69642 2.8829C9.74893 3.23474 9.77781 3.2855 10.1515 3.66536C10.3275 3.84391 10.5314 4.06797 10.6058 4.16512L10.7406 4.34016L10.6058 4.21501C10.4412 4.06184 10.0631 3.76251 9.97912 3.71962C9.9231 3.69161 9.91435 3.69161 9.88022 3.72575C9.84783 3.75726 9.84171 3.80452 9.83645 4.02858C9.83033 4.3778 9.78219 4.60186 9.66666 4.82504C9.60452 4.94758 9.59489 4.92132 9.6509 4.78391C9.69291 4.68238 9.69729 4.63687 9.69729 4.29903C9.69729 3.62072 9.61502 3.45705 9.13977 3.17873C8.99641 3.09593 8.84921 3.01999 8.69865 2.95116C8.62446 2.92134 8.55251 2.88624 8.48334 2.84614C8.49647 2.83301 8.96034 2.96779 9.14677 3.03869C9.42509 3.14547 9.4706 3.15859 9.50474 3.14634C9.52662 3.13759 9.538 3.07195 9.5485 2.87939H9.54938ZM4.0065 4.04083C3.67304 3.58396 3.46561 2.8829 3.51112 2.35863L3.52425 2.19671L3.60039 2.20984C3.74393 2.2361 3.98987 2.32712 4.10541 2.39714C4.42137 2.58794 4.55878 2.83913 4.69794 3.48506C4.73908 3.67411 4.79247 3.88767 4.81697 3.96119C4.85636 4.07759 5.0069 4.34979 5.12856 4.52659C5.21608 4.65437 5.15832 4.71477 4.96401 4.69726C4.66731 4.671 4.26557 4.3953 4.0065 4.04083ZM9.14327 7.44288C7.58184 6.81883 7.0322 6.27619 7.0322 5.36156C7.0322 5.22678 7.03657 5.1165 7.0427 5.1165C7.04795 5.1165 7.10834 5.16026 7.17661 5.2154C7.49345 5.46747 7.84792 5.57512 8.82993 5.71779C9.40759 5.80181 9.73143 5.8692 10.0316 5.9681C10.9856 6.28231 11.5747 6.91949 11.7156 7.7886C11.7558 8.04066 11.7331 8.51329 11.6657 8.76273C11.6132 8.95966 11.4539 9.31413 11.4119 9.32814C11.3996 9.33251 11.3882 9.28788 11.3856 9.22661C11.3699 8.90102 11.2036 8.58331 10.9252 8.34525C10.6084 8.0748 10.183 7.85949 9.14327 7.44375V7.44288ZM8.04747 7.70282C8.02913 7.59198 8.00399 7.48237 7.9722 7.37461L7.93194 7.25645L8.00633 7.3396C8.10874 7.45338 8.19013 7.59954 8.2584 7.79472C8.31092 7.94351 8.31617 7.98727 8.31617 8.22884C8.31617 8.46603 8.30917 8.51592 8.26015 8.64895C8.19289 8.84624 8.08016 9.02493 7.93106 9.17059C7.64574 9.45942 7.27901 9.61871 6.7495 9.68523C6.6576 9.69661 6.38977 9.71587 6.15433 9.72812C5.56005 9.75875 5.16882 9.82264 4.81785 9.94518C4.78603 9.95916 4.75191 9.96717 4.7172 9.96881C4.70319 9.95481 4.94301 9.81302 5.13994 9.71849C5.41826 9.58458 5.69571 9.51194 6.31713 9.40953C6.62346 9.35877 6.94117 9.29663 7.02169 9.27212C7.7814 9.04106 8.17263 8.44327 8.04747 7.70282Z",
    fill: "#FF007A"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.76189 8.967C8.55446 8.52414 8.50632 8.09614 8.6201 7.69704C8.63235 7.65327 8.65161 7.61914 8.66386 7.61914C8.67524 7.61914 8.72513 7.6454 8.77239 7.67778C8.86867 7.74167 9.05947 7.84933 9.57061 8.1259C10.2078 8.47162 10.5719 8.73857 10.8187 9.0449C11.0349 9.31185 11.1688 9.61731 11.2336 9.98841C11.2703 10.1985 11.2484 10.7061 11.1942 10.9179C11.0226 11.5866 10.6253 12.1117 10.0564 12.4181C9.97322 12.4627 9.89882 12.4995 9.89007 12.4995C9.88219 12.4995 9.91282 12.4233 9.95746 12.3297C10.1491 11.9323 10.171 11.5463 10.0266 11.1166C9.93733 10.8531 9.75703 10.5319 9.39293 9.98841C8.96932 9.35824 8.86604 9.18931 8.76189 8.967ZM2.89605 11.359C3.47634 10.8724 4.19666 10.5276 4.85396 10.4208C5.19251 10.3774 5.53593 10.3907 5.87011 10.4602C6.29022 10.5669 6.66657 10.8068 6.86175 11.0912C7.05255 11.3704 7.13482 11.6128 7.2206 12.1537C7.25386 12.3664 7.29062 12.5809 7.30112 12.629C7.36501 12.9091 7.49017 13.1331 7.64421 13.2452C7.88928 13.4237 8.31289 13.4351 8.72863 13.274C8.77181 13.2541 8.81742 13.24 8.86429 13.232C8.87917 13.2469 8.66999 13.3861 8.52295 13.4596C8.3485 13.5524 8.15335 13.5993 7.9558 13.5961C7.57507 13.5961 7.25911 13.4036 6.99479 13.0115C6.89785 12.8455 6.81133 12.6736 6.73572 12.4968C6.45739 11.8658 6.31998 11.6741 5.99702 11.4632C5.71519 11.2794 5.35197 11.247 5.07889 11.38C4.72005 11.5551 4.62027 12.0102 4.87759 12.299C4.99779 12.4231 5.15506 12.5048 5.32571 12.5318C5.39349 12.5411 5.46247 12.5357 5.52798 12.516C5.59349 12.4963 5.65399 12.4627 5.70538 12.4176C5.75677 12.3724 5.79784 12.3167 5.82581 12.2543C5.85378 12.1918 5.86799 12.1241 5.86748 12.0557C5.86748 11.8658 5.79396 11.7581 5.60929 11.6741C5.35634 11.5612 5.0859 11.6934 5.08677 11.9288C5.08677 12.0295 5.13141 12.0925 5.23294 12.1389C5.2977 12.1677 5.29945 12.1695 5.24606 12.159C5.015 12.1109 4.96074 11.8334 5.14629 11.6496C5.37035 11.429 5.83247 11.5262 5.99089 11.8282C6.05741 11.9551 6.06529 12.2071 6.00752 12.3594C5.87623 12.7008 5.49813 12.8802 5.11303 12.7822C4.85046 12.7156 4.74455 12.6439 4.42859 12.3209C3.87982 11.759 3.66714 11.6496 2.87592 11.5271L2.72363 11.5034L2.89605 11.359Z",
    fill: "#FF007A"
  }), /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M0.321446 1.30191C2.15419 3.51276 3.41716 4.42475 3.55719 4.61731C3.67273 4.7766 3.62896 4.92014 3.43116 5.03217C3.2905 5.10284 3.13738 5.14536 2.98041 5.15733C2.85175 5.15733 2.80712 5.10831 2.80712 5.10831C2.73272 5.0383 2.69071 5.05055 2.30823 4.37574C1.98305 3.86964 1.65395 3.36608 1.32097 2.86508C1.29296 2.83883 1.29383 2.83883 2.25484 4.54816C2.40976 4.90438 2.28548 5.03479 2.28548 5.08556C2.28548 5.18884 2.25659 5.2431 2.12881 5.38576C1.91525 5.62208 1.81985 5.88815 1.75071 6.43867C1.67369 7.05572 1.45663 7.49158 0.854465 8.23816C0.50262 8.6749 0.444854 8.75455 0.35558 8.93135C0.24355 9.15278 0.212917 9.27706 0.200663 9.55626C0.187535 9.85297 0.212917 10.0438 0.303941 10.3265C0.382712 10.575 0.466735 10.7378 0.679417 11.0652C0.863217 11.3479 0.968246 11.5579 0.968246 11.6402C0.968246 11.705 0.980499 11.705 1.26583 11.6411C1.94501 11.4888 2.49728 11.221 2.80799 10.891C3.00054 10.6871 3.04518 10.575 3.04693 10.2958C3.04781 10.1138 3.04168 10.0753 2.99179 9.97025C2.91127 9.79958 2.76423 9.65692 2.44039 9.43636C2.01503 9.14753 1.83298 8.91559 1.78397 8.59613C1.74195 8.33356 1.79009 8.14889 2.02466 7.65963C2.26797 7.15199 2.32836 6.93581 2.3695 6.42554C2.39576 6.09558 2.43164 5.96517 2.52704 5.86014C2.62682 5.75161 2.71609 5.71485 2.96291 5.68159C3.36464 5.62645 3.61934 5.52405 3.82939 5.3315C3.91359 5.262 3.98152 5.17489 4.0284 5.07629C4.07528 4.97769 4.09997 4.87002 4.10072 4.76085L4.10947 4.57705L4.00707 4.45976C3.63859 4.03265 0.0746292 0.96582 0.0518731 0.96582C0.0474969 0.96582 0.16828 1.11724 0.321446 1.30191ZM1.17568 9.89236C1.21583 9.82144 1.22777 9.73799 1.20911 9.65866C1.19046 9.57933 1.14258 9.50995 1.07502 9.46437C0.943739 9.37684 0.738058 9.41885 0.738058 9.53176C0.738058 9.56677 0.757314 9.59215 0.801075 9.61403C0.874595 9.65167 0.879847 9.69368 0.822081 9.78033C0.76344 9.86697 0.768692 9.94312 0.83521 9.99563C0.942864 10.0788 1.09515 10.0333 1.17568 9.89236ZM4.36241 5.77875C4.17424 5.83564 3.99131 6.03431 3.93355 6.24262C3.89941 6.36953 3.91954 6.59272 3.97118 6.66098C4.0552 6.77214 4.13573 6.80102 4.35541 6.80015C4.78428 6.79752 5.15713 6.6146 5.20089 6.38528C5.2359 6.19798 5.07223 5.93891 4.84642 5.82426C4.69303 5.76198 4.52472 5.74615 4.36241 5.77875ZM4.8648 6.16823C4.93044 6.07457 4.90156 5.97392 4.78865 5.90565C4.57509 5.77524 4.25038 5.8829 4.25038 6.0842C4.25038 6.18485 4.4193 6.29426 4.57422 6.29426C4.6775 6.29426 4.81929 6.23299 4.8648 6.16823Z",
    fill: "#FF007A"
  })), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("clipPath", {
    id: "clip0_1366_5768"
  }, /*#__PURE__*/React.createElement("rect", {
    width: "12.2533",
    height: "13.1285",
    fill: "white",
    transform: "translate(0.0517578 0.52832)"
  }))));
};
const TheGraphIcon = () => {
  return /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "13",
    viewBox: "0 0 12 13",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    style: {
      marginRight: 3
    }
  }, /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M5.3522 7.2222C3.63402 7.2222 2.2411 5.92886 2.2411 4.33332C2.2411 2.73778 3.63402 1.44444 5.3522 1.44444C7.07047 1.44444 8.4633 2.73778 8.4633 4.33332C8.4633 5.92886 7.07047 7.2222 5.3522 7.2222ZM5.3522 0C7.92951 0 10.0188 1.9401 10.0188 4.33332C10.0188 6.72654 7.92951 8.66664 5.3522 8.66664C2.77489 8.66664 0.685547 6.72654 0.685547 4.33332C0.685547 1.9401 2.77489 0 5.3522 0ZM9.79108 8.87814C10.0948 9.1602 10.0948 9.61743 9.79108 9.89949L6.67988 12.7885C6.37613 13.0705 5.88372 13.0705 5.57997 12.7885C5.27621 12.5064 5.27621 12.0492 5.57997 11.7671L8.69116 8.87814C8.99492 8.59608 9.48732 8.59608 9.79108 8.87814ZM11.5744 0.722219C11.5744 1.12115 11.2262 1.44444 10.7967 1.44444C10.3671 1.44444 10.0189 1.12115 10.0189 0.722219C10.0189 0.323292 10.3671 0 10.7967 0C11.2262 0 11.5744 0.323292 11.5744 0.722219Z",
    fill: "currentColor"
  }));
};
const SushiIcon = () => {
  return /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 11 11",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    style: {
      marginRight: 3
    }
  }, /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M10.4766 6.86866L8.52596 9.59583C8.24192 9.99351 7.68798 10.1687 6.98252 10.1119C6.00242 10.0266 4.7004 9.50583 3.45525 8.61109C3.04922 8.32284 2.66562 8.00422 2.30778 7.65796C1.64798 7.01715 1.16303 6.35048 0.903332 5.75604C0.619292 5.1027 0.609898 4.52513 0.893938 4.12745L2.84918 1.40028C3.13332 1.0026 3.68251 0.82745 4.39272 0.884218C5.37282 0.964723 6.67009 1.49028 7.91989 2.38038C9.16514 3.27523 10.079 4.34048 10.4672 5.24008C10.5007 5.31725 10.5304 5.39331 10.5563 5.46826C10.7493 6.02735 10.7271 6.51796 10.4766 6.86866Z",
    fill: "url(#paint0_linear_1387_5021)"
  }), /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M10.4766 6.86866L8.52596 9.59583C8.24192 9.99351 7.68798 10.1687 6.98252 10.1119C6.00242 10.0266 4.7004 9.50583 3.45525 8.61109C3.04922 8.32284 2.66562 8.00422 2.30778 7.65796C1.64798 7.01715 1.16303 6.35048 0.903332 5.75604C0.619292 5.1027 0.609898 4.52513 0.893938 4.12745L2.84918 1.40028C3.13332 1.0026 3.68251 0.82745 4.39272 0.884218C5.37282 0.964723 6.67009 1.49028 7.91989 2.38038C9.16514 3.27523 10.079 4.34048 10.4672 5.24008C10.5007 5.31725 10.5304 5.39331 10.5563 5.46826C10.7493 6.02735 10.7271 6.51796 10.4766 6.86866Z",
    fill: "#3B95DA",
    fillOpacity: "0.2"
  }), /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M10.1639 5.37257C9.78989 4.5156 8.91393 3.50712 7.7209 2.6549C6.53252 1.80267 5.29686 1.29611 4.36414 1.22035C3.79595 1.17298 3.34616 1.27722 3.11898 1.59439L3.10939 1.61328C2.89636 1.93055 2.94373 2.38035 3.16626 2.89166C3.5403 3.75338 4.41616 4.76177 5.60464 5.61399C6.79292 6.46622 8.02868 6.97288 8.96131 7.04863C9.51999 7.09116 9.9604 6.99178 10.1923 6.69349L10.2066 6.66985C10.4338 6.35732 10.3865 5.89338 10.1639 5.37257ZM8.41686 5.39156C8.31272 5.53823 8.09969 5.58096 7.83929 5.55722C7.3705 5.51934 6.75505 5.26368 6.15848 4.83762C5.56191 4.41146 5.12161 3.90954 4.93696 3.47874C4.83282 3.23732 4.80444 3.02429 4.90858 2.87742C5.01282 2.73065 5.22585 2.68803 5.4909 2.70702C5.95484 2.74964 6.57515 3.00055 7.16696 3.42671C7.76353 3.85278 8.20383 4.35934 8.38848 4.79025C8.49737 5.03166 8.52575 5.24469 8.41686 5.39156Z",
    fill: "#F5FAFF"
  }), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "paint0_linear_1387_5021",
    x1: "4.08025",
    y1: "0.761996",
    x2: "7.29052",
    y2: "10.235",
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React.createElement("stop", {
    stopColor: "#27B0E6"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "0.107",
    stopColor: "#49A1DB"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "0.288",
    stopColor: "#7D8ACA"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "0.445",
    stopColor: "#A279BD"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "0.572",
    stopColor: "#BA6FB6"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "0.651",
    stopColor: "#C26BB3"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "0.678",
    stopColor: "#D563AD"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "0.715",
    stopColor: "#E65BA7"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "0.76",
    stopColor: "#F156A3"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "0.824",
    stopColor: "#F853A1"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: "#FA52A0"
  }))));
};
const HopIcon = () => {
  return /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "12",
    viewBox: "0 0 13 12",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    style: {
      marginRight: 3
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M11.8306 3.96234L9.31368 0.300906C8.91838 -0.272965 8.02451 0.0316795 8.05374 0.728894C8.08049 1.36444 8.31801 2.03713 8.88643 2.86264C8.8867 2.8631 8.88681 2.86363 8.88675 2.86416C8.88669 2.86468 8.88646 2.86518 8.8861 2.86556C8.88574 2.86595 8.88527 2.86621 8.88475 2.86631C8.88423 2.86641 8.88369 2.86634 8.88321 2.86611C8.65064 2.69274 5.14476 0.0599149 0.97732 1.46177H0.972614C0.512675 1.63416 0.277876 2.01038 0.394285 2.4515C0.502025 2.85992 0.920849 3.10512 1.3372 3.03602C2.2224 2.88865 3.10091 2.81856 3.96482 2.89435C4.82872 2.97014 5.6738 3.19156 6.46067 3.57819C7.24755 3.96481 7.96036 4.51193 8.61547 5.13856C9.35232 5.84271 10.2665 7.34438 10.2665 7.34438C10.3201 7.43955 10.4055 7.51273 10.5078 7.55102C10.6101 7.58931 10.7226 7.59025 10.8255 7.55367C11.0732 7.465 11.1886 7.17943 11.0955 6.93448C10.9013 6.42245 10.6635 5.92801 10.3849 5.45658C10.3845 5.45613 10.3843 5.45555 10.3842 5.45494C10.3842 5.45434 10.3845 5.45375 10.3849 5.4533C10.3853 5.45284 10.3858 5.45255 10.3864 5.45247C10.387 5.45239 10.3876 5.45253 10.3881 5.45286C10.6962 5.56878 10.9813 5.71317 11.3186 5.63416C11.5938 5.56952 11.8353 5.38228 11.9475 5.12023C12.0287 4.93336 12.0606 4.72876 12.0402 4.52603C12.0197 4.32329 11.9475 4.1292 11.8306 3.96234Z",
    fill: "url(#paint0_linear_1387_5025)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M0.214582 7.98084L2.74561 11.6628C3.14189 12.2384 4.01917 11.9229 3.99217 11.2249C3.96741 10.5864 3.73038 9.911 3.15923 9.08128C3.1575 9.0788 3.15923 9.07558 3.1622 9.07731C3.39527 9.25069 6.90215 11.8833 11.0678 10.4817C11.0695 10.4818 11.0712 10.4818 11.0728 10.4817C11.5327 10.3098 11.7663 9.93428 11.6509 9.49267C11.5434 9.0845 11.1246 8.8393 10.7085 8.90865C9.82302 9.05725 8.94475 9.12586 8.0806 9.05007C7.21645 8.97428 6.37162 8.75286 5.58499 8.36648C4.79837 7.9801 4.0853 7.43248 3.43019 6.8061C2.6936 6.10195 1.77917 4.60028 1.77917 4.60028C1.72372 4.50139 1.6339 4.42628 1.52675 4.38921C1.4196 4.35214 1.30258 4.35568 1.19787 4.39917C0.962076 4.49824 0.861271 4.77688 0.951673 5.01564C1.14557 5.526 1.38271 6.01885 1.66053 6.48883C1.66081 6.48931 1.66094 6.48986 1.6609 6.49041C1.66086 6.49097 1.66065 6.4915 1.6603 6.49193C1.65994 6.49236 1.65947 6.49267 1.65894 6.49283C1.6584 6.49298 1.65784 6.49297 1.65731 6.49279C1.3492 6.37688 1.06288 6.23248 0.726781 6.31149C0.451611 6.3749 0.209876 6.56313 0.0986689 6.82443C0.0175708 7.01103 -0.0143554 7.2153 0.00593671 7.41774C0.0262289 7.62019 0.0980624 7.81405 0.214582 7.98084Z",
    fill: "url(#paint1_linear_1387_5025)"
  }), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "paint0_linear_1387_5025",
    x1: "12.6645",
    y1: "11.0479",
    x2: "-2.09241",
    y2: "-7.12647",
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0.15",
    stopColor: "#B32EFF"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "0.42",
    stopColor: "#CE60D3"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "0.65",
    stopColor: "#E185B3"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "0.84",
    stopColor: "#EE9C9F"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "0.96",
    stopColor: "#F2A498"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: "paint1_linear_1387_5025",
    x1: "-0.620094",
    y1: "0.895755",
    x2: "14.1373",
    y2: "19.0706",
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0.15",
    stopColor: "#B32EFF"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "0.42",
    stopColor: "#CE60D3"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "0.65",
    stopColor: "#E185B3"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "0.84",
    stopColor: "#EE9C9F"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "0.96",
    stopColor: "#F2A498"
  }))));
};
const LidoIcon = () => {
  return /*#__PURE__*/React.createElement("svg", {
    width: "10",
    height: "13",
    viewBox: "0 0 10 13",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    style: {
      marginRight: 3
    }
  }, /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M5.19363 0L8.16325 4.64914L5.19363 6.37967L2.22461 4.64914L5.19363 0ZM3.13368 4.42893L5.19363 1.20309L7.25418 4.42893L5.19363 5.63022L3.13368 4.42893Z",
    fill: "#273852"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5.18935 7.40144L1.74509 5.39429L1.65088 5.5413C1.24536 6.17602 1.018 6.90812 0.99262 7.6609C0.967241 8.41368 1.14478 9.15943 1.50663 9.82003C1.86849 10.4806 2.40134 11.0317 3.04937 11.4156C3.69739 11.7996 4.43674 12.0021 5.18995 12.0021C5.94315 12.0021 6.6825 11.7996 7.33053 11.4156C7.97855 11.0317 8.5114 10.4806 8.87326 9.82003C9.23511 9.15943 9.41265 8.41368 9.38727 7.6609C9.3619 6.90812 9.13453 6.17602 8.72901 5.5413L8.6348 5.39429L5.18935 7.40204V7.40144Z",
    fill: "#273852"
  }));
};
const OpenSeaIcon = () => {
  return /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    style: {
      marginRight: 3
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M14 7C14 10.8658 10.8658 14 7 14C3.13422 14 0 10.8658 0 7C0 3.13422 3.13422 0 7 0C10.8666 0 14 3.13422 14 7Z",
    fill: "#2081E2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3.45336 7.2353L3.48356 7.18783L5.30454 4.33914C5.33115 4.29743 5.39372 4.30174 5.41385 4.34705C5.71807 5.02883 5.98057 5.87676 5.8576 6.40464C5.8051 6.62184 5.66126 6.91598 5.49943 7.18783C5.47859 7.22739 5.45557 7.26623 5.43111 7.30362C5.41961 7.32089 5.40019 7.33095 5.37933 7.33095H3.50658C3.45623 7.33095 3.42675 7.2763 3.45336 7.2353Z",
    fill: "#F4FAFF"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M11.5702 7.76459V8.21551C11.5702 8.2414 11.5543 8.26442 11.5313 8.27448C11.3904 8.33489 10.9078 8.5564 10.7071 8.83545C10.1951 9.54816 9.80385 10.5672 8.92931 10.5672H5.28088C3.9878 10.5672 2.93994 9.51581 2.93994 8.21838V8.17668C2.93994 8.14215 2.96798 8.11411 3.00251 8.11411H5.03637C5.07664 8.11411 5.10612 8.15151 5.10254 8.19106C5.08814 8.32338 5.1126 8.4586 5.17517 8.58157C5.29599 8.82682 5.54627 8.98001 5.81668 8.98001H6.82354V8.19394H5.82818C5.77713 8.19394 5.74693 8.13496 5.77641 8.09325C5.78719 8.07671 5.79943 8.05946 5.81236 8.04004C5.90658 7.90627 6.04107 7.69843 6.17484 7.46181C6.26617 7.30216 6.35463 7.1317 6.42583 6.96054C6.44022 6.92961 6.45172 6.89796 6.46322 6.86703C6.48264 6.81238 6.50279 6.76132 6.51717 6.71026C6.53156 6.6671 6.54305 6.6218 6.55456 6.57936C6.58837 6.43408 6.60275 6.28018 6.60275 6.12053C6.60275 6.05796 6.59988 5.99251 6.59412 5.92994C6.59124 5.86162 6.58262 5.79329 6.57398 5.72497C6.56822 5.66456 6.55744 5.60487 6.54594 5.5423C6.53156 5.45096 6.51141 5.36035 6.4884 5.269L6.48049 5.23449C6.46322 5.17191 6.44885 5.11223 6.42871 5.04967C6.37189 4.85332 6.30645 4.66202 6.2374 4.48295C6.21223 4.41174 6.18346 4.34342 6.15469 4.2751C6.11227 4.17226 6.06911 4.07877 6.02956 3.9903C6.00943 3.95002 5.99217 3.91334 5.9749 3.87595C5.95549 3.83351 5.93535 3.79108 5.91521 3.75082C5.90083 3.71989 5.88428 3.69112 5.87277 3.66235L5.7498 3.43509C5.73254 3.40416 5.76131 3.36748 5.7951 3.37683L6.56464 3.58539H6.5668C6.56822 3.58539 6.56895 3.58612 6.56967 3.58612L6.67107 3.61416L6.78255 3.64582L6.82354 3.65731V3.19992C6.82354 2.97912 7.00046 2.80005 7.2191 2.80005C7.32841 2.80005 7.42766 2.84464 7.49886 2.91727C7.57005 2.98992 7.61464 3.08916 7.61464 3.19992V3.87883L7.69664 3.90183C7.70311 3.904 7.70957 3.90687 7.71533 3.91119C7.73547 3.92629 7.76423 3.94858 7.80091 3.97592C7.82968 3.99892 7.86061 4.02698 7.898 4.05575C7.97207 4.11543 8.06054 4.19239 8.15763 4.28086C8.18352 4.30314 8.20869 4.32616 8.2317 4.34918C8.35685 4.46568 8.49709 4.60233 8.63086 4.75336C8.66825 4.79579 8.70493 4.83894 8.74233 4.88424C8.77972 4.93027 8.81928 4.97558 8.85379 5.0209C8.89911 5.08131 8.94801 5.14387 8.99045 5.20932C9.01058 5.24025 9.0336 5.27189 9.05301 5.30281C9.10767 5.38551 9.15586 5.47111 9.20189 5.55669C9.22131 5.59624 9.24144 5.63939 9.2587 5.68182C9.30976 5.79617 9.35004 5.91268 9.37592 6.02919C9.38383 6.05436 9.38959 6.08169 9.39247 6.10615V6.1119C9.4011 6.14641 9.40398 6.18309 9.40685 6.22049C9.41836 6.33988 9.4126 6.45926 9.38672 6.57936C9.37592 6.63043 9.36155 6.67861 9.34428 6.72968C9.32702 6.77858 9.30976 6.82964 9.28747 6.87783C9.24432 6.97779 9.19325 7.07776 9.13284 7.17125C9.11342 7.20578 9.09041 7.24246 9.06739 7.27698C9.04222 7.31365 9.01633 7.34817 8.99332 7.38198C8.96168 7.42513 8.92788 7.47043 8.89336 7.51071C8.86243 7.55315 8.83079 7.59558 8.79627 7.63297C8.74808 7.68979 8.70205 7.74373 8.65386 7.79551C8.6251 7.82931 8.59418 7.86383 8.56252 7.89476C8.53161 7.92927 8.49996 7.9602 8.47119 7.98897C8.42301 8.03716 8.38274 8.07455 8.34893 8.10547L8.26983 8.17812C8.25832 8.18819 8.24321 8.19394 8.22739 8.19394H7.61464V8.98001H8.38561C8.55821 8.98001 8.72219 8.91887 8.85452 8.80668C8.89983 8.76713 9.0976 8.59596 9.33133 8.33778C9.33924 8.32914 9.34932 8.32267 9.36083 8.3198L11.4903 7.70418C11.5299 7.69267 11.5702 7.72287 11.5702 7.76459Z",
    fill: "#F4FAFF"
  }));
};
const SnapshotIcon = () => {
  return /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "13",
    viewBox: "0 0 11 13",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    style: {
      marginRight: 3
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3.68888 3.86153C5.14764 2.62147 6.57116 1.39829 8.01717 0.201734C8.1799 0.0670755 8.4426 -0.0582657 8.70052 0.028882C8.81678 0.201734 8.7332 0.510835 8.63905 0.697064C7.94766 2.06451 7.22605 3.41695 6.51818 4.77627C6.42375 4.9576 6.35303 5.15102 6.24248 5.40516C6.92585 5.40516 7.52659 5.40515 8.12733 5.40516C8.91068 5.40518 9.69455 5.38999 10.477 5.41664C10.6579 5.4228 10.9883 5.41664 10.9883 5.67091C11.0421 5.75193 10.9003 6.03197 10.7752 6.14525C10.2115 6.65572 9.62226 7.13854 9.04228 7.63141C7.01861 9.35112 4.99985 11.0766 2.96191 12.7796C2.80147 12.9136 2.56886 13.0946 2.2758 12.9416C2.14072 12.6408 2.25288 12.4651 2.34676 12.2789C3.06864 10.8472 3.81741 9.4287 4.55676 8.00556C4.61158 7.90003 4.65805 7.79023 4.75024 7.59283C3.97816 7.59283 3.27717 7.59284 2.57618 7.59283C1.91746 7.59283 1.25791 7.61107 0.600503 7.58195C0.396558 7.57292 0.209874 7.57519 0.0502941 7.34987C-0.109253 7.12454 0.147767 6.88872 0.307145 6.74902C1.41209 5.78049 2.53984 4.83747 3.68888 3.86153Z",
    fill: "#FFA804"
  }));
};
const SismoIcon = () => {
  return /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "16",
    viewBox: "0 0 13 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    style: {
      marginRight: 4
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9.99893 0.902344L8.3291 3.76109L9.37781 4.37365L11.0476 1.51493L9.99893 0.902344Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6.71839 0H5.50391V3.3365H6.71839V0Z",
    fill: "white"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M2.22256 0.902832L1.16602 1.50178L2.80304 4.38934L3.85955 3.79037L2.22256 0.902832Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5.50491 12.3906L5.50024 15.7153L6.71475 15.717L6.71939 12.3923L5.50491 12.3906Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12.2224 8.84066H11.0079C11.0079 6.14071 8.81115 3.94397 6.1112 3.94397C3.41124 3.94397 1.21451 6.14071 1.21451 8.84066H0C0 5.47083 2.74136 2.72949 6.1112 2.72949C9.48103 2.72949 12.2224 5.47083 12.2224 8.84066Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6.11113 12.9991C3.81224 12.9991 1.94238 11.1292 1.94238 8.83036C1.94238 6.53148 3.81224 4.66162 6.11113 4.66162C8.41001 4.66162 10.2799 6.53148 10.2799 8.83036C10.2799 11.1292 8.41001 12.9991 6.11113 12.9991ZM6.11113 5.8761C4.48212 5.8761 3.15686 7.20136 3.15686 8.83036C3.15686 10.4594 4.48212 11.7846 6.11113 11.7846C7.74013 11.7846 9.06536 10.4594 9.06536 8.83036C9.06536 7.20136 7.74013 5.8761 6.11113 5.8761Z",
    fill: "currentColor"
  }));
};
const EthereumIcon = () => {
  return /*#__PURE__*/React.createElement("svg", {
    width: "7",
    height: "13",
    viewBox: "0 0 7 13",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    style: {
      marginRight: 3
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3.5 0L0 6.65854L3.5 9.03659L7 6.65854L3.5 0ZM0 7.45122L3.5 13L7 7.45122L3.5 9.82927L0 7.45122Z",
    fill: "currentColor"
  }));
};
const PolygonIcon = () => {
  return /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "10",
    viewBox: "0 0 12 10",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    style: {
      marginRight: 3
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9.08616 3.05638C8.86684 2.93769 8.58486 2.93769 8.3342 3.05638L6.57963 4.03561L5.38903 4.65875L3.6658 5.63798C3.44648 5.75668 3.16449 5.75668 2.91384 5.63798L1.56658 4.86647C1.34726 4.74777 1.1906 4.51039 1.1906 4.24332V2.75964C1.1906 2.52226 1.31593 2.28487 1.56658 2.1365L2.91384 1.39466C3.13316 1.27596 3.41514 1.27596 3.6658 1.39466L5.01305 2.16617C5.23238 2.28487 5.38903 2.52226 5.38903 2.78932V3.76855L6.57963 3.11573V2.10682C6.57963 1.86944 6.45431 1.63205 6.20366 1.48368L3.69713 0.0890208C3.47781 -0.0296736 3.19582 -0.0296736 2.94517 0.0890208L0.375979 1.51335C0.125326 1.63205 0 1.86944 0 2.10682V4.89614C0 5.13353 0.125326 5.37092 0.375979 5.51929L2.91384 6.91395C3.13316 7.03264 3.41514 7.03264 3.6658 6.91395L5.38903 5.96439L6.57963 5.31157L8.30287 4.36202C8.52219 4.24332 8.80418 4.24332 9.05483 4.36202L10.4021 5.10386C10.6214 5.22255 10.7781 5.45994 10.7781 5.727V7.21068C10.7781 7.44807 10.6527 7.68546 10.4021 7.83383L9.08616 8.57567C8.86684 8.69436 8.58486 8.69436 8.3342 8.57567L6.98694 7.83383C6.76762 7.71513 6.61097 7.47775 6.61097 7.21068V6.26113L5.42037 6.91395V7.89318C5.42037 8.13056 5.54569 8.36795 5.79634 8.51632L8.3342 9.91098C8.55352 10.0297 8.83551 10.0297 9.08616 9.91098L11.624 8.51632C11.8433 8.39763 12 8.16024 12 7.89318V5.07418C12 4.8368 11.8747 4.59941 11.624 4.45104L9.08616 3.05638Z",
    fill: "currentColor"
  }));
};
const ArbitrumIcon = () => {
  return /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "15",
    viewBox: "0 0 13 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    style: {
      marginRight: 3
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6.32812 9.11274L8.27626 12.1703L10.0758 11.1274L7.51736 7.09473L6.32812 9.11274Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M11.7147 9.90071L11.7134 9.06508L8.91777 4.71094L7.88062 6.47084L10.5794 10.8355L11.5552 10.27C11.6509 10.1924 11.7088 10.0783 11.7149 9.9552L11.7147 9.90071Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M0 10.689L1.37798 11.483L5.96345 4.12927L5.18526 4.10876C4.52221 4.09937 3.80789 4.27178 3.48001 4.80692L0.876042 8.84283L0 10.1888V10.689V10.689Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.60996 4.12891L6.55885 4.13638L1.91846 11.7939L3.54045 12.7277L3.98147 11.9797L8.60996 4.12891Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12.5792 4.11856C12.5621 3.68962 12.3298 3.297 11.966 3.06837L6.86695 0.135999C6.5071 -0.0451882 6.05756 -0.0454488 5.69701 0.135912C5.65443 0.157377 0.738305 3.00858 0.738305 3.00858C0.670262 3.04117 0.60474 3.08001 0.543127 3.12416C0.218381 3.35696 0.0204216 3.71864 0 4.11595V10.1888L0.876042 8.84281L0.868395 4.15697C0.869438 4.13985 0.87161 4.1229 0.874565 4.1063C0.894378 3.99603 0.95599 3.89774 1.04863 3.83126C1.07183 3.81475 6.07181 0.920449 6.08772 0.912454C6.20529 0.853449 6.35459 0.852754 6.47225 0.910629L11.5053 3.80563C11.6244 3.88149 11.699 4.01011 11.7057 4.15071V9.95522C11.6996 10.0783 11.6509 10.1924 11.5552 10.2701L10.5794 10.8355L10.0759 11.1273L8.27639 12.1702L6.45139 13.2278C6.35311 13.2633 6.23814 13.2613 6.14073 13.2217L3.98151 11.9798L3.54041 12.7279L5.48089 13.8451C5.54502 13.8816 5.6022 13.9139 5.64913 13.9403C5.72178 13.9811 5.77131 14.0083 5.78878 14.0168C5.92669 14.0838 6.12508 14.1227 6.30392 14.1227C6.46782 14.1227 6.62772 14.0926 6.77901 14.0334L12.0798 10.9636C12.3841 10.7279 12.5631 10.3723 12.5792 9.98729V4.11856Z",
    fill: "currentColor"
  }));
};
const OptimismIcon = () => {
  return /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "7",
    viewBox: "0 0 13 7",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    style: {
      marginRight: 3
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2.47789 6.75977C1.74981 6.75977 1.15331 6.58449 0.688289 6.234C0.229446 5.87723 0 5.37025 0 4.71305C0 4.57535 0.0153062 4.40635 0.04587 4.20607C0.125442 3.75544 0.23862 3.21403 0.385452 2.58184C0.801467 0.860615 1.87526 0 3.60672 0C4.07783 0 4.49998 0.0813586 4.87316 0.244124C5.2464 0.400564 5.54006 0.638411 5.7542 0.957617C5.96834 1.27059 6.07544 1.64615 6.07544 2.08428C6.07544 2.21571 6.06013 2.38156 6.02952 2.58184C5.93778 3.1389 5.82764 3.68031 5.69916 4.20607C5.48502 5.06355 5.11487 5.7051 4.58867 6.13072C4.06252 6.55007 3.35893 6.75977 2.47789 6.75977ZM2.60637 5.40781C2.949 5.40781 3.23962 5.30453 3.47824 5.09797C3.72294 4.89146 3.89734 4.57535 4.00135 4.14972C4.14205 3.56138 4.24914 3.04817 4.32253 2.61004C4.34701 2.47856 4.35923 2.344 4.35923 2.20629C4.35923 1.63673 4.06866 1.35195 3.48741 1.35195C3.14479 1.35195 2.85113 1.45523 2.60637 1.66179C2.36775 1.8683 2.19644 2.18442 2.09244 2.61004C1.9823 3.02939 1.87217 3.5426 1.76208 4.14972C1.7376 4.27492 1.72533 4.40635 1.72533 4.54406C1.72533 5.11989 2.019 5.40781 2.60637 5.40781Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6.49679 6.66579C6.42948 6.66579 6.37748 6.64387 6.34074 6.60002C6.31017 6.54995 6.301 6.49365 6.31322 6.43103L7.57971 0.328506C7.59192 0.259653 7.62558 0.203306 7.68067 0.159513C7.73571 0.115671 7.79385 0.09375 7.85502 0.09375H10.2962C10.9753 0.09375 11.5198 0.237732 11.9298 0.52565C12.3458 0.813568 12.5538 1.22978 12.5538 1.77432C12.5538 1.93081 12.5355 2.09353 12.4988 2.26252C12.3458 2.98234 12.0369 3.51434 11.5718 3.8586C11.113 4.20282 10.4828 4.37495 9.68132 4.37495H8.44235L8.0202 6.43103C8.00799 6.49988 7.97433 6.55623 7.91924 6.60002C7.8642 6.64387 7.80606 6.66579 7.74489 6.66579H6.49679ZM9.74554 3.07934C10.0025 3.07934 10.2258 3.00735 10.4155 2.86342C10.6113 2.71944 10.7398 2.51288 10.801 2.24374C10.8193 2.13737 10.8285 2.04346 10.8285 1.9621C10.8285 1.7806 10.7765 1.64289 10.6725 1.54898C10.5684 1.44884 10.391 1.39877 10.1402 1.39877H9.0389L8.69014 3.07934H9.74554Z",
    fill: "currentColor"
  }));
};
const X2Y2Icon = () => {
  return /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    style: {
      marginRight: 3
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M10.764 2.352C9.81219 1.41964 8.53238 0.898237 7.2 0.9C4.38337 0.9 2.1 3.18337 2.1 6C2.1 8.81662 4.38337 11.1 7.2 11.1C8.58712 11.1 9.8445 10.5465 10.764 9.648C10.2043 10.3801 9.4833 10.9731 8.65702 11.3811C7.83074 11.789 6.92149 12.0008 6 12C2.68612 12 0 9.31387 0 6C0 2.68612 2.68612 0 6 0C7.94137 0 9.6675 0.922125 10.764 2.352Z",
    fill: "url(#paint0_linear_229_936)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3.38867 8.91845C4.15008 9.66436 5.1739 10.0815 6.2398 10.0802C8.49317 10.0802 10.3198 8.25357 10.3198 6.0002C10.3198 3.74682 8.49317 1.9202 6.2398 1.9202C5.1739 1.91885 4.15008 2.33603 3.38867 3.08195C3.83641 2.4963 4.41321 2.02184 5.07422 1.69547C5.73522 1.36909 6.46261 1.19961 7.1998 1.2002C9.85105 1.2002 11.9998 3.34895 11.9998 6.0002C11.9998 8.65145 9.85105 10.8002 7.1998 10.8002C6.46261 10.8008 5.73522 10.6313 5.07422 10.3049C4.41321 9.97855 3.83641 9.50409 3.38867 8.91845Z",
    fill: "url(#paint1_linear_229_936)"
  }), /*#__PURE__*/React.createElement("path", {
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    d: "M9.5999 5.9999C9.5999 6.47266 9.50678 6.94079 9.32587 7.37756C9.14495 7.81433 8.87978 8.21119 8.54549 8.54549C8.21119 8.87978 7.81433 9.14495 7.37756 9.32587C6.94079 9.50678 6.47266 9.5999 5.9999 9.5999C5.52714 9.5999 5.05901 9.50678 4.62224 9.32587C4.18547 9.14495 3.78861 8.87978 3.45432 8.54549C3.12003 8.21119 2.85485 7.81433 2.67394 7.37756C2.49302 6.94079 2.3999 6.47266 2.3999 5.9999C2.3999 5.04512 2.77919 4.12945 3.45432 3.45432C4.12945 2.77919 5.04512 2.3999 5.9999 2.3999C6.95468 2.3999 7.87035 2.77919 8.54549 3.45432C9.22062 4.12945 9.5999 5.04512 9.5999 5.9999ZM8.3999 5.9999C8.3999 6.63642 8.14704 7.24687 7.69696 7.69696C7.24687 8.14704 6.63642 8.3999 5.9999 8.3999C5.36338 8.3999 4.75293 8.14704 4.30285 7.69696C3.85276 7.24687 3.5999 6.63642 3.5999 5.9999C3.5999 5.36338 3.85276 4.75293 4.30285 4.30285C4.75293 3.85276 5.36338 3.5999 5.9999 3.5999C6.63642 3.5999 7.24687 3.85276 7.69696 4.30285C8.14704 4.75293 8.3999 5.36338 8.3999 5.9999Z",
    fill: "url(#paint2_linear_229_936)"
  }), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "paint0_linear_229_936",
    x1: "0",
    y1: "5.793",
    x2: "12",
    y2: "5.793",
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React.createElement("stop", {
    "stop-color": "#00E0FF"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    "stop-color": "#562EC8"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: "paint1_linear_229_936",
    x1: "-0.000202357",
    y1: "5.7932",
    x2: "11.9998",
    y2: "5.7932",
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React.createElement("stop", {
    "stop-color": "#00E0FF"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    "stop-color": "#562EC8"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: "paint2_linear_229_936",
    x1: "-9.70562e-05",
    y1: "5.7929",
    x2: "11.9999",
    y2: "5.7929",
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React.createElement("stop", {
    "stop-color": "#00E0FF"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    "stop-color": "#562EC8"
  }))));
};
const LooksRareIcon = () => {
  return /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "11",
    viewBox: "0 0 14 11",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    style: {
      marginRight: 3
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3.74031 2.20617C5.7415 0.216434 8.98595 0.216428 10.9865 2.20617L12.7151 3.92493L10.9865 5.64371C8.98595 7.63344 5.7415 7.63344 3.74031 5.64371L2.01172 3.92493L3.74031 2.20617Z",
    fill: "black"
  }), /*#__PURE__*/React.createElement("path", {
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    d: "M0.762695 3.92737L4.68737 0H10.0394L13.9641 3.92737L7.3637 10.5251L0.762695 3.92737ZM10.3961 2.49748C8.72861 0.822604 5.99815 0.822616 4.3307 2.49748L2.90337 3.92464L4.3307 5.35177C5.99815 7.02667 8.72861 7.02667 10.3961 5.35177L11.8234 3.92464L10.3961 2.49748Z",
    fill: "#0CE466"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7.36374 5.17328C6.67396 5.17328 6.11475 4.61445 6.11475 3.92455C6.11475 3.23459 6.67396 2.67578 7.36374 2.67578C8.05288 2.67578 8.61209 3.23459 8.61209 3.92455C8.61209 4.61445 8.05288 5.17328 7.36374 5.17328Z",
    fill: "black"
  }), /*#__PURE__*/React.createElement("path", {
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    d: "M5.31201 3.92456C5.31201 5.05802 6.23108 5.97607 7.36352 5.97607C8.49596 5.97607 9.41503 5.05802 9.41503 3.92456C9.41503 2.79108 8.49596 1.87305 7.36352 1.87305C6.23108 1.87305 5.31201 2.79107 5.31201 3.92456ZM6.4712 3.92456C6.4712 4.41734 6.87118 4.8165 7.36352 4.8165C7.85586 4.8165 8.2552 4.41741 8.2552 3.92456C8.2552 3.43174 7.85586 3.0326 7.36352 3.0326C6.87118 3.0326 6.4712 3.43174 6.4712 3.92456Z",
    fill: "white"
  }));
};
const EmailCredentialIcon = () => {
  return /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "11",
    viewBox: "0 0 13 11",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    style: {
      marginRight: 3
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 2.35V8.65C12 9.39558 11.4317 10 10.7308 10H2.26923C1.56825 10 1 9.39558 1 8.65V2.35M12 2.35C12 1.60442 11.4317 1 10.7308 1H2.26923C1.56825 1 1 1.60442 1 2.35M12 2.35V2.49563C12 2.96443 11.7713 3.39967 11.396 3.64537L7.1652 6.4146C6.75726 6.68161 6.24274 6.68161 5.8348 6.4146L1.60403 3.64537C1.22866 3.39967 1 2.96443 1 2.49563V2.35",
    stroke: "currentColor",
    "stroke-width": "1.5",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }));
};
const SendIcon = ({
  style
}) => {
  return /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "11",
    viewBox: "0 0 13 11",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    style: {
      marginLeft: "0.25rem"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1.17363 0.101882C0.997487 0.0769162 0.820681 0.142855 0.7039 0.277068C0.587119 0.411281 0.546253 0.595504 0.595329 0.766509L1.58489 4.21462C1.71408 4.66479 2.1258 4.97498 2.59415 4.97498H6.87496C7.16491 4.97498 7.39996 5.21003 7.39996 5.49998C7.39996 5.78993 7.16491 6.02498 6.87496 6.02498H2.59415C2.1258 6.02498 1.71409 6.33516 1.58489 6.78533L0.595329 10.2335C0.546253 10.4045 0.587119 10.5887 0.7039 10.7229C0.820681 10.8571 0.997487 10.9231 1.17363 10.8981C5.26007 10.3189 8.95462 8.52309 11.8788 5.89013C11.9894 5.79057 12.0525 5.64877 12.0525 5.49999C12.0525 5.3512 11.9894 5.2094 11.8788 5.10984C8.95462 2.47688 5.26007 0.681073 1.17363 0.101882Z",
    fill: "currentColor"
  }));
};
const LockIcon = ({
  style
}) => {
  return /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "18",
    viewBox: "0 0 18 22",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    style: style
  }, /*#__PURE__*/React.createElement("path", {
    d: "M13.5 9.5V5.75C13.5 3.26472 11.4853 1.25 9 1.25C6.51472 1.25 4.5 3.26472 4.5 5.75V9.5M3.75 20.75H14.25C15.4926 20.75 16.5 19.7426 16.5 18.5V11.75C16.5 10.5074 15.4926 9.5 14.25 9.5H3.75C2.50736 9.5 1.5 10.5074 1.5 11.75V18.5C1.5 19.7426 2.50736 20.75 3.75 20.75Z",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
};
const UnlockIcon = ({
  style
}) => {
  return /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    style: style
  }, /*#__PURE__*/React.createElement("path", {
    d: "M13.5 10.5V6.75C13.5 4.26472 15.5147 2.25 18 2.25C20.4853 2.25 22.5 4.26472 22.5 6.75V10.5M3.75 21.75H14.25C15.4926 21.75 16.5 20.7426 16.5 19.5V12.75C16.5 11.5074 15.4926 10.5 14.25 10.5H3.75C2.50736 10.5 1.5 11.5074 1.5 12.75V19.5C1.5 20.7426 2.50736 21.75 3.75 21.75Z",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
};

var styles$2 = {"connectBtn":"_1jNTa"};

function ConnectButton({
  icon = /*#__PURE__*/React.createElement(BoltIcon, {
    style: {
      marginRight: "0.25rem"
    }
  }),
  lit = false,
  litOnly = false,
  title = "Connect",
  style
}) {
  const {
    orbis,
    magic,
    user,
    theme,
    setUser,
    setCredentials,
    connecting,
    setConnecting,
    setConnectModalVis
  } = useOrbis();
  async function connectToLit() {
    var _window$phantom;
    console.log("Enter connectToLit()");
    setConnecting(true);
    let providerType = localStorage.getItem("provider-type");
    let provider;
    switch (providerType) {
      case "metamask":
        provider = window.ethereum;
        break;
      case "email":
        provider = magic.rpcProvider;
        break;
      case "wallet-connect":
        provider = new WalletConnectProvider({
          infuraId: "9bf71860bc6c4560904d84cd241ab0a0"
        });
        await provider.enable();
        break;
      case "phantom":
        provider = (_window$phantom = window.phantom) === null || _window$phantom === void 0 ? void 0 : _window$phantom.solana;
        break;
      default:
        provider = window.ethereum;
        break;
    }
    let res = await orbis.connectLit(provider);
    if (res.status == 200) {
      console.log("Success connecting to Lit!:", res);
      let _user = {
        ...user
      };
      _user.hasLit = true;
      setConnecting(false);
      setUser(_user);
    } else {
      console.log("Error connecting to Lit: ", res);
    }
  }
  function submit() {
    if (litOnly) {
      connectToLit();
    } else {
      setConnectModalVis(true);
    }
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    className: styles$2.connectBtn,
    style: style ? style : {
      ...getStyle("button-main", theme, "main"),
      ...getThemeValue("font", theme, "buttons"),
      width: "100%",
      textAlign: "center"
    },
    onClick: () => submit()
  }, connecting ? /*#__PURE__*/React.createElement(LoadingCircle, {
    style: {
      marginRight: 5
    }
  }) : icon, title));
}

var styles$3 = {"input":"_3ExRU","textarea":"_1TTFn"};

const Input = ({
  type,
  rows: _rows = 2,
  name,
  color,
  style,
  children,
  placeholder,
  value,
  onChange,
  autofocus: _autofocus = false,
  icon: _icon = null
}) => {
  const {
    orbis,
    user,
    theme
  } = useOrbis();
  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current && _autofocus == true) {
      inputRef.current.focus();
    }
  }, []);
  switch (type) {
    case "text":
      return /*#__PURE__*/React.createElement("input", {
        type: "text",
        ref: inputRef,
        name: name,
        placeholder: placeholder,
        value: value,
        onChange: onChange,
        className: styles$3.input,
        style: {
          ...getThemeValue("font", theme, "input"),
          borderColor: getThemeValue("border", theme, "main"),
          ...style
        }
      }, children);
    case "textarea":
      return /*#__PURE__*/React.createElement("textarea", {
        rows: 2,
        ref: inputRef,
        name: name,
        placeholder: placeholder,
        value: value,
        onChange: onChange,
        className: styles$3.textarea,
        style: {
          ...getThemeValue("font", theme, "input"),
          borderColor: getThemeValue("border", theme, "main"),
          ...style
        }
      });
    default:
      return null;
  }
};

function useHover() {
  const [value, setValue] = useState(false);
  const ref = useRef(null);
  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);
  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener("mouseover", handleMouseOver);
      node.addEventListener("mouseout", handleMouseOut);
      return () => {
        node.removeEventListener("mouseover", handleMouseOver);
        node.removeEventListener("mouseout", handleMouseOut);
      };
    }
  }, [ref.current]);
  return [ref, value];
}

var styles$4 = {"badge":"_Kzctc","tooltip":"_3Gosv"};

const Badge = ({
  color,
  style,
  tooltip,
  children
}) => {
  const {
    orbis,
    user,
    theme
  } = useOrbis();
  const [hoverRef, isHovered] = useHover();
  return /*#__PURE__*/React.createElement("div", {
    className: styles$4.badge,
    ref: hoverRef,
    style: style
  }, children, isHovered && tooltip && /*#__PURE__*/React.createElement("div", {
    className: styles$4.tooltip
  }, tooltip));
};

var styles$5 = {"emptyState":"_3yaol"};

const Alert = ({
  color,
  style,
  tooltip,
  title,
  icon
}) => {
  const {
    orbis,
    user,
    theme
  } = useOrbis();
  return /*#__PURE__*/React.createElement("div", {
    className: styles$5.emptyState,
    style: style
  }, icon, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13
    }
  }, title));
};

function useOutsideClick(ref, handler) {
  useEffect(() => {
    const listener = event => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    if (typeof window !== "undefined") {
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
    }
    return () => {
      if (typeof window !== "undefined") {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      }
    };
  }, [ref, handler]);
}

var styles$6 = {"modalBackground":"_2jnSH","modalContainer":"_3DR1S","modalWrapper":"_2EV56","modal":"_3i67k","modalTitle":"_1vj-s","modalDescription":"_1Tgb3"};

function Modal({
  width = 370,
  title = "Connect to join the discussion",
  description = "You must be connected to share posts or reactions.",
  hide,
  children
}) {
  var _theme$bg;
  const {
    orbis,
    theme
  } = useOrbis();
  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, () => hide());
  return /*#__PURE__*/React.createElement("div", {
    style: {
      zIndex: 50
    },
    "aria-labelledby": "modal-title",
    role: "dialog",
    "aria-modal": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$6.modalBackground,
    style: {
      background: "#000",
      opacity: 0.70
    },
    onClick: () => hide()
  }), /*#__PURE__*/React.createElement("div", {
    className: styles$6.modalContainer
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$6.modalWrapper
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$6.modal,
    ref: wrapperRef,
    style: {
      background: theme !== null && theme !== void 0 && (_theme$bg = theme.bg) !== null && _theme$bg !== void 0 && _theme$bg.main ? theme.bg.main : defaultTheme.bg.main,
      width: width,
      maxHeight: '85vh',
      top: 15,
      overflow: "scroll"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    className: styles$6.modalTitle,
    style: {
      color: getThemeValue("color", theme, "main")
    }
  }, title), description && /*#__PURE__*/React.createElement("p", {
    className: styles$6.modalDescription,
    style: {
      fontSize: 15,
      color: getThemeValue("color", theme, "secondary")
    }
  }, description)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column"
    }
  }, children)))));
}

function useDidToAddress(did) {
  let res = getAddressFromDid(did);
  return res;
}

var styles$7 = {"tabsChainsWraper":"_1shC3","tabsChainsContainer":"_2qXm0","tabsChain":"_3oHDX","loadingContainer":"_18PMf","nftsContainer":"_2hqFr","nftsEmptyState":"_1fFRJ","nftContainer":"_11vPg","nftImageContainer":"_1Ga-A","nftOverlayContainer":"_Ol_Rm","nftOverlayText":"_1v6HO"};

function UpdateProfileModal({
  hide,
  callbackNftUpdate
}) {
  var _theme$bg, _theme$color;
  const {
    user,
    theme
  } = useOrbis();
  const {
    address,
    chain
  } = useDidToAddress(user === null || user === void 0 ? void 0 : user.did);
  const [chainSelected, setChainSelected] = useState("ethereum");
  function callback(url, details) {
    callbackNftUpdate(url, details);
    hide();
  }
  const ChainItem = ({
    color,
    name,
    slug
  }) => {
    let active = false;
    if (chainSelected == slug) {
      active = true;
    }
    if (active) {
      return /*#__PURE__*/React.createElement("div", {
        className: styles$7.tabsChain,
        style: {
          background: color,
          color: "#FFF"
        }
      }, name);
    } else {
      return /*#__PURE__*/React.createElement("div", {
        className: styles$7.tabsChain,
        style: {
          cursor: "pointer"
        },
        onClick: () => setChainSelected(slug)
      }, name);
    }
  };
  return /*#__PURE__*/React.createElement(Modal, {
    hide: () => hide(),
    width: 500,
    title: "Update your profile picture",
    description: "Pick your favorite NFT or upload your profile picture."
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$7.tabsChainsWraper
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$7.tabsChainsContainer,
    style: {
      background: theme !== null && theme !== void 0 && (_theme$bg = theme.bg) !== null && _theme$bg !== void 0 && _theme$bg.tertiary ? theme.bg.tertiary : defaultTheme.bg.tertiary,
      color: theme !== null && theme !== void 0 && (_theme$color = theme.color) !== null && _theme$color !== void 0 && _theme$color.main ? theme.color.main : defaultTheme.color.main
    }
  }, /*#__PURE__*/React.createElement(ChainItem, {
    name: "Mainnet",
    slug: "ethereum",
    color: "#0085ff"
  }), /*#__PURE__*/React.createElement(ChainItem, {
    name: "Polygon",
    slug: "polygon",
    color: "#7b4dd8"
  }), /*#__PURE__*/React.createElement(ChainItem, {
    name: "Optimism",
    slug: "optimism",
    color: "#f64f4f"
  }))), /*#__PURE__*/React.createElement(ListNFTs, {
    chainSelected: chainSelected,
    callback: callback,
    address: address
  }));
}
function ListNFTs({
  chainSelected,
  address,
  callback
}) {
  const [loading, setLoading] = useState(false);
  const [nfts, setNfts] = useState([]);
  useEffect(() => {
    loadNFTs();
    async function loadNFTs() {
      setLoading(true);
      let nfts = await getNFTs(address, 0, chainSelected);
      console.log("nfts:", nfts);
      setNfts(nfts);
      setLoading(false);
    }
  }, [chainSelected]);
  function Loop() {
    return nfts.map((nft, key) => {
      return /*#__PURE__*/React.createElement(NFT, {
        nft: nft,
        chain: chainSelected,
        callback: callback,
        key: key
      });
    });
  }
  if (loading) {
    return /*#__PURE__*/React.createElement("div", {
      className: styles$7.loadingContainer
    }, /*#__PURE__*/React.createElement(LoadingCircle, null));
  }
  if (nfts && nfts.length == 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: styles$7.nftsEmptyState
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 13
      }
    }, "You don't have any NFT on this network."));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: styles$7.nftsContainer
  }, /*#__PURE__*/React.createElement(Loop, null));
}
function NFT({
  nft,
  chain,
  callback
}) {
  const {
    theme
  } = useOrbis();
  const [hoverNft, isNftHovered] = useHover();
  function setAsNft() {
    console.log("Setting NFT as profile picture.");
    let _imageUrl;
    if (nft.media[0].thumbnail) {
      _imageUrl = nft.media[0].thumbnail;
    } else {
      _imageUrl = nft.media[0].gateway;
    }
    let nftDetails = {
      chain: chain,
      contract: nft.contract.address,
      tokenId: nft.id.tokenId,
      timestamp: getTimestamp()
    };
    callback(_imageUrl, nftDetails);
  }
  return /*#__PURE__*/React.createElement("div", {
    className: styles$7.nftContainer
  }, /*#__PURE__*/React.createElement("div", {
    ref: hoverNft,
    className: styles$7.nftImageContainer
  }, nft.media[0].thumbnail ? /*#__PURE__*/React.createElement("img", {
    src: nft.media[0].thumbnail
  }) : /*#__PURE__*/React.createElement("img", {
    src: nft.media[0].gateway
  }), isNftHovered && /*#__PURE__*/React.createElement("div", {
    className: styles$7.nftOverlayContainer,
    onClick: () => setAsNft()
  }, /*#__PURE__*/React.createElement("p", {
    className: styles$7.nftOverlayText
  }, "Use as profile ", /*#__PURE__*/React.createElement("br", null), " picture", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(EditIcon, {
    style: {
      color: "#FFF"
    }
  })))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15,
      marginTop: "0.5rem",
      color: getThemeValue("color", theme, "main")
    }
  }, nft.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: getThemeValue("color", theme, "secondary")
    }
  }, "#", nft.cleanId));
}

function useGetUsername(details, address, did) {
  var _details$body;
  if (details && details.username) {
    return details.username;
  } else if (details && (_details$body = details.body) !== null && _details$body !== void 0 && _details$body.name) {
    return details.body.name;
  } else if (address) {
    return shortAddress(address);
  } else {
    return shortAddress(did);
  }
}

var styles$8 = {"userContainer":"_2o7KL","userUsernameContainer":"_1Xs_-","userPfpContainer":"_MC4Lq","userPfpContainerImg":"_1FZoV","userPfpContainerImgEmpty":"_164UE","userBadge":"_3tVDt","loadingContainer":"_3JjLt","userPopupContainer":"_3mkOx","userPopupContent":"_3EuST","userPopupTopDetailsContainer":"_8up-o","userPopupDetailsContainer":"_2ioaU","userPopupDetailsUsername":"_18eQ4","userPopupDetailsBadgeContainer":"_2siDY","userPopupDetailsActionsContainer":"_WjB9N","userPopupCredentialsContainer":"_179TI","userPopupFooterContainer":"_3sTma","userPopupFooterFollowers":"_2XlLk","userPopupFooterFollowing":"_1Xdku","userPopupFooterFollowTitle":"_PDHd1","userPopupFooterFollowCount":"_DskLZ","userEditContainer":"_2C8TD","userEditPfpContainer":"_3Ehbv","userEditPfpOverlay":"_1LJ5X","userEditButtonContainer":"_2OSys","userFieldsContainer":"_2ymLO","userFieldsSaveContainer":"_I1aJ0"};

const User = ({
  details,
  connected: _connected = false,
  height: _height = 44,
  hover: _hover = false
}) => {
  const {
    user,
    theme
  } = useOrbis();
  return /*#__PURE__*/React.createElement("div", {
    className: styles$8.userContainer
  }, /*#__PURE__*/React.createElement(UserPfp, {
    height: _height,
    details: _connected ? user : details,
    hover: _hover
  }), /*#__PURE__*/React.createElement("div", {
    className: styles$8.userUsernameContainer
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement(Username, {
    details: _connected ? user : details
  }))));
};
const UserPfp = ({
  details,
  height: _height2 = 44,
  showBadge: _showBadge = true,
  hover: _hover2 = false,
  showEmailCta: _showEmailCta = false
}) => {
  var _details$profile, _theme$bg, _theme$color, _details$profile2, _details$profile3;
  const {
    user,
    theme
  } = useOrbis();
  const [hoverRef, isHovered] = useHover();
  return /*#__PURE__*/React.createElement("div", {
    className: styles$8.userPfpContainer,
    ref: hoverRef
  }, details && details.profile && (_details$profile = details.profile) !== null && _details$profile !== void 0 && _details$profile.pfp ? /*#__PURE__*/React.createElement("img", {
    className: styles$8.userPfpContainerImg,
    src: details.profile.pfp,
    alt: "",
    style: {
      height: _height2,
      width: _height2
    }
  }) : /*#__PURE__*/React.createElement("span", {
    className: styles$8.userPfpContainerImgEmpty,
    style: {
      height: _height2,
      width: _height2,
      background: theme !== null && theme !== void 0 && (_theme$bg = theme.bg) !== null && _theme$bg !== void 0 && _theme$bg.tertiary ? theme.bg.tertiary : defaultTheme.bg.tertiary,
      color: theme !== null && theme !== void 0 && (_theme$color = theme.color) !== null && _theme$color !== void 0 && _theme$color.tertiary ? theme.color.tertiary : defaultTheme.color.tertiary
    }
  }, /*#__PURE__*/React.createElement("svg", {
    style: {
      width: "100%",
      height: "100%"
    },
    fill: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      top: -4,
      right: -5,
      position: "absolute",
      display: "flex",
      flexDirection: "col"
    }
  }, _showEmailCta && user && user.did == details.did && !(details !== null && details !== void 0 && details.encrypted_email) && /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 20 20",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M0.25 10C0.25 4.61522 4.61522 0.25 10 0.25C15.3848 0.25 19.75 4.61522 19.75 10C19.75 15.3848 15.3848 19.75 10 19.75C4.61522 19.75 0.25 15.3848 0.25 10ZM10 6.25C10.4142 6.25 10.75 6.58579 10.75 7V10.75C10.75 11.1642 10.4142 11.5 10 11.5C9.58579 11.5 9.25 11.1642 9.25 10.75V7C9.25 6.58579 9.58579 6.25 10 6.25ZM10 14.5C10.4142 14.5 10.75 14.1642 10.75 13.75C10.75 13.3358 10.4142 13 10 13C9.58579 13 9.25 13.3358 9.25 13.75C9.25 14.1642 9.58579 14.5 10 14.5Z",
    fill: "#FF3162"
  })), _showBadge && details && details.profile && ((_details$profile2 = details.profile) === null || _details$profile2 === void 0 ? void 0 : _details$profile2.pfpIsNft) && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("img", {
    style: {
      height: "1.25rem",
      width: "1.25rem"
    },
    src: "https://app.orbis.club/img/icons/nft-verified-" + ((_details$profile3 = details.profile) === null || _details$profile3 === void 0 ? void 0 : _details$profile3.pfpIsNft.chain) + ".png"
  }))), _hover2 && /*#__PURE__*/React.createElement(UserPopup, {
    visible: isHovered,
    details: details
  }));
};
const Username = ({
  details
}) => {
  const {
    address,
    chain
  } = useDidToAddress(details === null || details === void 0 ? void 0 : details.did);
  const username = useGetUsername(details === null || details === void 0 ? void 0 : details.profile, address, details === null || details === void 0 ? void 0 : details.did);
  return /*#__PURE__*/React.createElement(React.Fragment, null, username);
};
const UserBadge = ({
  details
}) => {
  const {
    theme
  } = useOrbis();
  const {
    address,
    chain
  } = useDidToAddress(details === null || details === void 0 ? void 0 : details.did);
  if (address) {
    var _details$metadata;
    return /*#__PURE__*/React.createElement("div", {
      className: styles$8.userBadge,
      style: {
        ...getThemeValue("badges", theme, "main"),
        ...getThemeValue("font", theme, "badges")
      }
    }, details !== null && details !== void 0 && (_details$metadata = details.metadata) !== null && _details$metadata !== void 0 && _details$metadata.ensName ? details.metadata.ensName : shortAddress(address));
  } else {
    return null;
  }
};
const UserPopup = ({
  details,
  visible
}) => {
  var _details$profile4, _details$profile5, _theme$bg2, _theme$border, _details$profile6, _theme$border2;
  const {
    orbis,
    user,
    setUser,
    theme
  } = useOrbis();
  const [locked, setLocked] = useState(false);
  const [vis, setVis] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [pfp, setPfp] = useState(details === null || details === void 0 ? void 0 : (_details$profile4 = details.profile) === null || _details$profile4 === void 0 ? void 0 : _details$profile4.pfp);
  const [pfpNftDetails, setPfpNftDetails] = useState(details === null || details === void 0 ? void 0 : (_details$profile5 = details.profile) === null || _details$profile5 === void 0 ? void 0 : _details$profile5.pfpIsNft);
  useEffect(() => {
    if (locked == false) {
      setVis(visible);
    }
  }, [visible]);
  function _setIsEditing(vis) {
    setIsEditing(vis);
    setLocked(vis);
  }
  function callbackNftUpdate(url, details) {
    setPfp(url);
    setPfpNftDetails(details);
  }
  async function logout() {
    let res = orbis.logout();
    setUser(null);
  }
  if (vis == false) {
    return null;
  }
  return /*#__PURE__*/React.createElement("div", {
    className: styles$8.userPopupContainer
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$8.userPopupContent,
    style: {
      background: theme !== null && theme !== void 0 && (_theme$bg2 = theme.bg) !== null && _theme$bg2 !== void 0 && _theme$bg2.secondary ? theme.bg.secondary : defaultTheme.bg.secondary,
      borderColor: theme !== null && theme !== void 0 && (_theme$border = theme.border) !== null && _theme$border !== void 0 && _theme$border.main ? theme.border.main : defaultTheme.border.main
    }
  }, isEditing ? /*#__PURE__*/React.createElement(UserEditProfile, {
    setIsEditing: _setIsEditing,
    setShowProfileModal: setShowProfileModal,
    pfp: pfp,
    pfpNftDetails: pfpNftDetails
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: styles$8.userPopupTopDetailsContainer
  }, /*#__PURE__*/React.createElement(UserPfp, {
    details: details,
    hover: false
  }), /*#__PURE__*/React.createElement("div", {
    className: styles$8.userPopupDetailsContainer
  }, /*#__PURE__*/React.createElement("span", {
    className: styles$8.userPopupDetailsUsername,
    style: {
      color: getThemeValue("color", theme, "main"),
      ...getThemeValue("font", theme, "main")
    }
  }, /*#__PURE__*/React.createElement(Username, {
    details: details
  })), /*#__PURE__*/React.createElement("span", {
    className: styles$8.userPopupDetailsBadgeContainer
  }, /*#__PURE__*/React.createElement(UserBadge, {
    details: details
  }))), /*#__PURE__*/React.createElement("div", {
    className: styles$8.userPopupDetailsActionsContainer
  }, user && user.did == details.did ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
    color: "primary",
    onClick: () => _setIsEditing(true)
  }, "Edit", /*#__PURE__*/React.createElement(EditIcon, null)), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 7,
      cursor: "pointer",
      color: getThemeValue("color", theme, "main")
    },
    onClick: () => logout()
  }, /*#__PURE__*/React.createElement(LogoutIcon, null))) : /*#__PURE__*/React.createElement(Follow, {
    did: details.did
  }))), user && user.did == details.did && !user.encrypted_email && /*#__PURE__*/React.createElement(Alert, {
    title: /*#__PURE__*/React.createElement(AddEmailAddress, null),
    style: {
      backgroundColor: getThemeValue("bg", theme, "main"),
      color: getThemeValue("color", theme, "main"),
      borderColor: "#FF3162",
      marginTop: 12
    }
  }), (details === null || details === void 0 ? void 0 : (_details$profile6 = details.profile) === null || _details$profile6 === void 0 ? void 0 : _details$profile6.description) && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "0.5rem"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      ...getThemeValue("font", theme, "secondary"),
      lineHeight: "inherit",
      color: getThemeValue("color", theme, "secondary")
    }
  }, details.profile.description)), /*#__PURE__*/React.createElement(UserCredentials, {
    details: details
  }), /*#__PURE__*/React.createElement("div", {
    className: styles$8.userPopupFooterContainer
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$8.userPopupFooterFollowers,
    style: {
      borderColor: theme !== null && theme !== void 0 && (_theme$border2 = theme.border) !== null && _theme$border2 !== void 0 && _theme$border2.main ? theme.border.main : defaultTheme.border.main
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: styles$8.userPopupFooterFollowTitle,
    style: {
      ...getThemeValue("font", theme, "main"),
      fontWeight: 400,
      fontSize: 13,
      color: getThemeValue("color", theme, "secondary")
    }
  }, "Followers"), /*#__PURE__*/React.createElement("p", {
    className: styles$8.userPopupFooterFollowCount,
    style: {
      ...getThemeValue("font", theme, "secondary"),
      fontSize: 15,
      color: getThemeValue("color", theme, "main")
    }
  }, details.count_followers)), /*#__PURE__*/React.createElement("div", {
    className: styles$8.userPopupFooterFollowing
  }, /*#__PURE__*/React.createElement("p", {
    className: styles$8.userPopupFooterFollowTitle,
    style: {
      ...getThemeValue("font", theme, "main"),
      fontWeight: 400,
      fontSize: 13,
      color: getThemeValue("color", theme, "secondary")
    }
  }, "Following"), /*#__PURE__*/React.createElement("p", {
    className: styles$8.userPopupFooterFollowCount,
    style: {
      ...getThemeValue("font", theme, "secondary"),
      fontSize: 15,
      color: getThemeValue("color", theme, "main")
    }
  }, details.count_following))))), showProfileModal && /*#__PURE__*/React.createElement(UpdateProfileModal, {
    hide: () => setShowProfileModal(false),
    callbackNftUpdate: callbackNftUpdate
  }));
};
const AddEmailAddress = () => {
  const {
    orbis,
    user,
    setUser,
    theme
  } = useOrbis();
  const [email, setEmail] = useState("");
  const [savingEmail, setSavingEmail] = useState(false);
  async function saveEmail() {
    if (!email || email == "") {
      alert("Email is required.");
      return;
    }
    setSavingEmail(true);
    let res = await orbis.setEmail(email);
    console.log("res:", res);
    if (res.status == 200) {
      let _user = {
        ...user
      };
      _user.encrypted_email = res.encryptedEmail;
      console.log("_user:", _user);
      setUser(_user);
      setSavingEmail(false);
    }
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      ...getThemeValue("font", theme, "secondary"),
      fontSize: 13,
      marginTop: 0,
      marginBottom: 8,
      textAlign: "center",
      color: getThemeValue("color", theme, "secondary")
    }
  }, "Add your email address to receive notifications for replies and mentions."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Input, {
    type: "text",
    name: "email",
    value: email,
    onChange: e => setEmail(e.target.value),
    disabled: savingEmail,
    placeholder: "Your email address",
    style: {
      ...getStyle("input", theme, savingEmail),
      marginTop: "0rem",
      width: "auto",
      flex: 1,
      marginRight: 8
    }
  }), savingEmail ? /*#__PURE__*/React.createElement(Button, {
    color: "secondary"
  }, /*#__PURE__*/React.createElement(LoadingCircle, null)) : /*#__PURE__*/React.createElement(Button, {
    color: "secondary",
    onClick: () => saveEmail()
  }, "Save")));
};
function UserCredentials({
  details
}) {
  var _theme$color2;
  const {
    orbis,
    user,
    theme
  } = useOrbis();
  const [credentials, setCredentials] = useState([]);
  const [credentialsLoading, setCredentialsLoading] = useState(false);
  useEffect(() => {
    loadCredentials();
  }, []);
  async function loadCredentials() {
    setCredentialsLoading(true);
    let {
      data,
      error,
      status
    } = await orbis.api.rpc("get_verifiable_credentials", {
      q_subject: details.did,
      q_min_weight: 10
    });
    setCredentials(data);
    setCredentialsLoading(false);
  }
  const LoopCredentials = () => {
    if (credentials && credentials.length > 0) {
      return credentials.map((credential, key) => {
        return /*#__PURE__*/React.createElement(UserCredential, {
          credential: credential,
          key: key
        });
      });
    } else {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Alert, {
        title: "User doesn't have any credentials yet.",
        style: {
          backgroundColor: getThemeValue("bg", theme, "main"),
          color: getThemeValue("color", theme, "main")
        }
      }));
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 15,
      marginBottom: 15
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: styles$8.userPopupFooterFollowTitle,
    style: {
      ...getThemeValue("font", theme, "main"),
      fontWeight: 400,
      fontSize: 13,
      color: theme !== null && theme !== void 0 && (_theme$color2 = theme.color) !== null && _theme$color2 !== void 0 && _theme$color2.secondary ? theme.color.secondary : defaultTheme.color.secondary
    }
  }, "Credentials:"), /*#__PURE__*/React.createElement("div", {
    className: styles$8.userPopupCredentialsContainer
  }, credentialsLoading ? /*#__PURE__*/React.createElement("div", {
    className: styles$8.loadingContainer,
    style: {
      color: getThemeValue("color", theme, "main")
    }
  }, /*#__PURE__*/React.createElement(LoadingCircle, null)) : /*#__PURE__*/React.createElement(LoopCredentials, null)));
}
function UserCredential({
  credential,
  showTooltip = true
}) {
  const {
    theme
  } = useOrbis();
  function clean(str) {
    if (str) {
      return str.toLowerCase().replaceAll(" ", "").replaceAll("-", "_");
    }
  }
  const CredentialIcon = () => {
    var _credential$content, _credential$content$c, _credential$content2, _credential$content2$, _credential$content3, _credential$content3$;
    let protocol = (_credential$content = credential.content) === null || _credential$content === void 0 ? void 0 : (_credential$content$c = _credential$content.credentialSubject) === null || _credential$content$c === void 0 ? void 0 : _credential$content$c.protocol;
    if (protocol) {
      switch (clean(protocol)) {
        case "opensea":
          return /*#__PURE__*/React.createElement(OpenSeaIcon, null);
        case "uniswap":
          return /*#__PURE__*/React.createElement(UniswapIcon, null);
        case "thegraph":
          return /*#__PURE__*/React.createElement(TheGraphIcon, null);
        case "lido":
          return /*#__PURE__*/React.createElement(LidoIcon, null);
        case "sushiswap":
          return /*#__PURE__*/React.createElement(SushiIcon, null);
        case "hop":
          return /*#__PURE__*/React.createElement(HopIcon, null);
        case "snapshot":
          return /*#__PURE__*/React.createElement(SnapshotIcon, null);
        case "sismo":
          return /*#__PURE__*/React.createElement(SismoIcon, null);
        case "x2y2":
          return /*#__PURE__*/React.createElement(X2Y2Icon, null);
        case "looksrare":
          return /*#__PURE__*/React.createElement(LooksRareIcon, null);
        case "email":
          return /*#__PURE__*/React.createElement(EmailCredentialIcon, null);
        case "nonces":
          switch ((_credential$content2 = credential.content) === null || _credential$content2 === void 0 ? void 0 : (_credential$content2$ = _credential$content2.credentialSubject) === null || _credential$content2$ === void 0 ? void 0 : _credential$content2$.type) {
            case "active-wallet-mainnet":
              return /*#__PURE__*/React.createElement(EthereumIcon, null);
            case "active-wallet-polygon":
              return /*#__PURE__*/React.createElement(PolygonIcon, null);
            case "active-wallet-arbitrum":
              return /*#__PURE__*/React.createElement(ArbitrumIcon, null);
            case "active-wallet-optimism":
              return /*#__PURE__*/React.createElement(OptimismIcon, null);
            default:
              return null;
          }
        case "evm":
          switch ((_credential$content3 = credential.content) === null || _credential$content3 === void 0 ? void 0 : (_credential$content3$ = _credential$content3.credentialSubject) === null || _credential$content3$ === void 0 ? void 0 : _credential$content3$.type) {
            case "active-wallet-mainnet":
              return /*#__PURE__*/React.createElement(EthereumIcon, null);
            case "active-wallet-polygon":
              return /*#__PURE__*/React.createElement(PolygonIcon, null);
            case "active-wallet-arbitrum":
              return /*#__PURE__*/React.createElement(ArbitrumIcon, null);
            case "active-wallet-optimism":
              return /*#__PURE__*/React.createElement(OptimismIcon, null);
            default:
              return null;
          }
        default:
          return null;
      }
    } else {
      return null;
    }
  };
  if (credential.content && credential.issuer == "did:key:z6mkfglpulq7vvxu93xrh1mlgha5fmutcgmuwkz1vuwt3qju") {
    if (credential.content.credentialSubject.protocol == "nonces" || credential.content.credentialSubject.protocol == "EVM") {
      return /*#__PURE__*/React.createElement(Badge, {
        style: {
          ...getStyle("badge", theme, clean(credential.content.credentialSubject.type)),
          ...getThemeValue("font", theme, "badges")
        },
        tooltip: showTooltip ? credential.content.credentialSubject.description : null
      }, /*#__PURE__*/React.createElement(CredentialIcon, null), credential.content.credentialSubject.name);
    } else {
      var _credential$content4;
      return /*#__PURE__*/React.createElement(Badge, {
        style: getStyle("badge", theme, clean((_credential$content4 = credential.content) === null || _credential$content4 === void 0 ? void 0 : _credential$content4.credentialSubject.protocol)),
        tooltip: showTooltip ? credential.content.credentialSubject.description : null
      }, /*#__PURE__*/React.createElement(CredentialIcon, null), credential.content.credentialSubject.name);
    }
  } else if (credential.issuer == "did:key:z6mkghvghlobledj1bgrlhs4lpgjavbma1tn2zcryqmyu5lc") {
    return /*#__PURE__*/React.createElement(Badge, {
      style: {
        backgroundColor: "#FFF"
      }
    }, /*#__PURE__*/React.createElement(GitcoinProvider, {
      credential: credential
    }));
  }
}
const GitcoinProvider = ({
  credential
}) => {
  var _credential$content5, _credential$content5$, _credential$content6, _credential$content6$, _credential$content8, _credential$content8$, _credential$content10, _credential$content11, _credential$content14, _credential$content15, _credential$content18, _credential$content19, _credential$content22, _credential$content23, _credential$content26, _credential$content27, _credential$content30, _credential$content31, _credential$content34, _credential$content35;
  let provider = /*#__PURE__*/React.createElement("div", {
    className: "verified-credential-type"
  }, /*#__PURE__*/React.createElement("span", null, (_credential$content5 = credential.content) === null || _credential$content5 === void 0 ? void 0 : (_credential$content5$ = _credential$content5.credentialSubject) === null || _credential$content5$ === void 0 ? void 0 : _credential$content5$.provider));
  if ((_credential$content6 = credential.content) !== null && _credential$content6 !== void 0 && (_credential$content6$ = _credential$content6.credentialSubject) !== null && _credential$content6$ !== void 0 && _credential$content6$.provider.includes('GitcoinContributorStatistics#numGrantsContributeToGte#')) {
    var _credential$content7, _credential$content7$;
    let numGrantsContributeTo = (_credential$content7 = credential.content) === null || _credential$content7 === void 0 ? void 0 : (_credential$content7$ = _credential$content7.credentialSubject) === null || _credential$content7$ === void 0 ? void 0 : _credential$content7$.provider.replace('GitcoinContributorStatistics#numGrantsContributeToGte#', '');
    provider = /*#__PURE__*/React.createElement("div", {
      className: "verified-credential-type"
    }, /*#__PURE__*/React.createElement("span", {
      className: "inline-block break-word"
    }, "Contributed to at least ", /*#__PURE__*/React.createElement("span", {
      className: "primary bold mleft-3"
    }, numGrantsContributeTo), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("img", {
      src: "/img/icons/gitcoin-logo.png",
      height: "19",
      className: "mleft-3 mright-4"
    }), " grants")));
  }
  if ((_credential$content8 = credential.content) !== null && _credential$content8 !== void 0 && (_credential$content8$ = _credential$content8.credentialSubject) !== null && _credential$content8$ !== void 0 && _credential$content8$.provider.includes('GitcoinContributorStatistics#totalContributionAmountGte#')) {
    var _credential$content9, _credential$content9$;
    let totalContributionAmountGte = (_credential$content9 = credential.content) === null || _credential$content9 === void 0 ? void 0 : (_credential$content9$ = _credential$content9.credentialSubject) === null || _credential$content9$ === void 0 ? void 0 : _credential$content9$.provider.replace('GitcoinContributorStatistics#totalContributionAmountGte#', '');
    provider = /*#__PURE__*/React.createElement("div", {
      className: "verified-credential-type"
    }, /*#__PURE__*/React.createElement("span", {
      className: "inline-block break-word"
    }, "Contributed more than ", /*#__PURE__*/React.createElement("span", {
      className: "primary bold mleft-3"
    }, totalContributionAmountGte, " ETH to "), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("img", {
      src: "/img/icons/gitcoin-logo.png",
      height: "19",
      className: "mleft-3 mright-4"
    }), " grants")));
  }
  if ((_credential$content10 = credential.content) !== null && _credential$content10 !== void 0 && (_credential$content11 = _credential$content10.credentialSubject) !== null && _credential$content11 !== void 0 && _credential$content11.provider.includes('GitcoinContributorStatistics#numRoundsContributedToGte#')) {
    var _credential$content12, _credential$content13;
    let numRoundsContributedToGte = (_credential$content12 = credential.content) === null || _credential$content12 === void 0 ? void 0 : (_credential$content13 = _credential$content12.credentialSubject) === null || _credential$content13 === void 0 ? void 0 : _credential$content13.provider.replace('GitcoinContributorStatistics#numRoundsContributedToGte#', '');
    provider = /*#__PURE__*/React.createElement("div", {
      className: "verified-credential-type"
    }, /*#__PURE__*/React.createElement("span", {
      className: "inline-block break-word"
    }, "Contributed to at least ", /*#__PURE__*/React.createElement("span", {
      className: "primary bold mleft-3"
    }, numRoundsContributedToGte, " "), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("img", {
      src: "/img/icons/gitcoin-logo.png",
      height: "19",
      className: "mleft-3 mright-4"
    }), " rounds")));
  }
  if ((_credential$content14 = credential.content) !== null && _credential$content14 !== void 0 && (_credential$content15 = _credential$content14.credentialSubject) !== null && _credential$content15 !== void 0 && _credential$content15.provider.includes('GitcoinContributorStatistics#numGr14ContributionsGte#')) {
    var _credential$content16, _credential$content17;
    let numGr14ContributionsGte = (_credential$content16 = credential.content) === null || _credential$content16 === void 0 ? void 0 : (_credential$content17 = _credential$content16.credentialSubject) === null || _credential$content17 === void 0 ? void 0 : _credential$content17.provider.replace('GitcoinContributorStatistics#numGr14ContributionsGte#', '');
    provider = /*#__PURE__*/React.createElement("div", {
      className: "verified-credential-type"
    }, /*#__PURE__*/React.createElement("span", {
      className: "inline-block break-word"
    }, "Contributed to at least ", /*#__PURE__*/React.createElement("span", {
      className: "primary bold mleft-3"
    }, numGr14ContributionsGte, " "), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("img", {
      src: "/img/icons/gitcoin-logo.png",
      height: "19",
      className: "mleft-3 mright-4"
    }), " grant(s) in GR14")));
  }
  if ((_credential$content18 = credential.content) !== null && _credential$content18 !== void 0 && (_credential$content19 = _credential$content18.credentialSubject) !== null && _credential$content19 !== void 0 && _credential$content19.provider.includes('TwitterFollowerGT')) {
    var _credential$content20, _credential$content21;
    let countTwitterFollowers = (_credential$content20 = credential.content) === null || _credential$content20 === void 0 ? void 0 : (_credential$content21 = _credential$content20.credentialSubject) === null || _credential$content21 === void 0 ? void 0 : _credential$content21.provider.replace('TwitterFollowerGT', '');
    provider = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TwitterIcon, {
      style: {
        marginRight: 4,
        color: "#1DA1F2"
      }
    }), /*#__PURE__*/React.createElement("span", null, "Followers ", /*#__PURE__*/React.createElement("span", {
      className: "primary bold"
    }, ` > `), " ", countTwitterFollowers));
  }
  if ((_credential$content22 = credential.content) !== null && _credential$content22 !== void 0 && (_credential$content23 = _credential$content22.credentialSubject) !== null && _credential$content23 !== void 0 && _credential$content23.provider.includes('TwitterFollowerGTE')) {
    var _credential$content24, _credential$content25;
    let countTwitterFollowersGte = (_credential$content24 = credential.content) === null || _credential$content24 === void 0 ? void 0 : (_credential$content25 = _credential$content24.credentialSubject) === null || _credential$content25 === void 0 ? void 0 : _credential$content25.provider.replace('TwitterFollowerGTE', '');
    provider = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TwitterIcon, {
      style: {
        marginRight: 4,
        color: "#1DA1F2"
      }
    }), /*#__PURE__*/React.createElement("span", null, "Followers ", /*#__PURE__*/React.createElement("span", {
      className: "primary bold"
    }, ` > `), " ", countTwitterFollowersGte));
  }
  if ((_credential$content26 = credential.content) !== null && _credential$content26 !== void 0 && (_credential$content27 = _credential$content26.credentialSubject) !== null && _credential$content27 !== void 0 && _credential$content27.provider.includes('TwitterTweetGT')) {
    var _credential$content28, _credential$content29;
    let countTweets = (_credential$content28 = credential.content) === null || _credential$content28 === void 0 ? void 0 : (_credential$content29 = _credential$content28.credentialSubject) === null || _credential$content29 === void 0 ? void 0 : _credential$content29.provider.replace('TwitterTweetGT', '');
    provider = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TwitterIcon, {
      style: {
        marginRight: 4,
        color: "#1DA1F2"
      }
    }), /*#__PURE__*/React.createElement("span", null, "Tweets ", /*#__PURE__*/React.createElement("span", {
      className: "primary bold"
    }, ` > `), " ", countTweets));
  }
  if ((_credential$content30 = credential.content) !== null && _credential$content30 !== void 0 && (_credential$content31 = _credential$content30.credentialSubject) !== null && _credential$content31 !== void 0 && _credential$content31.provider.includes('gtcPossessionsGte')) {
    var _credential$content32, _credential$content33;
    let countGtc = (_credential$content32 = credential.content) === null || _credential$content32 === void 0 ? void 0 : (_credential$content33 = _credential$content32.credentialSubject) === null || _credential$content33 === void 0 ? void 0 : _credential$content33.provider.replace('gtcPossessionsGte#', '');
    provider = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, "Owns at least ", /*#__PURE__*/React.createElement("span", {
      className: "primary bold"
    }, countGtc)), /*#__PURE__*/React.createElement("img", {
      src: "/img/icons/gtc-logo.webp",
      height: "15",
      className: "mright-4 mleft-4"
    }), /*#__PURE__*/React.createElement("span", {
      className: "primary bold"
    }, "GTC"));
  }
  switch ((_credential$content34 = credential.content) === null || _credential$content34 === void 0 ? void 0 : (_credential$content35 = _credential$content34.credentialSubject) === null || _credential$content35 === void 0 ? void 0 : _credential$content35.provider) {
    case 'Twitter':
      provider = /*#__PURE__*/React.createElement(React.Fragment, null, "Has a ", /*#__PURE__*/React.createElement(TwitterIcon, {
        style: {
          marginLeft: 3,
          marginRight: 3,
          color: "#1DA1F2"
        }
      }), " account");
      break;
    case 'Github':
      provider = /*#__PURE__*/React.createElement(React.Fragment, null, "Has a ", /*#__PURE__*/React.createElement(GithubIcon, {
        style: {
          marginLeft: 3,
          marginRight: 3
        }
      }), " account");
      break;
    case 'StarredGithubRepoProvider':
      provider = /*#__PURE__*/React.createElement(React.Fragment, null, "Has stars on ", /*#__PURE__*/React.createElement(GithubIcon, {
        style: {
          marginLeft: 3,
          marginRight: 3
        }
      }), " repositories");
      break;
    case 'TenOrMoreGithubFollowers':
      provider = /*#__PURE__*/React.createElement(React.Fragment, null, "Has at least 10 ", /*#__PURE__*/React.createElement(GithubIcon, {
        style: {
          marginLeft: 3,
          marginRight: 3
        }
      }), " followers");
      break;
    case 'ForkedGithubRepoProvider':
      provider = /*#__PURE__*/React.createElement(React.Fragment, null, "Forked some ", /*#__PURE__*/React.createElement(GithubIcon, {
        style: {
          marginLeft: 3,
          marginRight: 3
        }
      }), " repositories");
      break;
    case 'FiveOrMoreGithubRepos':
      provider = /*#__PURE__*/React.createElement(React.Fragment, null, "Owns at least ", /*#__PURE__*/React.createElement("span", {
        className: "primary bold"
      }, "5"), " ", /*#__PURE__*/React.createElement(GithubIcon, {
        style: {
          marginLeft: 3,
          marginRight: 3
        }
      }), " repositories");
      break;
    case 'Poh':
      provider = /*#__PURE__*/React.createElement(React.Fragment, null, "Human on Proof of Humanity");
      break;
    case 'Ens':
      provider = /*#__PURE__*/React.createElement(React.Fragment, null, "Has an ENS name");
      break;
    case 'Discord':
      provider = /*#__PURE__*/React.createElement(React.Fragment, null, "Has a ", /*#__PURE__*/React.createElement("img", {
        src: "/img/icons/discord-logo.png",
        height: "17",
        className: "mleft-4 mright-4"
      }), " account");
      break;
    case 'Linkedin':
      provider = /*#__PURE__*/React.createElement(React.Fragment, null, "Has a ", /*#__PURE__*/React.createElement("img", {
        src: "/img/icons/linkedin-logo.png",
        height: "17",
        className: "mleft-4 mright-4"
      }), " account");
      break;
    case 'Google':
      provider = /*#__PURE__*/React.createElement(React.Fragment, null, "Has a ", /*#__PURE__*/React.createElement(GoogleIcon, {
        style: {
          marginLeft: 3,
          marginRight: 3
        }
      }), " account");
      break;
    case 'Facebook':
      provider = /*#__PURE__*/React.createElement("div", {
        className: "verified-credential-type"
      }, /*#__PURE__*/React.createElement("span", {
        className: "inline-block break-word"
      }, "Has a ", /*#__PURE__*/React.createElement("img", {
        src: "/img/icons/facebook-logo.png",
        height: "17",
        className: "mleft-4 mright-4"
      }), " account"));
      break;
    case 'FacebookProfilePicture':
      provider = /*#__PURE__*/React.createElement("div", {
        className: "verified-credential-type"
      }, /*#__PURE__*/React.createElement("span", {
        className: "inline-block break-word"
      }, "Has a ", /*#__PURE__*/React.createElement("img", {
        src: "/img/icons/facebook-logo.png",
        height: "17",
        className: "mleft-4 mright-4"
      }), " profile picture"));
      break;
    case 'Brightid':
      provider = /*#__PURE__*/React.createElement("div", {
        className: "verified-credential-type"
      }, /*#__PURE__*/React.createElement("span", {
        className: "inline-block break-word"
      }, "Verified on ", /*#__PURE__*/React.createElement("img", {
        src: "/img/icons/brightid-logo.png",
        height: "17",
        className: "mleft-4 mright-4"
      })));
      break;
    case "EthGTEOneTxnProvider":
      provider = /*#__PURE__*/React.createElement("div", {
        className: "verified-credential-type"
      }, /*#__PURE__*/React.createElement("span", {
        className: "inline-block break-word"
      }, "Wallet with ", /*#__PURE__*/React.createElement("span", {
        className: "primary bold mleft-4 mright-4"
      }, ` >= 1 `), " Txn"));
      break;
    case "ethPossessionsGte#1":
      provider = /*#__PURE__*/React.createElement("div", {
        className: "verified-credential-type"
      }, /*#__PURE__*/React.createElement("span", {
        className: "inline-block break-word"
      }, "Wallet with ", /*#__PURE__*/React.createElement("span", {
        className: "primary bold mleft-4 mright-4"
      }, ` >= 1 `), " ETH"));
      break;
    case "SnapshotVotesProvider":
      provider = /*#__PURE__*/React.createElement("div", {
        className: "verified-credential-type"
      }, /*#__PURE__*/React.createElement("span", {
        className: "inline-block break-word"
      }, "Voted on ", /*#__PURE__*/React.createElement("span", {
        className: "primary bold mleft-4 mright-4"
      }, `Snapshot`)));
      break;
  }
  return provider;
};
function Follow({
  did
}) {
  const {
    orbis,
    user,
    theme
  } = useOrbis();
  const [loading, setLoading] = useState(false);
  const [following, setFollowing] = useState(false);
  const [followHoverRef, isFollowHovered] = useHover();
  useEffect(() => {
    if (user) {
      getFollowing();
    }
    async function getFollowing() {
      setLoading(true);
      let {
        data,
        error
      } = await orbis.getIsFollowing(user.did, did);
      if (data) {
        setFollowing(data);
      }
      setLoading(false);
    }
  }, [user, did]);
  async function follow(active) {
    setLoading(true);
    let res = await orbis.setFollow(did, active);
    switch (res.status) {
      case 200:
        setFollowing(active);
        break;
      default:
        console.log("Error following user: ", res);
        break;
    }
    setLoading(false);
  }
  if (loading) {
    return /*#__PURE__*/React.createElement(Button, {
      color: "green"
    }, /*#__PURE__*/React.createElement(LoadingCircle, null));
  }
  if (following) {
    return /*#__PURE__*/React.createElement("div", {
      ref: followHoverRef
    }, isFollowHovered ? /*#__PURE__*/React.createElement(Button, {
      color: "red"
    }, "Unfollow") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      color: "green-transparent"
    }, /*#__PURE__*/React.createElement(CheckIcon, {
      color: getThemeValue("color", theme, "green"),
      style: {
        marginRight: "0.25rem"
      }
    }), "Following")));
  }
  return /*#__PURE__*/React.createElement(Button, {
    color: "green",
    onClick: () => follow(true)
  }, "Follow");
}
function UserEditProfile({
  setIsEditing,
  setShowProfileModal,
  pfp,
  pfpNftDetails
}) {
  var _user$profile, _user$profile2;
  const {
    orbis,
    user,
    setUser,
    theme
  } = useOrbis();
  const [username, setUsername] = useState(user !== null && user !== void 0 && (_user$profile = user.profile) !== null && _user$profile !== void 0 && _user$profile.username ? user.profile.username : "");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState(user !== null && user !== void 0 && (_user$profile2 = user.profile) !== null && _user$profile2 !== void 0 && _user$profile2.description ? user.profile.description : "");
  const [status, setStatus] = useState(0);
  useEffect(() => {
    if (user !== null && user !== void 0 && user.encrypted_email) {
      decryptEmail();
    }
    async function decryptEmail() {
      try {
        let _email = await decryptString(user.encrypted_email, "ethereum", localStorage);
        if (_email) {
          setEmail(_email.result);
        }
        console.log("Decrypted email:", _email);
      } catch (e) {
        console.log("Error decrypting email:", e);
        setEmail("•••••••••••••");
      }
    }
  }, [user]);
  async function save() {
    if (status != 0) {
      console.log("Already saving.");
      return;
    }
    setStatus(1);
    let profile = {
      ...user.profile
    };
    profile.username = username;
    profile.description = description;
    profile.pfp = pfp ? pfp : null;
    if (pfpNftDetails) {
      profile.pfpIsNft = pfpNftDetails;
    }
    let res = await orbis.updateProfile(profile);
    if (res.status == 200) {
      setStatus(2);
      let _user = {
        ...user
      };
      _user.profile = profile;
      console.log("Updating user to: ", _user);
      setUser(_user);
      await sleep(1500);
      setIsEditing(false);
      setStatus(0);
    } else {
      setStatus(3);
    }
  }
  const SaveButton = () => {
    switch (status) {
      case 0:
        return /*#__PURE__*/React.createElement(Button, {
          color: "primary",
          onClick: () => save()
        }, "Save");
      case 1:
        return /*#__PURE__*/React.createElement(Button, {
          color: "primary"
        }, /*#__PURE__*/React.createElement(LoadingCircle, null), " Saving");
      case 2:
        return /*#__PURE__*/React.createElement(Button, {
          color: "green"
        }, "Saved");
      case 3:
        return /*#__PURE__*/React.createElement(Button, {
          color: "red"
        }, "Error");
      default:
        return null;
    }
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: styles$8.userEditContainer
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$8.userEditPfpContainer
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 44,
      height: 44
    }
  }, /*#__PURE__*/React.createElement(UserPfp, {
    details: {
      profile: {
        pfp: pfp
      }
    },
    showBadge: false
  }), /*#__PURE__*/React.createElement("div", {
    className: styles$8.userEditPfpOverlay,
    style: {
      background: "rgba(0,0,0,0.5)",
      top: 0,
      width: "100%",
      height: "100%"
    },
    onClick: () => setShowProfileModal(true)
  }, /*#__PURE__*/React.createElement(EditIcon, null)))), /*#__PURE__*/React.createElement("div", {
    className: styles$8.userEditButtonContainer,
    onClick: () => setIsEditing(false)
  }, /*#__PURE__*/React.createElement(Button, {
    color: "secondary"
  }, "Cancel"))), /*#__PURE__*/React.createElement("div", {
    className: styles$8.userFieldsContainer
  }, /*#__PURE__*/React.createElement(Input, {
    type: "text",
    name: "username",
    value: username,
    onChange: e => setUsername(e.target.value),
    placeholder: "Your username",
    style: getStyle("input", theme, status == 1)
  }), /*#__PURE__*/React.createElement(Input, {
    type: "textarea",
    name: "description",
    value: description,
    onChange: e => setDescription(e.target.value),
    placeholder: "Enter your description",
    style: {
      ...getStyle("input", theme, status == 1),
      marginTop: "0.5rem"
    }
  }), user.encrypted_email && /*#__PURE__*/React.createElement("p", {
    style: {
      ...getThemeValue("font", theme, "secondary"),
      textAlign: "left",
      fontSize: 13,
      marginTop: 8,
      color: getThemeValue("color", theme, "secondary")
    }
  }, /*#__PURE__*/React.createElement("b", null, "Email"), ": ", email, " ", user.hasLit == false && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-block"
    }
  }, /*#__PURE__*/React.createElement(ConnectButton, {
    icon: null,
    title: "Decrypt email",
    litOnly: true,
    style: {
      fontSize: 13,
      background: "transparent",
      boxShadow: "none",
      padding: 0,
      color: getThemeValue("color", theme, "active")
    }
  })))), /*#__PURE__*/React.createElement("div", {
    className: styles$8.userFieldsSaveContainer
  }, /*#__PURE__*/React.createElement(SaveButton, null)));
}

var styles$9 = {"accessRulesContainer":"_OdJjS","accessRuleContainer":"_1ZmCf","operator":"_1XO9C"};

function AccessRulesModal({
  hide,
  callbackNftUpdate
}) {
  const {
    user,
    theme
  } = useOrbis();
  return /*#__PURE__*/React.createElement(Modal, {
    hide: () => hide(),
    width: 500,
    title: "Access Rules",
    description: "This feed is gated with the following rules:"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      display: "flex",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$9.accessRulesContainer
  }, /*#__PURE__*/React.createElement(LoopAccessRules, null))));
}
const LoopAccessRules = () => {
  const {
    accessRules
  } = useOrbis();
  return accessRules.map((accessRule, key) => {
    return /*#__PURE__*/React.createElement(OneAccessRule, {
      accessRule: accessRule,
      key: key
    });
  });
};
const OneAccessRule = ({
  accessRule
}) => {
  const {
    theme
  } = useOrbis();
  if (accessRule.operator) {
    return /*#__PURE__*/React.createElement("div", {
      className: styles$9.operator,
      style: {
        color: getThemeValue("color", theme, "secondary")
      }
    }, accessRule.operator);
  }
  switch (accessRule.type) {
    case "credential":
      return /*#__PURE__*/React.createElement("div", {
        className: styles$9.accessRuleContainer,
        style: {
          borderColor: getThemeValue("border", theme, "main")
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 13,
          color: getThemeValue("color", theme, "secondary"),
          marginRight: 7
        }
      }, "Must own:"), /*#__PURE__*/React.createElement(LoopCredentials, {
        credentials: accessRule.requiredCredentials
      }));
    case "did":
      return /*#__PURE__*/React.createElement("div", {
        className: styles$9.accessRuleContainer,
        style: {
          borderColor: getThemeValue("border", theme, "main")
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 13,
          color: getThemeValue("color", theme, "secondary"),
          marginRight: 7
        }
      }, "Must be:"), /*#__PURE__*/React.createElement(LoopUsers, {
        users: accessRule.authorizedUsers
      }));
    case "token":
      return /*#__PURE__*/React.createElement("div", {
        className: styles$9.accessRuleContainer,
        style: {
          borderColor: getThemeValue("border", theme, "main")
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 13,
          color: getThemeValue("color", theme, "secondary"),
          marginRight: 7
        }
      }, "Requires ownership of:"), /*#__PURE__*/React.createElement(AccessRuleToken, {
        requiredToken: accessRule.requiredToken
      }));
    default:
      return null;
  }
};
const AccessRuleToken = ({
  requiredToken
}) => {
  const {
    theme
  } = useOrbis();
  return /*#__PURE__*/React.createElement("span", {
    style: {
      ...getThemeValue("font", theme, "main"),
      color: getThemeValue("color", theme, "main"),
      alignItems: "center",
      display: "flex"
    }
  }, requiredToken === null || requiredToken === void 0 ? void 0 : requiredToken.minBalance, " ", requiredToken === null || requiredToken === void 0 ? void 0 : requiredToken.symbol, " ", (requiredToken === null || requiredToken === void 0 ? void 0 : requiredToken.token_id) && /*#__PURE__*/React.createElement("small", {
    style: {
      marginLeft: 4,
      marginRight: 4
    }
  }, "(ID: ", requiredToken.token_id, ")"), " on ", /*#__PURE__*/React.createElement(ChainLogo, {
    chain: requiredToken === null || requiredToken === void 0 ? void 0 : requiredToken.chain,
    address: requiredToken === null || requiredToken === void 0 ? void 0 : requiredToken.address
  }));
};
const LoopCredentials = ({
  credentials
}) => {
  return credentials.map((credential, key) => {
    return /*#__PURE__*/React.createElement(UserCredential, {
      credential: credential,
      key: key
    });
  });
};
const LoopUsers = ({
  users
}) => {
  const {
    theme
  } = useOrbis();
  return users.map((_user, key) => {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        color: getThemeValue("color", theme, "main"),
        fontSize: 15
      }
    }, /*#__PURE__*/React.createElement(User, {
      details: _user.details,
      key: key
    }));
  });
};
const ChainLogo = ({
  chain,
  address
}) => {
  const {
    theme
  } = useOrbis();
  switch (chain) {
    case "mainnet":
      return /*#__PURE__*/React.createElement("a", {
        href: "https://etherscan.io/token/" + address,
        target: "_blank",
        rel: "noreferrer noopenner"
      }, /*#__PURE__*/React.createElement("svg", {
        width: "30",
        height: "30",
        viewBox: "0 0 84 84",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        style: {
          marginLeft: 5
        }
      }, /*#__PURE__*/React.createElement("circle", {
        cx: "42",
        cy: "42",
        r: "42",
        fill: "#F6F6F6"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M41.9969 15L41.6255 16.2306V51.9366L41.9969 52.2981L58.9895 42.501L41.9969 15Z",
        fill: "#343434"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M41.993 15L25 42.501L41.993 52.2981V34.9674V15Z",
        fill: "#8C8C8C"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M41.9969 55.436L41.7876 55.685V68.404L41.9969 69.0001L58.9999 45.644L41.9969 55.436Z",
        fill: "#3C3C3B"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M41.993 69.0001V55.436L25 45.644L41.993 69.0001Z",
        fill: "#8C8C8C"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M41.9907 52.2975L58.9833 42.5005L41.9907 34.9668V52.2975Z",
        fill: "#141414"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M25 42.5005L41.993 52.2975V34.9668L25 42.5005Z",
        fill: "#393939"
      })));
    case "arbitrum":
      return /*#__PURE__*/React.createElement("a", {
        href: "https://arbiscan.io/token/" + address,
        target: "_blank",
        rel: "noreferrer noopenner"
      }, /*#__PURE__*/React.createElement("svg", {
        width: "30",
        height: "30",
        viewBox: "0 0 84 84",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        style: {
          marginLeft: 5
        }
      }, /*#__PURE__*/React.createElement("circle", {
        cx: "42",
        cy: "42",
        r: "41.5",
        fill: "white",
        stroke: "#B0C6D6"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M47.9056 39.6589L52.0182 32.6805L63.1034 49.9457L63.1086 53.2592L63.0724 30.4586C63.0462 29.9011 62.7502 29.3911 62.2781 29.0903L42.3206 17.6109C41.8541 17.3814 41.2617 17.3841 40.7959 17.6181C40.7328 17.6498 40.6739 17.6839 40.6174 17.7215L40.5478 17.7652L21.1757 28.991L21.1006 29.0255C21.0038 29.0696 20.9063 29.1265 20.8143 29.1919C20.4469 29.4552 20.203 29.8449 20.1241 30.2815C20.1124 30.3476 20.1034 30.4152 20.0996 30.4834L20.1299 49.0636L30.4553 33.0602C31.7551 30.9383 34.5875 30.2543 37.217 30.2918L40.3028 30.3731L22.1202 59.5327L24.2635 60.7666L42.6638 30.4028L50.797 30.3731L32.4442 61.5033L40.0922 65.9026L41.0061 66.4278C41.3927 66.5849 41.8482 66.5928 42.2379 66.4519L62.4759 54.7237L58.6066 56.9659L47.9056 39.6589ZM49.4745 62.2583L41.75 50.1342L46.4656 42.1323L56.6104 58.1227L49.4745 62.2583Z",
        fill: "#2D374B"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M41.748 50.1346L49.4729 62.2584L56.6085 58.1231L46.4636 42.1327L41.748 50.1346Z",
        fill: "#28A0F0"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M63.1077 53.2595L63.1025 49.946L52.0174 32.6808L47.9048 39.6592L58.6061 56.9662L62.4754 54.724C62.8548 54.4159 63.0846 53.9635 63.1087 53.4756L63.1077 53.2595Z",
        fill: "#28A0F0"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M16.6558 56.3842L22.1198 59.5327L40.3023 30.3732L37.2166 30.2918C34.5874 30.2546 31.755 30.9383 30.4549 33.0602L20.1295 49.0636L16.6558 54.4008V56.3842V56.3842Z",
        fill: "white"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M50.7961 30.3732L42.663 30.4028L24.2627 60.7666L30.6943 64.4695L32.4431 61.5033L50.7961 30.3732Z",
        fill: "white"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M66.5353 30.3311C66.4674 28.6302 65.5463 27.0734 64.1039 26.1668L43.8849 14.5393C42.458 13.8208 40.6755 13.8198 39.2458 14.5389C39.077 14.624 19.5833 25.9298 19.5833 25.9298C19.3135 26.059 19.0537 26.213 18.8094 26.388C17.5217 27.3112 16.7367 28.7453 16.6558 30.3208V54.4011L20.1295 49.0639L20.0992 30.4834C20.1033 30.4155 20.1119 30.3483 20.1236 30.2825C20.2022 29.8452 20.4465 29.4555 20.8138 29.1919C20.9058 29.1264 40.732 17.6498 40.7951 17.6181C41.2613 17.3841 41.8533 17.3814 42.3198 17.6109L62.2773 29.0903C62.7494 29.3911 63.0454 29.9011 63.0715 30.4586V53.4749C63.0474 53.9628 62.8545 54.4153 62.4751 54.7233L58.6058 56.9655L56.6093 58.1226L49.4737 62.2579L42.2371 66.4515C41.8474 66.5924 41.3915 66.5845 41.0052 66.4274L32.4434 61.503L30.6943 64.4691L38.3888 68.8991C38.6431 69.0438 38.8699 69.172 39.056 69.2767C39.344 69.4383 39.5404 69.5462 39.6097 69.58C40.1565 69.8456 40.9432 70 41.6524 70C42.3023 70 42.9363 69.8808 43.5362 69.6458L64.5553 57.4734C65.7617 56.5386 66.4715 55.1289 66.5353 53.6021V30.3311Z",
        fill: "#96BEDC"
      })));
    case "optimism":
      return /*#__PURE__*/React.createElement("a", {
        href: "https://optimistic.etherscan.io/token/" + address,
        target: "_blank",
        rel: "noreferrer noopenner"
      }, /*#__PURE__*/React.createElement("svg", {
        width: "30",
        height: "30",
        viewBox: "0 0 84 84",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        style: {
          marginLeft: 5
        }
      }, /*#__PURE__*/React.createElement("g", {
        "clip-path": "url(#clip0_1139_294)"
      }, /*#__PURE__*/React.createElement("path", {
        d: "M42 84C65.196 84 84 65.196 84 42C84 18.804 65.196 0 42 0C18.804 0 0 18.804 0 42C0 65.196 18.804 84 42 84Z",
        fill: "#FF0420"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M30.4614 53.7602C27.9282 53.7602 25.8527 53.1504 24.2347 51.9309C22.6382 50.6895 21.8398 48.9255 21.8398 46.6389C21.8398 46.1597 21.8931 45.5717 21.9994 44.8749C22.2763 43.3069 22.6701 41.4232 23.181 39.2235C24.6285 33.2347 28.3646 30.2402 34.3891 30.2402C36.0283 30.2402 37.4971 30.5233 38.7956 31.0896C40.0942 31.634 41.116 32.4615 41.8611 33.5722C42.6062 34.6612 42.9788 35.9679 42.9788 37.4923C42.9788 37.9496 42.9255 38.5267 42.819 39.2235C42.4998 41.1617 42.1166 43.0455 41.6696 44.8749C40.9245 47.8584 39.6366 50.0906 37.8057 51.5715C35.975 53.0306 33.5269 53.7602 30.4614 53.7602ZM30.9085 49.0562C32.1006 49.0562 33.1118 48.6969 33.9421 47.9782C34.7935 47.2596 35.4003 46.1597 35.7622 44.6788C36.2517 42.6317 36.6243 40.8461 36.8797 39.3216C36.9649 38.8642 37.0074 38.396 37.0074 37.9168C37.0074 35.9351 35.9964 34.9442 33.974 34.9442C32.7819 34.9442 31.7601 35.3036 30.9085 36.0223C30.0782 36.7408 29.4822 37.8407 29.1203 39.3216C28.7371 40.7807 28.3539 42.5664 27.9708 44.6788C27.8857 45.1144 27.843 45.5717 27.843 46.0509C27.843 48.0544 28.8648 49.0562 30.9085 49.0562Z",
        fill: "white"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M44.445 53.4332C44.2108 53.4332 44.0299 53.3569 43.9021 53.2044C43.7957 53.0302 43.7638 52.8343 43.8063 52.6164L48.2129 31.3832C48.2554 31.1437 48.3725 30.9476 48.5642 30.7952C48.7557 30.6427 48.958 30.5664 49.1709 30.5664H57.6648C60.0277 30.5664 61.9222 31.0674 63.3486 32.0692C64.7962 33.0709 65.52 34.5191 65.52 36.4138C65.52 36.9583 65.4561 37.5245 65.3284 38.1125C64.7962 40.617 63.7212 42.468 62.1032 43.6659C60.5067 44.8635 58.3139 45.4625 55.5253 45.4625H51.2144L49.7456 52.6164C49.7031 52.856 49.586 53.052 49.3943 53.2044C49.2028 53.3569 49.0005 53.4332 48.7877 53.4332H44.445ZM55.7487 40.9545C56.6428 40.9545 57.4198 40.704 58.0799 40.2032C58.761 39.7022 59.208 38.9835 59.4211 38.0471C59.4849 37.677 59.5168 37.3502 59.5168 37.0672C59.5168 36.4357 59.3359 35.9565 58.974 35.6298C58.612 35.2813 57.9947 35.1071 57.1218 35.1071H53.2901L52.0766 40.9545H55.7487Z",
        fill: "white"
      })), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("clipPath", {
        id: "clip0_1139_294"
      }, /*#__PURE__*/React.createElement("rect", {
        width: "84",
        height: "84",
        fill: "white"
      })))));
    case "polygon":
      return /*#__PURE__*/React.createElement("a", {
        href: "https://polygonscan.com/token/" + address,
        target: "_blank",
        rel: "noreferrer noopenner"
      }, /*#__PURE__*/React.createElement("svg", {
        width: "30",
        height: "30",
        viewBox: "0 0 84 84",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        style: {
          marginLeft: 5
        }
      }, /*#__PURE__*/React.createElement("circle", {
        cx: "42",
        cy: "42",
        r: "42",
        fill: "#8247E5"
      }), /*#__PURE__*/React.createElement("g", {
        "clip-path": "url(#clip0_1003_142)"
      }, /*#__PURE__*/React.createElement("path", {
        d: "M55.0896 33.3975C54.1701 32.8721 52.9881 32.8721 51.9373 33.3975L44.5821 37.7318L39.591 40.49L32.3672 44.8244C31.4478 45.3497 30.2657 45.3497 29.2149 44.8244L23.5672 41.4094C22.6478 40.8841 21.991 39.8333 21.991 38.6512V32.0841C21.991 31.0333 22.5164 29.9826 23.5672 29.3259L29.2149 26.0423C30.1343 25.5169 31.3164 25.5169 32.3672 26.0423L38.0149 29.4572C38.9343 29.9826 39.591 31.0333 39.591 32.2154V36.5497L44.5821 33.6602V29.1945C44.5821 28.1438 44.0567 27.093 43.006 26.4363L32.4985 20.2632C31.5791 19.7378 30.397 19.7378 29.3463 20.2632L18.5761 26.5676C17.5254 27.093 17 28.1438 17 29.1945V41.5408C17 42.5915 17.5254 43.6423 18.5761 44.299L29.2149 50.4721C30.1343 50.9975 31.3164 50.9975 32.3672 50.4721L39.591 46.2691L44.5821 43.3796L51.806 39.1766C52.7254 38.6512 53.9075 38.6512 54.9582 39.1766L60.606 42.4602C61.5254 42.9856 62.1821 44.0363 62.1821 45.2184V51.7856C62.1821 52.8363 61.6567 53.887 60.606 54.5438L55.0896 57.8273C54.1701 58.3527 52.9881 58.3527 51.9373 57.8273L46.2896 54.5438C45.3701 54.0184 44.7134 52.9676 44.7134 51.7856V47.5826L39.7224 50.4721V54.8065C39.7224 55.8572 40.2478 56.9079 41.2985 57.5647L51.9373 63.7378C52.8567 64.2632 54.0388 64.2632 55.0896 63.7378L65.7284 57.5647C66.6478 57.0393 67.3045 55.9885 67.3045 54.8065V42.3288C67.3045 41.2781 66.7791 40.2273 65.7284 39.5706L55.0896 33.3975Z",
        fill: "white"
      })), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("clipPath", {
        id: "clip0_1003_142"
      }, /*#__PURE__*/React.createElement("rect", {
        width: "50.4358",
        height: "44",
        fill: "white",
        transform: "translate(17 20)"
      })))));
    case "goerli":
      return /*#__PURE__*/React.createElement("a", {
        href: "https://goerli.etherscan.io/token/" + address,
        target: "_blank",
        rel: "noreferrer noopenner",
        style: {
          marginLeft: 5,
          color: getThemeValue("color", theme, "active")
        }
      }, /*#__PURE__*/React.createElement("span", null, "Goerli"));
    case "mumbai":
      return /*#__PURE__*/React.createElement("a", {
        href: "https://mumbai.polygonscan.com/token/" + address,
        target: "_blank",
        rel: "noreferrer noopenner",
        style: {
          marginLeft: 5,
          color: getThemeValue("color", theme, "active")
        }
      }, /*#__PURE__*/React.createElement("span", null, "Mumbai"));
  }
};

const CommentsContext = React.createContext({});

var styles$a = {"postboxGlobalContainer":"_3glYN","postboxConnectContainer":"_AFaEi","postboxUserContainer":"_2PH81","postboxContainer":"_3G9kY","postbox":"_1Y2r9","postboxInput":"_beLGF","accessRulesContainer":"_38Oc2","hoverLink":"_2DzGC","postboxShareContainer":"_3AOEJ","postboxShareContainerBtn":"_1be8d","postboxReplyContainer":"_3DmQC","postboxReplyBadge":"_2pfJ3","postboxGatingTextMobile":"_1r63_","postboxGatingTextDesktop":"_3OkEg","loadingContainer":"_JNMN2","mentionsBoxContainer":"_x-3dD","mentionsBoxInputContainer":"_AXWLZ","mentionsBoxEmptyState":"_2mojb","userResults":"_UbM_B","userResultContainer":"_Y9wr7"};

let mentions = [];
function Postbox({
  showPfp = true,
  connecting,
  reply = null,
  callback,
  rows = "2",
  defaultPost,
  setEditPost,
  ctaTitle = "Comment",
  ctaStyle = styles$a.postboxShareContainerBtn,
  placeholder = "Add your comment..."
}) {
  const {
    user,
    setUser,
    orbis,
    theme,
    context,
    accessRules,
    hasAccess
  } = useOrbis();
  const {
    comments,
    setComments
  } = useContext(CommentsContext);
  const [sharing, setSharing] = useState(false);
  const [hoverRef, isHovered] = useHover();
  const [body, setBody] = useState("");
  const [accessRulesModalVis, setAccessRulesModalVis] = useState(false);
  const postbox = useRef();
  const [mentionsBoxVis, setMentionsBoxVis] = useState(false);
  const [focusOffset, setFocusOffset] = useState(null);
  const [focusNode, setFocusNode] = useState(null);
  useEffect(() => {
    if (defaultPost) {
      if (postbox.current) {
        postbox.current.textContent = defaultPost.content.body;
        setBody(defaultPost.content.body);
      }
    }
  }, [defaultPost, postbox]);
  const handleSubmit = async event => {
    console.log("Submitting form.");
    event.preventDefault();
    if (sharing) {
      console.log("A request is already being processed.");
      return;
    }
    setSharing(true);
    const formData = new FormData(event.target);
    let master = null;
    if (reply && reply.content.master) {
      master = reply.content.master;
    } else if (reply) {
      master = reply.stream_id;
    }
    if (defaultPost) {
      let _contentEdit = {
        ...defaultPost.content
      };
      _contentEdit.body = body;
      let res = await orbis.editPost(defaultPost.stream_id, _contentEdit);
      console.log("res:", res);
      if (callback) {
        callback(_contentEdit);
      }
    } else {
      let _contentCreate = {
        body: body,
        context: context ? context : null,
        master: master,
        reply_to: reply ? reply.stream_id : null,
        mentions: mentions
      };
      let res = await orbis.createPost(_contentCreate);
      if (res.status == 200) {
        if (comments) {
          setComments([{
            timestamp: getTimestamp(),
            creator_details: user,
            creator: user.did,
            stream_id: res.doc,
            content: _contentCreate,
            count_likes: 0
          }, ...comments]);
        }
      } else {
        console.log("Error submitting form:", res);
      }
      if (callback) {
        callback();
      }
    }
    if (postbox.current) {
      postbox.current.value = "";
    }
    setBody(null);
    mentions = [];
    if (postbox.current) {
      postbox.current.textContent = "";
    }
    setSharing(false);
  };
  async function handleInput(e) {
    var _user$nonces;
    let inputValue = e.currentTarget.innerText;
    let keyCode = e.nativeEvent.data;
    switch (keyCode) {
      case "@":
        if (user.nonces && ((_user$nonces = user.nonces) === null || _user$nonces === void 0 ? void 0 : _user$nonces.global) <= 0 && user.a_r <= 1) {
          return;
        } else {
          setMentionsBoxVis(true);
        }
        console.log("Should show mention box!");
        break;
      case " ":
        postbox === null || postbox === void 0 ? void 0 : postbox.current.focus();
        break;
      default:
        setMentionsBoxVis(false);
        break;
    }
    setBody(inputValue);
    saveCaretPos(document.getSelection());
  }
  function saveCaretPos(_sel) {
    setFocusOffset(_sel.focusOffset);
    setFocusNode(_sel.focusNode);
  }
  function addMention(mention) {
    var _mention$profile, _mention$profile$user;
    console.log("Adding user:", mention);
    restoreCaretPos();
    let _mentionName = (_mention$profile = mention.profile) === null || _mention$profile === void 0 ? void 0 : (_mention$profile$user = _mention$profile.username) === null || _mention$profile$user === void 0 ? void 0 : _mention$profile$user.replaceAll(" ", "");
    mentions.push({
      username: "@" + _mentionName,
      did: mention.did
    });
    var _mentionTag = "<span style='color: " + getThemeValue("color", theme, "active") + "; font-weight: " + 500 + ";' class='mention' contentEditable='false' data-did='" + mention.did + "'>@" + _mentionName + "</span>&nbsp;";
    document.execCommand("delete", null, false);
    document.execCommand("insertHTML", false, _mentionTag);
    console.log("Trying to paste mention:", _mentionTag);
    setMentionsBoxVis(false);
  }
  function restoreCaretPos() {
    postbox.current.focus();
    var sel = document.getSelection();
    sel.collapse(focusNode, focusOffset);
  }
  if (user) {
    var _theme$color, _theme$badges, _theme$badges$main, _theme$badges2, _theme$badges2$main;
    return /*#__PURE__*/React.createElement("div", {
      className: styles$a.postboxGlobalContainer
    }, showPfp && /*#__PURE__*/React.createElement("div", {
      className: styles$a.postboxUserContainer,
      ref: hoverRef
    }, /*#__PURE__*/React.createElement(UserPfp, {
      details: user,
      hover: true,
      showEmailCta: true
    })), /*#__PURE__*/React.createElement("div", {
      className: styles$a.postboxContainer
    }, /*#__PURE__*/React.createElement("form", {
      style: {
        width: "100%"
      },
      onSubmit: event => handleSubmit(event)
    }, /*#__PURE__*/React.createElement("div", {
      className: styles$a.postbox,
      style: {
        borderColor: getThemeValue("input", theme).border,
        backgroundColor: getThemeValue("input", theme, sharing).background
      }
    }, reply && /*#__PURE__*/React.createElement("div", {
      className: styles$a.postboxReplyContainer
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        marginRight: "0.25rem",
        color: theme !== null && theme !== void 0 && (_theme$color = theme.color) !== null && _theme$color !== void 0 && _theme$color.secondary ? theme.color.secondary : defaultTheme.color.secondary
      }
    }, "Replying to:"), /*#__PURE__*/React.createElement("div", {
      className: styles$a.postboxReplyBadge,
      style: {
        background: theme !== null && theme !== void 0 && (_theme$badges = theme.badges) !== null && _theme$badges !== void 0 && (_theme$badges$main = _theme$badges.main) !== null && _theme$badges$main !== void 0 && _theme$badges$main.bg ? theme.badges.main.bg : defaultTheme.badges.main.bg,
        color: theme !== null && theme !== void 0 && (_theme$badges2 = theme.badges) !== null && _theme$badges2 !== void 0 && (_theme$badges2$main = _theme$badges2.main) !== null && _theme$badges2$main !== void 0 && _theme$badges2$main.color ? theme.badges.main.color : defaultTheme.badges.main.color
      }
    }, /*#__PURE__*/React.createElement(Username, {
      details: reply.creator_details
    }))), hasAccess && /*#__PURE__*/React.createElement("div", {
      contentEditable: true,
      autoFocus: true,
      "data-placeholder": placeholder,
      ref: postbox,
      rows: rows,
      name: "body",
      id: "postbox-area",
      value: body,
      onChange: e => setBody(e.target.value),
      className: styles$a.postboxInput,
      style: {
        fontSize: 15,
        color: getThemeValue("input", theme, sharing).color,
        ...getThemeValue("font", theme, "secondary")
      },
      placeholder: placeholder,
      disabled: sharing,
      onInput: e => handleInput(e)
    }), /*#__PURE__*/React.createElement("div", {
      className: styles$a.postboxShareContainer
    }, accessRules && accessRules.length > 0 && /*#__PURE__*/React.createElement(AccessRulesDetails, {
      setAccessRulesModalVis: setAccessRulesModalVis
    }), sharing ? /*#__PURE__*/React.createElement("button", {
      type: "submit",
      className: ctaStyle,
      style: {
        background: "transparent",
        color: getThemeValue("color", theme, "main"),
        ...getThemeValue("font", theme, "buttons")
      }
    }, /*#__PURE__*/React.createElement(LoadingCircle, null), " Sending") : /*#__PURE__*/React.createElement(React.Fragment, null, defaultPost && /*#__PURE__*/React.createElement(Button, {
      color: "secondary",
      style: {
        marginRight: 5
      },
      onClick: () => setEditPost(false)
    }, "Cancel"), hasAccess ? /*#__PURE__*/React.createElement("button", {
      type: "submit",
      className: ctaStyle,
      style: {
        ...getStyle("button-main", theme, "main"),
        ...getThemeValue("font", theme, "buttons")
      }
    }, ctaTitle, /*#__PURE__*/React.createElement(SendIcon, null)) : /*#__PURE__*/React.createElement("button", {
      type: "submit",
      disabled: true,
      className: ctaStyle,
      style: {
        ...getStyle("button-main", theme, "main"),
        ...getThemeValue("font", theme, "buttons"),
        opacity: 0.7,
        marginTop: 10
      }
    }, /*#__PURE__*/React.createElement(LockIcon, {
      style: {
        marginRight: 5
      }
    }), "Locked"))))), mentionsBoxVis && /*#__PURE__*/React.createElement(MentionsBox, {
      add: addMention
    })), accessRulesModalVis && /*#__PURE__*/React.createElement(AccessRulesModal, {
      hide: () => setAccessRulesModalVis(false)
    }));
  } else {
    return /*#__PURE__*/React.createElement("div", {
      className: styles$a.postboxConnectContainer
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: "60%"
      }
    }, /*#__PURE__*/React.createElement(ConnectButton, {
      orbis: orbis
    }), accessRules && accessRules.length > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 10
      }
    }, /*#__PURE__*/React.createElement(AccessRulesDetails, {
      setAccessRulesModalVis: setAccessRulesModalVis,
      style: {
        justifyContent: "center"
      }
    }))), accessRulesModalVis && /*#__PURE__*/React.createElement(AccessRulesModal, {
      hide: () => setAccessRulesModalVis(false)
    }));
  }
}
const MentionsBox = ({
  add
}) => {
  var _theme$bg, _theme$border, _theme$border2, _theme$color3;
  const {
    orbis,
    user,
    theme
  } = useOrbis();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (search && search.length >= 2) {
      searchUsers();
    }
    async function searchUsers() {
      setLoading(true);
      let {
        data,
        error,
        status
      } = await orbis.getProfilesByUsername(search);
      setLoading(false);
      if (error) {
        console.log("Error querying Orbis usernames: ", error);
      }
      if (data) {
        setUsers(data);
      } else {
        setUsers([]);
      }
    }
  }, [search]);
  const LoopUsers = () => {
    if (!search || search == "" || search.length < 2) {
      return null;
    }
    if (loading) {
      return /*#__PURE__*/React.createElement("div", {
        className: styles$a.loadingContainer,
        style: {
          color: getThemeValue("color", theme, "main")
        }
      }, /*#__PURE__*/React.createElement(LoadingCircle, null));
    } else {
      if (users.length > 0) {
        return users.map((_user, key) => {
          var _theme$color2;
          return /*#__PURE__*/React.createElement("div", {
            className: styles$a.userResultContainer,
            onClick: () => add(_user.details),
            style: {
              fontSize: 15,
              color: theme !== null && theme !== void 0 && (_theme$color2 = theme.color) !== null && _theme$color2 !== void 0 && _theme$color2.main ? theme.color.main : defaultTheme.color.main
            },
            key: key
          }, /*#__PURE__*/React.createElement(User, {
            details: _user.details,
            key: key,
            isLink: false
          }));
        });
      } else {
        return /*#__PURE__*/React.createElement("p", null, "No users");
      }
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: styles$a.mentionsBoxContainer,
    style: {
      background: theme !== null && theme !== void 0 && (_theme$bg = theme.bg) !== null && _theme$bg !== void 0 && _theme$bg.secondary ? theme.bg.secondary : defaultTheme.bg.secondary,
      borderColor: theme !== null && theme !== void 0 && (_theme$border = theme.border) !== null && _theme$border !== void 0 && _theme$border.main ? theme.border.main : defaultTheme.border.main
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$a.mentionsBoxInputContainer
  }, /*#__PURE__*/React.createElement(Input, {
    autofocus: true,
    type: "text",
    name: "username",
    value: search,
    onChange: e => setSearch(e.target.value),
    placeholder: "Search username",
    style: {
      ...getStyle("input", theme, status == 1),
      borderRadius: 0,
      borderWidth: 0,
      borderBottomWidth: 1
    }
  })), search && search.length >= 2 ? /*#__PURE__*/React.createElement("div", {
    className: styles$a.userResults,
    style: {
      borderColor: theme !== null && theme !== void 0 && (_theme$border2 = theme.border) !== null && _theme$border2 !== void 0 && _theme$border2.main ? theme.border.main : defaultTheme.border.main
    }
  }, /*#__PURE__*/React.createElement(LoopUsers, null)) : /*#__PURE__*/React.createElement("p", {
    className: styles$a.mentionsBoxEmptyState,
    style: {
      color: theme !== null && theme !== void 0 && (_theme$color3 = theme.color) !== null && _theme$color3 !== void 0 && _theme$color3.secondary ? theme.color.secondary : defaultTheme.color.secondary
    }
  }, "Search by username to mention someone."));
};
const AccessRulesDetails = ({
  setAccessRulesModalVis,
  style
}) => {
  const {
    user,
    setUser,
    orbis,
    theme,
    context,
    accessRules,
    hasAccess
  } = useOrbis();
  useEffect(() => {
    getLabel();
  }, []);
  function getLabel(type) {
    let labelDesktop = "This discussion feed is gated. ";
    let labelMobile = "Discussion is gated. ";
    let countCredentialsRules = 0;
    let countDidRules = 0;
    let countTokenRules = 0;
    accessRules.forEach((rule, i) => {
      switch (rule.type) {
        case "credentials":
          countCredentialsRules++;
          break;
        case "did":
          countDidRules++;
          break;
        case "token":
          countTokenRules++;
          break;
      }
    });
    if (countTokenRules > 0 && countCredentialsRules == 0 && countDidRules == 0) {
      labelDesktop = "Discussion feed is token gated. ";
      labelMobile = "Discussion gated. ";
    }
    if (countTokenRules == 0 && countCredentialsRules > 0 && countDidRules == 0) {
      labelDesktop = "Discussion feed is gated using credentials. ";
      labelMobile = "Discussion gated. ";
    }
    if (countTokenRules == 0 && countCredentialsRules == 0 && countDidRules > 0) {
      labelDesktop = "Discussion feed is restricted to some users. ";
      labelMobile = "Discussion gated. ";
    }
    if (type == "mobile") {
      return labelMobile;
    }
    if (type == "desktop") {
      return labelDesktop;
    }
  }
  return /*#__PURE__*/React.createElement("div", {
    className: styles$a.accessRulesContainer,
    style: {
      color: getThemeValue("color", theme, "secondary"),
      ...style
    }
  }, user && hasAccess ? /*#__PURE__*/React.createElement(UnlockIcon, {
    style: {
      marginRight: 5,
      color: getThemeValue("color", theme, "secondary")
    }
  }) : /*#__PURE__*/React.createElement(LockIcon, {
    style: {
      marginRight: 5,
      color: getThemeValue("color", theme, "secondary")
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: styles$a.postboxGatingTextMobile,
    style: {
      color: getThemeValue("color", theme, "secondary"),
      ...getThemeValue("font", theme, "secondary")
    }
  }, getLabel("mobile"), " ", /*#__PURE__*/React.createElement("span", {
    className: styles$a.hoverLink,
    style: {
      fontWeight: 500,
      color: getThemeValue("color", theme, "active")
    },
    onClick: () => setAccessRulesModalVis(true)
  }, "View rules")), /*#__PURE__*/React.createElement("span", {
    className: styles$a.postboxGatingTextDesktop,
    style: {
      color: getThemeValue("color", theme, "secondary"),
      ...getThemeValue("font", theme, "secondary")
    }
  }, getLabel("desktop"), "  ", /*#__PURE__*/React.createElement("span", {
    className: styles$a.hoverLink,
    style: {
      fontWeight: 500,
      color: getThemeValue("color", theme, "active")
    },
    onClick: () => setAccessRulesModalVis(true)
  }, "View")));
};

var styles$b = {"postContainer":"_3_x9y","postDetailsContainer":"_3lHql","postDetailsContainerMetadata":"_24K_v","postDetailsContainerUser":"_3Quh-","postDetailsContainerUsername":"_2AqE9","postDetailsContainerTimestamp":"_fC7lP","postReplyCta":"_1LQro","postContent":"_lajK0","postViewMoreCtaContainer":"_1d8-E","postActionsContainer":"_2kUJi","postActionButton":"_tFyW_","postUrlMetadataContainer":"_1GVYT","postUrlMetadataImage":"_1WVVA","postUrlMetadataDetails":"_3TElm","postMenuContainer":"_1V9U6","hideMobile":"_2_Z8P"};

function Post({
  post,
  characterLimit = null
}) {
  var _theme$color;
  const {
    user,
    setUser,
    orbis,
    theme,
    hasAccess
  } = useOrbis();
  const [editPost, setEditPost] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [reply, setReply] = useState();
  const [userReaction, setUserReaction] = useState();
  const [postMenuVis, setPostMenuVis] = useState(false);
  const [hoverRef, isHovered] = useHover();
  useEffect(() => {
    if (user) {
      getUserReaction();
    }
  }, [user]);
  async function getUserReaction() {
    let {
      data,
      error
    } = await orbis.getReaction(post.stream_id, user.did);
    if (data) {
      setUserReaction(data.type);
    }
  }
  async function like(type) {
    if (!user) {
      alert("You must be connected to react to posts.");
      return;
    }
    if (!hasAccess) {
      alert("You need the required credentials to react to posts in this feed.");
      return;
    }
    setUserReaction(type);
    let res = await orbis.react(post.stream_id, type);
    switch (res.status) {
      case 300:
        console.log("Error reacting to the post:", res);
        break;
    }
  }
  function callbackShared() {
    setReply(false);
  }
  function callbackEdit(content) {
    console.log("Enter callbackShared()");
    setEditPost(false);
    post.content = content;
  }
  if (isDeleted) {
    return null;
  }
  return /*#__PURE__*/React.createElement("div", {
    className: styles$b.postContainer
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    },
    ref: hoverRef
  }, /*#__PURE__*/React.createElement(UserPfp, {
    details: post.creator_details,
    hover: false
  }), /*#__PURE__*/React.createElement(UserPopup, {
    visible: isHovered,
    details: post.creator_details
  })), /*#__PURE__*/React.createElement("div", {
    className: styles$b.postDetailsContainer
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$b.postDetailsContainerMetadata
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$b.postDetailsContainerUser
  }, /*#__PURE__*/React.createElement("span", {
    className: styles$b.postDetailsContainerUsername,
    style: {
      ...getThemeValue("font", theme, "main"),
      color: getThemeValue("color", theme, "main")
    }
  }, /*#__PURE__*/React.createElement(Username, {
    details: post.creator_details
  })), /*#__PURE__*/React.createElement("div", {
    className: styles$b.hideMobile,
    style: {
      marginLeft: "0.5rem"
    }
  }, /*#__PURE__*/React.createElement(UserBadge, {
    details: post.creator_details
  }))), /*#__PURE__*/React.createElement("p", {
    className: styles$b.postDetailsContainerTimestamp,
    style: {
      fontSize: 12,
      color: theme !== null && theme !== void 0 && (_theme$color = theme.color) !== null && _theme$color !== void 0 && _theme$color.secondary ? theme.color.secondary : defaultTheme.color.secondary
    }
  }, /*#__PURE__*/React.createElement(ReactTimeAgo, {
    style: {
      display: "flex",
      fontSize: 12,
      ...getThemeValue("font", theme, "actions")
    },
    date: post.timestamp * 1000,
    locale: "en-US"
  }), /*#__PURE__*/React.createElement("div", {
    className: styles$b.hideMobile
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "0.5rem",
      marginRight: "0.5rem",
      color: getThemeValue("color", theme, "secondary"),
      ...getThemeValue("font", theme, "actions")
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("a", {
    style: {
      textDecoration: "none",
      color: getThemeValue("color", theme, "secondary"),
      ...getThemeValue("font", theme, "actions")
    },
    href: "https://cerscan.com/mainnet/stream/" + post.stream_id,
    rel: "noreferrer",
    target: "_blank"
  }, "Proof")), user && user.did == post.creator && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "0.5rem",
      marginRight: "0.5rem",
      color: getThemeValue("color", theme, "secondary")
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("div", {
    style: {
      alignItems: "center",
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      cursor: "pointer",
      color: getThemeValue("color", theme, "secondary")
    },
    onClick: () => setPostMenuVis(true)
  }, /*#__PURE__*/React.createElement(MenuHorizontal, null)), postMenuVis && /*#__PURE__*/React.createElement(PostMenu, {
    stream_id: post.stream_id,
    setPostMenuVis: setPostMenuVis,
    setEditPost: setEditPost,
    setIsDeleted: setIsDeleted
  }))))), editPost ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "0.5rem"
    }
  }, /*#__PURE__*/React.createElement(Postbox, {
    showPfp: false,
    defaultPost: post,
    reply: reply,
    callback: callbackEdit,
    rows: "1",
    ctaTitle: "Edit",
    ctaStyle: styles$b.postReplyCta,
    setEditPost: setEditPost
  })) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement(PostBody, {
    post: post,
    characterLimit: characterLimit
  })), /*#__PURE__*/React.createElement("div", {
    className: styles$b.postActionsContainer
  }, reply != null ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: styles$b.postActionButton,
    style: {
      color: getThemeValue("color", theme, "active"),
      ...getThemeValue("font", theme, "actions")
    },
    onClick: () => setReply(null)
  }, /*#__PURE__*/React.createElement(ReplyIcon, {
    type: "full"
  }), "Reply") : /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: styles$b.postActionButton,
    style: {
      color: getThemeValue("color", theme, "secondary"),
      ...getThemeValue("font", theme, "actions")
    },
    onClick: () => setReply(post)
  }, /*#__PURE__*/React.createElement(ReplyIcon, {
    type: "line"
  }), "Reply"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "0.75rem",
      flexDirection: "row",
      display: "flex"
    }
  }, userReaction == "like" ? /*#__PURE__*/React.createElement("button", {
    className: styles$b.postActionButton,
    style: {
      color: getThemeValue("color", theme, "active"),
      ...getThemeValue("font", theme, "actions")
    },
    onClick: () => like(null)
  }, /*#__PURE__*/React.createElement(LikeIcon, {
    type: "full"
  }), "Liked") : /*#__PURE__*/React.createElement("button", {
    className: styles$b.postActionButton,
    style: {
      color: getThemeValue("color", theme, "secondary"),
      ...getThemeValue("font", theme, "actions")
    },
    onClick: () => like("like")
  }, /*#__PURE__*/React.createElement(LikeIcon, {
    type: "line"
  }), "Like"))), reply && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(Postbox, {
    reply: reply,
    callback: callbackShared,
    placeholder: "Add your reply...",
    rows: "1",
    ctaTitle: "Reply",
    ctaStyle: styles$b.postReplyCta
  }))));
}
const PostBody = ({
  post,
  characterLimit
}) => {
  var _post$content, _post$content2, _post$content2$body, _post$indexing_metada, _post$creator_details;
  const {
    theme
  } = useOrbis();
  const [charLimit, setCharLimit] = useState(characterLimit);
  const [body, setBody] = useState(post === null || post === void 0 ? void 0 : (_post$content = post.content) === null || _post$content === void 0 ? void 0 : _post$content.body);
  useEffect(() => {
    let _body = post.content.body;
    let mentions = post.content.mentions;
    if (mentions && mentions.length > 0) {
      mentions.forEach((mention, i) => {
        _body = _body.replaceAll(mention.username, "**" + mention.username + "**");
      });
    }
    setBody(_body);
  }, [post]);
  const Body = () => {
    return /*#__PURE__*/React.createElement("div", {
      className: styles$b.postContent,
      style: {
        ...getThemeValue("font", theme, "secondary"),
        color: getThemeValue("color", theme, "main")
      },
      dangerouslySetInnerHTML: {
        __html: marked.parse(charLimit ? (body === null || body === void 0 ? void 0 : body.substring(0, charLimit)) + "..." : body)
      }
    });
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Body, null), charLimit && ((_post$content2 = post.content) === null || _post$content2 === void 0 ? void 0 : (_post$content2$body = _post$content2.body) === null || _post$content2$body === void 0 ? void 0 : _post$content2$body.length) > charLimit ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: styles$b.postViewMoreCtaContainer
  }, /*#__PURE__*/React.createElement(Button, {
    color: "secondary",
    style: {
      marginRight: 5
    },
    onClick: () => setCharLimit(null)
  }, "View more"))) : /*#__PURE__*/React.createElement(React.Fragment, null, ((_post$indexing_metada = post.indexing_metadata) === null || _post$indexing_metada === void 0 ? void 0 : _post$indexing_metada.urlMetadata) && ((_post$creator_details = post.creator_details) === null || _post$creator_details === void 0 ? void 0 : _post$creator_details.a_r) > 15 && /*#__PURE__*/React.createElement(LinkCard, {
    metadata: post.indexing_metadata.urlMetadata
  })));
};
const LinkCard = ({
  metadata
}) => {
  var _theme$bg, _theme$border, _theme$border2, _theme$color2, _theme$color3, _theme$color4;
  const {
    theme
  } = useContext(GlobalContext);
  return /*#__PURE__*/React.createElement("div", {
    className: styles$b.postUrlMetadataContainer,
    style: {
      background: theme !== null && theme !== void 0 && (_theme$bg = theme.bg) !== null && _theme$bg !== void 0 && _theme$bg.secondary ? theme.bg.secondary : defaultTheme.bg.secondary,
      borderColor: theme !== null && theme !== void 0 && (_theme$border = theme.border) !== null && _theme$border !== void 0 && _theme$border.main ? theme.border.main : defaultTheme.border.main,
      maxWidth: 480
    }
  }, metadata.image && /*#__PURE__*/React.createElement("a", {
    href: metadata.url,
    target: "_blank",
    rel: "noreferrer"
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$b.postUrlMetadataImage,
    style: {
      backgroundImage: "url(" + metadata.image + ")"
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: styles$b.postUrlMetadataDetails,
    style: {
      borderColor: theme !== null && theme !== void 0 && (_theme$border2 = theme.border) !== null && _theme$border2 !== void 0 && _theme$border2.secondary ? theme.border.secondary : defaultTheme.border.secondary
    }
  }, metadata.source && /*#__PURE__*/React.createElement("p", {
    style: {
      color: theme !== null && theme !== void 0 && (_theme$color2 = theme.color) !== null && _theme$color2 !== void 0 && _theme$color2.active ? theme.color.active : defaultTheme.color.active,
      ...getThemeValue("font", theme, "secondary"),
      fontSize: 13,
      fontWeight: 500
    }
  }, metadata.source), /*#__PURE__*/React.createElement("h3", {
    style: {
      color: theme !== null && theme !== void 0 && (_theme$color3 = theme.color) !== null && _theme$color3 !== void 0 && _theme$color3.main ? theme.color.main : defaultTheme.color.main,
      fontSize: 17,
      fontWeight: 500,
      lineHeight: "1.5rem"
    }
  }, metadata.title), metadata.description && /*#__PURE__*/React.createElement("p", {
    style: {
      color: theme !== null && theme !== void 0 && (_theme$color4 = theme.color) !== null && _theme$color4 !== void 0 && _theme$color4.secondary ? theme.color.secondary : defaultTheme.color.secondary,
      fontSize: 15
    }
  }, metadata.description.length > 155 ? /*#__PURE__*/React.createElement(React.Fragment, null, metadata.description, "...") : /*#__PURE__*/React.createElement(React.Fragment, null, metadata.description))));
};
const PostMenu = ({
  stream_id,
  setPostMenuVis,
  setEditPost,
  setIsDeleted
}) => {
  var _theme$bg2, _theme$border3, _theme$color5;
  const {
    orbis,
    theme
  } = useContext(GlobalContext);
  const [deletingStatus, setDeletingStatus] = useState(0);
  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, () => hide());
  async function _delete() {
    setDeletingStatus(1);
    let res = await orbis.deletePost(stream_id);
    console.log("res delete:", res);
    setDeletingStatus(2);
  }
  function edit() {
    setPostMenuVis(false);
    setEditPost(true);
  }
  function hide() {
    if (deletingStatus == 2) {
      setIsDeleted(true);
    }
    setPostMenuVis(false);
  }
  function DeleteButton() {
    switch (deletingStatus) {
      case 0:
        return /*#__PURE__*/React.createElement("div", {
          class: "text-red-700 hover:bg-gray-50 flex items-center px-3 py-2 text-sm font-medium rounded-md cursor-pointer",
          onClick: () => _delete()
        }, "Delete");
      case 1:
        return /*#__PURE__*/React.createElement("div", {
          class: "text-red-700 flex items-center px-3 py-2 text-sm font-medium rounded-md"
        }, /*#__PURE__*/React.createElement(LoadingCircle, {
          color: "text-red-700"
        }), /*#__PURE__*/React.createElement("span", {
          class: "truncate"
        }, "Deleting"));
      case 2:
        return /*#__PURE__*/React.createElement("div", {
          class: "text-green-700 flex items-center px-3 py-2 text-sm font-medium rounded-md"
        }, /*#__PURE__*/React.createElement("span", {
          class: "truncate mr-2"
        }, "Deleted"));
    }
  }
  return /*#__PURE__*/React.createElement("div", {
    className: styles$b.postMenuContainer,
    ref: wrapperRef,
    style: {
      right: 10,
      background: theme !== null && theme !== void 0 && (_theme$bg2 = theme.bg) !== null && _theme$bg2 !== void 0 && _theme$bg2.secondary ? theme.bg.secondary : defaultTheme.bg.secondary,
      borderColor: theme !== null && theme !== void 0 && (_theme$border3 = theme.border) !== null && _theme$border3 !== void 0 && _theme$border3.main ? theme.border.main : defaultTheme.border.main
    }
  }, /*#__PURE__*/React.createElement("div", {
    class: "flex items-center px-3 py-2 text-sm font-medium rounded-md cursor-pointer",
    style: {
      color: theme !== null && theme !== void 0 && (_theme$color5 = theme.color) !== null && _theme$color5 !== void 0 && _theme$color5.main ? theme.color.main : defaultTheme.color.main
    },
    "aria-current": "page",
    onClick: () => edit()
  }, "Edit"), /*#__PURE__*/React.createElement(DeleteButton, null));
};

function ConnectModal({
  lit = false,
  title = "Connect to join the discussion",
  description = "You must be connected to share posts or reactions.",
  hide
}) {
  const {
    orbis,
    theme
  } = useOrbis();
  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, () => hide());
  return /*#__PURE__*/React.createElement(Modal, {
    hide: () => hide(),
    title: title,
    description: description,
    width: 370
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement(WalletButton, {
    lit: lit,
    type: "metamask",
    label: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(MetamaskIcon, {
      className: "mr-2"
    }), " Metamask"),
    bg: "#F18F62",
    hoverColor: "#F48552",
    callback: hide
  }), /*#__PURE__*/React.createElement(WalletButton, {
    lit: lit,
    type: "wallet-connect",
    label: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(WalletConnectIcon, {
      className: "mr-2"
    }), " WalletConnect"),
    bg: "#468DEE",
    hoverColor: "#3280EB",
    callback: hide
  }), /*#__PURE__*/React.createElement(WalletButton, {
    lit: lit,
    type: "phantom",
    label: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PhantomIcon, {
      className: "mr-2"
    }), " Phantom"),
    bg: "#6450E3",
    hoverColor: "#4B34DD",
    callback: hide
  }), /*#__PURE__*/React.createElement(WalletButton, {
    lit: lit,
    type: "email",
    label: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(EmailIcon, {
      className: "mr-2"
    }), " Email"),
    bg: "#000",
    hoverColor: "#F48552",
    callback: hide
  })));
}
const WalletButton = ({
  lit,
  callback,
  type,
  label,
  bg,
  hoverColor
}) => {
  const {
    orbis,
    magic,
    user,
    setUser,
    setCredentials
  } = useOrbis();
  const [status, setStatus] = useState(0);
  async function connect() {
    var _window$phantom, _window$phantom$solan, _window$phantom2;
    setStatus(1);
    let provider;
    let chain = "ethereum";
    let res;
    switch (type) {
      case "metamask":
        provider = window.ethereum;
        res = await orbis.connect_v2({
          provider: provider,
          chain: chain,
          lit: lit
        });
        break;
      case "wallet-connect":
        let wc_provider = new WalletConnectProvider$1({
          infuraId: "9bf71860bc6c4560904d84cd241ab0a0"
        });
        await wc_provider.enable();
        res = await orbis.connect(wc_provider, false);
        break;
      case "phantom":
        const isPhantomInstalled = (_window$phantom = window.phantom) === null || _window$phantom === void 0 ? void 0 : (_window$phantom$solan = _window$phantom.solana) === null || _window$phantom$solan === void 0 ? void 0 : _window$phantom$solan.isPhantom;
        if (!isPhantomInstalled) {
          alert("Phantom is not installed on this browser.");
          setStatus(3);
          await sleep(1500);
          setStatus(0);
          return;
        }
        provider = (_window$phantom2 = window.phantom) === null || _window$phantom2 === void 0 ? void 0 : _window$phantom2.solana;
        chain = "solana";
        res = await orbis.connect_v2({
          provider: provider,
          chain: chain,
          lit: lit
        });
        break;
      case "email":
        res = await orbis.connect_v2({
          provider: magic.rpcProvider,
          chain: "ethereum",
          lit: lit
        });
        break;
    }
    try {
      if (res.status == 200) {
        setUser(res.details);
        setStatus(2);
        loadCredentials(res.details.did);
        localStorage.setItem("provider-type", type);
        callback();
      } else {
        alert("Error connecting to Orbis");
        console.log("Error connecting to Orbis: ", res);
        setStatus(3);
        await sleep(1500);
        setStatus(0);
      }
    } catch (e) {
      alert("Error calling Orbis connect function.");
    }
  }
  async function loadCredentials(did) {
    let {
      data,
      error,
      status
    } = await orbis.api.rpc("get_verifiable_credentials", {
      q_subject: did,
      q_min_weight: 10
    });
    if (data && data.length > 0) {
      setCredentials(data);
    } else {
      fetchCredentials(did);
    }
  }
  async function fetchCredentials(did) {
    console.log("Fetching credentials for di");
    let res = await fetch("https://api.orbis.club/mint-credentials/" + did, {
      method: 'GET'
    });
    let result = await res.json();
    if (result.status == 200) {
      await sleep(3000);
      loadCredentials(did);
    }
  }
  return /*#__PURE__*/React.createElement(Button, {
    style: {
      width: "100%",
      justifyContent: "center",
      backgroundColor: bg,
      marginTop: "0.75rem",
      paddingTop: "0.75rem",
      paddingBottom: "0.75rem",
      fontWeight: "500",
      fontSize: 15,
      color: "#FFF"
    },
    onClick: () => connect()
  }, status == 1 ? /*#__PURE__*/React.createElement(LoadingCircle, null) : label);
};
const MetamaskIcon = ({
  className
}) => {
  return /*#__PURE__*/React.createElement("svg", {
    width: "26",
    height: "24",
    viewBox: "0 0 26 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    style: {
      marginRight: "0.5rem"
    }
  }, /*#__PURE__*/React.createElement("g", {
    clipPath: "url(#clip0_970_803)"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M25.2066 0L14.2219 8.1279L16.2646 3.3379L25.2066 0Z",
    fill: "#E17726"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M0.819135 0.00952148L9.73724 3.33842L11.6768 8.19122L0.819135 0.00952148ZM20.786 17.2857L25.6411 17.3781L23.9443 23.1423L18.02 21.5112L20.786 17.2857ZM5.21394 17.2857L7.96964 21.5112L2.05534 23.1424L0.368835 17.3781L5.21394 17.2857Z",
    fill: "#E27625"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M11.4131 6.95529L11.6115 13.3636L5.67444 13.0935L7.36324 10.5457L7.38464 10.5212L11.4131 6.95529ZM14.5254 6.88379L18.6154 10.5214L18.6366 10.5458L20.3254 13.0936L14.3896 13.3636L14.5254 6.88379ZM8.14354 17.3045L11.3853 19.8304L7.61954 21.6485L8.14354 17.3045ZM17.8571 17.3041L18.3702 21.6486L14.6149 19.8302L17.8571 17.3041Z",
    fill: "#E27625"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14.6978 19.5923L18.5085 21.4375L14.9638 23.1221L15.0006 22.0087L14.6978 19.5923ZM11.3011 19.5931L11.0102 21.9905L11.0341 23.1208L7.48114 21.4375L11.3011 19.5931Z",
    fill: "#D5BFB2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10.2007 14.2L11.1965 16.2928L7.80621 15.2996L10.2007 14.2ZM15.7992 14.2002L18.205 15.2996L14.8036 16.2925L15.7992 14.2002Z",
    fill: "#233447"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.4026 17.2829L7.8546 21.7869L4.9173 17.3814L8.4026 17.2829ZM17.5976 17.283L21.083 17.3814L18.1347 21.7871L17.5976 17.283ZM20.4112 12.8386L17.8747 15.4237L15.919 14.53L14.9827 16.4984L14.3689 13.1135L20.4112 12.8386ZM5.5875 12.8386L11.631 13.1135L11.0171 16.4984L10.0806 14.5303L8.1353 15.4238L5.5875 12.8386Z",
    fill: "#CC6228"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5.41663 12.3082L8.28643 15.2203L8.38583 18.0952L5.41663 12.3082ZM20.5863 12.303L17.6117 18.1003L17.7237 15.2203L20.5863 12.303ZM11.4907 12.4856L11.6062 13.2126L11.8916 15.0237L11.7081 20.5862L10.8406 16.1177L10.8403 16.0715L11.4907 12.4856ZM14.5078 12.4755L15.1599 16.0715L15.1596 16.1177L14.2899 20.5974L14.2555 19.4769L14.1198 14.9907L14.5078 12.4755Z",
    fill: "#E27525"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M17.9788 15.1045L17.8817 17.6023L14.8543 19.961L14.2423 19.5286L14.9283 15.9951L17.9788 15.1045ZM8.03174 15.1045L11.0716 15.9951L11.7576 19.5286L11.1456 19.961L8.11814 17.6021L8.03174 15.1045Z",
    fill: "#F5841F"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6.90179 20.8857L10.775 22.7209L10.7586 21.9372L11.0827 21.6527H14.9161L15.2519 21.9362L15.2271 22.7193L19.0758 20.8903L17.203 22.4379L14.9385 23.9932H11.0516L8.78859 22.4315L6.90179 20.8857Z",
    fill: "#C0AC9D"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14.4204 19.3479L14.968 19.7348L15.2889 22.2952L14.8245 21.9031H11.1769L10.7213 22.3031L11.0317 19.735L11.5795 19.3479H14.4204Z",
    fill: "#161616"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M24.4814 0.225098L25.8 4.1808L24.9765 8.1805L25.5629 8.6328L24.7694 9.2382L25.3658 9.6988L24.5761 10.4179L25.0609 10.769L23.7743 12.2716L18.4973 10.7351L18.4516 10.7106L14.6489 7.5028L24.4814 0.225098ZM1.51861 0.225098L11.3512 7.5028L7.54841 10.7106L7.50271 10.7351L2.22571 12.2716L0.939112 10.769L1.42351 10.4182L0.634312 9.6988L1.22951 9.2387L0.424112 8.6316L1.03261 8.179L0.200012 4.181L1.51861 0.225098Z",
    fill: "#763E1A"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18.2392 10.3991L23.8305 12.027L25.647 17.6256H20.8546L17.5526 17.6672L19.954 12.9864L18.2392 10.3991ZM7.7608 10.3991L6.0457 12.9864L8.4474 17.6672L5.1469 17.6256H0.363098L2.1694 12.0271L7.7608 10.3991ZM16.5384 3.31128L14.9745 7.53518L14.6426 13.2412L14.5156 15.0297L14.5055 19.5985H11.4944L11.4846 15.0383L11.3572 13.2397L11.0252 7.53518L9.4615 3.31128H16.5384Z",
    fill: "#F5841F"
  })), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("clipPath", {
    id: "clip0_970_803"
  }, /*#__PURE__*/React.createElement("rect", {
    width: "25.6",
    height: "24",
    fill: "white",
    transform: "translate(0.200012)"
  }))));
};
const WalletConnectIcon = ({
  className
}) => {
  return /*#__PURE__*/React.createElement("svg", {
    width: "28",
    height: "16",
    viewBox: "0 0 28 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    style: {
      marginRight: "0.5rem"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6.29178 3.1261C10.5489 -1.04203 17.4512 -1.04203 21.7083 3.1261L22.2208 3.62772C22.2714 3.67672 22.3115 3.73538 22.3389 3.80019C22.3664 3.86501 22.3805 3.93468 22.3805 4.00506C22.3805 4.07545 22.3664 4.14511 22.3389 4.20993C22.3115 4.27475 22.2714 4.3334 22.2208 4.38241L20.4682 6.09846C20.4165 6.14859 20.3474 6.17662 20.2755 6.17662C20.2035 6.17662 20.1344 6.14859 20.0828 6.09846L19.3776 5.40813C16.4077 2.5003 11.5924 2.5003 8.62257 5.40813L7.86752 6.14741C7.81589 6.19754 7.74676 6.22557 7.67481 6.22557C7.60285 6.22557 7.53373 6.19754 7.4821 6.14741L5.72943 4.43136C5.67891 4.38235 5.63875 4.3237 5.61132 4.25888C5.58389 4.19406 5.56976 4.12439 5.56976 4.05401C5.56976 3.98363 5.58389 3.91396 5.61132 3.84914C5.63875 3.78432 5.67891 3.72567 5.72943 3.67666L6.29178 3.1261ZM25.3332 6.67495L26.8929 8.20229C26.9435 8.25128 26.9837 8.30993 27.0111 8.37475C27.0386 8.43957 27.0527 8.50925 27.0527 8.57964C27.0527 8.65003 27.0386 8.7197 27.0111 8.78452C26.9837 8.84934 26.9435 8.90799 26.8929 8.95698L19.8594 15.8437C19.7562 15.9439 19.6179 16 19.474 16C19.3301 16 19.1918 15.9439 19.0886 15.8437L14.0965 10.956C14.0707 10.931 14.0361 10.9169 14.0002 10.9169C13.9642 10.9169 13.9296 10.931 13.9038 10.956L8.91172 15.8435C8.80847 15.9437 8.67022 15.9998 8.52631 15.9998C8.3824 15.9998 8.24415 15.9437 8.14089 15.8435L1.10699 8.95716C1.05648 8.90816 1.01631 8.8495 0.988886 8.78469C0.961459 8.71987 0.947327 8.6502 0.947327 8.57982C0.947327 8.50943 0.961459 8.43977 0.988886 8.37495C1.01631 8.31013 1.05648 8.25148 1.10699 8.20247L2.66696 6.67513C2.77021 6.57489 2.90846 6.51881 3.05238 6.51881C3.19629 6.51881 3.33454 6.57489 3.43779 6.67513L8.43005 11.5624C8.45586 11.5875 8.49042 11.6015 8.5264 11.6015C8.56238 11.6015 8.59694 11.5875 8.62275 11.5624L13.6146 6.67495C13.7179 6.57471 13.8561 6.51863 14.0001 6.51863C14.144 6.51863 14.2822 6.57471 14.3855 6.67495L19.3776 11.5626C19.4034 11.5877 19.4379 11.6017 19.4739 11.6017C19.5099 11.6017 19.5444 11.5877 19.5703 11.5626L24.5623 6.67513C24.6656 6.57489 24.8038 6.51881 24.9477 6.51881C25.0917 6.51881 25.2299 6.57489 25.3332 6.67513V6.67495Z",
    fill: "white"
  }));
};
const PhantomIcon = ({
  className
}) => {
  return /*#__PURE__*/React.createElement("svg", {
    width: "21",
    height: "20",
    viewBox: "0 0 21 20",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    style: {
      marginRight: "0.5rem"
    }
  }, /*#__PURE__*/React.createElement("g", {
    clipPath: "url(#clip0_970_832)"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M10.5 20C16.0228 20 20.5 15.5228 20.5 10C20.5 4.47715 16.0228 0 10.5 0C4.97715 0 0.5 4.47715 0.5 10C0.5 15.5228 4.97715 20 10.5 20Z",
    fill: "url(#paint0_linear_970_832)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M17.6589 10.1217H15.8961C15.8961 6.52916 12.9735 3.61694 9.36812 3.61694C5.80739 3.61694 2.91246 6.45787 2.84161 9.98893C2.76831 13.6389 6.20485 16.8085 9.8683 16.8085H10.3291C13.5589 16.8085 17.8878 14.2891 18.5641 11.2195C18.689 10.6536 18.2405 10.1217 17.6589 10.1217ZM6.74842 10.2818C6.74842 10.7622 6.35408 11.1552 5.87194 11.1552C5.3898 11.1552 4.99548 10.762 4.99548 10.2818V8.86893C4.99548 8.38851 5.3898 7.99557 5.87194 7.99557C6.35408 7.99557 6.74842 8.38851 6.74842 8.86893V10.2818ZM9.79183 10.2818C9.79183 10.7622 9.39754 11.1552 8.91542 11.1552C8.43324 11.1552 8.03895 10.762 8.03895 10.2818V8.86893C8.03895 8.38851 8.43342 7.99557 8.91542 7.99557C9.39754 7.99557 9.79183 8.38851 9.79183 8.86893V10.2818Z",
    fill: "url(#paint1_linear_970_832)"
  })), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "paint0_linear_970_832",
    x1: "10.5",
    y1: "0",
    x2: "10.5",
    y2: "20",
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React.createElement("stop", {
    stopColor: "#534BB1"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: "#551BF9"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: "paint1_linear_970_832",
    x1: "10.7128",
    y1: "3.61694",
    x2: "10.7128",
    y2: "16.8085",
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React.createElement("stop", {
    stopColor: "white"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: "white",
    stopOpacity: "0.82"
  })), /*#__PURE__*/React.createElement("clipPath", {
    id: "clip0_970_832"
  }, /*#__PURE__*/React.createElement("rect", {
    width: "20",
    height: "20",
    fill: "white",
    transform: "translate(0.5)"
  }))));
};
const EmailIcon = ({
  className
}) => {
  return /*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "18",
    viewBox: "0 0 22 18",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    style: {
      marginRight: "0.5rem"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0.5 5.6691V14.25C0.5 15.9069 1.84315 17.25 3.5 17.25H18.5C20.1569 17.25 21.5 15.9069 21.5 14.25V5.6691L12.5723 11.1631C11.6081 11.7564 10.3919 11.7564 9.42771 11.1631L0.5 5.6691Z",
    fill: "#FFF"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21.5 3.90783V3.75C21.5 2.09315 20.1569 0.75 18.5 0.75H3.5C1.84315 0.75 0.5 2.09315 0.5 3.75V3.90783L10.2139 9.88558C10.696 10.1823 11.304 10.1823 11.7861 9.88558L21.5 3.90783Z",
    fill: "#FFF"
  }));
};

let magic;
let web3;
if (typeof window !== "undefined") {
  magic = new Magic('pk_live_2E6B3B065093108E', {
    network: 'mainnet',
    extensions: [new ConnectExtension()]
  });
  web3 = new Web3(magic.rpcProvider);
}
let _orbis = new Orbis({
  node: "https://node2.orbis.club/"
});
function OrbisProvider({
  context,
  children,
  theme = defaultTheme,
  options
}) {
  const [orbis, setOrbis] = useState(_orbis);
  const [user, setUser] = useState();
  const [connecting, setConnecting] = useState();
  const [credentials, setCredentials] = useState([]);
  const [hasAccess, setHasAccess] = useState(false);
  const [activeTheme, setActiveTheme] = useState(theme);
  const [contextDetails, setContextDetails] = useState();
  const [accessRules, setAccessRules] = useState([]);
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
        loadCredentials(res.details.did);
      }
      setConnecting(false);
    }
  }, [user, orbis]);
  async function loadCredentials(did) {
    let {
      data,
      error,
      status
    } = await orbis.api.rpc("get_verifiable_credentials", {
      q_subject: did,
      q_min_weight: 10
    });
    if (data && data.length > 0) {
      setCredentials(data);
    } else {
      setCredentials([]);
    }
  }
  useEffect(() => {
    if (theme) {
      if (typeof theme === 'object') {
        setActiveTheme(theme);
      } else {
        loadStyle();
      }
    }
    async function loadStyle() {
      let storedStyle = localStorage.getItem(theme);
      if (storedStyle) {
        setActiveTheme(JSON.parse(storedStyle));
      }
      try {
        var _styleStream$content, _styleStream$content2;
        let {
          data: styleStream,
          error
        } = await orbis.api.from("orbis_styles").select().eq('stream_id', theme).single();
        setActiveTheme((_styleStream$content = styleStream.content) === null || _styleStream$content === void 0 ? void 0 : _styleStream$content.theme);
        localStorage.setItem(theme, JSON.stringify((_styleStream$content2 = styleStream.content) === null || _styleStream$content2 === void 0 ? void 0 : _styleStream$content2.theme));
      } catch (e) {
        console.log("Can't log Ceramic stream:", e);
      }
    }
  }, [theme, orbis]);
  useEffect(() => {
    if (context) {
      loadContextDetails();
    }
    async function loadContextDetails() {
      let _context = cleanContext(context);
      let storedContext = localStorage.getItem(_context);
      if (storedContext) {
        storedContext = JSON.parse(storedContext);
        setContextDetails(storedContext);
        if (storedContext.accessRules && storedContext.accessRules.length > 0) {
          setAccessRules(storedContext.accessRules);
        }
      }
      try {
        let {
          data: _contextDetails,
          error
        } = await orbis.api.from("orbis_contexts").select().eq('stream_id', _context).single();
        if (_contextDetails) {
          var _contextDetails$conte;
          setContextDetails(_contextDetails.content);
          if ((_contextDetails$conte = _contextDetails.content) !== null && _contextDetails$conte !== void 0 && _contextDetails$conte.accessRules && _contextDetails.content.accessRules.length > 0) {
            setAccessRules(_contextDetails.content.accessRules);
          }
          localStorage.setItem(_context, JSON.stringify(_contextDetails.content));
        }
      } catch (e) {
        console.log("Can't load context details:", e);
      }
    }
  }, [context]);
  useEffect(() => {
    checkAccess();
    async function checkAccess() {
      let countAccessRules = accessRules ? accessRules.length : 0;
      if (countAccessRules == 0) {
        if (contextDetails) {
          setHasAccess(true);
        }
      } else if (countAccessRules > 0) {
        if (user) {
          checkContextAccess(credentials, accessRules);
        }
      }
    }
  }, [credentials, accessRules]);
  async function checkContextAccess(_userCredentials, _accessRules) {
    _accessRules.forEach(async (_rule, i) => {
      switch (_rule.type) {
        case "credential":
          _rule.requiredCredentials.forEach((cred, i) => {
            let _hasVc = checkCredentialOwnership(_userCredentials, cred.identifier);
            if (_hasVc) {
              setHasAccess(true);
            }
          });
          break;
        case "did":
          _rule.authorizedUsers.forEach((_user, i) => {
            if (_user.did == user.did) {
              setHasAccess(true);
            }
          });
          break;
        case "token":
          const {
            address
          } = useDidToAddress(user.did);
          getTokenBalance(_rule.requiredToken, address, () => setHasAccess(true));
          break;
      }
    });
  }
  return /*#__PURE__*/React.createElement(GlobalContext.Provider, {
    value: {
      user,
      setUser,
      connecting,
      setConnecting,
      orbis,
      magic,
      context,
      theme: activeTheme,
      accessRules: accessRules,
      hasAccess,
      credentials,
      setCredentials,
      connectModalVis,
      setConnectModalVis
    }
  }, children, connectModalVis && /*#__PURE__*/React.createElement(ConnectModal, {
    lit: false,
    hide: () => setConnectModalVis(false)
  }));
}
function cleanContext(context) {
  if (context.includes(":")) {
    let _arr = context.split(":");
    return _arr[0];
  } else {
    return context;
  }
}

var styles$c = {"commentsGlobalContainer":"_MBDTd","commentsContainer":"_3vbCv","notificationsBanner":"_LU5eU","notificationsBannerText":"_3Fvcj","loadingContainer":"_2mFCC","commentsEmptyStateContainer":"_1LQjG","greyLine":"_1YFCn","footerContainer":"_3k7Bt","footerOpenSocialContainer":"_1gCaM"};

function Comments({
  context,
  theme = defaultTheme,
  options,
  characterLimit = null
}) {
  return /*#__PURE__*/React.createElement(OrbisProvider, {
    context: context,
    theme: theme,
    options: options
  }, /*#__PURE__*/React.createElement(CommentsContent, {
    characterLimit: characterLimit
  }));
}
const CommentsContent = ({
  characterLimit
}) => {
  const {
    user,
    setUser,
    orbis,
    theme,
    context,
    accessRules,
    setAuthorizationsModalVis
  } = useOrbis();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sharing, setSharing] = useState(false);
  useEffect(() => {
    loadPosts();
  }, [context]);
  const handleSubmit = async event => {
    event.preventDefault();
    if (sharing) {
      console.log("A request is already being processed.");
      return;
    }
    setSharing(true);
    const formData = new FormData(event.target);
    let body = formData.get("body");
    let res = await orbis.createPost({
      body: body,
      context: context
    });
    if (res.status == 200) {
      setComments([{
        creator_details: user,
        stream_id: res.doc,
        content: {
          body: body,
          context: context
        }
      }, ...comments]);
    }
    setSharing(false);
  };
  async function loadPosts() {
    setLoading(true);
    let {
      data,
      error
    } = await orbis.getPosts({
      context: context
    }, 0);
    setComments(data);
    setLoading(false);
  }
  return /*#__PURE__*/React.createElement(CommentsContext.Provider, {
    value: {
      comments,
      setComments
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$c.commentsGlobalContainer,
    style: {
      background: getThemeValue("bg", theme, "main"),
      borderColor: getThemeValue("border", theme, "main")
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "1rem"
    }
  }, /*#__PURE__*/React.createElement(Postbox, {
    context: context,
    handleSubmit: handleSubmit
  })), /*#__PURE__*/React.createElement("div", {
    className: styles$c.commentsContainer,
    style: {
      borderColor: getThemeValue("border", theme, "secondary")
    }
  }, loading ? /*#__PURE__*/React.createElement("div", {
    className: styles$c.loadingContainer,
    style: {
      color: getThemeValue("color", theme, "main")
    }
  }, /*#__PURE__*/React.createElement(LoadingCircle, null)) : /*#__PURE__*/React.createElement(React.Fragment, null, comments.length <= 0 ? /*#__PURE__*/React.createElement("div", {
    className: styles$c.commentsEmptyStateContainer
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      color: getThemeValue("color", theme, "secondary"),
      fontSize: 15,
      marginTop: "0.5rem",
      marginBottom: "0.5rem"
    }
  }, "Be the first to leave a comment here."), /*#__PURE__*/React.createElement(EmptyStateComments, null)) : /*#__PURE__*/React.createElement(LoopComments, {
    comments: comments,
    characterLimit: characterLimit
  }))), /*#__PURE__*/React.createElement("div", {
    className: styles$c.footerContainer
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://useorbis.com?utm_source=comments_module",
    rel: "noreferrer",
    target: "_blank",
    className: styles$c.footerOpenSocialContainer
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: getThemeValue("color", theme, "secondary"),
      ...getThemeValue("font", theme, "main"),
      fontWeight: 400,
      marginRight: 5,
      fontSize: 15
    }
  }, "Open Social with"), /*#__PURE__*/React.createElement(Logo, {
    className: "flex",
    color: getThemeValue("color", theme, "main")
  })))));
};
function LoopComments({
  comments,
  characterLimit
}) {
  return comments.map((comment, key) => {
    if ((!comment.content.reply_to || comment.content.reply_to == "") && !comment.content.master || comment.content.master == "") {
      return /*#__PURE__*/React.createElement(Comment, {
        comments: comments,
        comment: comment,
        master: comment.content.master,
        characterLimit: characterLimit,
        key: comment.stream_id
      });
    } else {
      return null;
    }
  });
}
function Comment({
  comments,
  comment,
  master,
  characterLimit,
  z
}) {
  var _theme$border;
  const {
    theme
  } = useOrbis();
  function LoopInternalReplies() {
    return comments.map((_comment, key) => {
      if (_comment.content.reply_to == comment.stream_id) {
        return /*#__PURE__*/React.createElement(Comment, {
          comment: _comment,
          master: master,
          comments: comments,
          key: _comment.stream_id
        });
      }
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, comment.content.reply_to != null && /*#__PURE__*/React.createElement("span", {
    className: styles$c.greyLine,
    style: {
      top: 60,
      bottom: 20,
      left: 22,
      width: 1,
      backgroundColor: theme !== null && theme !== void 0 && (_theme$border = theme.border) !== null && _theme$border !== void 0 && _theme$border.main ? theme.border.main : defaultTheme.border.main
    },
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement(Post, {
    post: comment,
    characterLimit: characterLimit
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: "2.5rem",
      marginTop: "1.75rem"
    }
  }, /*#__PURE__*/React.createElement(LoopInternalReplies, null)));
}

const InboxContext = React.createContext({});

var styles$d = {"inboxContainer":"_373Vc","inboxHeaderContainer":"_33Dkm","header":"_1DpfW","inboxContent":"_1dSUE","connectContainer":"_2yYqJ","conversationsContainer":"_2Tjlx","conversationContainer":"_3niTo","conversationRecipientsContainer":"_86TS3","conversationRecipientsPfpContainer":"_3lQ8s","conversationRecipientsDetailsContainer":"_1BzR5","conversationRecipientsUsernameContainer":"_3tFdy","participantsContainer":"_3-uYJ","participantsContainerCta":"_3-lS9","participantsContainerPfp":"_3kZHJ","loadingContainer":"_3rx8N","messagesContainer":"_3vL-q","messageContainer":"_247na","message":"_1LhGk","messageBoxContainer":"_1W1rX"};

function Inbox({
  context,
  theme,
  options
}) {
  return /*#__PURE__*/React.createElement(OrbisProvider, {
    context: context,
    theme: theme,
    options: options
  }, /*#__PURE__*/React.createElement(InboxContent, null));
}
const InboxContent = () => {
  const {
    user,
    setUser,
    orbis,
    theme,
    context,
    accessRules
  } = useOrbis();
  const [loading, setLoading] = useState(false);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [conversationSelected, setConversationSelected] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  useEffect(() => {
    if (user) {
      loadConversations();
    }
  }, [context, user]);
  useEffect(() => {
    if (user && conversationSelected) {
      loadMessages();
    }
  }, [user, conversationSelected]);
  async function loadConversations() {
    setLoading(true);
    let {
      data,
      error
    } = await orbis.getConversations({
      did: user.did
    }, 0);
    setConversations(data);
    setLoading(false);
  }
  async function loadMessages() {
    setMessagesLoading(true);
    let {
      data,
      error
    } = await orbis.getMessages(conversationSelected.stream_id);
    setMessages(data);
    setMessagesLoading(false);
  }
  return /*#__PURE__*/React.createElement(InboxContext.Provider, {
    value: {
      conversationSelected,
      setConversationSelected,
      messagesLoading,
      messages,
      setMessages,
      isExpanded,
      setIsExpanded
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$d.inboxContainer,
    style: {
      background: getThemeValue("background", theme, "main"),
      borderColor: getThemeValue("border", theme, "secondary"),
      height: isExpanded ? "500px" : "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$d.inboxHeaderContainer,
    style: {
      ...getStyle("button-main", theme, "main"),
      ...getThemeValue("font", theme, "main")
    }
  }, /*#__PURE__*/React.createElement(HeaderInbox, null)), isExpanded && /*#__PURE__*/React.createElement("div", {
    className: styles$d.inboxContent
  }, user ? /*#__PURE__*/React.createElement(React.Fragment, null, conversationSelected ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: styles$d.messagesContainer
  }, /*#__PURE__*/React.createElement(Messages, null)), /*#__PURE__*/React.createElement("div", {
    className: "flex w-full border-gray-100 border-t bg-white px-3 py-3 flex-row"
  }, /*#__PURE__*/React.createElement(MessageBox, null))) : /*#__PURE__*/React.createElement(React.Fragment, null, user.hasLit ? /*#__PURE__*/React.createElement("ul", {
    role: "list",
    className: styles$d.conversationsContainer
  }, /*#__PURE__*/React.createElement(LoopConversations, {
    conversations: conversations
  })) : /*#__PURE__*/React.createElement("div", {
    className: styles$d.connectContainer
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      ...getThemeValue("font", theme, "secondary"),
      color: getThemeValue("color", theme, "primary"),
      textAlign: "center",
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("b", null, "Last step:"), " Setup your private account to be able to decrypt messages. "), /*#__PURE__*/React.createElement(ConnectButton, {
    litOnly: true,
    title: "Setup Private Account"
  })))) : /*#__PURE__*/React.createElement("div", {
    className: styles$d.connectContainer
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      ...getThemeValue("font", theme, "secondary"),
      color: getThemeValue("color", theme, "primary"),
      textAlign: "center",
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("b", null, "Step 1:"), " You need to be connected to access your messages."), /*#__PURE__*/React.createElement(ConnectButton, {
    lit: true
  })))));
};
function HeaderInbox() {
  const {
    conversationSelected,
    isExpanded,
    setIsExpanded
  } = useContext(InboxContext);
  if (conversationSelected) {
    return /*#__PURE__*/React.createElement("div", {
      className: styles$d.header
    }, /*#__PURE__*/React.createElement(Participants, {
      conversation: conversationSelected
    }));
  } else {
    return /*#__PURE__*/React.createElement("div", {
      className: styles$d.header,
      onClick: () => setIsExpanded(!isExpanded)
    }, /*#__PURE__*/React.createElement(DmIcon, null), /*#__PURE__*/React.createElement("p", null, "Direct Messages"));
  }
}
function LoopConversations({
  conversations
}) {
  return conversations.map((conversation, key) => {
    return /*#__PURE__*/React.createElement(Conversation, {
      conversation: conversation,
      key: key
    });
  });
}
function Conversation({
  conversation
}) {
  const {
    user,
    theme
  } = useOrbis();
  const {
    setConversationSelected
  } = useContext(InboxContext);
  return /*#__PURE__*/React.createElement("li", {
    className: styles$d.conversationContainer,
    onClick: () => setConversationSelected(conversation),
    style: {
      borderColor: getThemeValue("border", theme, "secondary")
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$d.conversationRecipientsContainer
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$d.conversationRecipientsPfpContainer
  }, conversation.recipients.length > 2 ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(RecipientsPfp, {
    conversation: conversation
  })) : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(UserPfp, {
    details: conversation.recipients_details[0].did == user.did ? conversation.recipients_details[1] : conversation.recipients_details[0]
  }))), /*#__PURE__*/React.createElement("div", {
    className: styles$d.conversationRecipientsDetailsContainer
  }, /*#__PURE__*/React.createElement(RecipientsUsername, {
    recipients: conversation.recipients,
    recipients_details: conversation.recipients_details
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      color: getThemeValue("color", theme, "secondary")
    }
  }, "1h"))));
}
function Participants({
  conversation
}) {
  const {
    user
  } = useOrbis();
  const {
    setConversationSelected
  } = useContext(InboxContext);
  return /*#__PURE__*/React.createElement("div", {
    className: styles$d.participantsContainer
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$d.participantsContainerCta,
    onClick: () => setConversationSelected(null)
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "16",
    viewBox: "0 0 20 18",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M9.03033 0.96967C9.32322 1.26256 9.32322 1.73744 9.03033 2.03033L2.81066 8.25H19C19.4142 8.25 19.75 8.58579 19.75 9C19.75 9.41421 19.4142 9.75 19 9.75H2.81066L9.03033 15.9697C9.32322 16.2626 9.32322 16.7374 9.03033 17.0303C8.73744 17.3232 8.26256 17.3232 7.96967 17.0303L0.46967 9.53033C0.176777 9.23744 0.176777 8.76256 0.46967 8.46967L7.96967 0.96967C8.26256 0.676777 8.73744 0.676777 9.03033 0.96967Z",
    fill: "#FAFBFB"
  }))), /*#__PURE__*/React.createElement("div", {
    className: styles$d.participantsContainerPfp
  }, conversation.recipients.length > 2 ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      paddingTop: 5
    }
  }, /*#__PURE__*/React.createElement(RecipientsPfp, {
    conversation: conversation,
    height: 25
  })) : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(UserPfp, {
    details: conversation.recipients_details[0].did == user.did ? conversation.recipients_details[1] : conversation.recipients_details[0],
    height: 38
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flex: 1,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(RecipientsUsername, {
    recipients: conversation.recipients,
    recipients_details: conversation.recipients_details
  })));
}
const RecipientsPfp = ({
  conversation,
  height: _height = 28
}) => {
  const {
    user,
    theme
  } = useOrbis();
  let i = 0;
  return conversation.recipients_details.map((recipient, key) => {
    if (recipient.did != user.did && i < 2) {
      i++;
      if (i == 1) {
        return /*#__PURE__*/React.createElement("div", {
          style: {
            position: "relative",
            display: "flex"
          },
          key: key
        }, /*#__PURE__*/React.createElement(UserPfp, {
          height: _height,
          details: recipient,
          key: key,
          showBadge: false
        }));
      } else {
        return /*#__PURE__*/React.createElement("div", {
          className: "rounded-full border-2 border-white",
          style: {
            position: "absolute",
            left: 13,
            top: -8,
            width: _height + 4
          },
          key: key
        }, /*#__PURE__*/React.createElement(UserPfp, {
          height: _height,
          details: recipient,
          key: key
        }));
      }
    } else {
      return null;
    }
  });
};
const RecipientsUsername = ({
  recipients,
  recipients_details
}) => {
  const {
    user,
    theme
  } = useOrbis();
  return /*#__PURE__*/React.createElement("div", {
    className: styles$d.conversationRecipientsUsernameContainer,
    style: {
      ...getThemeValue("font", theme, "main"),
      color: getThemeValue("color", theme, "main")
    }
  }, recipients.length > 2 ? /*#__PURE__*/React.createElement("p", {
    style: {
      display: "flex",
      flexDirection: "row"
    }
  }, /*#__PURE__*/React.createElement(Username, {
    details: recipients_details[0].did == user.did ? recipients_details[1] : recipients_details[0]
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...getThemeValue("font", theme, "main"),
      color: getThemeValue("color", theme, "secondary"),
      marginLeft: 4
    }
  }, "and ", /*#__PURE__*/React.createElement("span", {
    className: "text-gray-900 font-medium"
  }, recipients.length - 1, " others"))) : /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement(Username, {
    details: recipients_details[0].did == user.did ? recipients_details[1] : recipients_details[0]
  })));
};
function Messages() {
  const {
    user,
    orbis,
    theme
  } = useOrbis();
  const {
    conversationSelected,
    messages,
    messagesLoading
  } = useContext(InboxContext);
  if (messagesLoading) {
    return /*#__PURE__*/React.createElement("div", {
      className: styles$d.loadingContainer,
      style: {
        color: getThemeValue("color", theme, "main")
      }
    }, /*#__PURE__*/React.createElement(LoadingCircle, null));
  }
  if (messages && messages.length == 0 || !messages) {
    return /*#__PURE__*/React.createElement("p", {
      style: {
        ...getThemeValue("font", theme, "secondary"),
        color: getThemeValue("color", theme, "primary"),
        textAlign: "center",
        marginBottom: 8
      }
    }, "You haven't received any messages yet.");
  }
  return messages.map((message, key) => {
    return /*#__PURE__*/React.createElement(Message, {
      message: message,
      key: message.stream_id
    });
  });
}
function Message({
  message
}) {
  const {
    user,
    orbis,
    theme
  } = useOrbis();
  const [body, setBody] = useState();
  useEffect(() => {
    let active = true;
    decrypt();
    return () => {
      active = false;
    };
    async function decrypt() {
      var _message$content, _message$content2, _message$content2$enc;
      if ((_message$content = message.content) !== null && _message$content !== void 0 && _message$content.body) {
        setBody(message.content.body);
      } else if (((_message$content2 = message.content) === null || _message$content2 === void 0 ? void 0 : (_message$content2$enc = _message$content2.encryptedMessage) === null || _message$content2$enc === void 0 ? void 0 : _message$content2$enc.encryptedString) != {}) {
        let res = await orbis.decryptMessage(message.content);
        setBody(res.result);
      } else {
        return null;
      }
      if (!active) {
        return;
      }
    }
  }, []);
  if (user.did == message.creator) {
    return /*#__PURE__*/React.createElement("div", {
      className: styles$d.messageContainer,
      style: {
        justifyContent: "flex-end"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: styles$d.message,
      style: {
        ...getStyle("button-main", theme, "main"),
        fontSize: 15
      }
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-white"
    }, body ? body : /*#__PURE__*/React.createElement(LoadingCircle, null))));
  } else {
    return /*#__PURE__*/React.createElement("div", {
      className: styles$d.messageContainer
    }, /*#__PURE__*/React.createElement("div", {
      className: styles$d.message,
      style: {
        background: getThemeValue("bg", theme, "tertiary"),
        fontSize: 15
      }
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-gray-900"
    }, body ? body : /*#__PURE__*/React.createElement(LoadingCircle, null))));
  }
}
function MessageBox() {
  const {
    user,
    theme,
    orbis
  } = useOrbis();
  const [content, setContent] = useState("");
  const [status, setStatus] = useState(0);
  const {
    conversationSelected,
    messages,
    setMessages
  } = useContext(InboxContext);
  async function send() {
    let _body = content;
    setStatus(1);
    setContent("");
    let res = await orbis.sendMessage({
      conversation_id: conversationSelected.stream_id,
      body: _body
    });
    if (res.status == 200) {
      setStatus(2);
      setMessages([{
        timestamp: getTimestamp(),
        creator_details: user,
        creator: user.did,
        stream_id: res.doc,
        content: {
          body: _body
        }
      }, ...messages]);
      await sleep(1500);
      setStatus(0);
    }
  }
  return /*#__PURE__*/React.createElement("div", {
    className: styles$d.messageBoxContainer,
    style: {
      borderColor: getThemeValue("border", theme, "main"),
      background: getThemeValue("bg", theme, "secondary")
    }
  }, /*#__PURE__*/React.createElement(Input, {
    type: "textarea",
    name: "description",
    value: content,
    onChange: e => setContent(e.target.value),
    placeholder: "Your message...",
    style: {
      marginRight: "0.375rem",
      borderRadius: "1.8rem"
    }
  }), status == 0 && /*#__PURE__*/React.createElement(Button, {
    color: "primary",
    onClick: send
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1.31918 0.60287C1.14269 0.5516 0.952295 0.601289 0.823367 0.732269C0.694438 0.863249 0.647761 1.0544 0.70181 1.23006L2.32333 6.5H8.00049C8.27663 6.5 8.50049 6.72386 8.50049 7C8.50049 7.27614 8.27663 7.5 8.00049 7.5H2.32334L0.701871 12.7698C0.647821 12.9454 0.6945 13.1366 0.82343 13.2676C0.95236 13.3985 1.14275 13.4482 1.31925 13.397C5.78498 12.0996 9.93211 10.0543 13.616 7.40581C13.7467 7.31187 13.8241 7.16077 13.8241 6.99984C13.8241 6.8389 13.7467 6.6878 13.616 6.59386C9.93207 3.94544 5.78492 1.90014 1.31918 0.60287Z",
    fill: "currentColor"
  }))), status == 1 && /*#__PURE__*/React.createElement(Button, {
    color: "primary"
  }, /*#__PURE__*/React.createElement(LoadingCircle, null)), status == 2 && /*#__PURE__*/React.createElement(Button, {
    color: "green"
  }, /*#__PURE__*/React.createElement(CheckIcon, null)));
}
const DmIcon = () => {
  return /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "19",
    className: "mr-3",
    viewBox: "0 0 20 19",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M2.80365 18.6442C2.9793 18.6757 3.15732 18.7003 3.33691 18.7178C3.55516 18.7391 3.77647 18.75 4 18.75C5.3153 18.75 6.54447 18.3731 7.58317 17.7213C8.3569 17.9034 9.16679 18 10 18C15.322 18 19.75 14.0307 19.75 9C19.75 3.96934 15.322 0 10 0C4.67799 0 0.25 3.96934 0.25 9C0.25 11.4086 1.2746 13.5871 2.92371 15.1923C3.15571 15.4182 3.20107 15.6196 3.17822 15.7349C3.05254 16.3685 2.76687 16.9451 2.36357 17.4211C2.19016 17.6258 2.13927 17.9075 2.23008 18.1599C2.3209 18.4123 2.5396 18.597 2.80365 18.6442ZM6.25 7.875C5.62868 7.875 5.125 8.37868 5.125 9C5.125 9.62132 5.62868 10.125 6.25 10.125C6.87132 10.125 7.375 9.62132 7.375 9C7.375 8.37868 6.87132 7.875 6.25 7.875ZM8.875 9C8.875 8.37868 9.37868 7.875 10 7.875C10.6213 7.875 11.125 8.37868 11.125 9C11.125 9.62132 10.6213 10.125 10 10.125C9.37868 10.125 8.875 9.62132 8.875 9ZM13.75 7.875C13.1287 7.875 12.625 8.37868 12.625 9C12.625 9.62132 13.1287 10.125 13.75 10.125C14.3713 10.125 14.875 9.62132 14.875 9C14.875 8.37868 14.3713 7.875 13.75 7.875Z",
    fill: "#FAFBFB"
  }));
};

function Article({
  post,
  characterLimit = null
}) {
  var _theme$color, _theme$border, _theme$color2, _theme$color3, _theme$color4, _theme$color5, _post$indexing_metada, _post$creator_details, _theme$color6, _theme$color7;
  const {
    orbis,
    user,
    theme
  } = useContext(GlobalContext);
  const [editPost, setEditPost] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [reply, setReply] = useState();
  const [userReaction, setUserReaction] = useState();
  const [postMenuVis, setPostMenuVis] = useState(false);
  const [hoverRef, isHovered] = useHover();
  useEffect(() => {
    if (user && post) {
      getUserReaction();
    }
  }, [user, post]);
  async function getUserReaction() {
    let {
      data,
      error
    } = await orbis.getReaction(post.stream_id, user.did);
    if (data) {
      setUserReaction(data.type);
    }
  }
  async function like(type) {
    if (!user) {
      alert("You must be connected to react to articles.");
      return;
    }
    setUserReaction(type);
    let res = await orbis.react(post.stream_id, type);
    switch (res.status) {
      case 300:
        console.log("Error reacting to the post:", res);
        break;
    }
  }
  if (isDeleted) {
    return null;
  }
  if (!post) {
    return /*#__PURE__*/React.createElement("div", {
      class: "orbis-article rounded-md bg-blue-50 p-4 mt-8"
    }, /*#__PURE__*/React.createElement("div", {
      class: "flex"
    }, /*#__PURE__*/React.createElement("div", {
      class: "flex-shrink-0"
    }, /*#__PURE__*/React.createElement("svg", {
      class: "h-5 w-5 text-blue-400",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor",
      "aria-hidden": "true"
    }, /*#__PURE__*/React.createElement("path", {
      "fill-rule": "evenodd",
      d: "M19 10.5a8.5 8.5 0 11-17 0 8.5 8.5 0 0117 0zM8.25 9.75A.75.75 0 019 9h.253a1.75 1.75 0 011.709 2.13l-.46 2.066a.25.25 0 00.245.304H11a.75.75 0 010 1.5h-.253a1.75 1.75 0 01-1.709-2.13l.46-2.066a.25.25 0 00-.245-.304H9a.75.75 0 01-.75-.75zM10 7a1 1 0 100-2 1 1 0 000 2z",
      "clip-rule": "evenodd"
    }))), /*#__PURE__*/React.createElement("div", {
      class: "ml-3 flex-1 md:flex md:justify-between "
    }, /*#__PURE__*/React.createElement("p", {
      class: "text-sm text-blue-700"
    }, "This answer doesn't exist."))));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "orbis-article flex flex-col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex mb-3 w-full"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "block text-center text-3xl font-bold leading-8 tracking-tight sm:text-4xl mt-4 lg:px-4",
    style: {
      color: theme !== null && theme !== void 0 && (_theme$color = theme.color) !== null && _theme$color !== void 0 && _theme$color.main ? theme.color.main : defaultTheme.color.main
    }
  }, post.content.title)), /*#__PURE__*/React.createElement("div", {
    className: "flex border-b border-t mt-6 mb-6 p-4 justify-center items-center",
    style: {
      borderColor: theme !== null && theme !== void 0 && (_theme$border = theme.border) !== null && _theme$border !== void 0 && _theme$border.secondary ? theme.border.secondary : defaultTheme.border.secondary
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex relative",
    style: {
      color: theme !== null && theme !== void 0 && (_theme$color2 = theme.color) !== null && _theme$color2 !== void 0 && _theme$color2.main ? theme.color.main : defaultTheme.color.main
    },
    ref: hoverRef
  }, /*#__PURE__*/React.createElement(User, {
    details: post.creator_details
  }), isHovered && /*#__PURE__*/React.createElement(UserPopup, {
    details: post.creator_details
  })), /*#__PURE__*/React.createElement("span", {
    className: "flex font-normal text-xs ml-3 mr-3",
    style: {
      color: theme !== null && theme !== void 0 && (_theme$color3 = theme.color) !== null && _theme$color3 !== void 0 && _theme$color3.secondary ? theme.color.secondary : defaultTheme.color.secondary
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("span", {
    className: "flex justify-self-end align-center flex mr-2",
    style: {
      color: theme !== null && theme !== void 0 && (_theme$color4 = theme.color) !== null && _theme$color4 !== void 0 && _theme$color4.secondary ? theme.color.secondary : defaultTheme.color.secondary
    }
  }, /*#__PURE__*/React.createElement(ReactTimeAgo, {
    className: "flex font-normal text-base mr-2",
    date: post.timestamp * 1000,
    locale: "en-US"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "relative pb-4 mt-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative flex items-start space-x-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "min-w-0 flex-col flex-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-lg break-words prose prose-md flex flex-col",
    style: {
      color: theme !== null && theme !== void 0 && (_theme$color5 = theme.color) !== null && _theme$color5 !== void 0 && _theme$color5.main ? theme.color.main : defaultTheme.color.main
    },
    dangerouslySetInnerHTML: {
      __html: marked.parse(post.content.body)
    }
  }), ((_post$indexing_metada = post.indexing_metadata) === null || _post$indexing_metada === void 0 ? void 0 : _post$indexing_metada.urlMetadata) && ((_post$creator_details = post.creator_details) === null || _post$creator_details === void 0 ? void 0 : _post$creator_details.a_r) > 15 && /*#__PURE__*/React.createElement(LinkCard$1, {
    metadata: post.indexing_metadata.urlMetadata
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row mt-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "inline-flex flex-row ml-3 items-center"
  }, userReaction == "like" ? /*#__PURE__*/React.createElement("button", {
    className: "inline-flex items-center rounded-md border border-transparent bg-transaprent px-1 py-1 font-normal text-sm font-medium hover:bg-gray-50 focus:outline-none text-[#4E75F6]",
    onClick: () => like(null)
  }, /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 16 15",
    fill: "currentColor",
    xmlns: "http://www.w3.org/2000/svg",
    className: "mr-1"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7.65298 13.9149L7.6476 13.9121L7.62912 13.9024C7.61341 13.8941 7.59102 13.8822 7.56238 13.8667C7.50511 13.8358 7.42281 13.7907 7.31906 13.732C7.11164 13.6146 6.81794 13.4425 6.46663 13.2206C5.76556 12.7777 4.82731 12.1314 3.88539 11.3197C2.04447 9.73318 0 7.35227 0 4.5C0 2.01472 2.01472 0 4.5 0C5.9144 0 7.17542 0.652377 8 1.67158C8.82458 0.652377 10.0856 0 11.5 0C13.9853 0 16 2.01472 16 4.5C16 7.35227 13.9555 9.73318 12.1146 11.3197C11.1727 12.1314 10.2344 12.7777 9.53337 13.2206C9.18206 13.4425 8.88836 13.6146 8.68094 13.732C8.57719 13.7907 8.49489 13.8358 8.43762 13.8667C8.40898 13.8822 8.38659 13.8941 8.37088 13.9024L8.3524 13.9121L8.34702 13.9149L8.34531 13.9158C8.13 14.03 7.87 14.03 7.65529 13.9161L7.65298 13.9149Z"
  })), "Like") : /*#__PURE__*/React.createElement("button", {
    className: "inline-flex items-center rounded-md border border-transparent bg-transaprent px-1 py-1 font-normal text-sm font-medium hover:bg-gray-50 focus:outline-nonecursor-pointer",
    style: {
      color: theme !== null && theme !== void 0 && (_theme$color6 = theme.color) !== null && _theme$color6 !== void 0 && _theme$color6.secondary ? theme.color.secondary : defaultTheme.color.secondary
    },
    onClick: () => like("like")
  }, /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: "mr-1"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M13.875 4.84375C13.875 3.08334 12.3884 1.65625 10.5547 1.65625C9.18362 1.65625 8.00666 2.45403 7.5 3.59242C6.99334 2.45403 5.81638 1.65625 4.44531 1.65625C2.61155 1.65625 1.125 3.08334 1.125 4.84375C1.125 9.95831 7.5 13.3438 7.5 13.3438C7.5 13.3438 13.875 9.95831 13.875 4.84375Z",
    stroke: "#798496",
    "stroke-width": "1.5",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  })), "Like"), (userReaction == "like" || post.count_likes > 0) && /*#__PURE__*/React.createElement("div", {
    className: "flex font-normal text-sm ",
    style: {
      color: theme !== null && theme !== void 0 && (_theme$color7 = theme.color) !== null && _theme$color7 !== void 0 && _theme$color7.secondary ? theme.color.secondary : defaultTheme.color.secondary
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mr-1"
  }, "\xB7"), /*#__PURE__*/React.createElement("span", null, userReaction == "like" ? post.count_likes + 1 : post.count_likes))))))));
}
const LinkCard$1 = ({
  metadata
}) => {
  var _theme$bg, _theme$border2, _theme$border3, _theme$color8, _theme$color9, _theme$color10;
  const {
    theme
  } = useContext(GlobalContext);
  return /*#__PURE__*/React.createElement("div", {
    className: "max-w-[480px] shadow-lg hover:shadow-xl cursor-pointer rounded-lg border overflow-hidden mt-2",
    style: {
      background: theme !== null && theme !== void 0 && (_theme$bg = theme.bg) !== null && _theme$bg !== void 0 && _theme$bg.secondary ? theme.bg.secondary : defaultTheme.bg.secondary,
      borderColor: theme !== null && theme !== void 0 && (_theme$border2 = theme.border) !== null && _theme$border2 !== void 0 && _theme$border2.main ? theme.border.main : defaultTheme.border.main
    }
  }, /*#__PURE__*/React.createElement("div", {
    class: ""
  }, metadata.image && /*#__PURE__*/React.createElement("a", {
    href: metadata.url,
    target: "_blank",
    rel: "noreferrer"
  }, /*#__PURE__*/React.createElement("div", {
    class: "aspect-w-4 aspect-h-2 link-card-image object-cover",
    style: {
      backgroundImage: "url(" + metadata.image + ")"
    }
  })), /*#__PURE__*/React.createElement("div", {
    class: "p-3 border-t",
    style: {
      borderColor: theme !== null && theme !== void 0 && (_theme$border3 = theme.border) !== null && _theme$border3 !== void 0 && _theme$border3.secondary ? theme.border.secondary : defaultTheme.border.secondary
    }
  }, /*#__PURE__*/React.createElement("div", {
    class: "space-y-1 text-lg font-medium leading-6"
  }, metadata.source && /*#__PURE__*/React.createElement("p", {
    class: "text-sm",
    style: {
      color: theme !== null && theme !== void 0 && (_theme$color8 = theme.color) !== null && _theme$color8 !== void 0 && _theme$color8.active ? theme.color.active : defaultTheme.color.active
    }
  }, metadata.source), /*#__PURE__*/React.createElement("h3", {
    style: {
      color: theme !== null && theme !== void 0 && (_theme$color9 = theme.color) !== null && _theme$color9 !== void 0 && _theme$color9.main ? theme.color.main : defaultTheme.color.main
    }
  }, metadata.title), metadata.description && /*#__PURE__*/React.createElement("p", {
    class: "text-base font-normal",
    style: {
      color: theme !== null && theme !== void 0 && (_theme$color10 = theme.color) !== null && _theme$color10 !== void 0 && _theme$color10.secondary ? theme.color.secondary : defaultTheme.color.secondary
    }
  }, metadata.description.length > 155 ? /*#__PURE__*/React.createElement(React.Fragment, null, metadata.description, "...") : /*#__PURE__*/React.createElement(React.Fragment, null, metadata.description))))));
};

en.long.minute = {
  current: "this minute",
  future: {
    one: '{0} min.',
    other: '{0} min.'
  },
  past: {
    one: '{0} min. ago',
    other: '{0} mins. ago'
  }
};
TimeAgo.addDefaultLocale(en);

export { Article, Button, Comments, ConnectButton, Comments as Discussion, Inbox, OrbisProvider, Post, User, UserCredential, UserPfp, Username, darkTheme, defaultTheme, useOrbis };
//# sourceMappingURL=index.modern.js.map
