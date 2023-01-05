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
    }
  }
}
