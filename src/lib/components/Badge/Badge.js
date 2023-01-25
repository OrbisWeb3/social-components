import React, { useState, useEffect, useRef, useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { defaultTheme, getThemeValue, getStyle } from "../../utils/themes";
import useHover from "../../hooks/useHover";

/** Import CSS */
import styles from './Badge.module.css';

const Badge = ({color, style, tooltip, children}) => {
  const { orbis, user, theme } = useContext(GlobalContext);
  const [hoverRef, isHovered] = useHover();
  return (
    <div className={styles.badge} ref={hoverRef} style={style}>
      {children}

      {/** Display tooltip if hovered */}
      {isHovered && tooltip &&
        <div className={styles.tooltip}>{tooltip}</div>
      }
    </div>
  );
};

export default Badge;
