import React, { useContext, useEffect, useRef, useState } from 'react';
import { Orbis } from '@orbisclub/orbis-sdk';
export { Orbis } from '@orbisclub/orbis-sdk';
import 'react-string-replace';
import { getAddressFromDid } from '@orbisclub/orbis-sdk/utils/index.js';
import ReactTimeAgo from 'react-time-ago';
import { marked } from 'marked';
import Web3 from 'web3';
import { Magic } from 'magic-sdk';
import { ConnectExtension } from '@magic-ext/connect';
import TimeAgo from 'javascript-time-ago';
export { default as TimeAgo } from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';

const GlobalContext = React.createContext({
  orbis: null,
  user: null,
  setUser: null,
  theme: null
});

const defaultTheme = {
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
    active: "#4E75F6",
    twitter: "#1DA1F2"
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
    }
  }
};
const darkTheme = {
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
    active: "#4E75F6",
    twitter: "#1DA1F2"
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
    }
  }
};
function getThemeValue(type, theme, data) {
  var _theme$bg3, _theme$color, _theme$color2, _theme$border2, _theme$bg4, _theme$bg5, _theme$bg6, _theme$color3, _theme$color4, _theme$color5, _theme$color6, _theme$border3, _theme$border4, _theme$badges, _theme$badges$red, _theme$badges2, _theme$badges2$red, _theme$badges3, _theme$badges3$twitte, _theme$badges4, _theme$badges4$twitte, _theme$button, _theme$button$main, _theme$button2, _theme$button2$main, _theme$button3, _theme$button3$main, _theme$button4, _theme$button4$main, _theme$button5, _theme$button5$second, _theme$button6, _theme$button6$second, _theme$button7, _theme$button7$green, _theme$button8, _theme$button8$green, _theme$color7, _theme$button9, _theme$button9$red, _theme$button10, _theme$button10$red;
  let bgTertiary = theme !== null && theme !== void 0 && (_theme$bg3 = theme.bg) !== null && _theme$bg3 !== void 0 && _theme$bg3.tertiary ? theme.bg.tertiary : defaultTheme.bg.tertiary;
  let colorGreen = theme !== null && theme !== void 0 && (_theme$color = theme.color) !== null && _theme$color !== void 0 && _theme$color.green ? theme.color.green : defaultTheme.color.green;
  switch (type) {
    case "input":
      return {
        background: data ? bgTertiary : "transparent",
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
      switch (data) {
        case "main":
          return theme !== null && theme !== void 0 && (_theme$color3 = theme.color) !== null && _theme$color3 !== void 0 && _theme$color3.main ? theme.color.main : defaultTheme.color.main;
        case "secondary":
          return theme !== null && theme !== void 0 && (_theme$color4 = theme.color) !== null && _theme$color4 !== void 0 && _theme$color4.secondary ? theme.color.secondary : defaultTheme.color.secondary;
        case "tertiary":
          return theme !== null && theme !== void 0 && (_theme$color5 = theme.color) !== null && _theme$color5 !== void 0 && _theme$color5.tertiary ? theme.color.tertiary : defaultTheme.color.tertiary;
        case "quattro":
          return theme !== null && theme !== void 0 && (_theme$color6 = theme.color) !== null && _theme$color6 !== void 0 && _theme$color6.quattro ? theme.color.quattro : defaultTheme.color.quattro;
        case "green":
          return colorGreen;
        default:
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
          return null;
        case "red":
          return {
            background: theme !== null && theme !== void 0 && (_theme$badges = theme.badges) !== null && _theme$badges !== void 0 && (_theme$badges$red = _theme$badges.red) !== null && _theme$badges$red !== void 0 && _theme$badges$red.bg ? theme.badges.red.bg : defaultTheme.badges.red.bg,
            color: theme !== null && theme !== void 0 && (_theme$badges2 = theme.badges) !== null && _theme$badges2 !== void 0 && (_theme$badges2$red = _theme$badges2.red) !== null && _theme$badges2$red !== void 0 && _theme$badges2$red.color ? theme.badges.red.color : defaultTheme.badges.red.color
          };
        case "twitter":
          return {
            background: theme !== null && theme !== void 0 && (_theme$badges3 = theme.badges) !== null && _theme$badges3 !== void 0 && (_theme$badges3$twitte = _theme$badges3.twitter) !== null && _theme$badges3$twitte !== void 0 && _theme$badges3$twitte.bg ? theme.badges.twitter.bg : defaultTheme.badges.twitter.bg,
            color: theme !== null && theme !== void 0 && (_theme$badges4 = theme.badges) !== null && _theme$badges4 !== void 0 && (_theme$badges4$twitte = _theme$badges4.twitter) !== null && _theme$badges4$twitte !== void 0 && _theme$badges4$twitte.color ? theme.badges.twitter.color : defaultTheme.badges.twitter.color
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
            color: theme !== null && theme !== void 0 && (_theme$color7 = theme.color) !== null && _theme$color7 !== void 0 && _theme$color7.green ? theme.color.green : defaultTheme.color.green
          };
        case "red":
          return {
            background: theme !== null && theme !== void 0 && (_theme$button9 = theme.button) !== null && _theme$button9 !== void 0 && (_theme$button9$red = _theme$button9.red) !== null && _theme$button9$red !== void 0 && _theme$button9$red.bg ? theme.button.red.bg : defaultTheme.button.red.bg,
            color: theme !== null && theme !== void 0 && (_theme$button10 = theme.button) !== null && _theme$button10 !== void 0 && (_theme$button10$red = _theme$button10.red) !== null && _theme$button10$red !== void 0 && _theme$button10$red.color ? theme.button.red.color : defaultTheme.button.red.color
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
        fontSize: 15,
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
    default:
      return null;
  }
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
  } = useContext(GlobalContext);
  return /*#__PURE__*/React.createElement("button", {
    className: styles.btnPrimary,
    style: {
      ...getThemeValue("button", theme, color),
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

var styles$1 = {"LoadingCircle":"_1fzax","spin":"_esDdM"};

function LoadingCircle() {
  return /*#__PURE__*/React.createElement("svg", {
    className: styles$1.LoadingCircle,
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("circle", {
    style: {
      opacity: 0.25
    },
    cx: "12",
    cy: "12",
    r: "10",
    stroke: "currentColor",
    "stroke-width": "4"
  }), /*#__PURE__*/React.createElement("path", {
    style: {
      opacity: 0.75
    },
    fill: "currentColor",
    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  }));
}

var styles$2 = {"input":"_3ExRU","textarea":"_1TTFn"};

const Input = ({
  type,
  rows: _rows = 2,
  name,
  color,
  style,
  children,
  placeholder,
  value,
  onChange
}) => {
  const {
    orbis,
    user,
    theme
  } = useContext(GlobalContext);
  switch (type) {
    case "text":
      return /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: name,
        placeholder: placeholder,
        value: value,
        onChange: onChange,
        className: styles$2.input,
        style: style
      }, children);
    case "textarea":
      return /*#__PURE__*/React.createElement("textarea", {
        rows: 2,
        name: name,
        placeholder: placeholder,
        value: value,
        onChange: onChange,
        className: styles$2.textarea,
        style: style
      });
    default:
      return null;
  }
};

var styles$3 = {"badge":"_Kzctc"};

const Badge = ({
  color,
  style,
  children
}) => {
  const {
    orbis,
    user,
    theme
  } = useContext(GlobalContext);
  return /*#__PURE__*/React.createElement("div", {
    className: styles$3.badge,
    style: style
  }, children);
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

var styles$4 = {"modalBackground":"_2jnSH","modalContainer":"_3DR1S","modalWrapper":"_2EV56","modal":"_3i67k","modalTitle":"_1vj-s","modalDescription":"_1Tgb3"};

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
  } = useContext(GlobalContext);
  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, () => hide());
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      zIndex: 50
    },
    "aria-labelledby": "modal-title",
    role: "dialog",
    "aria-modal": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$4.modalBackground,
    style: {
      background: "#000",
      opacity: 0.70
    },
    onClick: () => hide()
  }), /*#__PURE__*/React.createElement("div", {
    className: styles$4.modalContainer
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$4.modalWrapper
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$4.modal,
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
    className: styles$4.modalTitle,
    style: {
      color: getThemeValue("color", theme, "main")
    }
  }, title), description && /*#__PURE__*/React.createElement("p", {
    className: styles$4.modalDescription,
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

function useDidToAddress(did) {
  let res = getAddressFromDid(did);
  return res;
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
    "stroke-width": "2.2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "11.5",
    cy: "22.5",
    r: "6.4",
    stroke: _color,
    "stroke-width": "2.2"
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
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
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
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    d: "M14.7045 1.15347C15.034 1.4045 15.0976 1.87509 14.8466 2.20457L6.84657 12.7046C6.71541 12.8767 6.51627 12.9838 6.30033 12.9983C6.08439 13.0129 5.87271 12.9334 5.71967 12.7804L1.21967 8.28037C0.926777 7.98748 0.926777 7.5126 1.21967 7.21971C1.51256 6.92682 1.98744 6.92682 2.28033 7.21971L6.17351 11.1129L13.6534 1.29551C13.9045 0.966029 14.3751 0.902435 14.7045 1.15347Z",
    fill: _color4,
    stroke: _color4,
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
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
    "stroke-width": "6.66667"
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
    "stroke-width": "6.66667"
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
    "color-interpolation-filters": "sRGB"
  }, /*#__PURE__*/React.createElement("feFlood", {
    "flood-opacity": "0",
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
    "color-interpolation-filters": "sRGB"
  }, /*#__PURE__*/React.createElement("feFlood", {
    "flood-opacity": "0",
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
const TwitterIcon = () => {
  return /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "11",
    viewBox: "0 0 512 417",
    fill: "currentColor",
    xmlns: "http://www.w3.org/2000/svg",
    style: {
      marginRight: "0.25rem"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M459.584 104.552C459.883 109.053 459.883 113.576 459.883 118.12C459.883 256.936 354.197 417 161.003 417V416.915C103.936 417 48.0427 400.659 0 369.832C8.29867 370.835 16.64 371.325 25.0027 371.347C72.32 371.389 118.272 355.517 155.456 326.291C110.507 325.437 71.0827 296.125 57.3227 253.331C73.0667 256.36 89.28 255.741 104.747 251.539C55.7227 241.64 20.48 198.568 20.48 148.563C20.48 148.115 20.48 147.667 20.48 147.24C35.0933 155.389 51.4347 159.891 68.16 160.381C21.9947 129.555 7.744 68.1573 35.6267 20.1573C88.96 85.7787 167.659 125.672 252.117 129.917C243.648 93.4373 255.232 55.208 282.496 29.544C324.8 -10.2427 391.339 -8.19466 431.125 34.1093C454.656 29.48 477.205 20.84 497.835 8.61601C489.984 32.936 473.579 53.5867 451.648 66.728C472.491 64.232 492.821 58.664 512 50.1733C497.899 71.272 480.149 89.6827 459.584 104.552Z"
  }));
};

var styles$5 = {"tabsChainsWraper":"_1shC3","tabsChainsContainer":"_2qXm0","tabsChain":"_3oHDX","loadingContainer":"_18PMf","nftsContainer":"_2hqFr","nftsEmptyState":"_1fFRJ","nftContainer":"_11vPg","nftImageContainer":"_1Ga-A","nftOverlayContainer":"_Ol_Rm","nftOverlayText":"_1v6HO"};

function UpdateProfileModal({
  hide,
  callbackNftUpdate
}) {
  var _theme$bg, _theme$color;
  const {
    user,
    theme
  } = useContext(GlobalContext);
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
        className: styles$5.tabsChain,
        style: {
          background: color,
          color: "#FFF"
        }
      }, name);
    } else {
      return /*#__PURE__*/React.createElement("div", {
        className: styles$5.tabsChain,
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
    className: styles$5.tabsChainsWraper
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$5.tabsChainsContainer,
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
      className: styles$5.loadingContainer
    }, /*#__PURE__*/React.createElement(LoadingCircle, null));
  }
  if (nfts && nfts.length == 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: styles$5.nftsEmptyState
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 13
      }
    }, "You don't have any NFT on this network."));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: styles$5.nftsContainer
  }, /*#__PURE__*/React.createElement(Loop, null));
}
function NFT({
  nft,
  chain,
  callback
}) {
  const {
    theme
  } = useContext(GlobalContext);
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
    className: styles$5.nftContainer
  }, /*#__PURE__*/React.createElement("div", {
    ref: hoverNft,
    className: styles$5.nftImageContainer
  }, nft.media[0].thumbnail ? /*#__PURE__*/React.createElement("img", {
    src: nft.media[0].thumbnail
  }) : /*#__PURE__*/React.createElement("img", {
    src: nft.media[0].gateway
  }), isNftHovered && /*#__PURE__*/React.createElement("div", {
    className: styles$5.nftOverlayContainer,
    onClick: () => setAsNft()
  }, /*#__PURE__*/React.createElement("p", {
    className: styles$5.nftOverlayText
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

var styles$6 = {"userContainer":"_2o7KL","userUsernameContainer":"_1Xs_-","userPfpContainer":"_MC4Lq","userPfpContainerImg":"_1FZoV","userPfpContainerImgEmpty":"_164UE","userBadge":"_3tVDt","userPopupContainer":"_3mkOx","userPopupContent":"_3EuST","userPopupDetailsContainer":"_2ioaU","userPopupDetailsUsername":"_18eQ4","userPopupDetailsBadgeContainer":"_2siDY","userPopupDetailsActionsContainer":"_WjB9N","userPopupFooterContainer":"_3sTma","userPopupFooterFollowers":"_2XlLk","userPopupFooterFollowing":"_1Xdku","userPopupFooterFollowTitle":"_PDHd1","userPopupFooterFollowCount":"_DskLZ","userEditContainer":"_2C8TD","userEditPfpContainer":"_3Ehbv","userEditPfpOverlay":"_1LJ5X","userEditButtonContainer":"_2OSys","userFieldsContainer":"_2ymLO","userFieldsSaveContainer":"_I1aJ0"};

const User = ({
  details,
  connected: _connected = false,
  height: _height = 44
}) => {
  const {
    user,
    theme
  } = useContext(GlobalContext);
  return /*#__PURE__*/React.createElement("div", {
    className: styles$6.userContainer
  }, /*#__PURE__*/React.createElement(UserPfp, {
    height: _height,
    details: _connected ? user : details
  }), /*#__PURE__*/React.createElement("div", {
    className: styles$6.userUsernameContainer
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
  showBadge: _showBadge = true
}) => {
  var _details$profile, _theme$bg, _theme$color, _details$profile2, _details$profile3;
  const {
    theme
  } = useContext(GlobalContext);
  return /*#__PURE__*/React.createElement("div", {
    className: styles$6.userPfpContainer
  }, details && details.profile && (_details$profile = details.profile) !== null && _details$profile !== void 0 && _details$profile.pfp ? /*#__PURE__*/React.createElement("img", {
    className: styles$6.userPfpContainerImg,
    src: details.profile.pfp,
    alt: "",
    style: {
      height: _height2,
      width: _height2
    }
  }) : /*#__PURE__*/React.createElement("span", {
    className: styles$6.userPfpContainerImgEmpty,
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
  }))), _showBadge && ((_details$profile2 = details.profile) === null || _details$profile2 === void 0 ? void 0 : _details$profile2.pfpIsNft) && /*#__PURE__*/React.createElement("div", {
    style: {
      top: -5,
      right: -5,
      position: "absolute"
    }
  }, /*#__PURE__*/React.createElement("img", {
    style: {
      height: "1.25rem",
      width: "1.25rem"
    },
    src: "https://app.orbis.club/img/icons/nft-verified-" + ((_details$profile3 = details.profile) === null || _details$profile3 === void 0 ? void 0 : _details$profile3.pfpIsNft.chain) + ".png"
  })));
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
  } = useContext(GlobalContext);
  const {
    address,
    chain
  } = useDidToAddress(details === null || details === void 0 ? void 0 : details.did);
  if (address) {
    var _theme$badges, _theme$badges$main, _theme$badges2, _theme$badges2$main, _details$metadata;
    return /*#__PURE__*/React.createElement("div", {
      className: styles$6.userBadge,
      style: {
        background: theme !== null && theme !== void 0 && (_theme$badges = theme.badges) !== null && _theme$badges !== void 0 && (_theme$badges$main = _theme$badges.main) !== null && _theme$badges$main !== void 0 && _theme$badges$main.bg ? theme.badges.main.bg : defaultTheme.badges.main.bg,
        color: theme !== null && theme !== void 0 && (_theme$badges2 = theme.badges) !== null && _theme$badges2 !== void 0 && (_theme$badges2$main = _theme$badges2.main) !== null && _theme$badges2$main !== void 0 && _theme$badges2$main.color ? theme.badges.main.color : defaultTheme.badges.main.color
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
  var _details$profile4, _details$profile5, _theme$bg2, _theme$border, _theme$color2, _details$profile6, _theme$color3, _theme$border2, _theme$color4, _theme$color5, _theme$color6, _theme$color7;
  const {
    orbis,
    user,
    theme
  } = useContext(GlobalContext);
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
  if (vis == false) {
    return null;
  }
  return /*#__PURE__*/React.createElement("div", {
    className: styles$6.userPopupContainer
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$6.userPopupContent,
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
    style: {
      alignItems: "center",
      display: "flex",
      flexDirection: "row"
    }
  }, /*#__PURE__*/React.createElement(UserPfp, {
    details: details
  }), /*#__PURE__*/React.createElement("div", {
    className: styles$6.userPopupDetailsContainer
  }, /*#__PURE__*/React.createElement("span", {
    className: styles$6.userPopupDetailsUsername,
    style: {
      color: theme !== null && theme !== void 0 && (_theme$color2 = theme.color) !== null && _theme$color2 !== void 0 && _theme$color2.main ? theme.color.main : defaultTheme.color.main,
      fontSize: 15
    }
  }, /*#__PURE__*/React.createElement(Username, {
    details: details
  })), /*#__PURE__*/React.createElement("span", {
    className: styles$6.userPopupDetailsBadgeContainer
  }, /*#__PURE__*/React.createElement(UserBadge, {
    details: details
  }))), /*#__PURE__*/React.createElement("div", {
    className: styles$6.userPopupDetailsActionsContainer
  }, user && user.did == details.did ? /*#__PURE__*/React.createElement(Button, {
    color: "primary",
    onClick: () => _setIsEditing(true)
  }, "Edit", /*#__PURE__*/React.createElement(EditIcon, null)) : /*#__PURE__*/React.createElement(Follow, {
    did: details.did
  }))), (details === null || details === void 0 ? void 0 : (_details$profile6 = details.profile) === null || _details$profile6 === void 0 ? void 0 : _details$profile6.description) && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "0.5rem"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15,
      lineHeight: "inherit",
      color: theme !== null && theme !== void 0 && (_theme$color3 = theme.color) !== null && _theme$color3 !== void 0 && _theme$color3.secondary ? theme.color.secondary : defaultTheme.color.secondary
    }
  }, details.profile.description)), (details === null || details === void 0 ? void 0 : details.twitter_details) && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "0.5rem"
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    style: {
      backgroundColor: getThemeValue("badges", theme, "twitter").background,
      color: getThemeValue("badges", theme, "twitter").color
    }
  }, /*#__PURE__*/React.createElement(TwitterIcon, null), /*#__PURE__*/React.createElement("a", {
    href: "https://twitter.com/" + (details === null || details === void 0 ? void 0 : details.twitter_details.username),
    target: "_blank",
    rel: "noreferrer"
  }, /*#__PURE__*/React.createElement("span", null, "@", details === null || details === void 0 ? void 0 : details.twitter_details.username)))), /*#__PURE__*/React.createElement("div", {
    className: styles$6.userPopupFooterContainer
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$6.userPopupFooterFollowers,
    style: {
      borderColor: theme !== null && theme !== void 0 && (_theme$border2 = theme.border) !== null && _theme$border2 !== void 0 && _theme$border2.main ? theme.border.main : defaultTheme.border.main
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: styles$6.userPopupFooterFollowTitle,
    style: {
      fontSize: 13,
      color: theme !== null && theme !== void 0 && (_theme$color4 = theme.color) !== null && _theme$color4 !== void 0 && _theme$color4.secondary ? theme.color.secondary : defaultTheme.color.secondary
    }
  }, "Followers"), /*#__PURE__*/React.createElement("p", {
    className: styles$6.userPopupFooterFollowCount,
    style: {
      fontSize: 15,
      color: theme !== null && theme !== void 0 && (_theme$color5 = theme.color) !== null && _theme$color5 !== void 0 && _theme$color5.main ? theme.color.main : defaultTheme.color.main
    }
  }, details.count_followers)), /*#__PURE__*/React.createElement("div", {
    className: styles$6.userPopupFooterFollowing
  }, /*#__PURE__*/React.createElement("p", {
    className: styles$6.userPopupFooterFollowTitle,
    style: {
      fontSize: 13,
      color: theme !== null && theme !== void 0 && (_theme$color6 = theme.color) !== null && _theme$color6 !== void 0 && _theme$color6.secondary ? theme.color.secondary : defaultTheme.color.secondary
    }
  }, "Following"), /*#__PURE__*/React.createElement("p", {
    className: styles$6.userPopupFooterFollowCount,
    style: {
      fontSize: 15,
      color: theme !== null && theme !== void 0 && (_theme$color7 = theme.color) !== null && _theme$color7 !== void 0 && _theme$color7.main ? theme.color.main : defaultTheme.color.main
    }
  }, details.count_following))))), showProfileModal && /*#__PURE__*/React.createElement(UpdateProfileModal, {
    hide: () => setShowProfileModal(false),
    callbackNftUpdate: callbackNftUpdate
  }));
};
function Follow({
  did
}) {
  const {
    orbis,
    user,
    theme
  } = useContext(GlobalContext);
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
    }, /*#__PURE__*/React.createElement(LoadingCircle, {
      color: "text-white ml-3"
    }));
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
  } = useContext(GlobalContext);
  const [username, setUsername] = useState(user === null || user === void 0 ? void 0 : (_user$profile = user.profile) === null || _user$profile === void 0 ? void 0 : _user$profile.username);
  const [description, setDescription] = useState(user === null || user === void 0 ? void 0 : (_user$profile2 = user.profile) === null || _user$profile2 === void 0 ? void 0 : _user$profile2.description);
  const [status, setStatus] = useState(0);
  async function save() {
    if (status != 0) {
      console.log("Already saving.");
      return;
    }
    setStatus(1);
    let profile = {
      username: username,
      description: description,
      pfp: pfp ? pfp : null
    };
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
    className: styles$6.userEditContainer
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$6.userEditPfpContainer
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
    className: styles$6.userEditPfpOverlay,
    style: {
      background: "rgba(0,0,0,0.5)",
      top: 0,
      width: "100%",
      height: "100%"
    },
    onClick: () => setShowProfileModal(true)
  }, /*#__PURE__*/React.createElement(EditIcon, null)))), /*#__PURE__*/React.createElement("div", {
    className: styles$6.userEditButtonContainer,
    onClick: () => setIsEditing(false)
  }, /*#__PURE__*/React.createElement(Button, null, "Cancel"))), /*#__PURE__*/React.createElement("div", {
    className: styles$6.userFieldsContainer
  }, /*#__PURE__*/React.createElement(Input, {
    type: "text",
    name: "username",
    value: username,
    onChange: e => setUsername(e.target.value),
    placeholder: "Enter your username",
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
  })), /*#__PURE__*/React.createElement("div", {
    className: styles$6.userFieldsSaveContainer
  }, /*#__PURE__*/React.createElement(SaveButton, null)));
}

function ConnectModal({
  lit = false,
  title = "Connect to join the discussion",
  description = "You must be connected to share posts or reactions.",
  hide
}) {
  const {
    orbis,
    theme
  } = useContext(GlobalContext);
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
    setUser
  } = useContext(GlobalContext);
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
    "stop-opacity": "0.82"
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

var styles$7 = {"connectBtn":"_1jNTa"};

function ConnectButton({
  lit = false
}) {
  const {
    orbis,
    user,
    theme,
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
    className: styles$7.connectBtn,
    style: {
      ...getStyle("button-main", theme, "main"),
      width: "100%",
      textAlign: "center"
    },
    onClick: () => setConnectModalVis(true)
  }, connecting ? /*#__PURE__*/React.createElement(LoadingCircle, null) : /*#__PURE__*/React.createElement(BoltIcon, {
    style: {
      marginRight: "0.25rem"
    }
  }), "Connect"), connectModalVis && /*#__PURE__*/React.createElement(ConnectModal, {
    orbis: orbis,
    lit: lit,
    hide: () => setConnectModalVis(false)
  }));
}

var styles$8 = {"postboxGlobalContainer":"_3glYN","postboxConnectContainer":"_AFaEi","postboxUserContainer":"_2PH81","postboxContainer":"_3G9kY","postbox":"_1Y2r9","postboxInput":"_beLGF","postboxShareContainer":"_3AOEJ","postboxShareContainerBtn":"_1be8d","postboxReplyContainer":"_3DmQC","postboxReplyBadge":"_2pfJ3"};

function Postbox({
  showPfp = true,
  connecting,
  reply = null,
  callback,
  rows = "2",
  defaultPost,
  setEditPost,
  ctaTitle = "Comment",
  ctaStyle = styles$8.postboxShareContainerBtn,
  placeholder = "Add your comment..."
}) {
  const {
    orbis,
    user,
    context,
    comments,
    setComments,
    theme
  } = useContext(GlobalContext);
  const [sharing, setSharing] = useState(false);
  const postbox = useRef();
  const [hoverRef, isHovered] = useHover();
  useEffect(() => {
    console.log("isHovered profile in postbox:", isHovered);
  }, [isHovered]);
  useEffect(() => {
    if (defaultPost) {
      if (postbox.current) {
        postbox.current.value = defaultPost.content.body;
      }
    }
  }, [defaultPost]);
  const handleSubmit = async event => {
    event.preventDefault();
    if (sharing) {
      console.log("A request is already being processed.");
      return;
    }
    setSharing(true);
    const formData = new FormData(event.target);
    let body = formData.get("body");
    let master = null;
    if (reply && reply.content.master) {
      master = reply.content.master;
    } else if (reply) {
      master = reply.stream_id;
    }
    let _content = {
      body: body,
      context: context,
      master: master,
      reply_to: reply ? reply.stream_id : null
    };
    let res = await orbis.createPost(_content);
    if (res.status == 200) {
      setComments([{
        timestamp: getTimestamp(),
        creator_details: user,
        creator: user.did,
        stream_id: res.doc,
        content: _content,
        count_likes: 0
      }, ...comments]);
      if (postbox.current) {
        postbox.current.value = "";
      }
      if (callback) {
        callback();
      }
    }
    setSharing(false);
  };
  if (user) {
    var _theme$color, _theme$badges, _theme$badges$main, _theme$badges2, _theme$badges2$main;
    return /*#__PURE__*/React.createElement("div", {
      className: styles$8.postboxGlobalContainer
    }, showPfp && /*#__PURE__*/React.createElement("div", {
      className: styles$8.postboxUserContainer,
      ref: hoverRef
    }, /*#__PURE__*/React.createElement(UserPfp, {
      details: user
    }), /*#__PURE__*/React.createElement(UserPopup, {
      visible: isHovered,
      details: user
    })), /*#__PURE__*/React.createElement("div", {
      className: styles$8.postboxContainer
    }, /*#__PURE__*/React.createElement("form", {
      style: {
        width: "100%"
      },
      onSubmit: event => handleSubmit(event)
    }, /*#__PURE__*/React.createElement("div", {
      className: styles$8.postbox,
      style: {
        borderColor: getThemeValue("input", theme).border,
        backgroundColor: getThemeValue("input", theme, sharing).background
      }
    }, reply && /*#__PURE__*/React.createElement("div", {
      className: styles$8.postboxReplyContainer
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        marginRight: "0.25rem",
        color: theme !== null && theme !== void 0 && (_theme$color = theme.color) !== null && _theme$color !== void 0 && _theme$color.secondary ? theme.color.secondary : defaultTheme.color.secondary
      }
    }, "Replying to:"), /*#__PURE__*/React.createElement("div", {
      className: styles$8.postboxReplyBadge,
      style: {
        background: theme !== null && theme !== void 0 && (_theme$badges = theme.badges) !== null && _theme$badges !== void 0 && (_theme$badges$main = _theme$badges.main) !== null && _theme$badges$main !== void 0 && _theme$badges$main.bg ? theme.badges.main.bg : defaultTheme.badges.main.bg,
        color: theme !== null && theme !== void 0 && (_theme$badges2 = theme.badges) !== null && _theme$badges2 !== void 0 && (_theme$badges2$main = _theme$badges2.main) !== null && _theme$badges2$main !== void 0 && _theme$badges2$main.color ? theme.badges.main.color : defaultTheme.badges.main.color
      }
    }, /*#__PURE__*/React.createElement(Username, {
      details: reply.creator_details
    }))), /*#__PURE__*/React.createElement("textarea", {
      autofocus: true,
      ref: postbox,
      rows: rows,
      name: "body",
      id: "body",
      className: styles$8.postboxInput,
      style: {
        fontSize: 15,
        color: getThemeValue("input", theme, sharing).color
      },
      placeholder: placeholder,
      disabled: sharing
    }), /*#__PURE__*/React.createElement("div", {
      className: styles$8.postboxShareContainer
    }, sharing ? /*#__PURE__*/React.createElement("button", {
      type: "submit",
      className: ctaStyle,
      disabled: true
    }, /*#__PURE__*/React.createElement(LoadingCircle, null), " Sending") : /*#__PURE__*/React.createElement(React.Fragment, null, defaultPost && /*#__PURE__*/React.createElement(Button, {
      color: "secondary",
      style: {
        marginRight: 5
      },
      onClick: () => setEditPost(false)
    }, "Cancel"), /*#__PURE__*/React.createElement("button", {
      type: "submit",
      className: ctaStyle,
      style: getStyle("button-main", theme, "main")
    }, ctaTitle, /*#__PURE__*/React.createElement(SendIcon, null))))))));
  } else {
    return /*#__PURE__*/React.createElement("div", {
      className: styles$8.postboxConnectContainer
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: "60%"
      }
    }, /*#__PURE__*/React.createElement(ConnectButton, {
      orbis: orbis
    })));
  }
}
const SendIcon = () => {
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
    fill: "white"
  }));
};

var styles$9 = {"postContainer":"_3_x9y","postDetailsContainer":"_3lHql","postDetailsContainerMetadata":"_24K_v","postDetailsContainerUser":"_3Quh-","postDetailsContainerUsername":"_2AqE9","postDetailsContainerTimestamp":"_fC7lP","postReplyCta":"_1LQro","postContent":"_lajK0","postActionsContainer":"_2kUJi","postActionButton":"_tFyW_","postUrlMetadataContainer":"_1GVYT","postUrlMetadataImage":"_1WVVA","postUrlMetadataDetails":"_3TElm","postMenuContainer":"_1V9U6","hideMobile":"_2_Z8P"};

const Post = ({
  comment,
  characterLimit: _characterLimit = null
}) => {
  var _theme$color, _theme$color2, _theme$color3, _theme$color4, _comment$indexing_met, _comment$creator_deta, _theme$color5, _theme$color6;
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
    if (user) {
      getUserReaction();
    }
  }, [user]);
  async function getUserReaction() {
    let {
      data,
      error
    } = await orbis.getReaction(comment.stream_id, user.did);
    if (data) {
      setUserReaction(data.type);
    }
  }
  async function like(type) {
    if (!user) {
      alert("You must be connected to react to comments.");
      return;
    }
    setUserReaction(type);
    let res = await orbis.react(comment.stream_id, type);
    switch (res.status) {
      case 300:
        console.log("Error reacting to the post:", res);
        break;
    }
  }
  function callbackShared() {
    setReply(false);
  }
  if (isDeleted) {
    return null;
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: styles$9.postContainer
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    },
    ref: hoverRef
  }, /*#__PURE__*/React.createElement(UserPfp, {
    details: comment.creator_details
  }), /*#__PURE__*/React.createElement(UserPopup, {
    visible: isHovered,
    details: comment.creator_details
  })), /*#__PURE__*/React.createElement("div", {
    className: styles$9.postDetailsContainer
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$9.postDetailsContainerMetadata
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$9.postDetailsContainerUser
  }, /*#__PURE__*/React.createElement("span", {
    className: styles$9.postDetailsContainerUsername,
    style: {
      fontSize: 15,
      color: theme !== null && theme !== void 0 && (_theme$color = theme.color) !== null && _theme$color !== void 0 && _theme$color.main ? theme.color.main : defaultTheme.color.main
    }
  }, /*#__PURE__*/React.createElement(Username, {
    details: comment.creator_details
  })), /*#__PURE__*/React.createElement("div", {
    className: styles$9.hideMobile,
    style: {
      marginLeft: "0.5rem"
    }
  }, /*#__PURE__*/React.createElement(UserBadge, {
    details: comment.creator_details
  }))), /*#__PURE__*/React.createElement("p", {
    className: styles$9.postDetailsContainerTimestamp,
    style: {
      fontSize: 12,
      color: theme !== null && theme !== void 0 && (_theme$color2 = theme.color) !== null && _theme$color2 !== void 0 && _theme$color2.secondary ? theme.color.secondary : defaultTheme.color.secondary
    }
  }, /*#__PURE__*/React.createElement(ReactTimeAgo, {
    style: {
      display: "flex",
      fontSize: 12
    },
    date: comment.timestamp * 1000,
    locale: "en-US"
  }), /*#__PURE__*/React.createElement("div", {
    className: styles$9.hideMobile
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "0.5rem",
      marginRight: "0.5rem"
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("a", {
    style: {
      textDecoration: "none",
      color: theme !== null && theme !== void 0 && (_theme$color3 = theme.color) !== null && _theme$color3 !== void 0 && _theme$color3.secondary ? theme.color.secondary : defaultTheme.color.secondary
    },
    href: "https://cerscan.com/mainnet/stream/" + comment.stream_id,
    rel: "noreferrer",
    target: "_blank"
  }, "Proof")), user && user.did == comment.creator && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "0.5rem",
      marginRight: "0.5rem"
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("div", {
    style: {
      alignItems: "center",
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      cursor: "pointer"
    },
    onClick: () => setPostMenuVis(true)
  }, /*#__PURE__*/React.createElement(MenuHorizontal, null)), postMenuVis && /*#__PURE__*/React.createElement(PostMenu, {
    stream_id: comment.stream_id,
    setPostMenuVis: setPostMenuVis,
    setEditPost: setEditPost,
    setIsDeleted: setIsDeleted
  }))))), editPost ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "0.5rem"
    }
  }, /*#__PURE__*/React.createElement(Postbox, {
    showPfp: false,
    defaultPost: comment,
    reply: reply,
    callback: callbackShared,
    rows: "1",
    ctaTitle: "Edit",
    ctaStyle: styles$9.postReplyCta,
    setEditPost: setEditPost
  })) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$9.postContent,
    style: {
      fontSize: 15,
      color: theme !== null && theme !== void 0 && (_theme$color4 = theme.color) !== null && _theme$color4 !== void 0 && _theme$color4.main ? theme.color.main : defaultTheme.color.main
    },
    dangerouslySetInnerHTML: {
      __html: marked.parse(comment.content.body)
    }
  }), ((_comment$indexing_met = comment.indexing_metadata) === null || _comment$indexing_met === void 0 ? void 0 : _comment$indexing_met.urlMetadata) && ((_comment$creator_deta = comment.creator_details) === null || _comment$creator_deta === void 0 ? void 0 : _comment$creator_deta.a_r) > 15 && /*#__PURE__*/React.createElement(LinkCard, {
    metadata: comment.indexing_metadata.urlMetadata
  })), /*#__PURE__*/React.createElement("div", {
    className: styles$9.postActionsContainer
  }, reply != null ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: styles$9.postActionButton,
    style: {
      color: "#4E75F6"
    },
    onClick: () => setReply(null)
  }, /*#__PURE__*/React.createElement(ReplyIcon, {
    type: "full"
  }), "Reply") : /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: styles$9.postActionButton,
    style: {
      color: theme !== null && theme !== void 0 && (_theme$color5 = theme.color) !== null && _theme$color5 !== void 0 && _theme$color5.secondary ? theme.color.secondary : defaultTheme.color.secondary
    },
    onClick: () => setReply(comment)
  }, /*#__PURE__*/React.createElement(ReplyIcon, {
    type: "line"
  }), "Reply"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "0.75rem",
      flexDirection: "row",
      display: "flex"
    }
  }, userReaction == "like" ? /*#__PURE__*/React.createElement("button", {
    className: styles$9.postActionButton,
    style: {
      color: "#4E75F6"
    },
    onClick: () => like(null)
  }, /*#__PURE__*/React.createElement(LikeIcon, {
    type: "full"
  }), "Liked") : /*#__PURE__*/React.createElement("button", {
    className: styles$9.postActionButton,
    style: {
      color: theme !== null && theme !== void 0 && (_theme$color6 = theme.color) !== null && _theme$color6 !== void 0 && _theme$color6.secondary ? theme.color.secondary : defaultTheme.color.secondary
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
    ctaStyle: styles$9.postReplyCta
  })))));
};
const LinkCard = ({
  metadata
}) => {
  var _theme$bg, _theme$border, _theme$border2, _theme$color7, _theme$color8, _theme$color9;
  const {
    theme
  } = useContext(GlobalContext);
  return /*#__PURE__*/React.createElement("div", {
    className: styles$9.postUrlMetadataContainer,
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
    className: styles$9.postUrlMetadataImage,
    style: {
      backgroundImage: "url(" + metadata.image + ")"
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: styles$9.postUrlMetadataDetails,
    style: {
      borderColor: theme !== null && theme !== void 0 && (_theme$border2 = theme.border) !== null && _theme$border2 !== void 0 && _theme$border2.secondary ? theme.border.secondary : defaultTheme.border.secondary
    }
  }, metadata.source && /*#__PURE__*/React.createElement("p", {
    style: {
      color: theme !== null && theme !== void 0 && (_theme$color7 = theme.color) !== null && _theme$color7 !== void 0 && _theme$color7.active ? theme.color.active : defaultTheme.color.active,
      fontSize: 13,
      fontWeight: 500
    }
  }, metadata.source), /*#__PURE__*/React.createElement("h3", {
    style: {
      color: theme !== null && theme !== void 0 && (_theme$color8 = theme.color) !== null && _theme$color8 !== void 0 && _theme$color8.main ? theme.color.main : defaultTheme.color.main,
      fontSize: 17,
      fontWeight: 500,
      lineHeight: "1.5rem"
    }
  }, metadata.title), metadata.description && /*#__PURE__*/React.createElement("p", {
    style: {
      color: theme !== null && theme !== void 0 && (_theme$color9 = theme.color) !== null && _theme$color9 !== void 0 && _theme$color9.secondary ? theme.color.secondary : defaultTheme.color.secondary,
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
  var _theme$bg2, _theme$border3, _theme$color10;
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
    className: styles$9.postMenuContainer,
    ref: wrapperRef,
    style: {
      right: 10,
      background: theme !== null && theme !== void 0 && (_theme$bg2 = theme.bg) !== null && _theme$bg2 !== void 0 && _theme$bg2.secondary ? theme.bg.secondary : defaultTheme.bg.secondary,
      borderColor: theme !== null && theme !== void 0 && (_theme$border3 = theme.border) !== null && _theme$border3 !== void 0 && _theme$border3.main ? theme.border.main : defaultTheme.border.main
    }
  }, /*#__PURE__*/React.createElement("div", {
    class: "flex items-center px-3 py-2 text-sm font-medium rounded-md cursor-pointer",
    style: {
      color: theme !== null && theme !== void 0 && (_theme$color10 = theme.color) !== null && _theme$color10 !== void 0 && _theme$color10.main ? theme.color.main : defaultTheme.color.main
    },
    "aria-current": "page",
    onClick: () => edit()
  }, "Edit"), /*#__PURE__*/React.createElement(DeleteButton, null));
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
        stroke: "#798496",
        "stroke-width": "1.5",
        "stroke-linecap": "round"
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
        fill: "#4E75F6"
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

var styles$a = {"commentsGlobalContainer":"_MBDTd","commentsContainer":"_3vbCv","loadingContainer":"_2mFCC","commentsEmptyStateContainer":"_1LQjG","greyLine":"_1YFCn","footerContainer":"_3k7Bt","footerOpenSocialContainer":"_1gCaM"};

let _orbis = new Orbis({
  useLit: false
});
let magic;
let web3;
if (typeof window !== "undefined") {
  magic = new Magic('pk_live_2E6B3B065093108E', {
    network: 'mainnet',
    extensions: [new ConnectExtension()]
  });
  web3 = new Web3(magic.rpcProvider);
}
const Comments = ({
  orbis: _orbis2 = _orbis,
  context,
  theme
}) => {
  var _theme$bg, _theme$border;
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [user, setUser] = useState();
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
    let res = await _orbis2.createPost({
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
    } = await _orbis2.getPosts({
      context: context
    }, 0);
    console.log("data", data);
    setComments(data);
    setLoading(false);
  }
  return /*#__PURE__*/React.createElement(GlobalContext.Provider, {
    value: {
      user,
      setUser,
      orbis: _orbis2,
      magic,
      context,
      comments,
      setComments,
      theme
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$a.commentsGlobalContainer,
    style: {
      background: theme !== null && theme !== void 0 && (_theme$bg = theme.bg) !== null && _theme$bg !== void 0 && _theme$bg.main ? theme.bg.main : defaultTheme.bg.main
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "1rem"
    }
  }, /*#__PURE__*/React.createElement(Postbox, {
    context: context,
    handleSubmit: handleSubmit
  })), /*#__PURE__*/React.createElement("div", {
    className: styles$a.commentsContainer,
    style: {
      borderColor: theme !== null && theme !== void 0 && (_theme$border = theme.border) !== null && _theme$border !== void 0 && _theme$border.secondary ? theme.border.secondary : defaultTheme.border.secondary
    }
  }, loading ? /*#__PURE__*/React.createElement("div", {
    className: styles$a.loadingContainer,
    style: {
      color: getThemeValue("color", theme, "main")
    }
  }, /*#__PURE__*/React.createElement(LoadingCircle, null)) : /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "1.5rem"
    }
  }, comments.length <= 0 ? /*#__PURE__*/React.createElement("div", {
    className: styles$a.commentsEmptyStateContainer
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      color: getThemeValue("color", theme, "secondary"),
      fontSize: 15,
      marginTop: "0.5rem",
      marginBottom: "0.5rem"
    }
  }, "There isn't any comment here yet."), /*#__PURE__*/React.createElement(EmptyStateComments, null)) : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(LoopComments, {
    comments: comments
  })))), /*#__PURE__*/React.createElement("div", {
    className: styles$a.footerContainer
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://orbis.club?utm_source=comments_module",
    rel: "noreferrer",
    target: "_blank",
    className: styles$a.footerOpenSocialContainer
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: getThemeValue("color", theme, "secondary"),
      marginRight: 5,
      fontSize: 15
    }
  }, "Open Social with"), /*#__PURE__*/React.createElement(Logo, {
    className: "flex",
    color: getThemeValue("color", theme, "main")
  })))));
};
function LoopComments({
  comments
}) {
  return comments.map((comment, key) => {
    if ((!comment.content.reply_to || comment.content.reply_to == "") && !comment.content.master || comment.content.master == "") {
      return /*#__PURE__*/React.createElement(Comment, {
        comments: comments,
        comment: comment,
        master: comment.content.master,
        key: key
      });
    } else {
      return null;
    }
  });
}
function Comment({
  comments,
  comment,
  master
}) {
  var _theme$border2;
  const {
    theme
  } = useContext(GlobalContext);
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
    className: styles$a.greyLine,
    style: {
      top: 60,
      bottom: 20,
      left: 22,
      width: 1,
      backgroundColor: theme !== null && theme !== void 0 && (_theme$border2 = theme.border) !== null && _theme$border2 !== void 0 && _theme$border2.main ? theme.border.main : defaultTheme.border.main
    },
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement(Post, {
    comment: comment
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: "2.5rem"
    },
    className: "ml-10"
  }, /*#__PURE__*/React.createElement(LoopInternalReplies, null)));
}

let _orbis$1 = new Orbis();
let magic$1;
let web3$1;
if (typeof window !== "undefined") {
  magic$1 = new Magic('pk_live_2E6B3B065093108E', {
    network: 'mainnet',
    extensions: [new ConnectExtension()]
  });
  web3$1 = new Web3(magic$1.rpcProvider);
}
const Inbox = ({
  orbis: _orbis2 = _orbis$1,
  context,
  theme
}) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [conversationSelected, setConversationSelected] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  useEffect(() => {
    if (user) {
      loadConversations();
    }
  }, [context, user]);
  async function loadConversations() {
    setLoading(true);
    let {
      data,
      error
    } = await _orbis2.getConversations({
      did: user.did,
      context: context
    }, 0);
    console.log("data", data);
    setConversations(data);
    setLoading(false);
  }
  return /*#__PURE__*/React.createElement(GlobalContext.Provider, {
    value: {
      user,
      setUser,
      orbis: _orbis2,
      magic: magic$1,
      context,
      theme,
      conversationSelected,
      setConversationSelected,
      isExpanded,
      setIsExpanded
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "orbis orbis-inbox absolute bottom-0 right-20 rounded-none rounded-t-lg w-[335px] shadow-sm overflow-hidden max-h-[77%] flex flex-col",
    style: {
      height: isExpanded ? "500px" : "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex bg-[#4E75F6] text-base font-medium text-white hover:bg-[#3E67F0] flex-row items-center"
  }, /*#__PURE__*/React.createElement(HeaderInbox, null)), isExpanded && /*#__PURE__*/React.createElement("div", {
    className: "bg-white flex flex-1 flex-col w-full overflow-scroll"
  }, user ? /*#__PURE__*/React.createElement(React.Fragment, null, conversationSelected ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col-reverse flex-1 w-full p-3 overflow-scroll"
  }, /*#__PURE__*/React.createElement(Messages, null)), /*#__PURE__*/React.createElement("div", {
    className: "flex w-full border-gray-100 border-t bg-white px-3 py-3 flex-row"
  }, /*#__PURE__*/React.createElement(MessageBox, null))) : /*#__PURE__*/React.createElement("ul", {
    role: "list",
    className: "divide-y divide-gray-200 w-full px-3"
  }, /*#__PURE__*/React.createElement(LoopConversations, {
    conversations: conversations
  }))) : /*#__PURE__*/React.createElement("div", {
    className: "p-12 w-full"
  }, /*#__PURE__*/React.createElement(ConnectButton, {
    lit: true
  })))));
};
function HeaderInbox() {
  const {
    conversationSelected,
    isExpanded,
    setIsExpanded
  } = useContext(GlobalContext);
  if (conversationSelected) {
    return /*#__PURE__*/React.createElement("div", {
      className: "flex flex-row items-center px-5 py-2"
    }, /*#__PURE__*/React.createElement(Participants, {
      conversation: conversationSelected
    }));
  } else {
    return /*#__PURE__*/React.createElement("div", {
      className: "cursor-pointer flex flex-row items-center px-5 py-4",
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
    setConversationSelected
  } = useContext(GlobalContext);
  return /*#__PURE__*/React.createElement("li", {
    className: "py-4 items-center hover:bg-gray-50 cursor-pointer",
    onClick: () => setConversationSelected(conversation)
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mr-3 w-[43px]"
  }, conversation.recipients.length > 2 ? /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement(RecipientsPfp, {
    conversation: conversation
  })) : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(UserPfp, {
    details: conversation.recipients_details[0].did == user.did ? conversation.recipients_details[1] : conversation.recipients_details[0]
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 space-y-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-1 text-base font-medium text-gray-900 flex flex-row"
  }, conversation.recipients.length > 2 ? /*#__PURE__*/React.createElement("h3", {
    className: "flex flex-row"
  }, /*#__PURE__*/React.createElement(Username, {
    details: conversation.recipients_details[0].did == user.did ? conversation.recipients_details[1] : conversation.recipients_details[0]
  }), /*#__PURE__*/React.createElement("span", {
    className: "ml-1 text-gray-500 font-normal"
  }, "and ", /*#__PURE__*/React.createElement("span", {
    className: "text-gray-900 font-medium"
  }, conversation.recipients.length - 1, " others"))) : /*#__PURE__*/React.createElement("h3", null, /*#__PURE__*/React.createElement(Username, {
    details: conversation.recipients_details[0].did == user.did ? conversation.recipients_details[1] : conversation.recipients_details[0]
  }))), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-500"
  }, "1h")))));
}
function Participants({
  conversation
}) {
  const {
    user,
    setConversationSelected
  } = useContext(GlobalContext);
  return /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mr-3 cursor-pointer",
    onClick: () => setConversationSelected(null)
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "16",
    viewBox: "0 0 20 18",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    d: "M9.03033 0.96967C9.32322 1.26256 9.32322 1.73744 9.03033 2.03033L2.81066 8.25H19C19.4142 8.25 19.75 8.58579 19.75 9C19.75 9.41421 19.4142 9.75 19 9.75H2.81066L9.03033 15.9697C9.32322 16.2626 9.32322 16.7374 9.03033 17.0303C8.73744 17.3232 8.26256 17.3232 7.96967 17.0303L0.46967 9.53033C0.176777 9.23744 0.176777 8.76256 0.46967 8.46967L7.96967 0.96967C8.26256 0.676777 8.73744 0.676777 9.03033 0.96967Z",
    fill: "#FAFBFB"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "mr-3 w-[38px]"
  }, conversation.recipients.length > 2 ? /*#__PURE__*/React.createElement("div", {
    className: "relative",
    style: {
      paddingTop: 11
    }
  }, /*#__PURE__*/React.createElement(RecipientsPfp, {
    conversation: conversation,
    height: 25
  })) : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(UserPfp, {
    details: conversation.recipients_details[0].did == user.did ? conversation.recipients_details[1] : conversation.recipients_details[0],
    height: 38
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 space-y-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-1 text-base font-medium text-white flex flex-row"
  }, conversation.recipients.length > 2 ? /*#__PURE__*/React.createElement("h3", {
    className: "flex flex-row"
  }, /*#__PURE__*/React.createElement(Username, {
    details: conversation.recipients_details[0].did == user.did ? conversation.recipients_details[1] : conversation.recipients_details[0]
  }), /*#__PURE__*/React.createElement("span", {
    className: "ml-1 text-gray-500 font-normal"
  }, "and ", /*#__PURE__*/React.createElement("span", {
    className: "text-gray-900 font-medium"
  }, conversation.recipients.length - 1, " others"))) : /*#__PURE__*/React.createElement("h3", null, /*#__PURE__*/React.createElement(Username, {
    details: conversation.recipients_details[0].did == user.did ? conversation.recipients_details[1] : conversation.recipients_details[0]
  }))))));
}
const RecipientsPfp = ({
  conversation,
  height: _height = 28
}) => {
  const {
    user
  } = useContext(GlobalContext);
  let i = 0;
  return conversation.recipients_details.map((recipient, key) => {
    if (recipient.did != user.did && i < 2) {
      i++;
      if (i == 1) {
        return /*#__PURE__*/React.createElement("div", {
          className: "flex rounded-full "
        }, /*#__PURE__*/React.createElement(UserPfp, {
          height: _height,
          details: recipient,
          key: key
        }));
      } else {
        return /*#__PURE__*/React.createElement("div", {
          className: "rounded-full border-2 border-white",
          style: {
            position: "absolute",
            left: 13,
            top: -13,
            width: _height + 4
          }
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
function Messages() {
  const {
    user,
    orbis,
    conversationSelected
  } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    if (user) {
      loadMessages();
    }
  }, [user, conversationSelected]);
  async function loadMessages() {
    setLoading(true);
    let {
      data,
      error
    } = await orbis.getMessages(conversationSelected.stream_id);
    console.log("data", data);
    setMessages(data);
    setLoading(false);
  }
  if (loading) {
    return /*#__PURE__*/React.createElement("div", {
      className: "w-full justify-center flex py-8"
    }, /*#__PURE__*/React.createElement(LoadingCircle, {
      color: "text-gray-900"
    }));
  }
  return messages.map((message, key) => {
    return /*#__PURE__*/React.createElement(Message, {
      message: message,
      key: key
    });
  });
}
function Message({
  message
}) {
  const [body, setBody] = useState();
  const {
    user,
    orbis
  } = useContext(GlobalContext);
  useEffect(() => {
    console.log("In <Message />: ", message);
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
  return /*#__PURE__*/React.createElement("div", {
    className: user.did == message.creator ? "flex w-full pb-2 text-base justify-end" : "flex w-full pb-2 text-base"
  }, /*#__PURE__*/React.createElement("div", {
    className: user.did == message.creator ? "bg-[#25A4FF] rounded-lg px-4 py-2" : "bg-gray-100 rounded-lg px-4 py-2",
    style: {
      minWidth: "70%",
      maxWidth: "80%"
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: user.did == message.creator ? "text-white" : "text-gray-900"
  }, body ? body : /*#__PURE__*/React.createElement(LoadingCircle, null))));
}
function MessageBox() {
  const {
    theme
  } = useContext(GlobalContext);
  return /*#__PURE__*/React.createElement("div", {
    className: "w-full flex flex-row"
  }, /*#__PURE__*/React.createElement("textarea", {
    autofocus: true,
    rows: 1,
    name: "body",
    id: "body",
    className: enabledInput,
    style: {
      fontSize: 15,
      borderRadius: 15,
      color: getThemeValue("input", theme, false).color
    },
    placeholder: "Your message...",
    disabled: false
  }), /*#__PURE__*/React.createElement("button", {
    className: sendStyleMain
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1.31918 0.60287C1.14269 0.5516 0.952295 0.601289 0.823367 0.732269C0.694438 0.863249 0.647761 1.0544 0.70181 1.23006L2.32333 6.5H8.00049C8.27663 6.5 8.50049 6.72386 8.50049 7C8.50049 7.27614 8.27663 7.5 8.00049 7.5H2.32334L0.701871 12.7698C0.647821 12.9454 0.6945 13.1366 0.82343 13.2676C0.95236 13.3985 1.14275 13.4482 1.31925 13.397C5.78498 12.0996 9.93211 10.0543 13.616 7.40581C13.7467 7.31187 13.8241 7.16077 13.8241 6.99984C13.8241 6.8389 13.7467 6.6878 13.616 6.59386C9.93207 3.94544 5.78492 1.90014 1.31918 0.60287Z",
    fill: "#FAFBFB"
  }))));
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
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    d: "M2.80365 18.6442C2.9793 18.6757 3.15732 18.7003 3.33691 18.7178C3.55516 18.7391 3.77647 18.75 4 18.75C5.3153 18.75 6.54447 18.3731 7.58317 17.7213C8.3569 17.9034 9.16679 18 10 18C15.322 18 19.75 14.0307 19.75 9C19.75 3.96934 15.322 0 10 0C4.67799 0 0.25 3.96934 0.25 9C0.25 11.4086 1.2746 13.5871 2.92371 15.1923C3.15571 15.4182 3.20107 15.6196 3.17822 15.7349C3.05254 16.3685 2.76687 16.9451 2.36357 17.4211C2.19016 17.6258 2.13927 17.9075 2.23008 18.1599C2.3209 18.4123 2.5396 18.597 2.80365 18.6442ZM6.25 7.875C5.62868 7.875 5.125 8.37868 5.125 9C5.125 9.62132 5.62868 10.125 6.25 10.125C6.87132 10.125 7.375 9.62132 7.375 9C7.375 8.37868 6.87132 7.875 6.25 7.875ZM8.875 9C8.875 8.37868 9.37868 7.875 10 7.875C10.6213 7.875 11.125 8.37868 11.125 9C11.125 9.62132 10.6213 10.125 10 10.125C9.37868 10.125 8.875 9.62132 8.875 9ZM13.75 7.875C13.1287 7.875 12.625 8.37868 12.625 9C12.625 9.62132 13.1287 10.125 13.75 10.125C14.3713 10.125 14.875 9.62132 14.875 9C14.875 8.37868 14.3713 7.875 13.75 7.875Z",
    fill: "#FAFBFB"
  }));
};
let sendStyleMain = "inline-flex items-center rounded-full border border-transparent bg-[#4E75F6] px-5 py-2 text-base font-medium text-white shadow-sm hover:bg-[#3E67F0] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer";
let enabledInput = "block w-full resize-none border-0 pb-3 focus:ring-0 text-base placeholder-[#A9AFB7] bg-[#F1F2F3] mr-2";

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

let orbis = new Orbis({
  useLit: false
});
let magic$2;
let web3$2;
if (typeof window !== "undefined") {
  magic$2 = new Magic('pk_live_2E6B3B065093108E', {
    network: 'mainnet',
    extensions: [new ConnectExtension()]
  });
  web3$2 = new Web3(magic$2.rpcProvider);
}
function OrbisProvider({
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
      magic: magic$2,
      context,
      theme
    }
  }, children);
}

function useOrbis() {
  const {
    orbis,
    user,
    setUser,
    theme
  } = useContext(GlobalContext);
  return {
    orbis,
    user,
    setUser,
    theme
  };
}

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

export { Article, Button, Comments, ConnectButton, Inbox, OrbisProvider, User, UserPfp, Username, darkTheme, defaultTheme, useOrbis };
//# sourceMappingURL=index.modern.js.map
