import React, { useState, useEffect, useRef, useContext } from "react";
import makeBlockie from 'ethereum-blockies-base64';
import { GlobalContext } from "../../contexts/GlobalContext";
import { shortAddress } from "../../utils";
import LoadingCircle from "../LoadingCircle";
import { CheckIcon } from "../../icons"
import useHover from "../../hooks/useHover";
import useDidToAddress from "../../hooks/useDidToAddress";
import useGetUsername from "../../hooks/useGetUsername";
import { defaultTheme, getThemeValue } from "../../utils/themes";

/** Full component for a user */
const User = ({details, connected = false, height = 44}) => {
  const { user, theme } = useContext(GlobalContext);
  return(
    <div className="inline-flex items-center group block flex-shrink-0">
      <div className="flex items-center">
        <UserPfp height={height} details={connected ? user : details} />
        <div className="ml-2 font-medium">
          <span className="flex font-medium"><Username details={connected ? user : details} /></span>
        </div>
      </div>
    </div>
  )
}

/** Export only the User Pfp */
export const UserPfp = ({details, height = 44}) => {
  const { theme } = useContext(GlobalContext);
  return(
    <div className="relative">
      {details && details.profile && details.profile?.pfp ?
        <img className="inline-block rounded-full" src={details.profile.pfp} alt="" style={{height: height, width: height}} />
      :
        <span className="inline-block overflow-hidden rounded-full" style={{height: height, width: height, background: theme?.bg?.tertiary ? theme.bg.tertiary : defaultTheme.bg.tertiary, color: theme?.color?.tertiary ? theme.color.tertiary : defaultTheme.color.tertiary }}>
          <svg className="h-full w-full" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </span>
      }

      {details.profile?.pfpIsNft &&
        <div className="absolute" style={{ top: -5, right: -5 }}>
          <img className="h-5 w-5" src={"https://app.orbis.club/img/icons/nft-verified-"+details.profile?.pfpIsNft.chain+".png"} />
        </div>
      }
    </div>
  )
}

/** Export only the Username */
export const Username = ({details}) => {
  const { address, chain } = useDidToAddress(details?.did);
  const username = useGetUsername(details?.profile, address, details?.did);

  return(
    <>{username}</>
  )
}

/** Export only the Badge */
export const UserBadge = ({details}) => {
  const { theme } = useContext(GlobalContext);
  const { address, chain } = useDidToAddress(details?.did);
  if(address) {
    return(
      <div className="text-xs font-medium rounded-lg px-2 py-1" style={{background: theme?.badges?.main?.bg ? theme.badges.main.bg : defaultTheme.badges.main.bg, color: theme?.badges?.main?.color ? theme.badges.main.color : defaultTheme.badges.main.color }}>{shortAddress(address)}</div>
    )
  } else {
    return null;
  }

}

/** Modal appearing on request with more details about a specific user */
export const UserPopup = ({details}) => {
  const { orbis, user, theme } = useContext(GlobalContext);

  return(
    <div className="absolute text-left py-4 px-5 z-50 rounded-lg overflow-hidden min-w-[310px] max-w-[390px] drop-shadow-lg border" style={{left: 30, top: 25, background: theme?.bg?.secondary ? theme.bg.secondary : defaultTheme.bg.secondary, borderColor: theme?.border?.main ? theme.border.main : defaultTheme.border.main }}>
      {/** Top part */}
      <div className="flex-row flex" style={{alignItems: "center"}}>
        <UserPfp details={details} />
        <div className="flex flex-col flex-1 align-top ml-2 justify-start">
          <span className="flex text-base font-medium" style={{color: theme?.color?.main ? theme.color.main : defaultTheme.color.main}}><Username details={details} /></span>
          <span className="mt-1 flex"><UserBadge details={details} /></span>
        </div>
        <div className="flex justify-end">
          {(user && user.did == details.did) ?
            <button className="inline-flex flex items-center rounded-full border border-transparent bg-[#4E75F6] px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer">
              Edit
              <svg width="13" height="11" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
                <path d="M15.2984 1.20163C14.5295 0.432789 13.283 0.432789 12.5141 1.20163L11.6463 2.06949L14.4305 4.85373L15.2984 3.98587C16.0672 3.21702 16.0672 1.97048 15.2984 1.20163Z" fill="white"/>
                <path d="M13.635 5.64922L10.8508 2.86499L4.55015 9.16562C4.08755 9.62821 3.74751 10.1988 3.56075 10.8258L2.96091 12.8394C2.90195 13.0374 2.95621 13.2517 3.10225 13.3977C3.2483 13.5438 3.46264 13.598 3.66059 13.5391L5.67426 12.9392C6.30123 12.7525 6.8718 12.4124 7.33439 11.9498L13.635 5.64922Z" fill="white"/>
                <path d="M2.9375 3.43749C1.69486 3.43749 0.6875 4.44485 0.6875 5.68749V13.5625C0.6875 14.8051 1.69486 15.8125 2.9375 15.8125H10.8125C12.0551 15.8125 13.0625 14.8051 13.0625 13.5625V9.62499C13.0625 9.31433 12.8107 9.06249 12.5 9.06249C12.1893 9.06249 11.9375 9.31433 11.9375 9.62499V13.5625C11.9375 14.1838 11.4338 14.6875 10.8125 14.6875H2.9375C2.31618 14.6875 1.8125 14.1838 1.8125 13.5625V5.68749C1.8125 5.06617 2.31618 4.56249 2.9375 4.56249H6.875C7.18566 4.56249 7.4375 4.31065 7.4375 3.99999C7.4375 3.68933 7.18566 3.43749 6.875 3.43749H2.9375Z" fill="white"/>
              </svg>
            </button>
          :
            <Follow did={details.did} />
          }
        </div>
      </div>

      {/** Display description if available part */}
      {details?.profile?.description &&
        <div className="mt-2">
          <p className="text-base" style={{color: theme?.color?.secondary ? theme.color.secondary : defaultTheme.color.secondary}}>{details.profile.description}</p>
        </div>
      }

      {/** Display linked Twiter account if available */}
      {details?.twitter_details &&
        <div className="mt-2">
          <div className="inline-flex items-center rounded-full py-1 px-3 text-sm font-medium" style={{ backgroundColor: getThemeValue("badges", theme, "twitter").background, color: getThemeValue("badges", theme, "twitter").color }}>
            <svg width="13" height="11" viewBox="0 0 512 417" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="mr-1">
              <path d="M459.584 104.552C459.883 109.053 459.883 113.576 459.883 118.12C459.883 256.936 354.197 417 161.003 417V416.915C103.936 417 48.0427 400.659 0 369.832C8.29867 370.835 16.64 371.325 25.0027 371.347C72.32 371.389 118.272 355.517 155.456 326.291C110.507 325.437 71.0827 296.125 57.3227 253.331C73.0667 256.36 89.28 255.741 104.747 251.539C55.7227 241.64 20.48 198.568 20.48 148.563C20.48 148.115 20.48 147.667 20.48 147.24C35.0933 155.389 51.4347 159.891 68.16 160.381C21.9947 129.555 7.744 68.1573 35.6267 20.1573C88.96 85.7787 167.659 125.672 252.117 129.917C243.648 93.4373 255.232 55.208 282.496 29.544C324.8 -10.2427 391.339 -8.19466 431.125 34.1093C454.656 29.48 477.205 20.84 497.835 8.61601C489.984 32.936 473.579 53.5867 451.648 66.728C472.491 64.232 492.821 58.664 512 50.1733C497.899 71.272 480.149 89.6827 459.584 104.552Z"/>
            </svg>

            <a href={"https://twitter.com/" + details?.twitter_details.username} target="_blank" rel="noreferrer">
              <span>@{details?.twitter_details.username}</span>
            </a>
          </div>
        </div>
      }

      {/** Third part */}
      <div className="flex flex-row mt-3">
        {/** Followers */}
        <div className="flex flex-col pr-6 border-r-[1px] mr-6" style={{ borderColor: theme?.border?.main ? theme.border.main : defaultTheme.border.main }}>
          <p className="font-normal text-sm" style={{ color: theme?.color?.secondary ? theme.color.secondary : defaultTheme.color.secondary }}>Followers</p>
          <p className="font-medium text-base mt-px" style={{ color: theme?.color?.main ? theme.color.main : defaultTheme.color.main }}>{details.count_followers}</p>
        </div>

        {/** Following */}
        <div className="flex flex-col">
          <p className="font-normal text-sm" style={{ color: theme?.color?.secondary ? theme.color.secondary : defaultTheme.color.secondary }}>Following</p>
          <p className="font-medium text-base mt-px" style={{ color: theme?.color?.main ? theme.color.main : defaultTheme.color.main }}>{details.count_following}</p>
        </div>
      </div>
    </div>
  )
}

/** Follow button component */
function Follow({did}) {
  const { orbis, user, theme } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [following, setFollowing] = useState(false);
  const [followHoverRef, isFollowHovered] = useHover();

  useEffect(() => {
    if(user) {
      getFollowing();
    }
    async function getFollowing() {
      setLoading(true);
      let { data, error } = await orbis.getIsFollowing(user.did, did);
      console.log("following data:", data);
      if(data) {
        setFollowing(data);
      }
      setLoading(false);
    }
  }, [user, did]);

  useEffect(() => {
    console.log("isHovered:", isFollowHovered);
  }, [isFollowHovered])

  /** Join group function */
  async function follow(active) {
    setLoading(true);
    let res = await orbis.setFollow(did, active);

    /** Update status according to result from Orbis SDK */
    switch(res.status) {
      case 200:
        setFollowing(active);
        break;
      default:
        console.log("Error following user: ", res);
        break;
    }

    /** Remove loading state */
    setLoading(false)
  }

  /** Returns loading state */
  if(loading) {
    return(
      <button className="inline-flex flex items-center rounded-full border-2 border-transparent bg-emerald-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-emerald-400 text-center"><LoadingCircle color="text-white ml-3" /></button>
    );
  }

  if(following) {
    return(
      <div ref={followHoverRef}>
        {isFollowHovered ?
          <button className="inline-flex flex items-center rounded-full border-2 border-transparent bg-transparent px-3 py-2 text-sm font-medium bg-red-50 focus:ring-offset-2 cursor-pointer" style={{ backgroundColor: getThemeValue("badges", theme, "red").background, color: getThemeValue("badges", theme, "red").color }}>
            Unfollow
          </button>
        :
          <button className="inline-flex flex items-center rounded-full border-2 border-transparent bg-transparent px-3 py-2 text-sm font-medium focus:ring-offset-2 cursor-pointer" style={{ color: getThemeValue("color", theme, "green") }}>
            <CheckIcon color={getThemeValue("color", theme, "green")} className="mr-1 text-emerald-800" />Following
          </button>
        }

      </div>
    );
  }

  return(
    <button className="inline-flex flex items-center rounded-full border-2 border-transparent bg-emerald-300 px-3 py-2 text-sm font-medium text-gray-700h over:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer" onClick={() => follow(true)}>Follow</button>
  );
}

export default User;
