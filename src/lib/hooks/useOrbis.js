import React, { useState, useEffect, useRef, useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";

/** Turns a did:pkh into a clean address and chain object */
export default function useOrbis() {
  const { orbis, user, setUser, credentials, setCredentials, theme, context, accessRules, hasAccess, connecting, magic } = useContext(GlobalContext);
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
    magic
  };
}
