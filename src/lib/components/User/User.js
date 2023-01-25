import React, { useState, useEffect, useRef, useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { shortAddress, sleep } from "../../utils";

/** Internal components */
import LoadingCircle from "../LoadingCircle";
import Button from "../Button";
import Input from "../Input";
import Badge from "../Badge";
import Alert from "../Alert";
import UpdateProfileModal from "../ProfileModal";

import {
  CheckIcon,
  EditIcon,
  TwitterIcon,
  GithubIcon,
  GoogleIcon,
  OpenSeaIcon,
  UniswapIcon,
  TheGraphIcon,
  SushiIcon,
  HopIcon,
  LidoIcon,
  SnapshotIcon
} from "../../icons";
import useHover from "../../hooks/useHover";
import useDidToAddress from "../../hooks/useDidToAddress";
import useGetUsername from "../../hooks/useGetUsername";
import { defaultTheme, getThemeValue, getStyle } from "../../utils/themes";

/** Import CSS */
import styles from './User.module.css';

/** Full component for a user */
const User = ({details, connected = false, height = 44}) => {
  const { user, theme } = useContext(GlobalContext);
  return(
    <div className={styles.userContainer}>
        <UserPfp height={height} details={connected ? user : details} />
        <div className={styles.userUsernameContainer}>
          <span style={{display: "flex"}}><Username details={connected ? user : details} /></span>
        </div>
    </div>
  )
}

/** Export only the User Pfp */
export const UserPfp = ({details, height = 44, showBadge = true}) => {
  const { theme } = useContext(GlobalContext);
  return(
    <div className={styles.userPfpContainer}>
      {details && details.profile && details.profile?.pfp ?
        <img className={styles.userPfpContainerImg} src={details.profile.pfp} alt="" style={{height: height, width: height}} />
      :
        <span className={styles.userPfpContainerImgEmpty} style={{height: height, width: height, background: theme?.bg?.tertiary ? theme.bg.tertiary : defaultTheme.bg.tertiary, color: theme?.color?.tertiary ? theme.color.tertiary : defaultTheme.color.tertiary }}>
          <svg style={{width: "100%", height: "100%"}} fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </span>
      }

      {showBadge && details.profile?.pfpIsNft &&
        <div style={{ top: -5, right: -5, position: "absolute" }}>
          <img style={{height: "1.25rem", width: "1.25rem"}} src={"https://app.orbis.club/img/icons/nft-verified-"+details.profile?.pfpIsNft.chain+".png"} />
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
      <div className={styles.userBadge} style={{background: theme?.badges?.main?.bg ? theme.badges.main.bg : defaultTheme.badges.main.bg, color: theme?.badges?.main?.color ? theme.badges.main.color : defaultTheme.badges.main.color }}>{details?.metadata?.ensName ? details.metadata.ensName : shortAddress(address)}</div>
    )
  } else {
    return null;
  }

}

/** Modal appearing on request with more details about a specific user */
export const UserPopup = ({details, visible}) => {
  const { orbis, user, theme } = useContext(GlobalContext);
  const [locked, setLocked] = useState(false);
  const [vis, setVis] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [pfp, setPfp] = useState(details?.profile?.pfp);
  const [pfpNftDetails, setPfpNftDetails] = useState(details?.profile?.pfpIsNft);

  useEffect(() => {
    if(locked == false) {
      setVis(visible);
    }
  }, [visible]);

  function _setIsEditing(vis) {
    setIsEditing(vis);
    setLocked(vis);
  }

  function callbackNftUpdate(url, details) {
    setPfp(url);
    setPfpNftDetails(details);
  }

  if(vis == false) {
    return null;
  }

  return(
    <div className={styles.userPopupContainer}>
      <div className={styles.userPopupContent} style={{background: theme?.bg?.secondary ? theme.bg.secondary : defaultTheme.bg.secondary, borderColor: theme?.border?.main ? theme.border.main : defaultTheme.border.main }}>

        {/** Show form if editing or profile details */}
        {isEditing ?
          <UserEditProfile setIsEditing={_setIsEditing} setShowProfileModal={setShowProfileModal} pfp={pfp} pfpNftDetails={pfpNftDetails} />
        :
          <>
            {/** Top part with CTA and profile picture */}
            <div style={{alignItems: "center", display: "flex", flexDirection: "row"}}>
              <UserPfp details={details} />
              <div className={styles.userPopupDetailsContainer}>
                <span className={styles.userPopupDetailsUsername} style={{color: theme?.color?.main ? theme.color.main : defaultTheme.color.main, fontSize: 15}}><Username details={details} /></span>
                <span className={styles.userPopupDetailsBadgeContainer}>
                  <UserBadge details={details} />

                  {/** Show Twitter Badge */}
                  {details?.twitter_details &&
                    <a href={"https://twitter.com/" + details?.twitter_details.username} target="_blank" rel="noreferrer" style={{marginLeft: 10, color: theme?.badges?.main?.color ? theme.badges.main.color : defaultTheme.badges.main.color}}>
                      <TwitterIcon />
                    </a>
                  }

                  {/** Show Twitter Badge */}
                  {details?.github_details &&
                    <a href={"https://github.com/" + details?.github_details.username} target="_blank" rel="noreferrer" style={{marginLeft: 10, color: theme?.badges?.main?.color ? theme.badges.main.color : defaultTheme.badges.main.color}}>
                      <GithubIcon />
                    </a>
                  }
                </span>
              </div>
              <div className={styles.userPopupDetailsActionsContainer}>
                {(user && user.did == details.did) ?
                  <Button color="primary" onClick={() => _setIsEditing(true)}>Edit<EditIcon /></Button>
                :
                  <Follow did={details.did} />
                }
              </div>
            </div>

            {/** Display description if available part */}
            {details?.profile?.description &&
              <div style={{marginTop: "0.5rem"}}>
                <p style={{ fontSize: 15, lineHeight: "inherit", color: theme?.color?.secondary ? theme.color.secondary : defaultTheme.color.secondary}}>{details.profile.description}</p>
              </div>
            }

            {/** On-chain credentials */}
            <UserCredentials details={details} />

            {/** Third part */}
            <div className={styles.userPopupFooterContainer}>
              {/** Followers */}
              <div className={styles.userPopupFooterFollowers} style={{ borderColor: theme?.border?.main ? theme.border.main : defaultTheme.border.main }}>
                <p className={styles.userPopupFooterFollowTitle} style={{ fontSize: 13, color: theme?.color?.secondary ? theme.color.secondary : defaultTheme.color.secondary }}>Followers</p>
                <p className={styles.userPopupFooterFollowCount} style={{ fontSize: 15, color: theme?.color?.main ? theme.color.main : defaultTheme.color.main }}>{details.count_followers}</p>
              </div>

              {/** Following */}
              <div className={styles.userPopupFooterFollowing}>
                <p className={styles.userPopupFooterFollowTitle} style={{ fontSize: 13, color: theme?.color?.secondary ? theme.color.secondary : defaultTheme.color.secondary }}>Following</p>
                <p className={styles.userPopupFooterFollowCount} style={{ fontSize: 15, color: theme?.color?.main ? theme.color.main : defaultTheme.color.main }}>{details.count_following}</p>
              </div>
            </div>
          </>
        }
      </div>

      {/** Show ConnectModal */}
      {showProfileModal &&
        <UpdateProfileModal hide={() => setShowProfileModal(false)} callbackNftUpdate={callbackNftUpdate} />
      }
    </div>
  )
}

/** Load and display credentials for this user */
function UserCredentials({details}) {
  const { orbis, user, theme } = useContext(GlobalContext);
  const [credentials, setCredentials] = useState([]);
  const [credentialsLoading, setCredentialsLoading] = useState(false);

  useEffect(() => {
    loadCredentials();
  }, [])

  /** Load credentials for this user with Orbis SDK */
  async function loadCredentials() {
    setCredentialsLoading(true);
    //let { data } = await orbis.getCredentials(details.did);


	  let { data, error, status } = await orbis.api.rpc("get_verifiable_credentials", {
	    q_subject: details.did,
	    q_min_weight: 10
	  });

    console.log("User credentials:", data);
    setCredentials(data);
    setCredentialsLoading(false);
  }

  const LoopCredentials = () => {
    if(credentials && credentials.length > 0) {
      return credentials.map((credential, key) => {
        return(
          <Credential credential={credential} key={key} />
        );
      });
    } else {
      return(
        <>
          <Alert title="User doesn't have any credentials yet." style={{backgroundColor: theme?.bg?.main ? theme.bg.main : defaultTheme.bg.main}} />
        </>
      )
    }

  }

  return(
    <div style={{ marginTop: 15, marginBottom: 15 }}>
      <p className={styles.userPopupFooterFollowTitle} style={{ fontSize: 13, color: theme?.color?.secondary ? theme.color.secondary : defaultTheme.color.secondary }}>Credentials:</p>
      <div className={styles.userPopupCredentialsContainer}>
        {credentialsLoading ?
          <div className={styles.loadingContainer} style={{ color: getThemeValue("color", theme, "main") }}>
            <LoadingCircle />
          </div>
        :
          <LoopCredentials />
        }

        {/**
        <Badge style={getStyle("badge", theme, "uniswap") } tooltip="Has performed at least one swap on Uniswap v3."><UniswapIcon />{">1 Swap"}</Badge>
        <Badge style={getStyle("badge", theme, "uniswap") } tooltip="Is a liquidity provider on Uniswap v3."><UniswapIcon />{"LP"}</Badge>
        <Badge style={getStyle("badge", theme, "thegraph") } tooltip="Is a curator on The Graph."><TheGraphIcon />{"Curator"}</Badge>
        <Badge style={getStyle("badge", theme, "thegraph") } tooltip="Is a delegator on The Graph."><TheGraphIcon />{"Delegator"}</Badge>
        <Badge style={getStyle("badge", theme, "thegraph") } tooltip="Is an indexer on The Graph."><TheGraphIcon />{"Indexer"}</Badge>
        <Badge style={getStyle("badge", theme, "sushi") } tooltip="Has performed at least one swap on SushiSwap."><SushiIcon />{">1 Swap"}</Badge>
        <Badge style={getStyle("badge", theme, "sushi") } tooltip="Is a liquidity provider on SushiSwap."><SushiIcon />{"LP"}</Badge>
        <Badge style={getStyle("badge", theme, "hop") } tooltip="Bridged assets using Hop Protocol."><HopIcon />{"Bridged"}</Badge>
        <Badge style={getStyle("badge", theme, "lido") } tooltip="Staked ETH using Lido."><LidoIcon />{"Staked"}</Badge>
        */}
      </div>
    </div>
  )
}

/** Display one credential */
function Credential({credential}) {
  const { theme } = useContext(GlobalContext);

  function clean(str) {
    if(str) {
      return str.toLowerCase().replace(" ", "");
    }
  }

  const CredentialIcon = () => {
    let protocol = credential.content?.credentialSubject?.protocol;
    console.log("protocol:", protocol);
    if(protocol) {
      switch (clean(protocol)) {
        case "opensea":
          return <OpenSeaIcon />;
        case "uniswap":
          return <UniswapIcon />;
        case "thegraph":
          return <TheGraphIcon />;
        case "lido":
          return <LidoIcon />;
        case "sushiswap":
          return <SushiIcon />;
        case "hop":
          return <HopIcon />;
        case "snapshot":
          return <SnapshotIcon />
        default:
          return null;
      }
    } else {
      return null;
    }
  }

  /** Orbis credentials */
  if(credential.issuer == "did:key:z6mkfglpulq7vvxu93xrh1mlgha5fmutcgmuwkz1vuwt3qju") {
    return(
      <Badge style={getStyle("badge", theme, clean(credential.content?.credentialSubject?.protocol)) } tooltip={credential.content?.credentialSubject.description}><CredentialIcon />{credential.content?.credentialSubject.name}</Badge>
    )
  }

  /** Gitcoin credentials */
  else if(credential.issuer == "did:key:z6mkghvghlobledj1bgrlhs4lpgjavbma1tn2zcryqmyu5lc") {
    return(
      <Badge style={{backgroundColor: "#FFF"}}><GitcoinProvider credential={credential} /></Badge>
    )
  }
}

const GitcoinProvider = ({credential}) => {
  /** Default provider */
  let provider = <div className="verified-credential-type">
    <span>{credential.provider}</span>
  </div>;

  /** Num Gitcoin Grants contributed to */
  if(credential.provider.includes('GitcoinContributorStatistics#numGrantsContributeToGte#')) {
    let numGrantsContributeTo = credential.provider.replace('GitcoinContributorStatistics#numGrantsContributeToGte#', '');
    provider = <div className="verified-credential-type">
      <span className='inline-block break-word'>Contributed to at least <span className="primary bold mleft-3">{numGrantsContributeTo}</span><span><img src='/img/icons/gitcoin-logo.png' height='19' className='mleft-3 mright-4' /> grants</span></span>
    </div>;
  }

  /** Value contribution Grants total */
  if(credential.provider.includes('GitcoinContributorStatistics#totalContributionAmountGte#')) {
    let totalContributionAmountGte = credential.provider.replace('GitcoinContributorStatistics#totalContributionAmountGte#', '');
    provider = <div className="verified-credential-type">
      <span className='inline-block break-word'>Contributed more than <span className="primary bold mleft-3">{totalContributionAmountGte} ETH to </span><span><img src='/img/icons/gitcoin-logo.png' height='19' className='mleft-3 mright-4' /> grants</span></span>
    </div>;
  }

  /** Num Gitcoin Rounds contributed to */
  if(credential.provider.includes('GitcoinContributorStatistics#numRoundsContributedToGte#')) {
    let numRoundsContributedToGte = credential.provider.replace('GitcoinContributorStatistics#numRoundsContributedToGte#', '');
    provider = <div className="verified-credential-type">
      <span className='inline-block break-word'>Contributed to at least <span className="primary bold mleft-3">{numRoundsContributedToGte} </span><span><img src='/img/icons/gitcoin-logo.png' height='19' className='mleft-3 mright-4' /> rounds</span></span>
    </div>
  }

  /** Num Gitcoin contributions for GR14 to */
  if(credential.provider.includes('GitcoinContributorStatistics#numGr14ContributionsGte#')) {
    let numGr14ContributionsGte = credential.provider.replace('GitcoinContributorStatistics#numGr14ContributionsGte#', '');
    provider = <div className="verified-credential-type">
      <span className='inline-block break-word'>Contributed to at least <span className="primary bold mleft-3">{numGr14ContributionsGte} </span><span><img src='/img/icons/gitcoin-logo.png' height='19' className='mleft-3 mright-4' /> grant(s) in GR14</span></span>
    </div>;
  }

  /** Amount of Twitter followers GT */
  if(credential.provider.includes('TwitterFollowerGT')) {
    let countTwitterFollowers = credential.provider.replace('TwitterFollowerGT', '');
    provider = <>
      <TwitterIcon style={{marginRight: 4, color: "#1DA1F2"}} />
      <span>Followers <span className="primary bold">{` > `}</span> {countTwitterFollowers}</span>
    </>;
  }

  /** Amount of Twitter followers GTE */
  if(credential.provider.includes('TwitterFollowerGTE')) {
    let countTwitterFollowersGte = credential.provider.replace('TwitterFollowerGTE', '');
    provider = <>
      <TwitterIcon style={{marginRight: 4, color: "#1DA1F2"}} />
      <span>Followers <span className="primary bold">{` > `}</span> {countTwitterFollowersGte}</span>
    </>;
  }

  /** Amount of tweets */
  if(credential.provider.includes('TwitterTweetGT')) {
    let countTweets = credential.provider.replace('TwitterTweetGT', '');
    provider = <>
      <TwitterIcon style={{marginRight: 4, color: "#1DA1F2"}} />
      <span>Tweets <span className="primary bold">{` > `}</span> {countTweets}</span>
    </>;
  }

  /** GTC possession */
  if(credential.provider.includes('gtcPossessionsGte')) {
    let countGtc = credential.provider.replace('gtcPossessionsGte#', '');
    provider = <>
      <span>Owns at least <span className="primary bold">{countGtc}</span></span>
      <img src='/img/icons/gtc-logo.webp' height='15' className='mright-4 mleft-4' />
      <span className="primary bold">GTC</span>
    </>;
  }

  switch (credential.provider) {
    /** User has a Twitter account */
    case 'Twitter':
      provider = <>
        Has a <TwitterIcon style={{marginLeft: 3, marginRight: 3, color: "#1DA1F2"}} /> account
      </>;
      break;

    /** User has a Github account */
    case 'Github':
      provider = <>Has a <GithubIcon style={{marginLeft: 3, marginRight: 3}} /> account</>;
      break;

    /** Has starred Github repository */
    case 'StarredGithubRepoProvider':
      provider = <>Has stars on <GithubIcon style={{marginLeft: 3, marginRight: 3}} /> repositories</>;
      break;

    /** Has more than 10 followers */
    case 'TenOrMoreGithubFollowers':
      provider = <>Has at least 10 <GithubIcon style={{marginLeft: 3, marginRight: 3}} /> followers</>;
      break;

    /** Has forked Github repositories */
    case 'ForkedGithubRepoProvider':
      provider = <>Forked some <GithubIcon style={{marginLeft: 3, marginRight: 3}} /> repositories</>;
      break;

    /** User has more than 5 Github repositories */
    case 'FiveOrMoreGithubRepos':
      provider = <>Owns at least <span className="primary bold">5</span> <GithubIcon style={{marginLeft: 3, marginRight: 3}} /> repositories</>;
      break;

    /** User has a Proof of Humanity */
    case 'Poh':
      provider = <>Human on Proof of Humanity</>;
      break;

    /** User has an ENS name */
    case 'Ens':
      provider = <>Has an ENS name</>;
      break;

    /** User has a Discord account */
    case 'Discord':
      provider = <>Has a <img src='/img/icons/discord-logo.png' height='17' className='mleft-4 mright-4' /> account</>;
      break;

    /** User has a Linkedin account */
    case 'Linkedin':
      provider = <>Has a <img src='/img/icons/linkedin-logo.png' height='17' className='mleft-4 mright-4' /> account</>;
      break;

    /** User has a Google account */
    case 'Google':
      provider = <>Has a <GoogleIcon style={{marginLeft: 3, marginRight: 3}} /> account</>;
      break;

    /** User has an Facebook account */
    case 'Facebook':
      provider = <div className="verified-credential-type">
        <span className='inline-block break-word'>Has a <img src='/img/icons/facebook-logo.png' height='17' className='mleft-4 mright-4' /> account</span>
      </div>;
      break;

    /** User has an Facebook profile picture */
    case 'FacebookProfilePicture':
      provider = <div className="verified-credential-type">
        <span className='inline-block break-word'>Has a <img src='/img/icons/facebook-logo.png' height='17' className='mleft-4 mright-4' /> profile picture</span>
      </div>;
      break;

    /** User has an Facebook account */
    case 'Brightid':
      provider = <div className="verified-credential-type">
        <span className='inline-block break-word'>Verified on <img src='/img/icons/brightid-logo.png' height='17' className='mleft-4 mright-4' /></span>
      </div>;
      break;

    /** Wallet with more than one transaction */
    case "EthGTEOneTxnProvider":
      provider = <div className="verified-credential-type">
        <span className='inline-block break-word'>Wallet with <span className="primary bold mleft-4 mright-4">{` >= 1 `}</span> Txn</span>
      </div>;
      break;

    /** Wallet owns more than 1 ETH */
    case "ethPossessionsGte#1":
      provider = <div className="verified-credential-type">
        <span className='inline-block break-word'>Wallet with <span className="primary bold mleft-4 mright-4">{` >= 1 `}</span> ETH</span>
      </div>;
      break;

    /** Voted on Snapshot */
    case "SnapshotVotesProvider":
      provider = <div className="verified-credential-type">
        <span className='inline-block break-word'>Voted on <span className="primary bold mleft-4 mright-4">{`Snapshot`}</span></span>
      </div>;
      break;
  }

  return provider;
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
      if(data) {
        setFollowing(data);
      }
      setLoading(false);
    }
  }, [user, did]);

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
      <Button color="green"><LoadingCircle color="text-white ml-3" /></Button>
    );
  }

  if(following) {
    return(
      <div ref={followHoverRef}>
        {isFollowHovered ?
          <Button color="red">
            Unfollow
          </Button>
        :
          <>
            <Button color="green-transparent">
              <CheckIcon color={getThemeValue("color", theme, "green")} style={{marginRight: "0.25rem"}} />Following
            </Button>
          </>
        }

      </div>
    );
  }

  return(
    <Button color="green" onClick={() => follow(true)}>Follow</Button>
  );
}

/** Form to update user profile */
function UserEditProfile({setIsEditing, setShowProfileModal, pfp, pfpNftDetails}) {
  const { orbis, user, setUser, theme } = useContext(GlobalContext);
  const [username, setUsername] = useState(user?.profile?.username);
  const [description, setDescription] = useState(user?.profile?.description);
  const [status, setStatus] = useState(0);

  async function save() {
    if(status != 0) {
      console.log("Already saving.");
      return;
    }
    setStatus(1);

    /** Update profile using the Orbis SDK */
    let profile = {
      username: username,
      description: description,
      pfp: pfp ? pfp : null
    };

    /** Add pfp nft details if any */
    if(pfpNftDetails) {
      profile.pfpIsNft = pfpNftDetails;
    }

    let res = await orbis.updateProfile(profile);
    if(res.status == 200) {
      setStatus(2);
      let _user = {...user};
      _user.profile = profile;
      setUser(_user);
      await sleep(1500);
      setIsEditing(false);
      setStatus(0);
    } else {
      setStatus(3);
    }
  }

  const SaveButton = () => {
    switch (status) {
      /** Submit state */
      case 0:
        return(
          <Button color="primary" onClick={() => save()}>Save</Button>
        );

      /** Loading state */
      case 1:
        return(
          <Button color="primary"><LoadingCircle /> Saving</Button>
        );
      /** Success state */
      case 2:
        return(
          <Button color="green">Saved</Button>
        );
      /** Error state */
      case 3:
        return(
          <Button color="red">Error</Button>
        );
      default:
        return null;
    }
  }

  return(
    <>
      <div className={styles.userEditContainer}>
        {/** Pfp */}
        <div className={styles.userEditPfpContainer}>
          <div style={{position: "relative", width: 44, height: 44}}>
            <UserPfp details={{profile:{pfp: pfp}}} showBadge={false} />

            {/** Black overlay with edit CTA */}
            <div className={styles.userEditPfpOverlay} style={{background: "rgba(0,0,0,0.5)", top: 0, width: "100%", height: "100%"}} onClick={() => setShowProfileModal(true)}>
              <EditIcon />
            </div>
          </div>
        </div>

        <div className={styles.userEditButtonContainer} onClick={() => setIsEditing(false)}>
          <Button>Cancel</Button>
        </div>
      </div>
      <div className={styles.userFieldsContainer}>
        <Input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" style={getStyle("input", theme, status == 1)} />
        <Input type="textarea" name="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter your description" style={{...getStyle("input", theme, status == 1), marginTop: "0.5rem"}} />
      </div>
      <div className={styles.userFieldsSaveContainer}>
        <SaveButton />
      </div>
    </>
  )
}

export default User;
