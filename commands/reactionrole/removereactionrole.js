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
        name: 'removerr',
        aliases: ["removereactionrole", "rreactionrole", "deletereactionrole", "delreactionrole", "remrr", "delrr", 'delreaction', 'deletereaction'],
        description: 'Supprimer un rôle de réaction',
        category: 'Reaction Role',
        cooldown: 3,
        usage: '<channel> <messageID> <emoji>',
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
  const missingPermEmbed = new MessageEmbed()
  .setAuthor(`Tu n'as pas les permissions`, message.author.displayAvatarURL())
  .setDescription(`${fail} La commande suivante l'autorisation **Administrateur**`)
  .setFooter(`/novaworld`)
   .setColor(client.color.red)

      let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.guild.channels.cache.find(ch => ch.name === args[0])
    if (!channel) return message.channel.send(new MessageEmbed()
     .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${fail} Fournissez-moi un salon valide`)
  .setFooter(`/novaworld`)
   .setColor(client.color.red)
    );
    
    let ID = args[1]
    if(!ID) return message.channel.send(new MessageEmbed()
     .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${fail} Fournissez-moi un ID de message valide`)
  .setFooter(`/novaworld`)
    );
    let messageID = await channel.messages.fetch(ID).catch(() => { return message.channel.send(new MessageEmbed()
     .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${fail} Je n'ai pas trouvé l'identifiant suivant`)
  .setFooter(`/novaworld`)
   .setColor(client.color.red)
    ); })

           let emoji = args[2]

    if (!emoji) return message.channel.send(new MessageEmbed()
     .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${fail} Fournissez-moi un Emoji valide`)
  .setFooter(`/novaworld`)
   .setColor(client.color.red)
    );

  
    
    if (isCustomEmoji(args[2])) return message.channel.send(new MessageEmbed()
     .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${fail} N'utilisez pas d'Emojis personnalisés !`)
  .setFooter(`/novaworld`)
   .setColor(client.color.red)
    );
    
   

    await react.reactionDelete(client, message.guild.id , ID, emoji);
    
     message.channel.send(new MessageEmbed()
   .setColor(client.color.green)
     .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${success} Supprimé le [Reaction Role](${messageID.url})`)
  .setFooter(`/novaworld`))
  


        function isCustomEmoji(emoji) {
      return emoji.split(":").length == 1 ? false : true;
    }
    
    }
};
