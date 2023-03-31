import React, { useState, useEffect, useRef, useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { UserPfp, Username, UserPopup, UserBadge } from "../User";
import Postbox from "../Postbox";
import Button from "../Button";
import LoadingCircle from "../LoadingCircle";
import useHover from "../../hooks/useHover";
import useOrbis from "../../hooks/useOrbis";
import useOutsideClick from "../../hooks/useOutsideClick";

import ReactTimeAgo from 'react-time-ago'
import { cleanBody } from "../../utils";
import { defaultTheme, getThemeValue } from "../../utils/themes";
import { MenuHorizontal, ReplyIcon, LikeIcon } from "../../icons";

/** Import CSS */
import styles from './Post.module.css';

/** For Markdown support */
import { marked } from 'marked';

/** Display the post details */
export default function Post({post, showPfp = true, showCta = true, characterLimit = null, showReplyTo = false, setReply = null, defaultReply = null}) {
  const { user, setUser, orbis, theme, hasAccess } = useOrbis();
  const [editPost, setEditPost] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [reply, _setReply] = useState();
  const [userReaction, setUserReaction] = useState();
  const [postMenuVis, setPostMenuVis] = useState(false);
  const [hoverRef, isHovered] = useHover();

  useEffect(() => {
    if(user) {
      getUserReaction();
    }
  }, [user]);

  /** Will update the reply status based on the forced parent parameters */
  useEffect(() => {
    _setReply(defaultReply);
  }, [defaultReply])

  /** Will reply to a post either by replying within the post or by adding the reply in the main PostBox (for chat) */
  function replyToPost(post) {
    if(setReply) {
      setReply(post);
    } else {
      _setReply(post);
    }
  }

  /** If user is connected we check if it has reacted to this post */
  async function getUserReaction() {
    let { data, error } = await orbis.getReaction(post.stream_id, user.did);

    if(data) {
      setUserReaction(data.type);
    }
  }

  /** To like a post */
  async function like(type) {
    if(!user) {
      alert("You must be connected to react to posts.");
      return;
    }

    if(!hasAccess) {
      alert("You need the required credentials to react to posts in this feed.");
      return;
    }

    /** Anticipate success and update UI */
    setUserReaction(type);

    /** React to the post using the SDK */
    let res = await orbis.react(post.stream_id, type);

    /** Check results */
    switch(res.status) {
      case 300:
        console.log("Error reacting to the post:", res);
        break;
    }
  }

  /** Unselect reply when new post is shared */
  function callbackShared(){
    replyToPost(false);
  }

  /** Called when a post is being edited with success */
  function callbackEdit(content){
    setEditPost(false);
    post.content = content;
  }

  /** If the post has been deleted from the front-end we hide it in the UI */
  if(isDeleted) {
    return null;
  }

  return(
    <div className={styles.postContainer}>
      {/** Showing reply to if available */}
      {(showReplyTo && post.reply_to_details) &&
        <div className={styles.replyToContainer}>
          <div style={{display: "flex", marginRight: 10}}>
            <div className={styles.linkReply} style={{ borderColor: getThemeValue("border", theme, "main") }}></div>
            <UserPfp details={post.reply_to_creator_details} height={30} hover={false} />
          </div>
          <div style={{display: "flex"}}>
            <PostBody
              showViewMore={false}
              post={{
                stream_id: post.reply_to,
                content: post.reply_to_details
              }}
              characterLimit={70} />
          </div>
        </div>
      }

      {/** Post content */}
      <div style={{display: "flex", flexDirection: "row", width: "100%"}}>
        {/** Show PFP based on component paramaters */}
        {showPfp &&
          <div style={{position: "relative"}} ref={hoverRef}>
            <UserPfp details={post.creator_details} hover={false} />
            <UserPopup visible={isHovered} details={post.creator_details} />
          </div>
        }

        {/** Post details */}
        <div className={styles.postDetailsContainer}>
          {/** We don't show the post metadata if user decided to hide the pfp */}
          {showPfp &&
            <div className={styles.postDetailsContainerMetadata}>
              <div className={styles.postDetailsContainerUser}>
                <span className={styles.postDetailsContainerUsername} style={{...getThemeValue("font", theme, "main"), color: getThemeValue("color", theme, "main")}}><Username details={post.creator_details} /></span>
                <div className={styles.hideMobile} style={{marginLeft: "0.5rem"}}><UserBadge details={post.creator_details} /></div>
              </div>
              <div className={styles.postDetailsContainerTimestamp} style={{fontSize: 12, color: theme?.color?.secondary ? theme.color.secondary : defaultTheme.color.secondary}}>
                <ReactTimeAgo style={{display: "flex", fontSize: 12, ...getThemeValue("font", theme, "actions")}} date={post.timestamp * 1000} locale="en-US" />
                <div className={styles.hideMobile}>
                  <span style={{marginLeft: "0.5rem", marginRight: "0.5rem", color: getThemeValue("color", theme, "secondary"), ...getThemeValue("font", theme, "actions")}}>·</span>
                  <a style={{textDecoration: "none", color: getThemeValue("color", theme, "secondary"), ...getThemeValue("font", theme, "actions")}} href={"https://cerscan.com/mainnet/stream/" + post.stream_id} rel="noreferrer" target="_blank">Proof</a>
                </div>
                {/** Show action if user is connected */}
                {user && user.did == post.creator &&
                  <>
                    <span style={{marginLeft: "0.5rem", marginRight: "0.5rem", color: getThemeValue("color", theme, "secondary")}}>·</span>
                    <div style={{alignItems: "center", display: "flex"}}>
                      {/** Button to edit a post */}
                      <div style={{display: "flex", cursor: "pointer", color: getThemeValue("color", theme, "secondary")}} onClick={() => setPostMenuVis(true)}>
                        <MenuHorizontal />
                      </div>

                      {/** Show postmenu for user */}
                      {postMenuVis &&
                        <PostMenu stream_id={post.stream_id} setPostMenuVis={setPostMenuVis} setEditPost={setEditPost} setIsDeleted={setIsDeleted} />
                      }
                    </div>
                  </>
                }
              </div>
            </div>
          }
          {/** Post content */}
          {editPost ?
            <div style={{ marginTop: "0.5rem" }}>
              <Postbox showPfp={false} defaultPost={post} reply={reply} callback={callbackEdit} rows="1" ctaTitle="Edit" ctaStyle={styles.postReplyCta} setEditPost={setEditPost} />
            </div>
          :
            <div style={{display: "flex", flexDirection: "column"}}>
              <PostBody post={post} characterLimit={characterLimit} />
            </div>
          }

          {/** Show post CTAs based on component parameters */}
          {showCta &&
            <div className={styles.postActionsContainer}>
              {/** Reply button */}
              {(reply && reply.stream_id == post.stream_id) ?
                <button type="button" className={styles.postActionButton} style={{color: getThemeValue("color", theme, "active"), ...getThemeValue("font", theme, "actions")}} onClick={() => replyToPost(null)}>
                  <ReplyIcon type="full" />
                  Reply
                </button>
              :
                <button type="button" className={styles.postActionButton} style={{color: getThemeValue("color", theme, "secondary"), ...getThemeValue("font", theme, "actions")}} onClick={() => replyToPost(post)}>
                  <ReplyIcon type="line" />
                  Reply
                </button>
              }


              {/** Like button */}
              <span style={{marginLeft: "0.75rem", flexDirection: "row", display: "flex"}}>
                {userReaction == "like" ?
                  <button className={styles.postActionButton} style={{color: getThemeValue("color", theme, "active"), ...getThemeValue("font", theme, "actions")}} onClick={() => like(null)}>
                    <LikeIcon type="full" />
                    Liked
                  </button>
                :
                  <button className={styles.postActionButton} style={{color: getThemeValue("color", theme, "secondary"), ...getThemeValue("font", theme, "actions")}} onClick={() => like("like")}>
                    <LikeIcon type="line" />
                    Like
                  </button>
                }
              </span>

              {/** Like count
              {(userReaction == "like" || post.count_likes > 0) &&
                <span style={{marginRight: 2}}>{userReaction == "like" ? post.count_likes + 1 : post.count_likes}</span>
              }
              */}
              {/** Downvote button
              <button type="button" className="inline-flex items-center rounded-md border border-transparent bg-transaprent px-2 py-1 text-sm font-medium text-gray-600 hover:bg-gray-50 focus:outline-none text-[#798496] ml-4">
                <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                  <path d="M11 8L6 13M6 13L1 8M6 13L6 1" stroke="#4d5562" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Downvote
              </button>*/}
            </div>
          }

          {/** Show postbox */}
          {(reply && reply.stream_id == post.stream_id && !defaultReply) &&
            <div style={{marginTop: 8}}>
              <Postbox reply={reply} callback={callbackShared} placeholder="Add your reply..." rows="1" ctaTitle="Reply" ctaStyle={styles.postReplyCta} />
            </div>
          }
        </div>
      </div>
    </div>
  )
}

/** Body of the post */
const PostBody = ({post, characterLimit, showViewMore = true}) => {
  const { theme } = useOrbis();
  const [charLimit, setCharLimit] = useState(characterLimit);
  const [body, setBody] = useState(post?.content?.body ? post.content.body : "");

  useEffect(() => {
    let _body = post.content.body;
    let mentions = post.content.mentions;
    if(mentions && mentions.length > 0) {
      mentions.forEach((mention, i) => {
        _body = _body.replaceAll(mention.username, "**"+mention.username+"**");
      });
    }

    setBody(_body);

  }, [post])

  const Body = () => {
    return(
      <div className={styles.postContent} style={{...getThemeValue("font", theme, "secondary"), color: getThemeValue("color", theme, "main")}} dangerouslySetInnerHTML={{__html: marked.parse(charLimit ? body?.substring(0, charLimit) + "..." : body )}}></div>
    )
  };

  return(
    <>
      <Body />

      {/** Only displayed additional details if requested */}
      {showViewMore &&
        <>
          {(charLimit && post.content?.body?.length > charLimit) ?
            <>
              {/** Display view more button if over body content over the character limit */}
              <div className={styles.postViewMoreCtaContainer}>
                <Button color="secondary" style={{marginRight: 5}} onClick={() => setCharLimit(null)}>View more</Button>
              </div>
            </>
            :
            <>
              {/** If post has metadata display them */}
              {(post.indexing_metadata?.urlMetadata && post.creator_details?.a_r > 15) &&
                <LinkCard metadata={post.indexing_metadata.urlMetadata} />
              }
            </>
          }
        </>
      }

    </>
  )
}

/** Card to display's url metadata */
const LinkCard = ({metadata}) => {
  const { theme } = useContext(GlobalContext);
  return(
    <div className={styles.postUrlMetadataContainer} style={{background: theme?.bg?.secondary ? theme.bg.secondary : defaultTheme.bg.secondary, borderColor: theme?.border?.main ? theme.border.main : defaultTheme.border.main, maxWidth: 480 }}>
      {/** Show image if any */}
      {metadata.image &&
        <a href={metadata.url} target="_blank" rel="noreferrer">
          <div className={styles.postUrlMetadataImage} style={{backgroundImage: "url(" + metadata.image + ")"}}></div>
        </a>
      }

      {/** Show cards details */}
      <div className={styles.postUrlMetadataDetails} style={{ borderColor: theme?.border?.secondary ? theme.border.secondary : defaultTheme.border.secondary }}>
        {/** Show source if any */}
        {metadata.source &&
          <p style={{color: theme?.color?.active ? theme.color.active : defaultTheme.color.active, ...getThemeValue("font", theme, "secondary"), fontSize: 13, fontWeight: 500 }}>{metadata.source}</p>
        }
        <h3 style={{color: theme?.color?.main ? theme.color.main : defaultTheme.color.main, fontSize: 17, fontWeight: 500, lineHeight: "1.5rem" }}>{metadata.title}</h3>

        {/** Show description if any */}
        {metadata.description &&
          <p style={{color: theme?.color?.secondary ? theme.color.secondary : defaultTheme.color.secondary, fontSize: 15 }}>{metadata.description.length > 155 ? <>{metadata.description}...</> : <>{metadata.description}</>}</p>
        }
      </div>
    </div>
  )
}

/** Menu for a post (visible for owner only) */
const PostMenu = ({ stream_id, setPostMenuVis, setEditPost, setIsDeleted }) => {
  const { orbis, theme } = useContext(GlobalContext);
  const [deletingStatus, setDeletingStatus] = useState(0);
  const wrapperRef = useRef(null);

  /** Is triggered when clicked outside the component */
  useOutsideClick(wrapperRef, () => hide());

  /** will trigger the edit post function */
  async function _delete() {
    setDeletingStatus(1);
    let res = await orbis.deletePost(stream_id);
    setDeletingStatus(2);
  }

  /** Will show the postbox instead of the post to allow the connected user to edit its content */
  function edit() {
    setPostMenuVis(false);
    setEditPost(true);
  }

  /** Hide menu */
  function hide() {
    if(deletingStatus == 2) {
      setIsDeleted(true);
    }
    setPostMenuVis(false);
  }

  function DeleteButton() {
    switch (deletingStatus) {
      case 0:
        return(
          <div class="text-red-700 hover:bg-gray-50 flex items-center px-3 py-2 text-sm font-medium rounded-md cursor-pointer" onClick={() => _delete(true)}>Delete</div>
        )

      /** Loading */
      case 1:
        return(
          <div class="text-red-700 flex items-center px-3 py-2 text-sm font-medium rounded-md">
            <LoadingCircle color="text-red-700" />
            <span class="truncate">Deleting</span>
          </div>
        );

      /** Success */
      case 2:
        return(
          <div class="text-green-700 flex items-center px-3 py-2 text-sm font-medium rounded-md">
            <span class="truncate mr-2">Deleted</span>
          </div>
        )
    }
  }

  return(
    <div className={styles.postMenuContainer} ref={wrapperRef} style={{right: 10, background: theme?.bg?.secondary ? theme.bg.secondary : defaultTheme.bg.secondary, borderColor: theme?.border?.main ? theme.border.main : defaultTheme.border.main }}>
      {/** Edit button */}
      <div class="flex items-center px-3 py-2 text-sm font-medium rounded-md cursor-pointer" style={{color: theme?.color?.main ? theme.color.main : defaultTheme.color.main}} aria-current="page" onClick={() => edit(true)}>Edit</div>

      {/** Delete button */}
      <DeleteButton />
    </div>
  )
}

let sendStyleReply = "inline-flex items-center rounded-full border border-transparent bg-[#4E75F6] px-4 py-1 text-sm font-medium text-white shadow-sm hover:bg-[#3E67F0] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer";
