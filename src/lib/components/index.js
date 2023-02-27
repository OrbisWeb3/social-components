import React, { useState, useEffect, useRef, useContext } from "react";
import { Orbis } from "@orbisclub/orbis-sdk";

//import Comments from "./Comments";
import Button from "./Button";
import User, { UserPfp, Username, UserCredential } from "./User";
import Comments from "./Comments";
import Discussion from "./Comments";
import Post from "./Post";
import Inbox from "./Inbox";
import ConnectButton from "./ConnectButton";
import Article from "./Article";
import OrbisProvider from "./OrbisProvider";
import useOrbis from "../hooks/useOrbis";
import { defaultTheme, darkTheme } from "../utils/themes";

/** Import TimeAgo globally */
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
en.long.minute = {
  current: "this minute",
  future: {one: '{0} min.', other: '{0} min.'},
  past: {one: '{0} min. ago', other: '{0} mins. ago'}
}
TimeAgo.addDefaultLocale(en);

const Fragment = React.Fragment;

export { TimeAgo, Button, User, UserPfp, Username, UserCredential, Comments, Discussion, Post, Inbox, ConnectButton, Article, Orbis, OrbisProvider, useOrbis, defaultTheme, darkTheme };
