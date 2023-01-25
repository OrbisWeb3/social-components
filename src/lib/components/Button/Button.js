import React, { useState, useEffect, useRef, useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { defaultTheme, getThemeValue, getStyle } from "../../utils/themes";

/** Import CSS */
import styles from './Button.module.css';

const Button = ({color, style, children, onClick}) => {
  const { orbis, user, theme } = useContext(GlobalContext);

  /** Select correct style based on the `color` parameter passed
  let btnStyle;
  switch (color) {
    case "primary":
      btnStyle = styles.btnPrimary;
      break;
    case "green":
      btnStyle = styles.btnPrimary;
      break;
  }*/
  return <button className={styles.btnPrimary} style={{...getThemeValue("button", theme, color), ...style}} onClick={onClick ? () => onClick() : null}>{children}</button>;
};

export default Button;
