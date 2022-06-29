# Discords.City
Discords City officially NPM Package to make it easier to develop [Discords City API](https://api.discords.city/api)

<br />

## ⚙ Installation
`npm install discords.city`

<br />

## 📜 Example
A full working example can be found in [example/index.js](https://github.com/DiscordsCity/DiscordsCity-Package/blob/main/example/index.js)

```js
const { Client } = require("discord.js")
const { DiscordsCity } = require("discords.city")

const myBot = new Client(/*{....}*/)
const discordsCity = new DiscordsCity("YOUR_DISCORDS_CITY_TOKEN", myBot)

myBot.login("YOUR_DISCORD_TOKEN")

discordsCity.autoPost((err, data) => {
    if (err) {
        console.error(err)
    } else {    
        console.log('Discords City Status Updated.')
    }
})

myBot.on("ready", () => {
    console.log("I am ready!")
})
```
<br />

## ✨ Features
- Post your bot guilds count to Discords City api Automaticly

<br />

## 📃 Documents
There is not much to say at the moment, but you will be able to pass an optional object for more functionality such as Interval timer, and more.

```js
const options = {
    interval: 300000, // Interval timer in miliseconds
    postOnStart: true // or false, Automaticly post data whenever the client is ready.
}
const discordsCity = new DiscordsCity("YOUR_DISCORDS_CITY_TOKEN", myBot, options)
```

<br />

### [MIT License](https://github.com/DiscordsCity/DiscordsCity-Package/blob/main/LICENSE)
