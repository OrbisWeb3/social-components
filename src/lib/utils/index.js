import React from "react";
import reactStringReplace from 'react-string-replace';
import useDidToAddress from "../hooks/useDidToAddress";

/** Returns current timestamp */
export function getTimestamp() {
  const cur_timestamp = Math.round(new Date().getTime() / 1000).toString()
  return cur_timestamp;
}

/** Wait for x ms in an async function */
export const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

/** Returns a short address */
export function shortAddress(_address) {
  if(!_address) {
    return "-";
  }

  const _firstChars = _address.substring(0, 5);
  const _lastChars = _address.substr(_address.length - 5);
  return _firstChars.concat('-', _lastChars);
}

/** Regex patterns to use */
var patternMentions = /\B@[a-z0-9_.⍙-]+/gi;

/** Returns an array of urls found in a post */
export function getUrls(body) {
  const urls = body.match(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/g);
  return urls;
}

/** This is a simple implementation of markdown, would love for this part to be improved by an external contributor */
export function cleanBody(post, characterLimit) {
  /** We make sure the post has a content */
  if(!post || !post.content || !post.content.body) {
    return null;
  }

  let body = post.content.body;
  if(characterLimit) {
    body = post.content.body?.substring(0, characterLimit);
  }

  /** Replace all <br> generated by the postbox to \n to handle line breaks*/
  body = reactStringReplace(body, "<br>", function(match, i) {
    return <br key={match + i} />;
  });

  body = reactStringReplace(body, '\n', function(match, i) {
    return <br key={match + i} />;
  });

  /** Replace URLs*/
  body = reactStringReplace(body, /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/g, function(match, i) {
    return <a key={match + i} href={match} target="_blank">{match}</a>
  });

  /** Identify and replace mentions */

  /** Get mentions in post metadata */
  let mentions = post.content.mentions;

  /** Retrieve mentions in the body */
  let mentionsInBody = post.content.body.toString().match(patternMentions);

  /** Compare both and replace in body
  if(mentionsInBody && mentions && isArray(mentions)) {
    mentionsInBody.forEach(_m => {
      let mention = mentions.find(obj => obj.username === _m);
      if(mention !== undefined) {
          body = reactStringReplace(body, _m, (match, i) => (
              mention.did ? <Link href={"/profile/" + mention.did} key={match + i}>{mention.username}</Link> : <span className="link" key={i}>{mention.username}</span>
          ));
      }
    });
  }*/

  return body;
}

/** Retrieve NFTs for a user and network */
export async function getNFTs(address, page, network) {
  let res = await fetch('https://api.orbis.club/get-nfts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      account: address,
      page: page,
      network: network
    })
  });
  let result = await res.json();
  console.log("result nfts:", result);
  if(result && result.nfts && result.nfts.length > 0) {
    return result.nfts;
  } else {
    return [];
  }
}

/** Replace mentions in post */
function replaceMentions(post) {
  /** Get body from post */
  let _body = post.content.body;
  let body = post.content.body;

  /** Return result */
  return _body
}

/** Will loop through rules and user credentials to check if the user has access to this context */
export async function checkContextAccess(user, credentials, _accessRules, callback) {

  /** Loop through all rules assigned to this context */
  _accessRules.forEach(async (_rule, i) => {
    /** Handle operators function */
    if(_rule.operator) {
      //console.log("_rule.operator:", _rule.operator);
    }

    /** Manage verifications based on rules type */
    switch (_rule.type) {
      case "credential":
        /** Loop through all credentials required in this rule */
        _rule.requiredCredentials.forEach((cred, i) => {
          let _hasVc = checkCredentialOwnership(credentials, cred.identifier);
          if(_hasVc) {
            callback(true);
          }
        });

        break;
      case "did":
        /** Loop through all authorized users authorized in this rule */
        _rule.authorizedUsers.forEach((_user, i) => {
          if(_user.did == user.did) {
            callback(true);
          }
        });
        break;
      case "token":
        const { address } = useDidToAddress(user.did);

        /** Check if user owns requested balance for the token */
        getTokenBalance(_rule.requiredToken, address, () => callback(true));
        break;
      default:
    }
  });
}

/** Check if the user owns the required credential */
export function checkCredentialOwnership(user_credentials, cred_identifier) {
  let has_vc = false;

  /** Check if a user owns the required credential */
  user_credentials.forEach((user_cred, i) => {
    if(user_cred.identifier == cred_identifier) {
      has_vc = true;
    }
  });

  /** Return result */
  return has_vc;
}

/** Check if user has the required amount of tokens using the Orbis API */
export async function getTokenBalance(token, account, successCallback) {
  try {
    let res = await fetch('https://api.orbis.club/get-balance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: token,
        account: account
      })
    });
    let balanceResult = await res.json();
    if(balanceResult && balanceResult.balance && token.minBalance) {
      if(balanceResult.balance >= parseFloat(token.minBalance)) {
        successCallback();
      }
    }
  } catch(e) {
    console.log("Error retrieving user's balance for this token:", e);
    return 0;
  }

}
