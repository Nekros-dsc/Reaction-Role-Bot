const Command = require('../../structures/Command');
const Guild = require('../../database/guild');
const { MessageEmbed } = require('discord.js');

const ReactionRole = require("../../packages/reactionrole/models/schema")
const config = require("../../config.json");


module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'wipe',
        aliases: ["reactionrolewipe", "reactionroleswipe", "rrwipe"],
        description: 'Effacer tous les rôles de réaction de la guilde actuelle',
        category: 'Reaction Role',
        cooldown: 3,
        userPermission: ['MANAGE_GUILD'],
      });
    }

    async run(message, args) {
    let client = message.client

    if (!message.member.permissions.has("ADMINISTRATOR")) {
      message.reply(`:x: | Tu n'as pas les permissions pour effectuer cette commande`)
}

       const guildDB = await Guild.findOne({
        guildId: message.guild.id
      });

      


const conditional = {
   guildid: message.guild.id
}
const results = await ReactionRole.find(conditional)

if (results && results.length) {
    for (const result of results) {
        const { guildid } = result

        try {
            await ReactionRole.deleteOne(conditional)
        } catch (e) {
            console.log(e)
        }

    }

}


let resultsHeheLol = results.length
let resultsHehe = `reaction roles`
if (resultsHeheLol == '1') resultsHehe = 'reaction role';

if (resultsHeheLol === '0' || !results || !results.length){

let wipeEmbed3 = new MessageEmbed()
.setColor(message.client.color.green)
.setAuthor(message.author.tag, message.author.displayAvatarURL())
.setDescription(`Le serveur actuel n'a aucun rôle de réaction existant !`)
.setFooter(`/novaworld`)

message.channel.send(wipeEmbed3)

  return;
}

let wipeEmbed = new MessageEmbed()
.setColor(message.client.color.green)
.setAuthor(message.author.tag, message.author.displayAvatarURL())
.setDescription(`J'ai bien supprimé **${results.length}** ${resultsHehe} du serveur.`)
.setFooter(`/novaworld`)


message.channel.send(wipeEmbed)
    }
};