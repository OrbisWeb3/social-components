/** Pre-defined default / white theme */
export const defaultTheme = {
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
    }
  }
};

/** Pre-defined dark theme */
export const darkTheme = {
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

  switch (type) {
    /** Return style for inputs */
    case "input":
      return({
        background: data ? bgTertiary : "transparent",
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
      switch (data) {
        case "main":
          return theme?.color?.main ? theme.color.main : defaultTheme.color.main;
        case "secondary":
          return theme?.color?.secondary ? theme.color.secondary : defaultTheme.color.secondary;
        case "tertiary":
          return theme?.color?.tertiary ? theme.color.tertiary : defaultTheme.color.tertiary;
        case "quattro":
          return theme?.color?.quattro ? theme.color.quattro : defaultTheme.color.quattro;
        case "green":
          return colorGreen;
        default:
          return null;
    }

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
          return null;
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
  }
}

/** Return the style of a specific element based on the theme */
export function getStyle(type, theme, data) {
  switch (type) {
    case "input":
      return {
        borderColor: getThemeValue("input", theme).border,
        fontSize: 15,
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
      switch (data) {
        case "uniswap":
          return {
            backgroundColor: theme?.badges?.uniswap?.bg ? theme.badges.uniswap.bg : defaultTheme.badges.uniswap.bg,
            color: theme?.badges?.uniswap?.color ? theme.badges.uniswap.color : defaultTheme.badges.uniswap.color
          };
        case "thegraph":
          return {
            backgroundColor: theme?.badges?.thegraph?.bg ? theme.badges.thegraph.bg : defaultTheme.badges.thegraph.bg,
            color: theme?.badges?.thegraph?.color ? theme.badges.thegraph.color : defaultTheme.badges.thegraph.color
          };
        case "sushiswap":
          return {
            backgroundColor: theme?.badges?.sushiswap?.bg ? theme.badges.sushiswap.bg : defaultTheme.badges.sushiswap.bg,
            color: theme?.badges?.susushiswapshi?.color ? theme.badges.sushiswap.color : defaultTheme.badges.sushiswap.color
          };
        case "hop":
          return {
            backgroundColor: theme?.badges?.hop?.bg ? theme.badges.hop.bg : defaultTheme.badges.hop.bg,
            color: theme?.badges?.hop?.color ? theme.badges.hop.color : defaultTheme.badges.hop.color
          };
        case "lido":
          return {
            backgroundColor: theme?.badges?.lido?.bg ? theme.badges.lido.bg : defaultTheme.badges.lido.bg,
            color: theme?.badges?.lido?.color ? theme.badges.lido.color : defaultTheme.badges.lido.color
          };
        case "opensea":
          return {
            backgroundColor: theme?.badges?.opensea?.bg ? theme.badges.opensea.bg : defaultTheme.badges.opensea.bg,
            color: theme?.badges?.opensea?.color ? theme.badges.opensea.color : defaultTheme.badges.opensea.color
          };
        case "snapshot":
          return {
            backgroundColor: theme?.badges?.snapshot?.bg ? theme.badges.snapshot.bg : defaultTheme.badges.snapshot.bg,
            color: theme?.badges?.snapshot?.color ? theme.badges.snapshot.color : defaultTheme.badges.snapshot.color
          };
      }
      break;
    default:
      return null;
  }

}
