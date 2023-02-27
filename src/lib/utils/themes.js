/** Pre-defined default / white theme */
export const defaultTheme = {
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
    secondary: "#eaeaea",
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
    }
  }
};

/** Pre-defined dark theme */
export const darkTheme = {
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
    secondary: "#1b182c",
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
    }
  }
};

/** Return style values based on some parameters */
export function getThemeValue(type, theme, data) {
  /** Generate values for styles based on the theme passed as a parameter + default theme value */
  let bgMain = theme?.bg?.main ? theme.bg.main : defaultTheme.bg.main;
  let bgSecondary = theme?.bg?.secondary ? theme.bg.secondary : defaultTheme.bg.secondary;
  let bgTertiary = theme?.bg?.tertiary ? theme.bg.tertiary : defaultTheme.bg.tertiary;
  let colorGreen = theme?.color?.green ? theme.color.green : defaultTheme.color.green;
  let borderMain = theme?.border?.main ? theme.border.main : defaultTheme.border.main;

  /** Special case */
  switch (type) {
    /** Return style for inputs */
    case "input":
      return({
        background: data ? bgTertiary : bgMain,
        color: theme?.color?.main ? theme.color.main : defaultTheme.color.main,
        border: theme?.border?.main ? theme.border.main : defaultTheme.border.main,
      });

    /** Return style for colors */
    case "bg":
      switch (data) {
        case "main":
          return theme?.bg?.main ? theme.bg.main : defaultTheme.bg.main;
        case "secondary":
          return theme?.bg?.secondary ? theme.bg.secondary : defaultTheme.bg.secondary;
        case "tertiary":
          return theme?.bg?.tertiary ? theme.bg.tertiary : defaultTheme.bg.tertiary;
        default:
          return null;
    }

    /** Return style for colors */
    case "color":
      if(theme && theme["color"] && theme["color"][data]) {
        return theme["color"][data];
      } else if(defaultTheme && defaultTheme["color"] && defaultTheme["color"][data]) {
        return defaultTheme["color"][data];
      } else {
        return null;
      }
      break;

    /** Return style for borders */
    case "border":
      switch (data) {
        case "main":
          return theme?.border?.main ? theme.border.main : defaultTheme.border.main;
        case "secondary":
          return theme?.border?.secondary ? theme.border.secondary : defaultTheme.border.secondary;
        default:
          return null;
        }
        break;

    /** Return style for badge */
    case "badges":
      switch (data) {
        case "main":
          return ({
            background: theme?.badges?.main?.bg ? theme.badges.main.bg : defaultTheme.badges.main.bg,
            color: theme?.badges?.main?.color ? theme.badges.main.color : defaultTheme.badges.main.color
          });
        case "red":
          return ({
            background: theme?.badges?.red?.bg ? theme.badges.red.bg : defaultTheme.badges.red.bg,
            color: theme?.badges?.red?.color ? theme.badges.red.color : defaultTheme.badges.red.color
          });
        case "twitter":
          return ({
            background: theme?.badges?.twitter?.bg ? theme.badges.twitter.bg : defaultTheme.badges.twitter.bg,
            color: theme?.badges?.twitter?.color ? theme.badges.twitter.color : defaultTheme.badges.twitter.color
          });
        default:
          return null;
      };
      break;

    /** Return style for button */
    case "button":
      switch (data) {
        case "primary":
          return ({
            background: theme?.button?.main?.bg ? theme.button.main.bg : defaultTheme.button.main.bg,
            color: theme?.button?.main?.color ? theme.button.main.color : defaultTheme.button.main.color
          });
        case "main":
          return ({
            background: theme?.button?.main?.bg ? theme.button.main.bg : defaultTheme.button.main.bg,
            color: theme?.button?.main?.color ? theme.button.main.color : defaultTheme.button.main.color
          });
        case "secondary":
          return ({
            background: theme?.button?.secondary?.bg ? theme.button.secondary.bg : defaultTheme.button.secondary.bg,
            color: theme?.button?.secondary?.color ? theme.button.secondary.color : defaultTheme.button.secondary.color
          });
        case "green":
          return ({
            background: theme?.button?.green?.bg ? theme.button.green.bg : defaultTheme.button.green.bg,
            color: theme?.button?.green?.color ? theme.button.green.color : defaultTheme.button.green.color
          });
        case "green-transparent":
          return ({
            background: "transparent",
            color: theme?.color?.green ? theme.color.green : defaultTheme.color.green
          });
        case "red":
          return ({
            background: theme?.button?.red?.bg ? theme.button.red.bg : defaultTheme.button.red.bg,
            color: theme?.button?.red?.color ? theme.button.red.color : defaultTheme.button.red.color
          });
      };
      break;

    /** Return font style */
    case "font":
      switch (data) {
        case "main":
          return({
            fontFamily: theme?.font?.main?.fontFamily ? theme.font.main.fontFamily : defaultTheme.font.main.fontFamily,
            fontSize: theme?.font?.main?.fontSize ? theme.font.main.fontSize : defaultTheme.font.main.fontSize,
            fontWeight: theme?.font?.main?.fontWeight ? theme.font.main.fontWeight : defaultTheme.font.main.fontWeight
          });
        case "secondary":
          return({
            fontFamily: theme?.font?.secondary?.fontFamily ? theme.font.secondary.fontFamily : defaultTheme.font.secondary.fontFamily,
            fontSize: theme?.font?.secondary?.fontSize ? theme.font.secondary.fontSize : defaultTheme.font.secondary.fontSize
          });
        case "actions":
          return({
            fontFamily: theme?.font?.actions?.fontFamily ? theme.font.actions.fontFamily : defaultTheme.font.actions.fontFamily,
            fontSize: theme?.font?.actions?.fontSize ? theme.font.actions.fontSize : defaultTheme.font.actions.fontSize
          });
        case "buttons":
          return({
            fontFamily: theme?.font?.buttons?.fontFamily ? theme.font.buttons.fontFamily : defaultTheme.font.buttons.fontFamily,
            fontSize: theme?.font?.buttons?.fontSize ? theme.font.buttons.fontSize : defaultTheme.font.buttons.fontSize,
            fontWeight: theme?.font?.buttons?.fontWeight ? theme.font.buttons.fontWeight : defaultTheme.font.buttons.fontWeight
          });
        case "input":
          return({
            fontFamily: theme?.font?.input?.fontFamily ? theme.font.input.fontFamily : defaultTheme.font.input.fontFamily,
            fontSize: theme?.font?.input?.fontSize ? theme.font.input.fontSize : defaultTheme.font.input.fontSize
          });
        case "badges":
          return({
            fontFamily: theme?.font?.badges?.fontFamily ? theme.font.badges.fontFamily : defaultTheme.font.badges.fontFamily,
            fontSize: theme?.font?.badges?.fontSize ? theme.font.badges.fontSize : defaultTheme.font.badges.fontSize,
            fontWeight: theme?.font?.badges?.fontWeight ? theme.font.badges.fontWeight : defaultTheme.font.badges.fontWeight
          });
      }
      break;
  }
}

/** Return the style of a specific element based on the theme */
export function getStyle(type, theme, data) {
  switch (type) {
    case "input":
      return {
        borderColor: getThemeValue("input", theme).border,
        fontSize: 14,
        color: getThemeValue("input", theme, data).color,
        backgroundColor: getThemeValue("input", theme, data).background
      };
    /** Buttons */
    case "button-main":
      return getThemeValue("button", theme, "main");
    case "button-secondary":
      return {
        color: getThemeValue("color", theme, "main"),
      };
    case "button":
      switch (data) {
        case "main":
          return getThemeValue("button", theme, "main");
        case "secondary":
          return {
            color: getThemeValue("color", theme, "main"),
          };
        case "green":
          return {
            color: getThemeValue("color", theme, "main"),
          };
      }
      break;
    case "badge":
      if(theme && theme["badges"] && theme["badges"][data]) {
        return {
          backgroundColor: theme["badges"][data]["bg"],
          color: theme["badges"][data]["color"]
        }
      } else if(defaultTheme && defaultTheme["badges"] && defaultTheme["badges"][data]) {
        return {
          backgroundColor: defaultTheme["badges"][data]["bg"],
          color: defaultTheme["badges"][data]["color"]
        }
      } else {
        return null
      }
      break;
  }
}
