import { Client } from 'discord.js';

export default class BaseClient
{
    readonly isReady: boolean = false;

    constructor(readonly token: string, readonly client: Client)
    {
        if (!token)

            throw new Error('Missing Discordly.City Token.');

        if (!client)

            throw new Error('Missing Discord.js Client.');

        if (!(client instanceof Client))

            throw new Error('Received client is not an instance of Discord.js Client.');
    }
}
