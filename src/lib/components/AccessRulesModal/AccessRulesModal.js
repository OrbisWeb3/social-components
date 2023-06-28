import React, { useRef, useContext, useState, useEffect } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import LoadingCircle from "../LoadingCircle";
import Modal from "../Modal";
import User, { UserCredential } from "../User";
import { defaultTheme, getThemeValue, getStyle } from "../../utils/themes";
import useOrbis from "../../hooks/useOrbis";
import { EditIcon } from "../../icons"
import Badge from "../Badge";

/** Import CSS */
import styles from './AccessRulesModal.module.css';

export default function AccessRulesModal({ hide, callbackNftUpdate, accessRules }) {
  const { user, theme } = useOrbis();
  return(
    <Modal hide={() => hide()} width={500} title="Access Rules" description="This feed is gated with the following rules:">
      <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
        <div className={styles.accessRulesContainer}>
          <LoopAccessRules accessRules={accessRules} />
        </div>
      </div>
    </Modal>
  )
}

const LoopAccessRules = ({accessRules}) => {
  return accessRules.map((accessRule, key) => {
    return(
      <OneAccessRule accessRule={accessRule} key={key} />
    )
  });
}

const OneAccessRule = ({accessRule}) => {
  const { theme } = useOrbis();

  /** Show operator */
  if(accessRule.operator) {
    return(
      <div className={styles.operator} style={{color: getThemeValue("color", theme, "secondary")}}>{accessRule.operator}</div>
    )
  }

  /** Show access rules details */
  switch (accessRule.type) {
    case "credential":
      return(
        <div className={styles.accessRuleContainer} style={{borderColor: getThemeValue("border", theme, "main")}}>
          <span style={{ fontSize: 13, color: getThemeValue("color", theme, "secondary"), marginRight: 7}}>Must own:</span>
          <LoopCredentials credentials={accessRule.requiredCredentials} />
        </div>
      );
    case "did":
      return(
        <div className={styles.accessRuleContainer} style={{borderColor: getThemeValue("border", theme, "main")}}>
          <span style={{ fontSize: 13, color: getThemeValue("color", theme, "secondary"), marginRight: 7}}>Must be:</span>
          <LoopUsers users={accessRule.authorizedUsers} />
        </div>
      );
    case "token":
      return(
        <div className={styles.accessRuleContainer} style={{borderColor: getThemeValue("border", theme, "main")}}>
          <div style={{display: "flex", flexDirection:"column", alignItems: "center"}}>
            <span style={{ fontSize: 13, color: getThemeValue("color", theme, "secondary"), marginBottom: 4}}>Requires ownership of:</span>

            {/** Display token details */}
            <AccessRuleToken requiredToken={accessRule.requiredToken} />

            {/** Show attibutes required if any */}
            {(accessRule.requiredToken && accessRule.requiredToken.attributes_required && accessRule.requiredToken.attributes_required.length > 0) &&
              <>
                <span style={{ fontSize: 13, color: getThemeValue("color", theme, "secondary"), marginBottom: 7, marginTop: 7}}>With attributes:</span>
                <AccessRuleTokenAttributes attributes_required={accessRule.requiredToken.attributes_required} />
              </>
            }
          </div>
        </div>
      );
    case "poap":
      return(
        <div className={styles.accessRuleContainer} style={{borderColor: getThemeValue("border", theme, "main")}}>
          <div style={{display: "flex", flexDirection:"column", alignItems: "center"}}>
            <span style={{ fontSize: 13, color: getThemeValue("color", theme, "secondary"), marginBottom: 4}}>Requires POAP:</span>

            {/** Display token details */}
            <PoapDetails requiredPoap={accessRule.requiredPoap} />
          </div>
        </div>
      );
    default:
      return null;
  }
}

/** Will dispaly the details of a POAP */
const PoapDetails = ({requiredPoap}) => {
  const { theme } = useOrbis();
  return(
    <div className={styles.poapDetailsContainer}>
      <img className={styles.poapDetailsContainerLogo} src={requiredPoap.details.image_url} />
      <p style={{ ...getThemeValue("font", theme, "main"), color: getThemeValue("color", theme, "main")}}>{requiredPoap.details.name}</p>
    </div>
  )
}

/** Will display details for the token required */
const AccessRuleToken = ({requiredToken}) => {
  const { theme } = useOrbis();
  return(
    <div style={{ ...getThemeValue("font", theme, "main"), color: getThemeValue("color", theme, "main"), alignItems: "center", justifyContent: "center", display: "flex"}}>{requiredToken?.minBalance} {requiredToken?.symbol} {requiredToken?.token_id && <small style={{marginLeft: 4, marginRight: 4}}>(ID: {requiredToken.token_id})</small>} on <ChainLogo chain={requiredToken?.chain} address={requiredToken?.address} /></div>
  )
}

const AccessRuleTokenAttributes = ({attributes_required}) => {
  const { theme } = useOrbis();
  return attributes_required.map((attr, key) => {
    return(
      <Badge key={key} style={{ ...getStyle("badge", theme, "opensea"), ...getThemeValue("font", theme, "badges") }}>{attr.key} : {attr.value}</Badge>
    )
  });
}

/** Will display details for the credentials required */
const LoopCredentials = ({credentials}) => {
  return credentials.map((credential, key) => {
    return(
      <UserCredential credential={credential} key={key} />
    )
  });
}

/** Will display details for the users required */
const LoopUsers = ({users}) => {
  const { theme } = useOrbis();
  return users.map((_user, key) => {
    return(
      <div style={{color: getThemeValue("color", theme, "main"), fontSize: 15}}>
        <User did={_user.did} details={_user.details} key={key} />
      </div>
    )
  });
}

/** Will display the correct chain logo */
const ChainLogo = ({chain, address}) => {
  const { theme } = useOrbis();
  switch (chain) {
    /** Mainnet logo */
    case "mainnet":
      return(
        <a href={"https://etherscan.io/token/" + address} target="_blank" rel="noreferrer noopenner">
          <svg width="30" height="30" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginLeft: 5}}>
            <circle cx="42" cy="42" r="42" fill="#F6F6F6"/>
            <path d="M41.9969 15L41.6255 16.2306V51.9366L41.9969 52.2981L58.9895 42.501L41.9969 15Z" fill="#343434"/>
            <path d="M41.993 15L25 42.501L41.993 52.2981V34.9674V15Z" fill="#8C8C8C"/>
            <path d="M41.9969 55.436L41.7876 55.685V68.404L41.9969 69.0001L58.9999 45.644L41.9969 55.436Z" fill="#3C3C3B"/>
            <path d="M41.993 69.0001V55.436L25 45.644L41.993 69.0001Z" fill="#8C8C8C"/>
            <path d="M41.9907 52.2975L58.9833 42.5005L41.9907 34.9668V52.2975Z" fill="#141414"/>
            <path d="M25 42.5005L41.993 52.2975V34.9668L25 42.5005Z" fill="#393939"/>
          </svg>
        </a>
      );
      /** Arbitrum logo */
      case "arbitrum":
        return(
          <a href={"https://arbiscan.io/token/" + address} target="_blank" rel="noreferrer noopenner">
            <svg width="30" height="30" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginLeft: 5}}>
              <circle cx="42" cy="42" r="41.5" fill="white" stroke="#B0C6D6"/>
              <path d="M47.9056 39.6589L52.0182 32.6805L63.1034 49.9457L63.1086 53.2592L63.0724 30.4586C63.0462 29.9011 62.7502 29.3911 62.2781 29.0903L42.3206 17.6109C41.8541 17.3814 41.2617 17.3841 40.7959 17.6181C40.7328 17.6498 40.6739 17.6839 40.6174 17.7215L40.5478 17.7652L21.1757 28.991L21.1006 29.0255C21.0038 29.0696 20.9063 29.1265 20.8143 29.1919C20.4469 29.4552 20.203 29.8449 20.1241 30.2815C20.1124 30.3476 20.1034 30.4152 20.0996 30.4834L20.1299 49.0636L30.4553 33.0602C31.7551 30.9383 34.5875 30.2543 37.217 30.2918L40.3028 30.3731L22.1202 59.5327L24.2635 60.7666L42.6638 30.4028L50.797 30.3731L32.4442 61.5033L40.0922 65.9026L41.0061 66.4278C41.3927 66.5849 41.8482 66.5928 42.2379 66.4519L62.4759 54.7237L58.6066 56.9659L47.9056 39.6589ZM49.4745 62.2583L41.75 50.1342L46.4656 42.1323L56.6104 58.1227L49.4745 62.2583Z" fill="#2D374B"/>
              <path d="M41.748 50.1346L49.4729 62.2584L56.6085 58.1231L46.4636 42.1327L41.748 50.1346Z" fill="#28A0F0"/>
              <path d="M63.1077 53.2595L63.1025 49.946L52.0174 32.6808L47.9048 39.6592L58.6061 56.9662L62.4754 54.724C62.8548 54.4159 63.0846 53.9635 63.1087 53.4756L63.1077 53.2595Z" fill="#28A0F0"/>
              <path d="M16.6558 56.3842L22.1198 59.5327L40.3023 30.3732L37.2166 30.2918C34.5874 30.2546 31.755 30.9383 30.4549 33.0602L20.1295 49.0636L16.6558 54.4008V56.3842V56.3842Z" fill="white"/>
              <path d="M50.7961 30.3732L42.663 30.4028L24.2627 60.7666L30.6943 64.4695L32.4431 61.5033L50.7961 30.3732Z" fill="white"/>
              <path d="M66.5353 30.3311C66.4674 28.6302 65.5463 27.0734 64.1039 26.1668L43.8849 14.5393C42.458 13.8208 40.6755 13.8198 39.2458 14.5389C39.077 14.624 19.5833 25.9298 19.5833 25.9298C19.3135 26.059 19.0537 26.213 18.8094 26.388C17.5217 27.3112 16.7367 28.7453 16.6558 30.3208V54.4011L20.1295 49.0639L20.0992 30.4834C20.1033 30.4155 20.1119 30.3483 20.1236 30.2825C20.2022 29.8452 20.4465 29.4555 20.8138 29.1919C20.9058 29.1264 40.732 17.6498 40.7951 17.6181C41.2613 17.3841 41.8533 17.3814 42.3198 17.6109L62.2773 29.0903C62.7494 29.3911 63.0454 29.9011 63.0715 30.4586V53.4749C63.0474 53.9628 62.8545 54.4153 62.4751 54.7233L58.6058 56.9655L56.6093 58.1226L49.4737 62.2579L42.2371 66.4515C41.8474 66.5924 41.3915 66.5845 41.0052 66.4274L32.4434 61.503L30.6943 64.4691L38.3888 68.8991C38.6431 69.0438 38.8699 69.172 39.056 69.2767C39.344 69.4383 39.5404 69.5462 39.6097 69.58C40.1565 69.8456 40.9432 70 41.6524 70C42.3023 70 42.9363 69.8808 43.5362 69.6458L64.5553 57.4734C65.7617 56.5386 66.4715 55.1289 66.5353 53.6021V30.3311Z" fill="#96BEDC"/>
            </svg>
          </a>
        );
        /** Optimism logo */
        case "optimism":
          return(
            <a href={"https://optimistic.etherscan.io/token/" + address} target="_blank" rel="noreferrer noopenner">
              <svg width="30" height="30" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginLeft: 5}}>
                <g clip-path="url(#clip0_1139_294)">
                <path d="M42 84C65.196 84 84 65.196 84 42C84 18.804 65.196 0 42 0C18.804 0 0 18.804 0 42C0 65.196 18.804 84 42 84Z" fill="#FF0420"/>
                <path d="M30.4614 53.7602C27.9282 53.7602 25.8527 53.1504 24.2347 51.9309C22.6382 50.6895 21.8398 48.9255 21.8398 46.6389C21.8398 46.1597 21.8931 45.5717 21.9994 44.8749C22.2763 43.3069 22.6701 41.4232 23.181 39.2235C24.6285 33.2347 28.3646 30.2402 34.3891 30.2402C36.0283 30.2402 37.4971 30.5233 38.7956 31.0896C40.0942 31.634 41.116 32.4615 41.8611 33.5722C42.6062 34.6612 42.9788 35.9679 42.9788 37.4923C42.9788 37.9496 42.9255 38.5267 42.819 39.2235C42.4998 41.1617 42.1166 43.0455 41.6696 44.8749C40.9245 47.8584 39.6366 50.0906 37.8057 51.5715C35.975 53.0306 33.5269 53.7602 30.4614 53.7602ZM30.9085 49.0562C32.1006 49.0562 33.1118 48.6969 33.9421 47.9782C34.7935 47.2596 35.4003 46.1597 35.7622 44.6788C36.2517 42.6317 36.6243 40.8461 36.8797 39.3216C36.9649 38.8642 37.0074 38.396 37.0074 37.9168C37.0074 35.9351 35.9964 34.9442 33.974 34.9442C32.7819 34.9442 31.7601 35.3036 30.9085 36.0223C30.0782 36.7408 29.4822 37.8407 29.1203 39.3216C28.7371 40.7807 28.3539 42.5664 27.9708 44.6788C27.8857 45.1144 27.843 45.5717 27.843 46.0509C27.843 48.0544 28.8648 49.0562 30.9085 49.0562Z" fill="white"/>
                <path d="M44.445 53.4332C44.2108 53.4332 44.0299 53.3569 43.9021 53.2044C43.7957 53.0302 43.7638 52.8343 43.8063 52.6164L48.2129 31.3832C48.2554 31.1437 48.3725 30.9476 48.5642 30.7952C48.7557 30.6427 48.958 30.5664 49.1709 30.5664H57.6648C60.0277 30.5664 61.9222 31.0674 63.3486 32.0692C64.7962 33.0709 65.52 34.5191 65.52 36.4138C65.52 36.9583 65.4561 37.5245 65.3284 38.1125C64.7962 40.617 63.7212 42.468 62.1032 43.6659C60.5067 44.8635 58.3139 45.4625 55.5253 45.4625H51.2144L49.7456 52.6164C49.7031 52.856 49.586 53.052 49.3943 53.2044C49.2028 53.3569 49.0005 53.4332 48.7877 53.4332H44.445ZM55.7487 40.9545C56.6428 40.9545 57.4198 40.704 58.0799 40.2032C58.761 39.7022 59.208 38.9835 59.4211 38.0471C59.4849 37.677 59.5168 37.3502 59.5168 37.0672C59.5168 36.4357 59.3359 35.9565 58.974 35.6298C58.612 35.2813 57.9947 35.1071 57.1218 35.1071H53.2901L52.0766 40.9545H55.7487Z" fill="white"/>
                </g>
                <defs>
                <clipPath id="clip0_1139_294">
                <rect width="84" height="84" fill="white"/>
                </clipPath>
                </defs>
              </svg>
            </a>
          );
        /** Polygon logo */
        case "polygon":
          return(
            <a href={"https://polygonscan.com/token/" + address} target="_blank" rel="noreferrer noopenner">
              <svg width="30" height="30" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginLeft: 5}}>
                <circle cx="42" cy="42" r="42" fill="#8247E5"/>
                <g clip-path="url(#clip0_1003_142)">
                <path d="M55.0896 33.3975C54.1701 32.8721 52.9881 32.8721 51.9373 33.3975L44.5821 37.7318L39.591 40.49L32.3672 44.8244C31.4478 45.3497 30.2657 45.3497 29.2149 44.8244L23.5672 41.4094C22.6478 40.8841 21.991 39.8333 21.991 38.6512V32.0841C21.991 31.0333 22.5164 29.9826 23.5672 29.3259L29.2149 26.0423C30.1343 25.5169 31.3164 25.5169 32.3672 26.0423L38.0149 29.4572C38.9343 29.9826 39.591 31.0333 39.591 32.2154V36.5497L44.5821 33.6602V29.1945C44.5821 28.1438 44.0567 27.093 43.006 26.4363L32.4985 20.2632C31.5791 19.7378 30.397 19.7378 29.3463 20.2632L18.5761 26.5676C17.5254 27.093 17 28.1438 17 29.1945V41.5408C17 42.5915 17.5254 43.6423 18.5761 44.299L29.2149 50.4721C30.1343 50.9975 31.3164 50.9975 32.3672 50.4721L39.591 46.2691L44.5821 43.3796L51.806 39.1766C52.7254 38.6512 53.9075 38.6512 54.9582 39.1766L60.606 42.4602C61.5254 42.9856 62.1821 44.0363 62.1821 45.2184V51.7856C62.1821 52.8363 61.6567 53.887 60.606 54.5438L55.0896 57.8273C54.1701 58.3527 52.9881 58.3527 51.9373 57.8273L46.2896 54.5438C45.3701 54.0184 44.7134 52.9676 44.7134 51.7856V47.5826L39.7224 50.4721V54.8065C39.7224 55.8572 40.2478 56.9079 41.2985 57.5647L51.9373 63.7378C52.8567 64.2632 54.0388 64.2632 55.0896 63.7378L65.7284 57.5647C66.6478 57.0393 67.3045 55.9885 67.3045 54.8065V42.3288C67.3045 41.2781 66.7791 40.2273 65.7284 39.5706L55.0896 33.3975Z" fill="white"/>
                </g>
                <defs>
                <clipPath id="clip0_1003_142">
                <rect width="50.4358" height="44" fill="white" transform="translate(17 20)"/>
                </clipPath>
                </defs>
              </svg>
            </a>
          );
        /** Goerli label */
        case "goerli":
          return(
            <a href={"https://goerli.etherscan.io/token/" + address} target="_blank" rel="noreferrer noopenner" style={{marginLeft: 5, color: getThemeValue("color", theme, "active")}}>
              <span>Goerli</span>
            </a>
          );

        /** Mumbai label */
        case "mumbai":
          return(
            <a href={"https://mumbai.polygonscan.com/token/" + address} target="_blank" rel="noreferrer noopenner" style={{marginLeft: 5, color: getThemeValue("color", theme, "active")}}>
              <span>Mumbai</span>
            </a>
          );
    default:

  }
}
