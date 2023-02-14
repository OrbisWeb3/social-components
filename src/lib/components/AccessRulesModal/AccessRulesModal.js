import React, { useRef, useContext, useState, useEffect } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import LoadingCircle from "../LoadingCircle";
import Modal from "../Modal";
import User, { UserCredential } from "../User";
import { defaultTheme, getThemeValue } from "../../utils/themes";
import useOrbis from "../../hooks/useOrbis";
import { EditIcon } from "../../icons"

/** Import CSS */
import styles from './AccessRulesModal.module.css';

export default function AccessRulesModal({ hide, callbackNftUpdate }) {
  const { user, theme } = useOrbis();
  return(
    <Modal hide={() => hide()} width={500} title="Access Rules" description="This feed is gated with the following rules:">
      <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
        <div className={styles.accessRulesContainer}>
          <LoopAccessRules />
        </div>
      </div>
    </Modal>
  )
}

const LoopAccessRules = () => {
  const { accessRules } = useOrbis();

  return accessRules.map((accessRule, key) => {
    return(
      <OneAccessRule accessRule={accessRule} key={key} />
    )
  });
}

const OneAccessRule = ({accessRule}) => {
  const { theme } = useOrbis();

  /** Show operator */
  if(accessRule.operator) {
    return(
      <div className={styles.operator} style={{color: getThemeValue("color", theme, "secondary")}}>{accessRule.operator}</div>
    )
  }

  /** Show access rules details */
  switch (accessRule.type) {
    case "credential":
      return(
        <div className={styles.accessRuleContainer} style={{borderColor: getThemeValue("border", theme, "main")}}>
          <span style={{ fontSize: 13, color: getThemeValue("color", theme, "secondary"), marginRight: 7}}>Must own:</span>
          <LoopCredentials credentials={accessRule.requiredCredentials} />
        </div>
      );
    case "did":
      return(
        <div className={styles.accessRuleContainer} style={{borderColor: getThemeValue("border", theme, "main")}}>
          <span style={{ fontSize: 13, color: getThemeValue("color", theme, "secondary"), marginRight: 7}}>Must be:</span>
          <LoopUsers users={accessRule.authorizedUsers} />
        </div>
      );
    default:
      return null;
  }
}

const LoopCredentials = ({credentials}) => {
  return credentials.map((credential, key) => {
    return(
      <UserCredential credential={credential} key={key} />
    )
  });
}


const LoopUsers = ({users}) => {
  const { theme } = useOrbis();
  return users.map((_user, key) => {
    return(
      <div style={{color: getThemeValue("color", theme, "main"), fontSize: 15}}>
        <User details={_user.details} key={key} />
      </div>
    )
  });
}
