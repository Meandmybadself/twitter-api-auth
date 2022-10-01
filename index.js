const { TwitterApi } = require("twitter-api-v2");
const open = require('open');
const express = require('express')

const port = 3000
const redirectUri = `http://site.local:${port}/callback` // Make sure this is registered in your app settings

if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET) {
    console.error('Please set CLIENT_ID and CLIENT_SECRET in your environment')
}

const run = async () => {
    let codeVerifier
    let codeChallenge

    const client = new TwitterApi({ clientId: process.env.CLIENT_ID, clientSecret: process.env.CLIENT_SECRET });
    const app = express()

    app.get('/callback', async (req, res) => {
        const { code } = req.query
        const { expiresIn, accessToken, scope, refreshToken } = await client.loginWithOAuth2({ code, codeVerifier, redirectUri })
        console.log({ expiresIn, accessToken, scope, refreshToken })
        res.send('Success.  Check console.')
        process.exit()
    })

    app.listen(port, async () => {
        const { url, codeVerifier: cv, codeChallenge: cc } = client.generateOAuth2AuthLink(redirectUri, { scope: 'tweet.write offline.access' });
        codeVerifier = cv
        codeChallenge = cc
        await open(url)
    })
}

run()
