import React, { useState, useEffect, useRef, useContext } from "react";
import ConnectButton from "../ConnectButton";
import LoadingCircle from "../LoadingCircle";
import { UserPfp, Username } from "../User";
import { getTimestamp } from "../../utils";
import { defaultTheme, getThemeValue } from "../../utils/themes";
import { GlobalContext } from "../../contexts/GlobalContext";
import { Logo } from "../../icons"

/** Display postbox or connect CTA */
export default function Postbox({ showPfp = true, connecting, reply = null, callback, rows = "2", sendStyle = sendStyleMain, defaultPost, setEditPost }) {
  const { orbis, user, context, comments, setComments, theme } = useContext(GlobalContext);
  const [sharing, setSharing] = useState(false);
  const postbox = useRef();

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
      <div className="flex justify-center flex-col items-center rounded-md">
        <div className="flex items-start w-full">
          {/** (Optional) Show user's pfp */}
          {showPfp &&
            <div className="flex-shrink-0 mr-2">
              <UserPfp details={user} />
            </div>
          }

          {/** Show Postbox */}
          <div className="min-w-0 flex-1">
            <form className="w-full" onSubmit={(event) => handleSubmit(event)}>
              <div className="overflow-hidden rounded-lg border shadow-sm w-full focus-within:border-[#93bcf7] focus-within:ring-1 focus-within:ring-[#93bcf7]" style={{borderColor: getThemeValue("input", theme).border, backgroundColor: getThemeValue("input", theme, sharing).background}}>
                {/** Show reply if any */}
                {reply &&
                  <div className="p-2 pt-1 pb-0 flex-row align-center flex" style={{alignItems: "center"}}>
                    <span className="text-sm font-normal mr-1" style={{ color: theme?.color?.secondary ? theme.color.secondary : defaultTheme.color.secondary }}>Replying to:</span>
                    <div className="text-sm font-medium rounded-md px-1 py-1" style={{background: theme?.badges?.main?.bg ? theme.badges.main.bg : defaultTheme.badges.main.bg, color: theme?.badges?.main?.color ? theme.badges.main.color : defaultTheme.badges.main.color }}><Username details={reply.creator_details} /></div>
                  </div>
                }
                <textarea autofocus ref={postbox} rows={rows} name="body" id="body" className={enabledInput} style={{ fontSize: 15, color: getThemeValue("input", theme, sharing).color}} placeholder="Add your comment..." disabled={sharing}></textarea>
                {/** Submit button container */}
                <div className="flex justify-end p-3 pt-0">
                  {sharing ?
                    <button type="submit" className={sendStyle + ' bg-blue-200'} disabled><LoadingCircle /> Sending</button>
                  :
                    <>
                    {defaultPost &&
                      <button className="inline-flex items-center rounded-full border border-transparent bg-gray-100 text-gray-600 px-5 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-200 focus:outline-none cursor-pointer mr-2" onClick={() => setEditPost(false)}>Cancel</button>
                    }
                    <button type="submit" className={sendStyle}>
                      {defaultPost ? <>Edit post</> : <>Comment</> }
                      <svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
                        <path d="M1.17363 0.101882C0.997487 0.0769162 0.820681 0.142855 0.7039 0.277068C0.587119 0.411281 0.546253 0.595504 0.595329 0.766509L1.58489 4.21462C1.71408 4.66479 2.1258 4.97498 2.59415 4.97498H6.87496C7.16491 4.97498 7.39996 5.21003 7.39996 5.49998C7.39996 5.78993 7.16491 6.02498 6.87496 6.02498H2.59415C2.1258 6.02498 1.71409 6.33516 1.58489 6.78533L0.595329 10.2335C0.546253 10.4045 0.587119 10.5887 0.7039 10.7229C0.820681 10.8571 0.997487 10.9231 1.17363 10.8981C5.26007 10.3189 8.95462 8.52309 11.8788 5.89013C11.9894 5.79057 12.0525 5.64877 12.0525 5.49999C12.0525 5.3512 11.9894 5.2094 11.8788 5.10984C8.95462 2.47688 5.26007 0.681073 1.17363 0.101882Z" fill="white"/>
                      </svg>
                    </button>
                    </>
                  }
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  } else {
    return(
      <div className="flex justify-center flex-col items-center p-4">
        <div className="w-3/5">
          <ConnectButton orbis={orbis} />
        </div>
      </div>
    );
  }
}

/** Styles for inputs */
let sendStyleMain = "inline-flex items-center rounded-full border border-transparent bg-[#4E75F6] px-5 py-2 text-base font-medium text-white shadow-sm hover:bg-[#3E67F0] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer";
let enabledInput = "block w-full resize-none border-0 pb-3 focus:ring-0 text-base placeholder-[#A9AFB7] bg-transparent";
let disabledInput = "block w-full resize-none border-0 pb-3 text-base bg-transparent";
