import React, { useState, useEffect, useRef, useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { defaultTheme, getThemeValue, getStyle } from "../../utils/themes";

/** Import CSS */
import styles from './Alert.module.css';

const Alert = ({color, style, tooltip, title}) => {
  const { orbis, user, theme } = useContext(GlobalContext);
  return (
    <div className={styles.emptyState} style={style}>
      <p style={{fontSize: 13}}>{title}</p>
    </div>
  );
};

export default Alert;
