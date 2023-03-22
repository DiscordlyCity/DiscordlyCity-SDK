import { Client as DjsClient } from 'discord.js';
import axios, { AxiosError, AxiosResponse } from 'axios';

import BaseClient from './base';
import Widget from './widget';
import { ClientOpts, ReqApiData, ReqResponse } from '../types/types';

export default class Client extends BaseClient
{
    private readonly axiosClient = axios;
    private axiosConfig =
        {
            method: 'patch',
            url: 'https://api.discordly.city/api/v1/bot/guildsCount',
            headers:
                {
                    'Content-Type': 'application/json'
                },
            data: {}
        };

    public readonly widget = new Widget();

    constructor(token: string, client: DjsClient, public options?: ClientOpts)
    {
        super(token, client);

        if (options?.interval)
        {
            if (isNaN(Number(options.interval)))
                throw new Error('Please enter only the number in the interval option.');

            if (options.interval < 300000)
                throw new Error('The interval option should not be less than 300000 milliseconds.');
        }
    }

    setOptions(opts: ClientOpts)
    {
        if (opts?.interval)
        {
            if (isNaN(Number(opts.interval))) throw new Error('Please enter only the number in the interval option.');

            if (opts.interval < 300000)
                throw new Error('The interval option should not be less than 300000 milliseconds.');
        }

        this.options = opts;
    }

    private buildReqApiData(): ReqApiData | Promise<ReqApiData>
    {
        if (!this.client.user?.id) throw new Error('Client is not ready yet.');

        return {
            token: this.token,
            bot:
                {
                    botId: this.client.user?.id as string,
                    guildsCount: this.client.guilds?.cache?.size
                }
        };
    }

    public async postData(data: ReqApiData | Promise<ReqApiData> = this.buildReqApiData()): Promise<ReqResponse>
    {
        this.axiosConfig.data = JSON.stringify(data);

        try
        {
            const res: AxiosResponse<ReqResponse> = await this.axiosClient(this.axiosConfig);

            if (Number(res.data?.status) !== 201) throw new Error(res.data?.message);
            else return res.data;
        }
        catch (error)
        {
            const e: AxiosError<ReqResponse> = error as AxiosError<ReqResponse>;
            throw new Error(e.request?.data?.message || e);
        }
    }

    public autoPost(cb?: (error: Error | string | undefined, response?: ReqResponse) => void): void
    {
        this.client.prependListener('guildCreate', async() =>
        {
            this.postData()
                .then(res => (cb ? cb(undefined, res) : undefined))
                .catch(e =>
                {
                    if (cb) cb(e, undefined);
                    else throw e;
                });
        });

        this.client.prependListener('guildDelete', async() =>
        {
            this.postData()
                .then(res => (cb ? cb(undefined, res) : undefined))
                .catch(e =>
                {
                    if (cb) cb(e, undefined);
                    else throw e;
                });
        });

        if (this.options?.postOnStart)
        {
            this.client.prependOnceListener('ready', async() =>
            {
                this.postData()
                    .then(res => (cb ? cb(undefined, res) : undefined))
                    .catch(e =>
                    {
                        if (cb) cb(e, undefined);
                        else throw e;
                    });
            });
        }

        if (this.options?.interval)
        {
            setInterval(() =>
            {
                this.postData()
                    .then(res => (cb ? cb(undefined, res) : undefined))
                    .catch(e =>
                    {
                        if (cb) cb(e, undefined);
                        else throw e;
                    });
            }, this.options?.interval);
        }
    }
}
