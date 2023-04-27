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
        name: 'addreaction',
        aliases: ["reactionrole", "rr", "createrr","crr", "addrr", "arr", "rradd"],
        description: 'Créer un rôle de réaction',
        category: 'Reaction Role',
        cooldown: 3,
        usage: '<channel> <messageID> <role> <emoji> (option)',
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
  .setAuthor(`Autorisations utilisateur manquantes`, message.author.displayAvatarURL())
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

    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2]) || message.guild.roles.cache.find(rl => rl.name === args[2])
    if (!role) return message.channel.send(new MessageEmbed()
     .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${fail} Fournissez-moi un rôle valide`)
  .setFooter(`/novaworld`)
   .setColor(client.color.red)
    );

    if(role.managed){
      return message.channel.send(`${message.client.emoji.fail} Veuillez ne pas utiliser de rôle d'intégration.`)
    }
      
     let emoji = args[3]

    if (!emoji) return message.channel.send(new MessageEmbed()
     .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${fail} Fournissez-moi un Emoji valide`)
  .setFooter(`/novaworld`)
   .setColor(client.color.red)
    );

    if (isCustomEmoji(args[3])) return message.channel.send(new MessageEmbed()
     .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${fail} N'utilisez pas d'Emojis personnalisés !`)
  .setFooter(`/novaworld`)
   .setColor(client.color.red)
    );

try {

await messageID.react(emoji)

} catch(err){
 return message.channel.send(new MessageEmbed()
     .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${fail} Veuillez fournir un Emoji valide.`)
  .setColor(client.color.red)
  .setFooter(`/novaworld`));
}
 
    
    let option = args[4]
    if(!option) option = 1
    if(isNaN(option)) option = 1
    if(option > 6) option = 1
    
    
    await react.reactionCreate(client, message.guild.id , ID, role.id, emoji, "false", option);
    
                message.channel.send(new MessageEmbed()
                .setAuthor('Reaction Roles', message.guild.iconURL(),messageID.url)
                .setColor(client.color.green)
                .addField('Salon', channel, true)
                .addField('Emoji', emoji, true)
                .addField('Type', option, true)
                .addField('Message ID', ID, true)
                .addField('Message', `[Jump sur le Message](${messageID.url})`, true)
                .addField('Role', role, true)
                .setFooter('/novaworld'))

        function isCustomEmoji(emoji) {
      return emoji.split(":").length == 1 ? false : true;
    }

    }
};