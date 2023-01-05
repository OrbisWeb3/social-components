import React, { useState, useEffect, useContext } from "react";
export const GlobalContext = /*#__PURE__*/React.createContext({
  orbis: null,
  user: null,
  setUser: null,
  theme: null
});