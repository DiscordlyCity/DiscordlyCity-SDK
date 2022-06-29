const { Client } = require("discord.js")
const { DiscordCity } = require("discords.city")

const myBot = new Client(/*{....}*/)
const discordCity = new DiscordCity("YOUR_DISCORDS_CITY_TOKEN", myBot)

myBot.login("YOUR_DISCORD_TOKEN")

discordCity.autoPost((err, data) => {
    if (err) {
        console.error(err)
    } else {    
        console.log('Discords City Status Updated.')
    }
})

myBot.on("ready", () => {
    console.log("I am ready!")
})