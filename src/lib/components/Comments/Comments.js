import React, { useState, useEffect, useRef, useContext } from "react";
import { Orbis } from "@orbisclub/orbis-sdk";
import Postbox from "../Postbox";
import Post from "../Post";
import User from "../User";
import LoadingCircle from "../LoadingCircle";
import { GlobalContext } from "../../contexts/GlobalContext";
import { Logo, EmptyStateComments } from "../../icons";
import { defaultTheme, getThemeValue } from "../../utils/themes";

/** For Magic */
import Web3 from 'web3';
import { Magic } from 'magic-sdk';
import { ConnectExtension } from '@magic-ext/connect';

/** Initialize the Orbis class object */
let _orbis = new Orbis({
  useLit: false
});

/** Initialize Magic */
let magic;
let web3;
if (typeof window !== "undefined") {
  magic = new Magic('pk_live_2E6B3B065093108E', {
    network: 'mainnet',
    extensions: [new ConnectExtension()]
  });
  web3 = new Web3(magic.rpcProvider);
};

/*export interface CommentsProps {
  label: string;
}*/

const Comments = ({orbis = _orbis, context, theme}) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [user, setUser] = useState();

  /** Load posts on load */
  useEffect(() => {
    loadPosts();
  }, [context])

  /** Share a post on orbis */
  const handleSubmit = async (event) => {
    event.preventDefault();

    if(sharing) {
      console.log("A request is already being processed.");
      return;
    }
    setSharing(true);

    // Get the form data from the event object
    const formData = new FormData(event.target);
    let body = formData.get("body");

    /** Create a post on Orbis */
    let res = await orbis.createPost({body: body, context: context});

    if(res.status == 200) {
      setComments(
        [
          {
            creator_details: user,
            stream_id: res.doc,
            content: {
              body: body,
              context: context
            }
          },
          ...comments
        ]
      );

    } else {

    }

    setSharing(false);
  }

  /** Retrieve posts from Orbis for this context */
  async function loadPosts() {
    setLoading(true);
    let { data, error } = await orbis.getPosts({context: context}, 0);
    console.log("data", data);
    setComments(data);
    setLoading(false);
  }

  return(
    <GlobalContext.Provider value={{ user, setUser, orbis, magic, context, comments, setComments, theme }}>
      <div className="orbis orbis-comments-container shadow rounded-md w-full" style={{background: theme?.bg?.main ? theme.bg.main : defaultTheme.bg.main }}>
        <div className="p-4">
          <Postbox context={context} handleSubmit={handleSubmit} />
        </div>

        {/** Loop comments and display them */}
        <div className="border-t border-b" style={{borderColor: theme?.border?.secondary ? theme.border.secondary : defaultTheme.border.secondary}}>
          {loading ?
            <div className="w-full justify-center flex p-8" style={{ color: getThemeValue("color", theme, "main") }}>
              <LoadingCircle />
            </div>
          :
            <div className="flow-root p-6">
              {comments.length <= 0 ?
                <div className="w-full flex flex-col items-center">
                  <p className="text-base mb-2 mt-2" style={{ color: getThemeValue("color", theme, "secondary") }}>There isn't any comment here yet.</p>
                  <EmptyStateComments />
                </div>
              :
                <div role="list">
                  <LoopComments comments={comments} />
                </div>
              }
            </div>
          }
        </div>

        {/** Footer */}
        <div className="w-full p-6">
          <a href="https://orbis.club?utm_source=comments_module" rel="noreferrer" target="_blank" className="flex-row flex justify-center items-center hover:underline hover:decoration-gray-300 cursor-pointer underline-offset-4">
            <span className="ml-2 flex text-base mr-2 font-normal" style={{color: getThemeValue("color", theme, "secondary")}}>Open Social with</span>
            <Logo className="flex" color={getThemeValue("color", theme, "main")} />
          </a>
        </div>
      </div>
    </GlobalContext.Provider>
  );
};

/** Loop through all posts and display them one by one */
function LoopComments({comments}) {
  return comments.map((comment, key) => {
    if((!comment.content.reply_to || comment.content.reply_to == "") && !comment.content.master || comment.content.master == "") {
      return(
        <Comment comments={comments} comment={comment} master={comment.content.master} key={key} />
      )
    } else {
      return null
    }
  });
}

/** One comment component is also looping through the other replies to see if it has any internal replies */
function Comment({comments, comment, master}) {
  const { theme } = useContext(GlobalContext);

  function LoopInternalReplies() {
    return comments.map((_comment, key) => {
      if(_comment.content.reply_to == comment.stream_id) {
        return(
          <Comment
            comment={_comment}
            master={master}
            comments={comments}
            key={_comment.stream_id} />
        )
      }
    });
  }

  return(
    <div className="relative">
      {/** Display grey line only for reply */}
      {comment.content.reply_to != null &&
        <span className="absolute -ml-px rounded-md" style={{top: 60, bottom: 20, left: 22, width: 1, backgroundColor: theme?.border?.main ? theme.border.main : defaultTheme.border.main}} aria-hidden="true"></span>
      }
      <Post comment={comment} />
      <div className="ml-10">
        <LoopInternalReplies />
      </div>
    </div>
  )
}

export default Comments;
