const { Client, Collection } = require("discord.js");
const Util = require('./structures/Util');
const config = require('./config.json');
const token  = config.main_token
const mongoose = require('mongoose')

module.exports = class botClient extends Client {
	constructor(options = {}, sentry) {
	  super({
      partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER'],
      cacheGuilds: true,
      cacheChannels: true,
      cacheOverwrites: false,
      cacheRoles: true,
      cacheEmojis: true,
      cachePresences:  true,
      fetchAllMembers: true,
      disableMentions: 'everyone',
      messageCacheMaxSize: 25,
      messageCacheLifetime: 10000, 
      messageSweepInterval: 12000,
      ws: {
        intents: [
        "GUILDS",
        "GUILD_MEMBERS",
        "GUILD_MESSAGES",
        "GUILD_EMOJIS",
        'GUILD_MESSAGE_REACTIONS',
        ],
      },
    });
    
    this.validate(options);
    this.partials = ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER'],
    this.commands = new Collection();
    this.events = new Collection();
    this.aliases = new Collection();
    this.utils = new Util(this);
    this.config = require('./config.json');
  }
  
  validate(options) {
    if (typeof options !== 'object') throw new TypeError('Les options doivent être un type d\'objet.');

    if (!token) throw new Error('Vous devez transmettre le jeton pour le client.');
    this.token = token;

    if(!options.prefix) throw new Error('You must pass a prefix for the client.');
    if(typeof options.prefix !== 'string') throw new TypeError('Le préfixe doit être un type de string.');
    this.prefix = options.prefix;

    if (!options.mongodb_url) throw new Error('Vous devez passer une URL MONGODB pour le client.')
  }

  async start(token = this.token) {
    this.utils.loadCommands()
    this.utils.loadEvents()


    const connect = {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    };

    mongoose.connect(config.mongodb_url, connect);
    
    this.login(config.token);

    console.log('Le bot est connecté!');
  }

};

//NE PAS TOUCHER discord.gg/novaworld
