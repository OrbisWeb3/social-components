import React, { useState, useEffect, useRef, useContext } from "react";
import Postbox from "../Postbox";
import Post from "../Post";
import User from "../User";
import LoadingCircle from "../LoadingCircle";
import { GlobalContext } from "../../contexts/GlobalContext";
import { CommentsContext } from "../../contexts/CommentsContext";
import OrbisProvider from "../OrbisProvider";
import useOrbis from "../../hooks/useOrbis";
import { Logo, EmptyStateComments, NotificationIcon } from "../../icons";
import { defaultTheme, getThemeValue } from "../../utils/themes"

/** Import CSS */
import styles from './Chat.module.css';

export default function Chat({context, theme = defaultTheme, options, characterLimit = null, master = null}) {
  const { orbis } = useOrbis();
  /** Will finalize later, the goal is to have the context not be part of the OrbisProvider to be able to use it independently in the modules
  if(orbis) {
    return(
      <ChatContent characterLimit={characterLimit} master={master} />
    )
  } else {
    return(
      <OrbisProvider context={context} theme={theme} options={options} >
        <ChatContent characterLimit={characterLimit} master={master} />
      </OrbisProvider>
    )
  }*/
  return(
    <OrbisProvider context={context} theme={theme} options={options} >
      <ChatContent characterLimit={characterLimit} master={master} />
    </OrbisProvider>
  )
}

/*export interface CommentsProps {
  label: string;
}*/

const ChatContent = ({characterLimit, master}) => {
  const { user, setUser, orbis, theme, context, accessRules, setAuthorizationsModalVis } = useOrbis();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [reply, setReply] = useState(null);

  /** Load posts on load */
  useEffect(() => {
    loadPosts();
  }, [context])

  /** Retrieve posts from Orbis for this context */
  async function loadPosts() {
    setLoading(true);
    let queryParams;
    if(master) {
      queryParams = {master: master};
    } else {
      queryParams = {context: context};
    }
    let { data, error } = await orbis.getPosts(queryParams, 0);

    /** Store last message timestamp in localStorage to check if user has unread message */
    if(localStorage && data && data.length > 0) {
      localStorage.setItem(context + "-last-read", data[0].timestamp)
    }

    /** Save in state */
    setComments(data);
    setLoading(false);
  }

  return(
    <CommentsContext.Provider value={{ comments, setComments }}>
      <div className={styles.commentsGlobalContainer} style={{background: getThemeValue("bg", theme, "main"), borderColor: getThemeValue("border", theme, "main")}}>
        {/** Show loading state or list of comments */}
        <div className={styles.commentsContainer} style={{ borderColor: getThemeValue("border", theme, "secondary")}}>
          {loading ?
            <div className={styles.loadingContainer} style={{ color: getThemeValue("color", theme, "main") }}>
              <LoadingCircle />
            </div>
          :
            <>
              {comments.length <= 0 ?
                <div className={styles.commentsEmptyStateContainer}>
                  <p style={{ color: getThemeValue("color", theme, "secondary"), fontSize: 15, marginTop: "0.5rem", marginBottom: "0.5rem" }}>Be the first to leave a comment here.</p>
                  <EmptyStateComments />
                </div>
              :
                <LoopComments comments={comments} characterLimit={characterLimit} master={master} reply={reply} setReply={setReply} />
              }
            </>
          }
        </div>

        {/** Postbox container */}
        <div className={styles.postboxContainer}>
          <Postbox reply={reply} context={context} ctaTitle={null} minInputHeight={20} master={master} placeholder="Share your message..." ascending={false} />
        </div>
      </div>
    </CommentsContext.Provider>
  );
};

/** Loop through all posts and display them one by one */
function LoopComments({comments, characterLimit, master, reply, setReply}) {
  return comments.map((comment, key) => {
    return(
      <Post post={comment} showReplyTo={true} characterLimit={characterLimit} key={comment.stream_id} defaultReply={reply} setReply={setReply} />
    )
  });
}
