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
import { defaultTheme } from "../../utils/themes";
import { MenuHorizontal } from "../../icons";

/** Import CSS */
import styles from './Post.module.css';

/** For Markdown support */
import { marked } from 'marked';

/** Display the post details */
export default function Post({post, characterLimit = null}) {
  const { user, setUser, orbis, theme } = useOrbis();
  const [editPost, setEditPost] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [reply, setReply] = useState();
  const [userReaction, setUserReaction] = useState();
  const [postMenuVis, setPostMenuVis] = useState(false);
  const [hoverRef, isHovered] = useHover();

  useEffect(() => {
    if(user) {
      getUserReaction();
    }
  }, [user]);

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
    setReply(false);
  }

  /** If the post has been deleted from the front-end we hide it in the UI */
  if(isDeleted) {
    return null;
  }

  return(
    <div>
      <div className={styles.postContainer} >
        <div style={{position: "relative"}} ref={hoverRef}>
          <UserPfp details={post.creator_details} />
          <UserPopup visible={isHovered} details={post.creator_details} />
        </div>
        <div className={styles.postDetailsContainer}>
          <div className={styles.postDetailsContainerMetadata}>
            <div className={styles.postDetailsContainerUser}>
              <span className={styles.postDetailsContainerUsername} style={{fontSize: 15, color: theme?.color?.main ? theme.color.main : defaultTheme.color.main}}><Username details={post.creator_details} /></span>
              <div className={styles.hideMobile} style={{marginLeft: "0.5rem"}}><UserBadge details={post.creator_details} /></div>
            </div>
            <p className={styles.postDetailsContainerTimestamp} style={{fontSize: 12, color: theme?.color?.secondary ? theme.color.secondary : defaultTheme.color.secondary}}>
              <ReactTimeAgo style={{display: "flex", fontSize: 12}} date={post.timestamp * 1000} locale="en-US" />
              <div className={styles.hideMobile}>
                <span style={{marginLeft: "0.5rem", marginRight: "0.5rem"}}>·</span>
                <a style={{textDecoration: "none", color: theme?.color?.secondary ? theme.color.secondary : defaultTheme.color.secondary}} href={"https://cerscan.com/mainnet/stream/" + post.stream_id} rel="noreferrer" target="_blank">Proof</a>
              </div>
              {/** Show action if user is connected */}
              {user && user.did == post.creator &&
                <>
                  <span style={{marginLeft: "0.5rem", marginRight: "0.5rem"}}>·</span>
                  <div style={{alignItems: "center", display: "flex"}}>
                    {/** Button to edit a post */}
                    <div style={{display: "flex", cursor: "pointer"}} onClick={() => setPostMenuVis(true)}>
                      <MenuHorizontal />
                    </div>

                    {/** Show postmenu for user */}
                    {postMenuVis &&
                      <PostMenu stream_id={post.stream_id} setPostMenuVis={setPostMenuVis} setEditPost={setEditPost} setIsDeleted={setIsDeleted} />
                    }
                  </div>
                </>
              }
            </p>
          </div>

          {/** Post content */}
          {editPost ?
            <div style={{ marginTop: "0.5rem" }}>
              <Postbox showPfp={false} defaultPost={post} reply={reply} callback={callbackShared} rows="1" ctaTitle="Edit" ctaStyle={styles.postReplyCta} setEditPost={setEditPost} />
            </div>
          :
            <div style={{display: "flex", flexDirection: "column"}}>
              <PostBody post={post} characterLimit={characterLimit} />
            </div>
          }

          {/** post CTAs */}
          <div className={styles.postActionsContainer}>
            {/** Reply button */}
            {reply != null ?
              <button type="button" className={styles.postActionButton} style={{color: "#4E75F6"}} onClick={() => setReply(null)}>
                <ReplyIcon type="full" />
                Reply
              </button>
            :
              <button type="button" className={styles.postActionButton} style={{color: theme?.color?.secondary ? theme.color.secondary : defaultTheme.color.secondary}} onClick={() => setReply(post)}>
                <ReplyIcon type="line" />
                Reply
              </button>
            }


            {/** Like button */}
            <span style={{marginLeft: "0.75rem", flexDirection: "row", display: "flex"}}>
              {userReaction == "like" ?
                <button className={styles.postActionButton} style={{color: "#4E75F6"}} onClick={() => like(null)}>
                  <LikeIcon type="full" />
                  Liked
                </button>
              :
                <button className={styles.postActionButton} style={{color: theme?.color?.secondary ? theme.color.secondary : defaultTheme.color.secondary}} onClick={() => like("like")}>
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

          {/** Show postbox */}
          {reply &&
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
const PostBody = ({post, characterLimit}) => {
  const { theme } = useOrbis();
  const [charLimit, setCharLimit] = useState(characterLimit);
  const [body, setBody] = useState(post?.content?.body);

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
      <div className={styles.postContent} style={{ fontSize: 15, color: theme?.color?.main ? theme.color.main : defaultTheme.color.main}} dangerouslySetInnerHTML={{__html: marked.parse(charLimit ? body?.substring(0, charLimit) + "..." : body )}}></div>
    )
  };

  return(
    <>
      <Body />

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
          <p style={{color: theme?.color?.active ? theme.color.active : defaultTheme.color.active, fontSize: 13, fontWeight: 500 }}>{metadata.source}</p>
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

/** Icons */
const ReplyIcon = ({type}) => {
  switch (type) {
    case "line":
      return(
        <svg width="14" height="11" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: "0.25rem"}}>
          <path d="M6.40127 10.375L0.691272 6.27502C0.556779 6.19554 0.445325 6.08238 0.3679 5.94669C0.290476 5.81101 0.249756 5.65749 0.249756 5.50127C0.249756 5.34505 0.290476 5.19152 0.3679 5.05584C0.445325 4.92015 0.556779 4.80699 0.691272 4.72752L6.40127 0.625016C6.53739 0.544955 6.69226 0.502334 6.85017 0.501478C7.00808 0.500622 7.16341 0.541561 7.30039 0.620141C7.43736 0.69872 7.55111 0.812142 7.63008 0.948893C7.70905 1.08564 7.75043 1.24085 7.75002 1.39877V3.00002C9.62502 3.00002 15.25 3.00002 16.5 13C13.375 7.37502 7.75002 8.00002 7.75002 8.00002V9.60127C7.75002 10.3013 6.99252 10.7238 6.40127 10.3763V10.375Z" stroke="#798496" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      )
    case "full":
      return(
        <svg width="15" height="12" viewBox="0 0 17 13" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{marginRight: "0.25rem"}}>
          <path d="M6.40127 10.375L0.691272 6.27502C0.556779 6.19554 0.445325 6.08238 0.3679 5.94669C0.290476 5.81101 0.249756 5.65749 0.249756 5.50127C0.249756 5.34505 0.290476 5.19152 0.3679 5.05584C0.445325 4.92015 0.556779 4.80699 0.691272 4.72752L6.40127 0.625016C6.53739 0.544955 6.69226 0.502334 6.85017 0.501478C7.00808 0.500622 7.16341 0.541561 7.30039 0.620141C7.43736 0.69872 7.55111 0.812142 7.63008 0.948893C7.70905 1.08564 7.75043 1.24085 7.75002 1.39877V3.00002C9.62502 3.00002 15.25 3.00002 16.5 13C13.375 7.37502 7.75002 8.00002 7.75002 8.00002V9.60127C7.75002 10.3013 6.99252 10.7238 6.40127 10.3763V10.375Z" fill="#4E75F6"/>
        </svg>
      );
    default:
      return null;
  }

}

const LikeIcon = ({type}) => {
  switch (type) {
    case "line":
      return(
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: "0.25rem"}}>
          <path d="M13.875 4.84375C13.875 3.08334 12.3884 1.65625 10.5547 1.65625C9.18362 1.65625 8.00666 2.45403 7.5 3.59242C6.99334 2.45403 5.81638 1.65625 4.44531 1.65625C2.61155 1.65625 1.125 3.08334 1.125 4.84375C1.125 9.95831 7.5 13.3438 7.5 13.3438C7.5 13.3438 13.875 9.95831 13.875 4.84375Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case "full":
      return(
        <svg width="15" height="15" viewBox="0 0 16 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{marginRight: "0.25rem"}}>
          <path d="M7.65298 13.9149L7.6476 13.9121L7.62912 13.9024C7.61341 13.8941 7.59102 13.8822 7.56238 13.8667C7.50511 13.8358 7.42281 13.7907 7.31906 13.732C7.11164 13.6146 6.81794 13.4425 6.46663 13.2206C5.76556 12.7777 4.82731 12.1314 3.88539 11.3197C2.04447 9.73318 0 7.35227 0 4.5C0 2.01472 2.01472 0 4.5 0C5.9144 0 7.17542 0.652377 8 1.67158C8.82458 0.652377 10.0856 0 11.5 0C13.9853 0 16 2.01472 16 4.5C16 7.35227 13.9555 9.73318 12.1146 11.3197C11.1727 12.1314 10.2344 12.7777 9.53337 13.2206C9.18206 13.4425 8.88836 13.6146 8.68094 13.732C8.57719 13.7907 8.49489 13.8358 8.43762 13.8667C8.40898 13.8822 8.38659 13.8941 8.37088 13.9024L8.3524 13.9121L8.34702 13.9149L8.34531 13.9158C8.13 14.03 7.87 14.03 7.65529 13.9161L7.65298 13.9149Z"/>
        </svg>
      );
  }
}
