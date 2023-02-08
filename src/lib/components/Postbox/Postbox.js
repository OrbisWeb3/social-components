import React, { useState, useEffect, useRef, useContext } from "react";
import ConnectButton from "../ConnectButton";
import LoadingCircle from "../LoadingCircle";
import Button from "../Button";
import Input from "../Input";
import Alert from "../Alert";
import User, { UserPfp, Username, UserPopup } from "../User";
import { getTimestamp } from "../../utils";
import { defaultTheme, getThemeValue, getStyle } from "../../utils/themes";
import { GlobalContext } from "../../contexts/GlobalContext";
import { Logo } from "../../icons"
import useHover from "../../hooks/useHover";
import useOrbis from "../../hooks/useOrbis";

/** Import CSS */
import styles from './Postbox.module.css';

/** Init mentions object */
let mentions = [];

/** Display postbox or connect CTA */
export default function Postbox({ showPfp = true, connecting, reply = null, callback, rows = "2", defaultPost, setEditPost, ctaTitle = "Comment", ctaStyle = styles.postboxShareContainerBtn, placeholder = "Add your comment..." }) {
  const { user, setUser, orbis, theme, context } = useOrbis();
  const { comments, setComments } = useContext(GlobalContext);
  const [sharing, setSharing] = useState(false);
  const [hoverRef, isHovered] = useHover();
  const [body, setBody] = useState("");
  const postbox = useRef();

  /** Manage mentions */
  const [mentionsBoxVis, setMentionsBoxVis] = useState(false);
  const [focusOffset, setFocusOffset] = useState(null);
  const [focusNode, setFocusNode] = useState(null);


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
    console.log("Submitting form.");
    event.preventDefault();

    if(sharing) {
      console.log("A request is already being processed.");
      return;
    }
    setSharing(true);

    // Get the form data from the event object
    const formData = new FormData(event.target);
    //let body = formData.get("body");

    /** Create a post on Orbis */
    let master = null;
    if(reply && reply.content.master) {
      master = reply.content.master;
    } else if(reply) {
      master = reply.stream_id;
    }
    let _content = {
      body: body,
      context: context ? context : null,
      master: master,
      reply_to: reply ? reply.stream_id : null,
      mentions: mentions
    }
    console.log("_content to share:", _content);

    let res = await orbis.createPost(_content);
    console.log("res:", res);

    /** Return results */
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

      /** Reset postbox */
      setBody(null);
      mentions = [];
      if(postbox.current) {
        postbox.current.textContent = "";
        //postbox.current.focus();
      }
    } else {
      console.log("Error submitting form:", res);
    }

    setSharing(false);
  }

  /** Track input to use mention box */
  async function handleInput(e) {
    let inputValue = e.currentTarget.innerText;
    let keyCode = e.nativeEvent.data;

    /** Manage custom actions for some keycodes */
    switch(keyCode) {
      /** Pressing @ will trigger the opening of the mentions box */
      case "@":
        if(user.nonces && user.nonces?.global <= 0 && user.a_r <= 1) {
          return;
        } else {
          setMentionsBoxVis(true);
        }
        console.log("Should show mention box!");

        break;

      /** Hide mentions box when pressed enter */
      case " ":
        //setMentionsBoxVis(false);
        postbox?.current.focus();
        break;

      default:
        setMentionsBoxVis(false);
        break;
    }

    /** Save current position of the caret to make sure we paste at the correct location. */
    setBody(inputValue);
    saveCaretPos(document.getSelection());
  }

  /** Save the position of the caret */
  function saveCaretPos(_sel) {
    setFocusOffset(_sel.focusOffset);
    setFocusNode(_sel.focusNode);
  };

  function addMention(mention) {
    console.log("Adding user:", mention);
    /** Position caret at the correct position */
    restoreCaretPos();

    /** Save username to did  */
    let _mentionName = mention.profile?.username?.replaceAll(" ", "");
    mentions.push({
        username: "@" + _mentionName,
        did: mention.did
    });

    /** Add mention tag */
    var _mentionTag = "<span style='color: "+ getThemeValue("color", theme, "active") +"; font-weight: " + 500 + ";' class='mention' contentEditable='false' data-did='" + mention.did + "'>@" + _mentionName + "</span>&nbsp;";

    /** Remove last character from content to avoid having two '@' */
    document.execCommand("delete", null, false);

    /** Use paste to add mention tag */
    document.execCommand("insertHTML", false, _mentionTag);
    console.log("Trying to paste mention:", _mentionTag);
    //setBody(body +  <span style={{color: "blue"}}>{_mentionName}</span> + " ")

    /** Hide mentions box */
    setMentionsBoxVis(false);
  }

  /** Restore the caret position after mention is added */
  function restoreCaretPos() {
    /** Focus on textarea */
    postbox.current.focus();

    var sel = document.getSelection();
    sel.collapse(focusNode, focusOffset);
  };

  if(user) {
    return(
      <div className={styles.postboxGlobalContainer}>
        {/** (Optional) Show user's pfp */}
        {showPfp &&
          <div className={styles.postboxUserContainer} ref={hoverRef}>
            <UserPfp details={user} />
            <UserPopup visible={isHovered} details={user} />
          </div>
        }

        {/** Show Postbox */}
        <div className={styles.postboxContainer}>
          {/** Form container */}
          <form style={{width: "100%"}} onSubmit={(event) => handleSubmit(event)}>
            <div className={styles.postbox} style={{ borderColor: getThemeValue("input", theme).border, backgroundColor: getThemeValue("input", theme, sharing).background}}>
              {/** Show reply if any */}
              {reply &&
                <div className={styles.postboxReplyContainer}>
                  <span style={{ marginRight: "0.25rem", color: theme?.color?.secondary ? theme.color.secondary : defaultTheme.color.secondary }}>Replying to:</span>
                  <div className={styles.postboxReplyBadge} style={{background: theme?.badges?.main?.bg ? theme.badges.main.bg : defaultTheme.badges.main.bg, color: theme?.badges?.main?.color ? theme.badges.main.color : defaultTheme.badges.main.color }}><Username details={reply.creator_details} /></div>
                </div>
              }
              <div
                contentEditable={true}
                autoFocus={true}
                data-placeholder={placeholder}
                ref={postbox}
                rows={rows}
                name="body"
                id="postbox-area"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className={styles.postboxInput}
                style={{ fontSize: 15, color: getThemeValue("input", theme, sharing).color}}
                placeholder={placeholder}
                disabled={sharing}
                onInput={(e) => handleInput(e)}
              ></div>
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

          {/** Show mentions box */}
          {mentionsBoxVis &&
            <MentionsBox add={addMention} />
          }
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

/** Mentions Box Container */
const MentionsBox = ({add}) => {
  const { orbis, user, theme } = useContext(GlobalContext);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if(search && search.length >= 2) {
      searchUsers();
    }

    async function searchUsers() {
      setLoading(true);
      let { data, error, status } = await orbis.getProfilesByUsername(search);
      setLoading(false);

      if(error) {
        console.log("Error querying Orbis usernames: ", error);
      }

      if(data) {
        setUsers(data);
      } else {
        setUsers([]);
      }
    }
  }, [search])

  const LoopUsers = () => {
    if(!search || search == "" || search.length < 2) {
      return null;
    }
    if(loading) {
      return(
        <div className={styles.loadingContainer} style={{ color: getThemeValue("color", theme, "main") }}>
          <LoadingCircle />
        </div>
      )
    } else {
      if(users.length > 0) {
        return users.map((_user, key) => {
          return(
            <div className={styles.userResultContainer} onClick={() => add(_user.details)} style={{fontSize: 15, color: theme?.color?.main ? theme.color.main : defaultTheme.color.main}} key={key}>
              <User details={_user.details} key={key} isLink={false} />
            </div>
          )
        });
      } else {
        return <p>No users</p>
      }
    }
  }

  return(
    <div className={styles.mentionsBoxContainer} style={{background: theme?.bg?.secondary ? theme.bg.secondary : defaultTheme.bg.secondary, borderColor: theme?.border?.main ? theme.border.main : defaultTheme.border.main }}>
      <div className={styles.mentionsBoxInputContainer}>
        <Input autofocus={true} type="text" name="username" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search username" style={{...getStyle("input", theme, status == 1), borderRadius: 0, borderWidth: 0, borderBottomWidth: 1}} />
      </div>
      {(search && search.length >= 2) ?
        <div className={styles.userResults} style={{ borderColor: theme?.border?.main ? theme.border.main : defaultTheme.border.main }}>
          <LoopUsers />
        </div>
      :
        <p className={styles.mentionsBoxEmptyState} style={{color: theme?.color?.secondary ? theme.color.secondary : defaultTheme.color.secondary}}>Search by username to mention someone.</p>
      }
    </div>
  )
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
