const Command = require('../../structures/Command');
const config = require('../../config.json');

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'ping',
        aliases: ["ping", "latency"],
        description: `Afficher le ping de/du ${config.bot_name || 'Bot'} .`,
        category: 'Information',
        cooldown: 3,
      });
    }

    async run(message) {


        const msg = await message.channel.send('Pinging...');
        const latency = msg.createdTimestamp - message.createdTimestamp;
  
        msg.edit(` \`\`\`js
  Temps pris ${latency}ms
  Discord API: ${Math.round(this.client.ws.ping)}ms\`\`\``);


      }
};