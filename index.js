const botclient = require("./bot");
const config = require("./config.json");
const { keep_alive } = require("./keep_alive");

const bot = new botclient(config);

bot.color = require('./colors.js');

bot.emoji = require('./emojis.js');

bot.react = new Map()

bot.start();


//NE PAS TOUCHER discord.gg/novaworld