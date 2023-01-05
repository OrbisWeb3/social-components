import React, { useState, useEffect, useRef, useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";

/** Turns a did:pkh into a clean address and chain object */
export default function useOrbis() {
  const { orbis, user, setUser, theme } = useContext(GlobalContext);
  return { orbis, user, setUser, theme };
}
