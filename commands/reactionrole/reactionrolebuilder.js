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
        name: 'builder',
        aliases: ["rrb", "reactionrolebuilder", "reactionbuilder", "rolebuilder", "rrbuilder"],
        description: 'Démarrer un message et créer votre rôle de réaction',
        category: 'Reaction Role',
        cooldown: 3,
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


 
  const cancelledEmbed = new MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${success} Générateur de réaction annulé !`)
  .setFooter(`/novaworld`)

  const cancelledEmbed2 = new MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${fail} Mauvaise réponse, Reaction Builder annulé !`)
  .setFooter(`/novaworld`)

    const timeEnd = new MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${fail} Le temps est écoulé, Reaction Builder annulé !`)
  .setFooter(`/novaworld`)
const filter = m => m.author.id === message.author.id

message.channel.send("Veuillez spécifier un salon! **[salon / ID]**\n\n**Tapez Annuler pour annuler**").then(() => {
  message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ["time"] }).then(async collected => {
    let channel = collected.first().content
    let channelMention = collected.first().mentions
    let channelToSend = channelMention.channels.first() || message.guild.channels.cache.get(channel.toLowerCase()) || message.guild.channels.cache.find(ch => ch.name === channel.toLowerCase())

    if(channel.toLowerCase() === 'cancel'){
      message.channel.send(cancelledEmbed)
      return;
    }
   
    if(!channelToSend) return message.channel.send(cancelledEmbed2)
    
    message.channel.send(`Fournissez-moi un ID de message\n\nAssurez-vous que le message est dans ${channelToSend}\n\n**Tapez Annuler pour annuler**`).then(() => {
        message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ["time"] }).then(async collected1 => {
        let ID = collected1.first().content
            if(ID.toLowerCase() === 'cancel'){
      message.channel.send(cancelledEmbed)
      return;
    }
        let messageID = await channelToSend.messages.fetch(ID).catch(() => { return message.channel.send(cancelledEmbed2) })
          
          message.channel.send("Veuillez me fournir un rôle **[Role / ID]**\n\nLe rôle suivant sera attribué lorsque l'utilisateur réagira !\n\n**Tapez Annuler pour annuler**").then(() => {
            message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ["time"] }).then(collected2 => {
              let roleName = collected2.first().content
              let roleMention = collected2.first().mentions
              let role = roleMention.roles.first() || message.guild.roles.cache.find(rl => rl.name === roleName) || message.guild.roles.cache.get(roleName)
                  if(roleName.toLowerCase() === 'cancel'){
      message.channel.send(cancelledEmbed)
      return;
    }
              if(!role) return message.channel.send(cancelledEmbed2)
                  if(role.managed){
      return message.channel.send(`${message.client.emoji.fail} Veuillez ne pas utiliser de rôle d'intégration.`)
    }
              //novaworld
              
              message.channel.send("Maintenant, veuillez me fournir un Emoji, assurez-vous qu'il ne s'agit pas d'un Emoji personnalisé !\n\L'Emoji suivant sera l'emoji auquel l'utilisateur réagira !\n\n**Tapez Annuler pour annuler**").then(() => {
            message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ["time"] }).then(async (collected3) => {
              let emoji = collected3.first().content

             
              
    if (!emoji) return message.channel.send(new MessageEmbed()
     .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`${fail} Fournissez-moi un Emoji valide`)
  .setFooter(`/novaworld`)
   .setColor(client.color.red)
    );


    if (isCustomEmoji(emoji)) return message.channel.send(new MessageEmbed()
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
              
              message.channel.send("__**Choisissez enfin :**__\n\n`1` - Réagir ajoute le rôle, ne pas réagir supprime le rôle\n`2`- Réagir donnera le rôle mais ne pas réagir ne supprimera pas le rôle\n`3` - Réagir supprimera le rôle de l'utilisateur et ne pas réagir ne donnera pas il revient\n`4` - Lorsque vous réagissez, il supprimera le rôle, ne pas réagir ajoutera le rôle\n`5` - Même concept que le numéro 3 mais supprime la réaction de l'utilisateur\n`6` - Réagissez pour recevoir le rôle et réagir à nouveau pour supprimer le rôle").then(() => {
              message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ["time"] }).then(collected4 => {
                let option = collected4.first().content
                let numbers = ["1", "2", "3", "4", "5", "6"]
                if(!numbers.includes(option)) return message.channel.send("Vous devez spécifier entre 1, 2, 3, 4 ou 5")
                
                message.channel.send(new MessageEmbed()
                .setAuthor('Rôles de réaction - Configuration terminée', message.guild.iconURL(),messageID.url)
                .setColor(client.color.green)
                .addField('Salon', channelToSend, true)
                .addField('Emoji', emoji, true)
                .addField('Type', option, true)
                .addField('Message ID', ID, true)
                .addField('Message', `[Jump sur le Message](${messageID.url})`, true)
                .addField('Role', role, true)
                .setFooter('/novaworld')
                ).then(async () => {
                  messageID.react(emoji)
                  
                   await react.reactionCreate(client, message.guild.id , ID, role.id, emoji, "false", option);
                })
               }).catch(err => { message.channel.send(timeEnd) })
              })
               }).catch(err => { message.channel.send(timeEnd) })
              })
           }).catch(err => { message.channel.send(timeEnd) })
          })
     }).catch(err => { message.channel.send(timeEnd) 
     console.log(err)})
    })
  }).catch(err => { message.channel.send(timeEnd) })
})

        function isCustomEmoji(emoji) {
      return emoji.split(":").length == 1 ? false : true;
    }
    }
}
