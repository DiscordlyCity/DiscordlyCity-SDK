import { WidgetThemes, WidgetTypes } from '../types/types';

export default class Widget {
    private readonly supportedThemes = ['theme-1'];
    private readonly supportedTypes = ['user'];
    constructor(public id?: string, public theme: WidgetThemes = 'theme-1') {
        if (!this.supportedThemes.includes(theme)) throw new Error(`Theme '${theme}' is not supported.`);
    }

    public generateUrl(id: string, type: WidgetTypes = 'user', theme: WidgetThemes = this.theme): string {
        this.id = id;

        if (!this.supportedTypes.includes(type)) throw new Error(`Type '${type}' is not supported.`);

        if (!this.supportedThemes.includes(theme)) throw new Error(`Theme '${theme}' is not supported.`);

        return `https://api.discords.city/api/v1/${type}/widget/${theme}/${this.id}`;
    }
}
