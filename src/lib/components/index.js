import "../utils/init"
import React, { useState, useEffect, useRef, useContext } from "react";
import { Orbis } from "@orbisclub/orbis-sdk";

//import Comments from "./Comments";
import Button from "./Button";
import User, { UserPfp, Username, UserCredential, UserBadge, UserPopup } from "./User";
import Chat from "./Chat";
import Comments from "./Comments";
import Discussion from "./Comments";
import Post from "./Post";
import Postbox, { MentionsBox, AccessRulesDetails } from "./Postbox";
import AccessRulesModal from "./AccessRulesModal";
import Inbox from "./Inbox";
import ConnectButton from "./ConnectButton";
import Article from "./Article";
import OrbisProvider from "./OrbisProvider";
import useOrbis from "../hooks/useOrbis";
import { defaultTheme, darkTheme } from "../utils/themes";
import { checkContextAccess } from "../utils";

/** Import TimeAgo globally */
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
en.long.minute = {
  current: "this minute",
  future: {one: '{0} min.', other: '{0} min.'},
  past: {one: '{0} min. ago', other: '{0} mins. ago'}
}
TimeAgo.addDefaultLocale(en);

export { TimeAgo, Button, Postbox, MentionsBox, AccessRulesDetails, AccessRulesModal, User, UserPfp, UserBadge, UserPopup, Username, UserCredential, Chat, Comments, Discussion, Post, Inbox, ConnectButton, Article, Orbis, OrbisProvider, useOrbis, defaultTheme, darkTheme, checkContextAccess };
