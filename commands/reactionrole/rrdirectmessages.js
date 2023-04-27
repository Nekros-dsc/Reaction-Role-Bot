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
        name: 'dm',
        aliases: ["reactionrolesdm", "rrdirectmessages", "rrdm"],
        description: 'Activer / désactiver les DM de rôle de réaction',
        category: 'Reaction Role',
        cooldown: 3,
        usage: 'on / off',
        userPermission: ['MANAGE_GUILD'],
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
    

      
    
      let fail = message.client.emoji.fail
      let success = message.client.emoji.success
      const prefix = guildDB.prefix || 'rr!';



   let properUsage = new MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setDescription(`__**Utilisation**__\n\n\`1-\` ${prefix}rrdm on\n\`2-\` ${prefix}rrdm off`)
        .setFooter('/novaworld')

      if (args.length < 1) {
        return message.channel.send(properUsage);
      }

 
      if (args.includes('disable') || args.includes('off')) {
  
      await Guild.findOne({
        guildId: message.guild.id
    }, async (err, guild) => {
 if(guild.reactionDM === false) return message.channel.send(new MessageEmbed()
   .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${fail} Les mp sont déjà désactivés !`)
  .setFooter(`/novaworld`)
   .setColor(client.color.red)
 )
        guild.updateOne({
          reactionDM: false
        })
        .catch(err => console.error(err));

message.channel.send(new MessageEmbed()
   .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${success} Les DM de rôle de réaction ont été désactivés !`)
  .setFooter(`/novaworld`)
   .setColor(client.color.red)
 )
    })
      } else if (args.includes('enable') || args.includes('on')) {


     await Guild.findOne({
        guildId: message.guild.id
    }, async (err, guild) => {

 if(guild.reactionDM === true) return message.channel.send(new MessageEmbed()
   .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${fail} Les DM sont déjà activés`)
  .setFooter(`/novaworld`)
   .setColor(client.color.red))
        guild.updateOne({
          reactionDM: true
        })
        .catch(err => console.error(err));

 
message.channel.send(new MessageEmbed()
   .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${success} Les DM de rôle de réaction ont été activés !`)
  .setFooter(`/novaworld`)
   .setColor(client.color.red)
 )

   })

    } else if(args[0]) {
     message.channel.send(properUsage) 
    } else {
 message.channel.send(properUsage) 

    }


    }
};