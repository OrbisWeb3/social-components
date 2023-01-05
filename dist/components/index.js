import React, { useState, useEffect, useRef, useContext } from "react";
import { Orbis } from "@orbisclub/orbis-sdk";

//import Comments from "./Comments";
import Button from "./Button";
import User, { UserPfp, Username } from "./User";
import Comments from "./Comments";
import Inbox from "./Inbox";
import ConnectButton from "./ConnectButton";
import Article from "./Article";
import OrbisProvider from "./OrbisProvider";
import useOrbis from "../hooks/useOrbis";
import { defaultTheme, darkTheme } from "../utils/themes";
import '../index.css';
import '../tailwind.css';

/** Import TimeAgo globally */
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
en.long.minute = {
  current: "this minute",
  future: {
    one: '{0} min.',
    other: '{0} min.'
  },
  past: {
    one: '{0} min. ago',
    other: '{0} mins. ago'
  }
};
TimeAgo.addDefaultLocale(en);
export { Button, User, UserPfp, Username, Comments, Inbox, ConnectButton, Article, Orbis, OrbisProvider, useOrbis, defaultTheme, darkTheme };