import React, { useState, useEffect, useContext } from "react";

import { defaultTheme } from "../utils/themes";

export const GlobalContext = React.createContext({
  orbis: null,
  user: null,
  magic: null,
  context: null,
  setUser: null,
  theme: defaultTheme
});
