import React, { useState, useEffect, useRef, useContext } from "react";
import ConnectButton from "../ConnectButton";
import LoadingCircle from "../LoadingCircle";
import AccessRulesModal from "../AccessRulesModal";
import Button from "../Button";
import Input from "../Input";
import Alert from "../Alert";
import User, { UserPfp, Username, UserPopup } from "../User";
import { getTimestamp } from "../../utils";
import { defaultTheme, getThemeValue, getStyle } from "../../utils/themes";
import { CommentsContext } from "../../contexts/CommentsContext";
import { Logo, LockIcon, UnlockIcon, SendIcon } from "../../icons";
import useHover from "../../hooks/useHover";
import useOrbis from "../../hooks/useOrbis";

/** Import CSS */
import styles from './Postbox.module.css';

/** Init mentions object */
let mentions = [];

/** Display postbox or connect CTA */
export default function Postbox({ showPfp = true, connecting, reply = null, callback, rows = "2", defaultPost, setEditPost, ctaTitle = "Comment", ctaStyle = styles.postboxShareContainerBtn, placeholder = "Add your comment..." }) {
  const { user, setUser, orbis, theme, context, accessRules, hasAccess } = useOrbis();
  const { comments, setComments } = useContext(CommentsContext);
  const [sharing, setSharing] = useState(false);
  const [hoverRef, isHovered] = useHover();
  const [body, setBody] = useState("");
  const [accessRulesModalVis, setAccessRulesModalVis] = useState(false);
  const postbox = useRef();

  /** Manage mentions */
  const [mentionsBoxVis, setMentionsBoxVis] = useState(false);
  const [focusOffset, setFocusOffset] = useState(null);
  const [focusNode, setFocusNode] = useState(null);


  /** If user is editing a post we use the content as the default post */
  useEffect(() => {
    if(defaultPost) {
      if(postbox.current) {
        postbox.current.textContent = defaultPost.content.body;
        setBody(defaultPost.content.body);
      }
    }
  }, [defaultPost, postbox])

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


    /** Create new post or edit existing post */
    if(defaultPost) {
      let _contentEdit = {...defaultPost.content}
      _contentEdit.body = body;
      let res = await orbis.editPost(defaultPost.stream_id, _contentEdit);
      console.log("res:", res);

      if(callback) {
        callback(_contentEdit);
      }
    } else {
      let _contentCreate = {
        body: body,
        context: context ? context : null,
        master: master,
        reply_to: reply ? reply.stream_id : null,
        mentions: mentions
      }

      let res = await orbis.createPost(_contentCreate);

      /** Return results */
      if(res.status == 200) {
        if(comments) {
          setComments(
            [
              {
                timestamp: getTimestamp(),
                creator_details: user,
                creator: user.did,
                stream_id: res.doc,
                content: _contentCreate,
                count_likes: 0
              },
              ...comments
            ]
          );
        }
      } else {
        console.log("Error submitting form:", res);
      }

      if(callback) {
        callback();
      }
    }

    /** Manage success */
    if(postbox.current) {
      postbox.current.value = "";
    }

    /** Reset postbox */
    setBody(null);
    mentions = [];
    if(postbox.current) {
      postbox.current.textContent = "";
      //postbox.current.focus();
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
            <UserPfp details={user} hover={true} />
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

              {/** Display postbox if user has access to the sharing feature */}
              {hasAccess &&
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
                  style={{ fontSize: 15, color: getThemeValue("input", theme, sharing).color, ...getThemeValue("font", theme, "secondary")}}
                  placeholder={placeholder}
                  disabled={sharing}
                  onInput={(e) => handleInput(e)}></div>
              }
              {/** Submit button container */}
              <div className={styles.postboxShareContainer}>

                {/** Display access rules details if any */}
                {(accessRules && accessRules.length > 0) &&
                  <div className={styles.accessRulesContainer} style={{color: getThemeValue("color", theme, "secondary")}}>
                    {hasAccess ?
                      <UnlockIcon style={{marginRight: 5, color: getThemeValue("color", theme, "secondary")}}  />
                    :
                      <LockIcon style={{marginRight: 5, color: getThemeValue("color", theme, "secondary")}} />
                    }
                    <span style={{color: getThemeValue("color", theme, "secondary"), ...getThemeValue("font", theme, "secondary")}}>Gated to specific credentials holders. <span className={styles.hoverLink} style={{fontWeight: 500, color: getThemeValue("color", theme, "active")}} onClick={() => setAccessRulesModalVis(true)}>View</span></span>
                  </div>
                }

                {sharing ?
                  <button type="submit" className={ctaStyle} style={{background: "transparent", color: getThemeValue("color", theme, "main"), ...getThemeValue("font", theme, "buttons")}}><LoadingCircle /> Sending</button>
                :
                  <>
                    {/** Show cancel button if user is editing a post */}
                    {defaultPost &&
                      <Button color="secondary" style={{marginRight: 5}} onClick={() => setEditPost(false)}>Cancel</Button>
                    }

                    {/** Show share button */}
                    {hasAccess ?
                      <button type="submit" className={ctaStyle} style={{...getStyle("button-main", theme, "main"), ...getThemeValue("font", theme, "buttons")}}>
                        {ctaTitle}
                        <SendIcon />
                      </button>
                    :
                      <button type="submit" disabled className={ctaStyle} style={{...getStyle("button-main", theme, "main"), ...getThemeValue("font", theme, "buttons"), opacity: 0.7, marginTop: 10}}>
                        <LockIcon style={{marginRight: 5}} />
                        Locked
                      </button>
                    }

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

        {/** Show access rules modal */}
        {accessRulesModalVis &&
          <AccessRulesModal hide={() => setAccessRulesModalVis(false)} />
        }
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
  const { orbis, user, theme } = useOrbis();
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
