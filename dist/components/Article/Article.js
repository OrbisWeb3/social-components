import React, { useState, useEffect, useRef, useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import User, { UserPfp, Username, UserPopup, UserBadge } from "../User";
import Postbox from "../Postbox";
import LoadingCircle from "../LoadingCircle";
import useHover from "../../hooks/useHover";
import useOutsideClick from "../../hooks/useOutsideClick";
import ReactTimeAgo from 'react-time-ago';
import { cleanBody } from "../../utils";
import { defaultTheme } from "../../utils/themes";
import { MenuHorizontal } from "../../icons";

/** For Markdown support */
import { marked } from 'marked';

/** Display the article details */
export default function Article({
  post,
  characterLimit = null
}) {
  const {
    orbis,
    user,
    theme
  } = useContext(GlobalContext);
  const [editPost, setEditPost] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [reply, setReply] = useState();
  const [userReaction, setUserReaction] = useState();
  const [postMenuVis, setPostMenuVis] = useState(false);
  const [hoverRef, isHovered] = useHover();
  useEffect(() => {
    if (user && post) {
      getUserReaction();
    }
  }, [user, post]);

  /** If user is connected we check if it has reacted to this post */
  async function getUserReaction() {
    let {
      data,
      error
    } = await orbis.getReaction(post.stream_id, user.did);
    if (data) {
      setUserReaction(data.type);
    }
  }

  /** To like a post */
  async function like(type) {
    if (!user) {
      alert("You must be connected to react to articles.");
      return;
    }

    /** Anticipate success and update UI */
    setUserReaction(type);

    /** React to the post using the SDK */
    let res = await orbis.react(post.stream_id, type);

    /** Check results */
    switch (res.status) {
      case 300:
        console.log("Error reacting to the post:", res);
        break;
    }
  }

  /** Unselect reply when new post is shared */
  function callbackShared() {
    setReply(false);
  }

  /** If the post has been deleted from the front-end we hide it in the UI */
  if (isDeleted) {
    return null;
  }
  if (!post) {
    return /*#__PURE__*/React.createElement("div", {
      class: "orbis-article rounded-md bg-blue-50 p-4 mt-8"
    }, /*#__PURE__*/React.createElement("div", {
      class: "flex"
    }, /*#__PURE__*/React.createElement("div", {
      class: "flex-shrink-0"
    }, /*#__PURE__*/React.createElement("svg", {
      class: "h-5 w-5 text-blue-400",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor",
      "aria-hidden": "true"
    }, /*#__PURE__*/React.createElement("path", {
      "fill-rule": "evenodd",
      d: "M19 10.5a8.5 8.5 0 11-17 0 8.5 8.5 0 0117 0zM8.25 9.75A.75.75 0 019 9h.253a1.75 1.75 0 011.709 2.13l-.46 2.066a.25.25 0 00.245.304H11a.75.75 0 010 1.5h-.253a1.75 1.75 0 01-1.709-2.13l.46-2.066a.25.25 0 00-.245-.304H9a.75.75 0 01-.75-.75zM10 7a1 1 0 100-2 1 1 0 000 2z",
      "clip-rule": "evenodd"
    }))), /*#__PURE__*/React.createElement("div", {
      class: "ml-3 flex-1 md:flex md:justify-between "
    }, /*#__PURE__*/React.createElement("p", {
      class: "text-sm text-blue-700"
    }, "This answer doesn't exist."))));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "orbis-article flex flex-col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex mb-3 w-full"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "block text-center text-3xl font-bold leading-8 tracking-tight sm:text-4xl mt-4 lg:px-4",
    style: {
      color: theme?.color?.main ? theme.color.main : defaultTheme.color.main
    }
  }, post.content.title)), /*#__PURE__*/React.createElement("div", {
    className: "flex border-b border-t mt-6 mb-6 p-4 justify-center items-center",
    style: {
      borderColor: theme?.border?.secondary ? theme.border.secondary : defaultTheme.border.secondary
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex relative",
    style: {
      color: theme?.color?.main ? theme.color.main : defaultTheme.color.main
    },
    ref: hoverRef
  }, /*#__PURE__*/React.createElement(User, {
    details: post.creator_details
  }), isHovered && /*#__PURE__*/React.createElement(UserPopup, {
    details: post.creator_details
  })), /*#__PURE__*/React.createElement("span", {
    className: "flex font-normal text-xs ml-3 mr-3",
    style: {
      color: theme?.color?.secondary ? theme.color.secondary : defaultTheme.color.secondary
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("span", {
    className: "flex justify-self-end align-center flex mr-2",
    style: {
      color: theme?.color?.secondary ? theme.color.secondary : defaultTheme.color.secondary
    }
  }, /*#__PURE__*/React.createElement(ReactTimeAgo, {
    className: "flex font-normal text-base mr-2",
    date: post.timestamp * 1000,
    locale: "en-US"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "relative pb-4 mt-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative flex items-start space-x-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "min-w-0 flex-col flex-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-lg break-words prose prose-md flex flex-col",
    style: {
      color: theme?.color?.main ? theme.color.main : defaultTheme.color.main
    },
    dangerouslySetInnerHTML: {
      __html: marked.parse(post.content.body)
    }
  }), post.indexing_metadata?.urlMetadata && post.creator_details?.a_r > 15 && /*#__PURE__*/React.createElement(LinkCard, {
    metadata: post.indexing_metadata.urlMetadata
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row mt-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "inline-flex flex-row ml-3 items-center"
  }, userReaction == "like" ? /*#__PURE__*/React.createElement("button", {
    className: "inline-flex items-center rounded-md border border-transparent bg-transaprent px-1 py-1 font-normal text-sm font-medium hover:bg-gray-50 focus:outline-none text-[#4E75F6]",
    onClick: () => like(null)
  }, /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 16 15",
    fill: "currentColor",
    xmlns: "http://www.w3.org/2000/svg",
    className: "mr-1"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7.65298 13.9149L7.6476 13.9121L7.62912 13.9024C7.61341 13.8941 7.59102 13.8822 7.56238 13.8667C7.50511 13.8358 7.42281 13.7907 7.31906 13.732C7.11164 13.6146 6.81794 13.4425 6.46663 13.2206C5.76556 12.7777 4.82731 12.1314 3.88539 11.3197C2.04447 9.73318 0 7.35227 0 4.5C0 2.01472 2.01472 0 4.5 0C5.9144 0 7.17542 0.652377 8 1.67158C8.82458 0.652377 10.0856 0 11.5 0C13.9853 0 16 2.01472 16 4.5C16 7.35227 13.9555 9.73318 12.1146 11.3197C11.1727 12.1314 10.2344 12.7777 9.53337 13.2206C9.18206 13.4425 8.88836 13.6146 8.68094 13.732C8.57719 13.7907 8.49489 13.8358 8.43762 13.8667C8.40898 13.8822 8.38659 13.8941 8.37088 13.9024L8.3524 13.9121L8.34702 13.9149L8.34531 13.9158C8.13 14.03 7.87 14.03 7.65529 13.9161L7.65298 13.9149Z"
  })), "Like") : /*#__PURE__*/React.createElement("button", {
    className: "inline-flex items-center rounded-md border border-transparent bg-transaprent px-1 py-1 font-normal text-sm font-medium hover:bg-gray-50 focus:outline-nonecursor-pointer",
    style: {
      color: theme?.color?.secondary ? theme.color.secondary : defaultTheme.color.secondary
    },
    onClick: () => like("like")
  }, /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: "mr-1"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M13.875 4.84375C13.875 3.08334 12.3884 1.65625 10.5547 1.65625C9.18362 1.65625 8.00666 2.45403 7.5 3.59242C6.99334 2.45403 5.81638 1.65625 4.44531 1.65625C2.61155 1.65625 1.125 3.08334 1.125 4.84375C1.125 9.95831 7.5 13.3438 7.5 13.3438C7.5 13.3438 13.875 9.95831 13.875 4.84375Z",
    stroke: "#798496",
    "stroke-width": "1.5",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  })), "Like"), (userReaction == "like" || post.count_likes > 0) && /*#__PURE__*/React.createElement("div", {
    className: "flex font-normal text-sm ",
    style: {
      color: theme?.color?.secondary ? theme.color.secondary : defaultTheme.color.secondary
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mr-1"
  }, "\xB7"), /*#__PURE__*/React.createElement("span", null, userReaction == "like" ? post.count_likes + 1 : post.count_likes))))))));
}

/** Card to display's url metadata */
const LinkCard = ({
  metadata
}) => {
  const {
    theme
  } = useContext(GlobalContext);
  return /*#__PURE__*/React.createElement("div", {
    className: "max-w-[480px] shadow-lg hover:shadow-xl cursor-pointer rounded-lg border overflow-hidden mt-2",
    style: {
      background: theme?.bg?.secondary ? theme.bg.secondary : defaultTheme.bg.secondary,
      borderColor: theme?.border?.main ? theme.border.main : defaultTheme.border.main
    }
  }, /*#__PURE__*/React.createElement("div", {
    class: ""
  }, metadata.image && /*#__PURE__*/React.createElement("a", {
    href: metadata.url,
    target: "_blank",
    rel: "noreferrer"
  }, /*#__PURE__*/React.createElement("div", {
    class: "aspect-w-4 aspect-h-2 link-card-image object-cover",
    style: {
      backgroundImage: "url(" + metadata.image + ")"
    }
  })), /*#__PURE__*/React.createElement("div", {
    class: "p-3 border-t",
    style: {
      borderColor: theme?.border?.secondary ? theme.border.secondary : defaultTheme.border.secondary
    }
  }, /*#__PURE__*/React.createElement("div", {
    class: "space-y-1 text-lg font-medium leading-6"
  }, metadata.source && /*#__PURE__*/React.createElement("p", {
    class: "text-sm",
    style: {
      color: theme?.color?.active ? theme.color.active : defaultTheme.color.active
    }
  }, metadata.source), /*#__PURE__*/React.createElement("h3", {
    style: {
      color: theme?.color?.main ? theme.color.main : defaultTheme.color.main
    }
  }, metadata.title), metadata.description && /*#__PURE__*/React.createElement("p", {
    class: "text-base font-normal",
    style: {
      color: theme?.color?.secondary ? theme.color.secondary : defaultTheme.color.secondary
    }
  }, metadata.description.length > 155 ? /*#__PURE__*/React.createElement(React.Fragment, null, metadata.description, "...") : /*#__PURE__*/React.createElement(React.Fragment, null, metadata.description))))));
};

/** Menu for a post (visible for owner only) */
const PostMenu = ({
  stream_id,
  setPostMenuVis,
  setEditPost,
  setIsDeleted
}) => {
  const {
    orbis,
    theme
  } = useContext(GlobalContext);
  const [deletingStatus, setDeletingStatus] = useState(0);
  const wrapperRef = useRef(null);

  /** Is triggered when clicked outside the component */
  useOutsideClick(wrapperRef, () => hide());

  /** will trigger the edit post function */
  async function _delete() {
    setDeletingStatus(1);
    let res = await orbis.deletePost(stream_id);
    console.log("res delete:", res);
    setDeletingStatus(2);
  }

  /** Will show the postbox instead of the post to allow the connected user to edit its content */
  function edit() {
    setPostMenuVis(false);
    setEditPost(true);
  }

  /** Hide menu */
  function hide() {
    if (deletingStatus == 2) {
      setIsDeleted(true);
    }
    setPostMenuVis(false);
  }
  function DeleteButton() {
    switch (deletingStatus) {
      case 0:
        return /*#__PURE__*/React.createElement("div", {
          class: "text-red-700 hover:bg-gray-50 flex items-center px-3 py-2 text-sm font-medium rounded-md cursor-pointer",
          onClick: () => _delete(true)
        }, /*#__PURE__*/React.createElement("span", {
          class: "truncate"
        }, "Delete"));

      /** Loading */
      case 1:
        return /*#__PURE__*/React.createElement("div", {
          class: "text-red-700 flex items-center px-3 py-2 text-sm font-medium rounded-md"
        }, /*#__PURE__*/React.createElement(LoadingCircle, {
          color: "text-red-700"
        }), /*#__PURE__*/React.createElement("span", {
          class: "truncate"
        }, "Deleting"));

      /** Success */
      case 2:
        return /*#__PURE__*/React.createElement("div", {
          class: "text-green-700 flex items-center px-3 py-2 text-sm font-medium rounded-md"
        }, /*#__PURE__*/React.createElement("span", {
          class: "truncate mr-2"
        }, "Deleted"));
    }
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "absolute py-4 px-5 z-50 rounded-lg overflow-hidden min-w-[240px] drop-shadow-md border",
    ref: wrapperRef,
    style: {
      right: 10,
      background: theme?.bg?.secondary ? theme.bg.secondary : defaultTheme.bg.secondary,
      borderColor: theme?.border?.main ? theme.border.main : defaultTheme.border.main
    }
  }, /*#__PURE__*/React.createElement("nav", {
    class: "space-y-1",
    "aria-label": "Sidebar"
  }, /*#__PURE__*/React.createElement("div", {
    class: "hover:bg-gray-50 flex items-center px-3 py-2 text-sm font-medium rounded-md cursor-pointer",
    style: {
      color: theme?.color?.main ? theme.color.main : defaultTheme.color.main
    },
    "aria-current": "page",
    onClick: () => edit(true)
  }, /*#__PURE__*/React.createElement("span", {
    class: "truncate"
  }, "Edit")), /*#__PURE__*/React.createElement(DeleteButton, null)));
};
let sendStyleReply = "inline-flex items-center rounded-full border border-transparent bg-[#4E75F6] px-4 py-1 text-sm font-medium text-white shadow-sm hover:bg-[#3E67F0] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer";