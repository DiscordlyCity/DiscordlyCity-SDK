# Discords.City
Discords City officially NPM Package to make it easier to develop [Discords City API](https://api.discords.city/api)

<br />

## ⚙ Installation
`npm install discords.city`

<br />

## 📜 Example

- AutoPost Example
A full working example can be found in [example/index.js](https://github.com/DiscordsCity/DiscordsCity-SDK/blob/main/example/index.js)

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

- Widget Example
```js
const { Widget } = require("discords.city")
const myWidget = new Widget()
const widgetUrl = myWidget.generateUrl("user" /* Widget Type */, "YOUR_DISCORD_ID", "YOUR_WIDGET_THEME") // Theme is an optional argument.
console.log(widgetUrl) // ex. https://api.discords.city/api/v1/user/widget/theme-1/488958506280550402
```
<br />

## ✨ Features
- Post your bot guilds count to Discords City api Automaticly
- Get your User/<del>Bot/Guild</del> Widget
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

### [MIT License](https://github.com/DiscordsCity/DiscordsCity-SDK/blob/main/LICENSE)
