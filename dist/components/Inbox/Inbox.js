import React, { useState, useEffect, useRef, useContext } from "react";
import { Orbis } from "@orbisclub/orbis-sdk";
import Postbox from "../Postbox";
import Post from "../Post";
import User, { UserPfp, Username } from "../User";
import ConnectButton from "../ConnectButton";
import LoadingCircle from "../LoadingCircle";
import { GlobalContext } from "../../contexts/GlobalContext";
import { Logo, EmptyStateComments } from "../../icons";
import { defaultTheme, getThemeValue } from "../../utils/themes";

/** For Magic */
import Web3 from 'web3';
import { Magic } from 'magic-sdk';
import { ConnectExtension } from '@magic-ext/connect';

/** Initialize the Orbis class object */
let _orbis = new Orbis();

/** Initialize Magic */
let magic;
let web3;
if (typeof window !== "undefined") {
  magic = new Magic('pk_live_2E6B3B065093108E', {
    network: 'mainnet',
    extensions: [new ConnectExtension()]
  });
  web3 = new Web3(magic.rpcProvider);
}
;

/*export interface CommentsProps {
  label: string;
}*/

/** Global inbox component */
const Inbox = ({
  orbis = _orbis,
  context,
  theme
}) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [conversationSelected, setConversationSelected] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  /** Load posts on load */
  useEffect(() => {
    if (user) {
      loadConversations();
    }
  }, [context, user]);

  /** Retrieve conversations from Orbis for this context */
  async function loadConversations() {
    setLoading(true);
    let {
      data,
      error
    } = await orbis.getConversations({
      did: user.did,
      context: context
    }, 0);
    console.log("data", data);
    setConversations(data);
    setLoading(false);
  }
  return /*#__PURE__*/React.createElement(GlobalContext.Provider, {
    value: {
      user,
      setUser,
      orbis,
      magic,
      context,
      theme,
      conversationSelected,
      setConversationSelected,
      isExpanded,
      setIsExpanded
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "orbis orbis-inbox absolute bottom-0 right-20 rounded-none rounded-t-lg w-[335px] shadow-sm overflow-hidden max-h-[77%] flex flex-col",
    style: {
      height: isExpanded ? "500px" : "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex bg-[#4E75F6] text-base font-medium text-white hover:bg-[#3E67F0] flex-row items-center"
  }, /*#__PURE__*/React.createElement(HeaderInbox, null)), isExpanded && /*#__PURE__*/React.createElement("div", {
    className: "bg-white flex flex-1 flex-col w-full overflow-scroll"
  }, user ? /*#__PURE__*/React.createElement(React.Fragment, null, conversationSelected ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col-reverse flex-1 w-full p-3 overflow-scroll"
  }, /*#__PURE__*/React.createElement(Messages, null)), /*#__PURE__*/React.createElement("div", {
    className: "flex w-full border-gray-100 border-t bg-white px-3 py-3 flex-row"
  }, /*#__PURE__*/React.createElement(MessageBox, null))) : /*#__PURE__*/React.createElement("ul", {
    role: "list",
    className: "divide-y divide-gray-200 w-full px-3"
  }, /*#__PURE__*/React.createElement(LoopConversations, {
    conversations: conversations
  }))) : /*#__PURE__*/React.createElement("div", {
    className: "p-12 w-full"
  }, /*#__PURE__*/React.createElement(ConnectButton, {
    lit: true
  })))));
};

/** Header content for the inbox */
function HeaderInbox() {
  const {
    conversationSelected,
    isExpanded,
    setIsExpanded
  } = useContext(GlobalContext);
  if (conversationSelected) {
    return /*#__PURE__*/React.createElement("div", {
      className: "flex flex-row items-center px-5 py-2"
    }, /*#__PURE__*/React.createElement(Participants, {
      conversation: conversationSelected
    }));
  } else {
    return /*#__PURE__*/React.createElement("div", {
      className: "cursor-pointer flex flex-row items-center px-5 py-4",
      onClick: () => setIsExpanded(!isExpanded)
    }, /*#__PURE__*/React.createElement(DmIcon, null), /*#__PURE__*/React.createElement("p", null, "Direct Messages"));
  }
}

/** Loop through all conversations for this user in this context and display them */
function LoopConversations({
  conversations
}) {
  return conversations.map((conversation, key) => {
    return /*#__PURE__*/React.createElement(Conversation, {
      conversation: conversation,
      key: key
    });
  });
}

/** Render a conversation line */
function Conversation({
  conversation
}) {
  const {
    user,
    setConversationSelected
  } = useContext(GlobalContext);
  return /*#__PURE__*/React.createElement("li", {
    className: "py-4 items-center hover:bg-gray-50 cursor-pointer",
    onClick: () => setConversationSelected(conversation)
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mr-3 w-[43px]"
  }, conversation.recipients.length > 2 ? /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement(RecipientsPfp, {
    conversation: conversation
  })) : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(UserPfp, {
    details: conversation.recipients_details[0].did == user.did ? conversation.recipients_details[1] : conversation.recipients_details[0]
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 space-y-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-1 text-base font-medium text-gray-900 flex flex-row"
  }, conversation.recipients.length > 2 ? /*#__PURE__*/React.createElement("h3", {
    className: "flex flex-row"
  }, /*#__PURE__*/React.createElement(Username, {
    details: conversation.recipients_details[0].did == user.did ? conversation.recipients_details[1] : conversation.recipients_details[0]
  }), /*#__PURE__*/React.createElement("span", {
    className: "ml-1 text-gray-500 font-normal"
  }, "and ", /*#__PURE__*/React.createElement("span", {
    className: "text-gray-900 font-medium"
  }, conversation.recipients.length - 1, " others"))) : /*#__PURE__*/React.createElement("h3", null, /*#__PURE__*/React.createElement(Username, {
    details: conversation.recipients_details[0].did == user.did ? conversation.recipients_details[1] : conversation.recipients_details[0]
  }))), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-500"
  }, "1h")))));
}

/** Clean display of a participants in a conversation */
function Participants({
  conversation
}) {
  const {
    user,
    setConversationSelected
  } = useContext(GlobalContext);
  return /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mr-3 cursor-pointer",
    onClick: () => setConversationSelected(null)
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "16",
    viewBox: "0 0 20 18",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    d: "M9.03033 0.96967C9.32322 1.26256 9.32322 1.73744 9.03033 2.03033L2.81066 8.25H19C19.4142 8.25 19.75 8.58579 19.75 9C19.75 9.41421 19.4142 9.75 19 9.75H2.81066L9.03033 15.9697C9.32322 16.2626 9.32322 16.7374 9.03033 17.0303C8.73744 17.3232 8.26256 17.3232 7.96967 17.0303L0.46967 9.53033C0.176777 9.23744 0.176777 8.76256 0.46967 8.46967L7.96967 0.96967C8.26256 0.676777 8.73744 0.676777 9.03033 0.96967Z",
    fill: "#FAFBFB"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "mr-3 w-[38px]"
  }, conversation.recipients.length > 2 ? /*#__PURE__*/React.createElement("div", {
    className: "relative",
    style: {
      paddingTop: 11
    }
  }, /*#__PURE__*/React.createElement(RecipientsPfp, {
    conversation: conversation,
    height: 25
  })) : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(UserPfp, {
    details: conversation.recipients_details[0].did == user.did ? conversation.recipients_details[1] : conversation.recipients_details[0],
    height: 38
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 space-y-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-1 text-base font-medium text-white flex flex-row"
  }, conversation.recipients.length > 2 ? /*#__PURE__*/React.createElement("h3", {
    className: "flex flex-row"
  }, /*#__PURE__*/React.createElement(Username, {
    details: conversation.recipients_details[0].did == user.did ? conversation.recipients_details[1] : conversation.recipients_details[0]
  }), /*#__PURE__*/React.createElement("span", {
    className: "ml-1 text-gray-500 font-normal"
  }, "and ", /*#__PURE__*/React.createElement("span", {
    className: "text-gray-900 font-medium"
  }, conversation.recipients.length - 1, " others"))) : /*#__PURE__*/React.createElement("h3", null, /*#__PURE__*/React.createElement(Username, {
    details: conversation.recipients_details[0].did == user.did ? conversation.recipients_details[1] : conversation.recipients_details[0]
  }))))));
}

/** Loop through recipients to display them */
const RecipientsPfp = ({
  conversation,
  height = 28
}) => {
  const {
    user
  } = useContext(GlobalContext);
  let i = 0;
  return conversation.recipients_details.map((recipient, key) => {
    if (recipient.did != user.did && i < 2) {
      i++;
      if (i == 1) {
        return /*#__PURE__*/React.createElement("div", {
          className: "flex rounded-full "
        }, /*#__PURE__*/React.createElement(UserPfp, {
          height: height,
          details: recipient,
          key: key
        }));
      } else {
        return /*#__PURE__*/React.createElement("div", {
          className: "rounded-full border-2 border-white",
          style: {
            position: "absolute",
            left: 13,
            top: -13,
            width: height + 4
          }
        }, /*#__PURE__*/React.createElement(UserPfp, {
          height: height,
          details: recipient,
          key: key
        }));
      }
    } else {
      return null;
    }
  });
};

/** Load all messages in a conversation and decrypt them */
function Messages() {
  const {
    user,
    orbis,
    conversationSelected
  } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  /** Load posts on load */
  useEffect(() => {
    if (user) {
      loadMessages();
    }
  }, [user, conversationSelected]);

  /** Retrieve conversations from Orbis for this context */
  async function loadMessages() {
    setLoading(true);
    let {
      data,
      error
    } = await orbis.getMessages(conversationSelected.stream_id);
    console.log("data", data);
    setMessages(data);
    setLoading(false);
  }

  /** Show loading state */
  if (loading) {
    return /*#__PURE__*/React.createElement("div", {
      className: "w-full justify-center flex py-8"
    }, /*#__PURE__*/React.createElement(LoadingCircle, {
      color: "text-gray-900"
    }));
  }

  /** List messages */
  return messages.map((message, key) => {
    return /*#__PURE__*/React.createElement(Message, {
      message: message,
      key: key
    });
  });
}

/** Display the details of a message */
function Message({
  message
}) {
  const [body, setBody] = useState();
  const {
    user,
    orbis
  } = useContext(GlobalContext);
  useEffect(() => {
    console.log("In <Message />: ", message);
    let active = true;
    decrypt();
    return () => {
      active = false;
    };
    async function decrypt() {
      /**
       * If body passed as a parameter use it immediately without decrypting the content
       * (that's the case when the message was just sent by the user and added to the conversation as a callback)
       */
      if (message.content?.body) {
        /** Save in state */
        setBody(message.content.body);
      }

      /** Otherwise we decrypt the content using Lit Protocol and return the result. */else if (message.content?.encryptedMessage?.encryptedString != {}) {
        let res = await orbis.decryptMessage(message.content);

        /** Save in state */
        setBody(res.result);
      } else {
        return null;
      }
      if (!active) {
        return;
      }
    }
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: user.did == message.creator ? "flex w-full pb-2 text-base justify-end" : "flex w-full pb-2 text-base"
  }, /*#__PURE__*/React.createElement("div", {
    className: user.did == message.creator ? "bg-[#25A4FF] rounded-lg px-4 py-2" : "bg-gray-100 rounded-lg px-4 py-2",
    style: {
      minWidth: "70%",
      maxWidth: "80%"
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: user.did == message.creator ? "text-white" : "text-gray-900"
  }, body ? body : /*#__PURE__*/React.createElement(LoadingCircle, null))));
}

/** Box to send a private message */
function MessageBox() {
  const {
    theme
  } = useContext(GlobalContext);
  return /*#__PURE__*/React.createElement("div", {
    className: "w-full flex flex-row"
  }, /*#__PURE__*/React.createElement("textarea", {
    autofocus: true,
    rows: 1,
    name: "body",
    id: "body",
    className: enabledInput,
    style: {
      fontSize: 15,
      borderRadius: 15,
      color: getThemeValue("input", theme, false).color
    },
    placeholder: "Your message...",
    disabled: false
  }), /*#__PURE__*/React.createElement("button", {
    className: sendStyleMain
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1.31918 0.60287C1.14269 0.5516 0.952295 0.601289 0.823367 0.732269C0.694438 0.863249 0.647761 1.0544 0.70181 1.23006L2.32333 6.5H8.00049C8.27663 6.5 8.50049 6.72386 8.50049 7C8.50049 7.27614 8.27663 7.5 8.00049 7.5H2.32334L0.701871 12.7698C0.647821 12.9454 0.6945 13.1366 0.82343 13.2676C0.95236 13.3985 1.14275 13.4482 1.31925 13.397C5.78498 12.0996 9.93211 10.0543 13.616 7.40581C13.7467 7.31187 13.8241 7.16077 13.8241 6.99984C13.8241 6.8389 13.7467 6.6878 13.616 6.59386C9.93207 3.94544 5.78492 1.90014 1.31918 0.60287Z",
    fill: "#FAFBFB"
  }))));
}
const DmIcon = () => {
  return /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "19",
    className: "mr-3",
    viewBox: "0 0 20 19",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    d: "M2.80365 18.6442C2.9793 18.6757 3.15732 18.7003 3.33691 18.7178C3.55516 18.7391 3.77647 18.75 4 18.75C5.3153 18.75 6.54447 18.3731 7.58317 17.7213C8.3569 17.9034 9.16679 18 10 18C15.322 18 19.75 14.0307 19.75 9C19.75 3.96934 15.322 0 10 0C4.67799 0 0.25 3.96934 0.25 9C0.25 11.4086 1.2746 13.5871 2.92371 15.1923C3.15571 15.4182 3.20107 15.6196 3.17822 15.7349C3.05254 16.3685 2.76687 16.9451 2.36357 17.4211C2.19016 17.6258 2.13927 17.9075 2.23008 18.1599C2.3209 18.4123 2.5396 18.597 2.80365 18.6442ZM6.25 7.875C5.62868 7.875 5.125 8.37868 5.125 9C5.125 9.62132 5.62868 10.125 6.25 10.125C6.87132 10.125 7.375 9.62132 7.375 9C7.375 8.37868 6.87132 7.875 6.25 7.875ZM8.875 9C8.875 8.37868 9.37868 7.875 10 7.875C10.6213 7.875 11.125 8.37868 11.125 9C11.125 9.62132 10.6213 10.125 10 10.125C9.37868 10.125 8.875 9.62132 8.875 9ZM13.75 7.875C13.1287 7.875 12.625 8.37868 12.625 9C12.625 9.62132 13.1287 10.125 13.75 10.125C14.3713 10.125 14.875 9.62132 14.875 9C14.875 8.37868 14.3713 7.875 13.75 7.875Z",
    fill: "#FAFBFB"
  }));
};

/** Styles for inputs */
let sendStyleMain = "inline-flex items-center rounded-full border border-transparent bg-[#4E75F6] px-5 py-2 text-base font-medium text-white shadow-sm hover:bg-[#3E67F0] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer";
let enabledInput = "block w-full resize-none border-0 pb-3 focus:ring-0 text-base placeholder-[#A9AFB7] bg-[#F1F2F3] mr-2";
let disabledInput = "block w-full resize-none border-0 pb-3 text-base bg-transparent";
export default Inbox;