# Twitter API Auth

## Overview
When creating bots, I always forget how to generate a refresh token for another user via the OAuth 2 flow.
This allows us to make a bot that is another user.

## Related
* https://developer.twitter.com/en/docs/authentication/oauth-2-0/user-access-token

## Environment variables
You can get from https://developer.twitter.com/en/portal/dashboard

* CLIENT_ID
* CLIENT_SECRET

## TODOs
If I reuse this, make it easier by:

* Accepting id & secret via command line.
* Make into an npx script.