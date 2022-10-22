const { TwitterApi } = require("twitter-api-v2");
const open = require('open');
const express = require('express')
const readline = require('node:readline');

const rl = readline.createInterface(process.stdin, process.stdout);

console.log("=================================\n")
console.log("Twitter OAuth 1.0 token generator\n")
console.log("=================================\n")

const askQuestion = async (question) => new Promise((resolve, reject) => {
    rl.question(question, (value) => {
        value = value.trim()
        if (value) {
            return resolve(value)
        }
        return reject()
    });
})

const port = 3000
const redirectUri = `http://127.0.0.1:${port}/callback` // Make sure this is registered in your app settings

const run = async () => {

    const appKey = await askQuestion('Twitter API Key: ')
    const appSecret = await askQuestion('Twitter API Secret: ')
    const app = express()

    let oauth_token
    let oauth_token_secret

    app.listen(port, async () => {
        try {
            const twitter = new TwitterApi({
                appKey,
                appSecret,
            });
            const rsp = await twitter.generateAuthLink(redirectUri, {
                authAccessType: "write",
                linkMode: "authenticate",
                forceLogin: true
            })


            console.log(rsp)

            oauth_token = rsp.oauth_token
            oauth_token_secret = rsp.oauth_token_secret

            await open(rsp.url)
        } catch (e) {
            console.error("Error while generating auth link", e)
            process.exit(1)
        }
    })

    app.get('/callback', async (req, res) => {
        const { oauth_token, oauth_verifier } = req.query
        const twitter = new TwitterApi({
            appKey,
            appSecret,
            accessToken: oauth_token,
            accessSecret: oauth_token_secret
        });
        const { client, ...args } = await twitter.login(oauth_verifier)
        res.json({ ...args, oauth_verifier })
        process.exit(0)
    })
}

run()