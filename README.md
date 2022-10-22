# Twitter API Auth

## Overview
When creating bots, I always forget how to generate an auth token for another user via the OAuth 1.0 flow.
I tried creating OAuth 2.0 flows, but I think it required persisting a refresh token.
If I can just use the 1.0 token perpetually, that's better. (If I'm wrong on this, I'd love to know more.)

My goal is to get this npx'able, but I'm not sure what is necessary.

## Related

* https://developer.twitter.com/en/docs/authentication/oauth-1-0a

## Usage
```
➜ node index.js
=================================

Twitter OAuth 1.0 token generator

=================================

Twitter API Key: (YOUR TWITTER API KEY)
Twitter API Secret: (YOUR TWITTER API SECRET)
```

This will open a web browser window to authenticate the account you wish to post as.

Authenticate & the page will refresh, showing you API credentials in the form:

```
{
  "accessToken": "...",
  "accessSecret": "...",
  "userId": "twitter_numerical_user_id",
  "screenName": "twitter_screenname"
}
```
