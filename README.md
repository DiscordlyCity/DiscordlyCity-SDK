# Discords.City
Discords City officially NPM Package to make it easier to develop [Discords City API](https://api.discords.city/api)

<br />

## ⚙ Installation
`npm install discords.city`

<br />

## 📜 Usage
```js
const { AutoPoster } = require('iran-info');

// @Post bot guilds count
AutoPoster('DISCORDS_CITY_TOKEN', DISCORDJS_CLIENT);

// @Post bot guilds count in interval
AutoPoster('DISCORDS_CITY_TOKEN', DISCORDJS_CLIENT, { interval: 300000 });

// @Post bot guilds count in interval and on start of client
AutoPoster('DISCORDS_CITY_TOKEN', DISCORDJS_CLIENT, { interval: 300000, postOnStart: true });
```

<br />

## ✨ Features
- Post your bot guilds count to Discords City api

<br />

<br />

### [MIT License](https://github.com/DiscordsCity/DiscordsCity-Package/blob/main/LICENSE)
