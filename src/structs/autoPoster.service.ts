import axios, { AxiosError } from 'axios';
import { Client, Guild } from 'discord.js';

const Poster = (token, client) =>
{
    const data = JSON.stringify(
        {
            "accessToken": token,
            "bot":
                {
                    "id": client.user.id,
                    "guildCount": client.guilds.cache.size
                }
        });

    const config =
        {
            method: 'patch',
            url: 'https://api.discords.city/api/v1/bot/guildCount',
            headers:
                {
                    'Content-Type': 'application/json'
                },
            data
        };

    axios(config)
        .then(() =>
        {
            console.log(client.user.tag + ' guilds count was successfully posted to the Discords City api');
        })
        .catch((error: AxiosError) =>
        {
            console.log(error);
        });
}

export function AutoPoster(token, client, options?: { interval?: number, postOnStart?: boolean })
{
    if (!token)
    {
        throw new Error('Missing Discords.City Token')
    }
    if (!client)
    {
        throw new Error('Missing Discord.js Client')
    }

    if (!(client instanceof Client))
    {
        throw new Error('This Client is not a Discord.js Client')
    }

    if (options?.interval)
    {
        if (isNaN(Number(options.interval)))
        {
            throw new Error('Please enter only the number in the interval option')
        }

        if (options.interval < 300000)
        {
            throw new Error('The interval option should not be less than 300000 milliseconds')
        }

        client.on('ready', async () =>
        {
            if (options?.postOnStart)
            {
                Poster(token, client);
            }

            setInterval(() => Poster(token, client), options.interval);
        });
    }
    else
    {
        client.on('ready', async () =>
        {
            Poster(token, client);
        });

        client.on('guildCreate', async (guild: Guild) =>
        {
            Poster(token, client);
        });

        client.on('guildDelete', async (guild: Guild) =>
        {
            Poster(token, client);
        });
    }
}
