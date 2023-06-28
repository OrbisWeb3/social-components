import React, { useState, useEffect, useRef, useContext } from "react";
import Postbox from "../Postbox";
import Post from "../Post";
import User from "../User";
import LoadingCircle from "../LoadingCircle";
import { CommentsContext } from "../../contexts/CommentsContext";
import OrbisProvider from "../OrbisProvider";
import useOrbis from "../../hooks/useOrbis";
import { Logo, EmptyStateComments, NotificationIcon } from "../../icons";
import { defaultTheme, getThemeValue } from "../../utils/themes"

/** Import CSS */
import styles from './Comments.module.css';

export default function Comments({context, theme = defaultTheme, options, characterLimit = null, master = null}) {
  return(
    <OrbisProvider context={context} theme={theme} options={options} >
      <CommentsContent characterLimit={characterLimit} master={master} />
    </OrbisProvider>
  )
}

/*export interface CommentsProps {
  label: string;
}*/

const CommentsContent = ({characterLimit, master}) => {
  const { user, setUser, orbis, theme, context, accessRules, setAuthorizationsModalVis } = useOrbis();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sharing, setSharing] = useState(false);

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
    console.log("queryParams:", queryParams);
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
      <div className={styles.commentsGlobalContainer} style={{background: getThemeValue("bg", theme, "main"), borderColor: getThemeValue("border", theme, "main") }}>
        <div style={{padding: "1rem"}}>
          <Postbox context={context} master={master} />
        </div>

        {/** Alert banner if user hasn't setup notifications authorizations for this context
        {user &&
          <div className={styles.notificationsBanner} style={{ borderColor: getThemeValue("border", theme, "main"), borderBottomWidth: 0, background: getThemeValue("button", theme, "main").background, color: getThemeValue("button", theme, "main").color, ...getThemeValue("font", theme, "main")}} onClick={() => setAuthorizationsModalVis(true)}>
            <div className={styles.notificationsBannerText}><NotificationIcon style={{marginRight: 8}} /> Setup your notifications authorizations for this app.</div>
          </div>
        }*/}

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
                <LoopComments comments={comments} characterLimit={characterLimit} master={master} />
              }
            </>
          }
        </div>

        {/** Footer */}
        <div className={styles.footerContainer}>
          <a href="https://useorbis.com?utm_source=comments_module" rel="noreferrer" target="_blank" className={styles.footerOpenSocialContainer}>
            <span style={{color: getThemeValue("color", theme, "secondary"), ...getThemeValue("font", theme, "main"), fontWeight: 400, marginRight: 5, fontSize: 15}}>Open Social with</span>
            <Logo className="flex" color={getThemeValue("color", theme, "main")} />
          </a>
        </div>
      </div>
    </CommentsContext.Provider>
  );
};

/** Loop through all posts and display them one by one */
function LoopComments({comments, characterLimit, master}) {
  return comments.map((comment, key) => {
    if((comment.content.reply_to == master) || ((!comment.content.reply_to || comment.content.reply_to == "") && (!comment.content.master || comment.content.master == ""))) {
      return(
        <Comment comments={comments} comment={comment} master={comment.content.master} characterLimit={characterLimit} key={comment.stream_id} />
      )
    } else {
      return null
    }
  });
}

/** One comment component is also looping through the other replies to see if it has any internal replies */
function Comment({comments, comment, master, characterLimit, z}) {
  const { theme } = useOrbis();

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
    <div style={{position: "relative"}}>
      {/** Display grey line only for reply */}
      {comment.content.reply_to != null &&
        <span className={styles.greyLine} style={{top: 60, bottom: 20, left: 22, width: 1, backgroundColor: theme?.border?.main ? theme.border.main : defaultTheme.border.main}} aria-hidden="true"></span>
      }
      <Post post={comment} characterLimit={characterLimit} />
      <div style={{marginLeft: "2.5rem", marginTop: "1.75rem"}}>
        <LoopInternalReplies />
      </div>
    </div>
  )
}
