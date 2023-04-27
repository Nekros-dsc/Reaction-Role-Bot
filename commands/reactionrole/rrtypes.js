const Command = require('../../structures/Command');
const Guild = require('../../database/guild');
const { MessageEmbed } = require('discord.js');

const ReactionRole = require("../../packages/reactionrole/index.js")
const react = new ReactionRole()
const config = require("../../config.json");
react.setURL(config.mongodb_url)

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'types',
        aliases: ["rrtype", "reactionroletypes", "rrtypes"],
        description: 'Affichera tous les types de rôles de réaction',
        category: 'Reaction Role',
        cooldown: 3,
      });
    }

    async run(message, args) {
      if (!message.member.permissions.has("ADMINISTRATOR")) {
        message.reply(`:x: | Tu n'as pas les permissions pour effectuer cette commande`)
}
    let client = message.client

       const guildDB = await Guild.findOne({
        guildId: message.guild.id
      });
    

      
    
      let fail = message.client.emoji.fail;
      let success = message.client.emoji.success;


  const embedType = new MessageEmbed()
  .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`\`Type 1\` - Réagir ajoute le rôle, ne pas réagir supprime le rôle\n\`Type 2\` - Réagir donnera le rôle mais ne pas réagir ne supprimera pas le rôle\n\`Type 3\` - Réagir supprimera le rôle de l'utilisateur et la non-réaction ne le rendront pas\n\`Type 4\` - Lors de la réaction, il supprimera le rôle, la non-réaction ajoutera le rôle\n\`Type 5\` - Même concept que le numéro 3 mais supprime le réaction de l'utilisateur\n\`Type 6\` - Réagissez pour recevoir le rôle et réagissez à nouveau pour supprimer le rôle`)
  .setFooter(`/novaworld`)
   .setColor(client.color.red)

message.channel.send(embedType)


    }
};
