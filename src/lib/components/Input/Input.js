import React, { useState, useEffect, useRef, useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { defaultTheme, getThemeValue, getStyle } from "../../utils/themes";

/** Import CSS */
import styles from './Input.module.css';

const Input = ({type, rows = 2, name, color, style, children, placeholder, value, onChange}) => {
  const { orbis, user, theme } = useContext(GlobalContext);

  switch (type) {
    case "text":
      return(
        <input type="text" name={name} placeholder={placeholder} value={value} onChange={onChange} className={styles.input} style={style}>{children}</input>
      );
    case "textarea":
      return(
        <textarea rows={2} name={name} placeholder={placeholder} value={value} onChange={onChange} className={styles.textarea} style={style} />
      );
    default:
      return null;

  }

};

export default Input;
