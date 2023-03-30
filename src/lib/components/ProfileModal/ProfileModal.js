import React, { useRef, useContext, useState, useEffect } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import LoadingCircle from "../LoadingCircle";
import Modal from "../Modal";
import { defaultTheme, getThemeValue } from "../../utils/themes";
import { sleep, getNFTs, getTimestamp } from "../../utils";
import useHover from "../../hooks/useHover";
import useDidToAddress from "../../hooks/useDidToAddress";
import useOrbis from "../../hooks/useOrbis";
import { EditIcon } from "../../icons"

/** Import CSS */
import styles from './ProfileModal.module.css';

export default function UpdateProfileModal({ hide, callbackNftUpdate }) {
  const { user, theme } = useOrbis();
  const { address, chain } = useDidToAddress(user?.did);
  const [chainSelected, setChainSelected] = useState("mainnet")

  /** Callback function to perform live update of the PFP */
  function callback(url, details) {
    callbackNftUpdate(url, details);
    hide();
  }

  const ChainItem = ({color, name, slug}) => {
    let active = false;
    if(chainSelected == slug) {
      active = true;
    }
    if(active) {
      return(
        <div className={styles.tabsChain} style={{background: color, color: "#FFF"}}>{name}</div>
      )
    } else {
      return(
        <div className={styles.tabsChain} style={{cursor: "pointer"}} onClick={() => setChainSelected(slug)}>{name}</div>
      )
    }
  }

  return(
    <Modal hide={() => hide()} width={500} title="Update your profile picture" description="Pick your favorite NFT or upload your profile picture.">
      {/** Chain selection */}
      <div className={styles.tabsChainsWraper}>
        <div className={styles.tabsChainsContainer} style={{background: theme?.bg?.tertiary ? theme.bg.tertiary : defaultTheme.bg.tertiary, color: theme?.color?.main ? theme.color.main : defaultTheme.color.main }}>
          <ChainItem name="Mainnet" slug="mainnet" color="#0085ff" />
          <ChainItem name="Polygon" slug="polygon" color="#7b4dd8" />
          <ChainItem name="Optimism" slug="optimism" color="#f64f4f" />
        </div>
      </div>

      {/** List NFTs */}
      <ListNFTs chainSelected={chainSelected} callback={callback} address={address} />
    </Modal>
  )
}

/** Retrieve NFTs owned by this user and display them in modal */
function ListNFTs({chainSelected, address, callback}) {
  const [loading, setLoading] = useState(false);
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    loadNFTs();
    async function loadNFTs() {
      setLoading(true);
      let nfts = await getNFTs(address, 0, chainSelected);
      setNfts(nfts);
      setLoading(false);
    }
  }, [chainSelected]);

  /** Loop through all NFTs and display them */
  function Loop() {
    return nfts.map((nft, key) => {
      return(
        <NFT nft={nft} chain={chainSelected} callback={callback} key={key} />
      )
    });
  }

  /** Display loading state if loading */
  if(loading) {
    return(
      <div className={styles.loadingContainer}>
        <LoadingCircle />
      </div>
    )
  }

  if(nfts && nfts.length == 0) {
    return(
      <div className={styles.nftsEmptyState}>
        <p style={{fontSize: 13}}>You don't have any NFT on this network.</p>
      </div>
    )
  }

  return(
    <div className={styles.nftsContainer}>
      <Loop />
    </div>
  )
}

/** Returns the details of one NFT */
function NFT({nft, chain, callback}) {
  const { theme } = useOrbis();
  const [hoverNft, isNftHovered] = useHover();

  /** Set NFT as profile picture */
  function setAsNft() {
    console.log("Setting NFT as profile picture.");

    /** Save image URL */
    let _imageUrl;
    if(nft.media && nft.media?.length > 0) {
      _imageUrl = nft.media[0].thumbnail ? nft.media[0].thumbnail : nft.media[0].gateway;
    }

    /** Set NFT proof details */
   let nftDetails = {
     chain: chain,
     contract: nft.contract.address,
     tokenId: nft.id.tokenId, //web3.utils.hexToNumberString(nft.id.tokenId),
     timestamp: getTimestamp()
   }

   /** Save NFT details and PFP Url */
   callback(_imageUrl, nftDetails);
  }

  return(
    <div className={styles.nftContainer}>
      <div ref={hoverNft} className={styles.nftImageContainer}>
        {/** Display image if any */}
        {nft.media && nft.media?.length > 0 &&
          <>
            {nft.media[0].thumbnail ?
              <img src={nft.media[0].thumbnail} />
            :
              <img src={nft.media[0].gateway} />
            }
          </>
        }

        {/** Show overlay if NFT is hovered */}
        {isNftHovered &&
          <div className={styles.nftOverlayContainer} onClick={() => setAsNft()}>
            <p className={styles.nftOverlayText}>
              Use as profile <br/> picture<br/>
              <EditIcon style={{color: "#FFF"}} />
            </p>
          </div>
        }
      </div>
      <p style={{fontSize: 15, marginTop: "0.5rem", color: getThemeValue("color", theme, "main")}}>{nft.title}</p>
      {/**<p style={{fontSize: 13, color: getThemeValue("color", theme, "secondary")}}>#{nft.cleanId}</p>*/}
    </div>
  )
}
