import React, { useState, useEffect, useRef, useContext } from "react";
import Postbox from "../Postbox";
import Post from "../Post";
import User from "../User";
import LoadingCircle from "../LoadingCircle";
import { GlobalContext } from "../../contexts/GlobalContext";
import { CommentsContext } from "../../contexts/CommentsContext";
import OrbisProvider from "../OrbisProvider";
import useOrbis from "../../hooks/useOrbis";
import { Logo, EmptyStateComments } from "../../icons";
import { defaultTheme, getThemeValue } from "../../utils/themes"

/** Import CSS */
import styles from './Comments.module.css';

export default function Comments({context, theme = defaultTheme, options, characterLimit = null}) {
  return(
    <OrbisProvider context={context} theme={theme} options={options} >
      <CommentsContent characterLimit={characterLimit} />
    </OrbisProvider>
  )
}

/*export interface CommentsProps {
  label: string;
}*/

const CommentsContent = ({characterLimit}) => {
  const { user, setUser, orbis, theme, context, accessRules } = useOrbis();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sharing, setSharing] = useState(false);

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
    setComments(data);
    setLoading(false);
  }

  return(
    <CommentsContext.Provider value={{ comments, setComments }}>
      <div className={styles.commentsGlobalContainer} style={{background: theme?.bg?.main ? theme.bg.main : defaultTheme.bg.main }}>
        <div style={{padding: "1rem"}}>
          <Postbox context={context} handleSubmit={handleSubmit} />
        </div>

        {/** Loop comments and display them */}
        <div className={styles.commentsContainer} style={{ borderColor: theme?.border?.secondary ? theme.border.secondary : defaultTheme.border.secondary}}>
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
                <LoopComments comments={comments} characterLimit={characterLimit} />
              }
            </>
          }
        </div>

        {/** Footer */}
        <div className={styles.footerContainer}>
          <a href="https://useorbis.com?utm_source=comments_module" rel="noreferrer" target="_blank" className={styles.footerOpenSocialContainer}>
            <span style={{color: getThemeValue("color", theme, "secondary"), marginRight: 5, fontSize: 15}}>Open Social with</span>
            <Logo className="flex" color={getThemeValue("color", theme, "main")} />
          </a>
        </div>
      </div>
    </CommentsContext.Provider>
  );
};

/** Loop through all posts and display them one by one */
function LoopComments({comments, characterLimit}) {
  return comments.map((comment, key) => {
    if((!comment.content.reply_to || comment.content.reply_to == "") && !comment.content.master || comment.content.master == "") {
      return(
        <Comment comments={comments} comment={comment} master={comment.content.master} characterLimit={characterLimit} key={key} />
      )
    } else {
      return null
    }
  });
}

/** One comment component is also looping through the other replies to see if it has any internal replies */
function Comment({comments, comment, master, characterLimit}) {
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
