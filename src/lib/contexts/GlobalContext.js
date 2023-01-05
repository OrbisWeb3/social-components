import React, { useState, useEffect, useContext } from "react";

export const GlobalContext = React.createContext({
  orbis: null,
  user: null,
  setUser: null,
  theme: null
});
