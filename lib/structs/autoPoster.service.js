"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoPoster = void 0;
var axios_1 = __importDefault(require("axios"));
var discord_js_1 = require("discord.js");
var Poster = function (token, client) {
    var data = JSON.stringify({
        "token": token,
        "bot": {
            "botId": client.user.id,
            "guildCount": client.guilds.cache.size
        }
    });
    var config = {
        method: 'patch',
        url: 'https://api.discords.city/api/v1/bot/guildCount',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };
    (0, axios_1.default)(config)
        .then(function () {
        console.log(client.user.tag + ' guilds count was successfully posted to the Discords City api');
    })
        .catch(function (error) {
        console.log(error);
    });
};
function AutoPoster(token, client, options) {
    var _this = this;
    if (!token) {
        throw new Error('Missing Discords.City Token');
    }
    if (!client) {
        throw new Error('Missing Discord.js Client');
    }
    if (!(client instanceof discord_js_1.Client)) {
        throw new Error('This Client is not a Discord.js Client');
    }
    if (options === null || options === void 0 ? void 0 : options.interval) {
        if (isNaN(Number(options.interval))) {
            throw new Error('Please enter only the number in the interval option');
        }
        if (options.interval < 300000) {
            throw new Error('The interval option should not be less than 300000 milliseconds');
        }
        client.on('ready', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (options === null || options === void 0 ? void 0 : options.postOnStart) {
                    Poster(token, client);
                }
                setInterval(function () { return Poster(token, client); }, options.interval);
                return [2 /*return*/];
            });
        }); });
    }
    else {
        client.on('ready', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                Poster(token, client);
                return [2 /*return*/];
            });
        }); });
        client.on('guildCreate', function (guild) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                Poster(token, client);
                return [2 /*return*/];
            });
        }); });
        client.on('guildDelete', function (guild) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                Poster(token, client);
                return [2 /*return*/];
            });
        }); });
    }
}
exports.AutoPoster = AutoPoster;
