const { Client } = require('discord.js');
const { DiscordlyCity } = require('discordly.city');

const myBot = new Client(/*{....}*/);
const discordlyCity = new DiscordlyCity("YOUR_DISCORDLY_CITY_TOKEN", myBot);

myBot.login('YOUR_DISCORD_TOKEN');

discordlyCity.autoPost((err, data) =>
{
    if (err)
    {
        console.error(err);
    }
    else
    {
        console.log('Discordly City Status Updated.');
    }
});

myBot.on('ready', () =>
{
    console.log('I am ready!');
});
