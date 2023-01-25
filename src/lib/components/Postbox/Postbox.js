import React, { useState, useEffect, useRef, useContext } from "react";
import ConnectButton from "../ConnectButton";
import LoadingCircle from "../LoadingCircle";
import Button from "../Button";
import { UserPfp, Username, UserPopup } from "../User";
import { getTimestamp } from "../../utils";
import { defaultTheme, getThemeValue, getStyle } from "../../utils/themes";
import { GlobalContext } from "../../contexts/GlobalContext";
import { Logo } from "../../icons"
import useHover from "../../hooks/useHover";

/** Import CSS */
import styles from './Postbox.module.css';

/** Display postbox or connect CTA */
export default function Postbox({ showPfp = true, connecting, reply = null, callback, rows = "2", defaultPost, setEditPost, ctaTitle = "Comment", ctaStyle = styles.postboxShareContainerBtn, placeholder = "Add your comment..." }) {
  const { orbis, user, context, comments, setComments, theme } = useContext(GlobalContext);
  const [sharing, setSharing] = useState(false);
  const postbox = useRef();
  const [hoverRef, isHovered] = useHover();

  /** If user is editing a post we use the content as the default post */
  useEffect(() => {
    if(defaultPost) {
      if(postbox.current) {
        postbox.current.value = defaultPost.content.body;
      }
    }
  }, [defaultPost])

  /** Will cancel the edit post action using the `setEditPost` function passed as a parameter */
  function cancelEdit() {
    setEditPost(false);
  }

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
    let master = null;
    if(reply && reply.content.master) {
      master = reply.content.master;
    } else if(reply) {
      master = reply.stream_id;
    }
    let _content = {
      body: body,
      context: context,
      master: master,
      reply_to: reply ? reply.stream_id : null
    }

    let res = await orbis.createPost(_content);

    /** Return resuls */
    if(res.status == 200) {
      setComments(
        [
          {
            timestamp: getTimestamp(),
            creator_details: user,
            creator: user.did,
            stream_id: res.doc,
            content: _content,
            count_likes: 0
          },
          ...comments
        ]
      );
      if(postbox.current) {
        postbox.current.value = "";
      }

      if(callback) {
        callback();
      }
    } else {

    }

    setSharing(false);
  }

  if(user) {
    return(
      <div className={styles.postboxGlobalContainer}>
        {/** (Optional) Show user's pfp */}
        {showPfp &&
          <div className={styles.postboxUserContainer} ref={hoverRef}>
            <UserPfp details={user} />
            <UserPopup visible={true} details={user} />
          </div>
        }

        {/** Show Postbox */}
        <div className={styles.postboxContainer}>
          <form style={{width: "100%"}} onSubmit={(event) => handleSubmit(event)}>
            <div className={styles.postbox} style={{ borderColor: getThemeValue("input", theme).border, backgroundColor: getThemeValue("input", theme, sharing).background}}>
              {/** Show reply if any */}
              {reply &&
                <div className={styles.postboxReplyContainer}>
                  <span style={{ marginRight: "0.25rem", color: theme?.color?.secondary ? theme.color.secondary : defaultTheme.color.secondary }}>Replying to:</span>
                  <div className={styles.postboxReplyBadge} style={{background: theme?.badges?.main?.bg ? theme.badges.main.bg : defaultTheme.badges.main.bg, color: theme?.badges?.main?.color ? theme.badges.main.color : defaultTheme.badges.main.color }}><Username details={reply.creator_details} /></div>
                </div>
              }
              <textarea autofocus ref={postbox} rows={rows} name="body" id="body" className={styles.postboxInput} style={{ fontSize: 15, color: getThemeValue("input", theme, sharing).color}} placeholder={placeholder} disabled={sharing}></textarea>
              {/** Submit button container */}
              <div className={styles.postboxShareContainer}>
                {sharing ?
                  <button type="submit" className={ctaStyle} disabled><LoadingCircle /> Sending</button>
                :
                  <>
                  {defaultPost &&
                    <Button color="secondary" style={{marginRight: 5}} onClick={() => setEditPost(false)}>Cancel</Button>
                  }
                  <button type="submit" className={ctaStyle} style={getStyle("button-main", theme, "main")}>
                    {ctaTitle}
                    <SendIcon />
                  </button>
                  </>
                }
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  } else {
    return(
      <div className={styles.postboxConnectContainer}>
        <div style={{width: "60%"}}>
          <ConnectButton orbis={orbis} />
        </div>
      </div>
    );
  }
}

const SendIcon = () => {
  return(
    <svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginLeft: "0.25rem"}}>
      <path d="M1.17363 0.101882C0.997487 0.0769162 0.820681 0.142855 0.7039 0.277068C0.587119 0.411281 0.546253 0.595504 0.595329 0.766509L1.58489 4.21462C1.71408 4.66479 2.1258 4.97498 2.59415 4.97498H6.87496C7.16491 4.97498 7.39996 5.21003 7.39996 5.49998C7.39996 5.78993 7.16491 6.02498 6.87496 6.02498H2.59415C2.1258 6.02498 1.71409 6.33516 1.58489 6.78533L0.595329 10.2335C0.546253 10.4045 0.587119 10.5887 0.7039 10.7229C0.820681 10.8571 0.997487 10.9231 1.17363 10.8981C5.26007 10.3189 8.95462 8.52309 11.8788 5.89013C11.9894 5.79057 12.0525 5.64877 12.0525 5.49999C12.0525 5.3512 11.9894 5.2094 11.8788 5.10984C8.95462 2.47688 5.26007 0.681073 1.17363 0.101882Z" fill="white"/>
    </svg>
  )
}

/** Styles for inputs */
/** Hover for main button CTA: #3E67F0 */
let enabledInput = "focus:outline-none block w-full resize-none border-0 pb-3 focus:ring-0 text-base placeholder-[#A9AFB7] bg-transparent";
let disabledInput = "focus:outline-none block w-full resize-none border-0 pb-3 text-base bg-transparent";
