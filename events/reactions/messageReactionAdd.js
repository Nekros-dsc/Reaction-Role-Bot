const Event = require('../../structures/Event');
const { MessageReaction, User, MessageEmbed } = require("discord.js");
const Db = require("../../packages/reactionrole/models/schema.js")
const reactionCooldown = new Set();
const discord = require("discord.js");
const Discord = require("discord.js");
const moment = require('moment')
const GuildDB = require('../../database/guild');
const ticketCooldownLol = new Set();
const botCooldown = new Set();

/**
 *
 * @param {MessageReaction} reaction
 * @param {User} user
 */

module.exports = class extends Event {
	async run(messageReaction, user) {
	

if (this.client.user === user) return;

const { message, emoji } = messageReaction;


const member = message.guild.members.cache.get(user.id);


const guildDB = await GuildDB.findOne({
  guildId: message.guild.id
})


await Db.findOne({
        guildid: message.guild.id,
        reaction: emoji.toString(),
        msgid: message.id,
      },

   async (err, db) => {


  if(!db) return;


  if(message.id != db.msgid) return; 


  const rrRole = message.guild.roles.cache.get(db.roleid);
  

  if (!rrRole) return;


if(botCooldown.has(message.guild.id)) return;

let guild = this.client.guilds.cache.get(db.guildid); 
let guildName = guild.name;

let slowDownEmbed = new MessageEmbed()
.setDescription(`Ralentissez, vous avez un temps de recharge\n\n**Nom du rôle :** ${rrRole.name}\n**Nom du serveur:** ${guildName}`)
.setColor(message.client.color.red)


let addEmbed = new MessageEmbed()
.setAuthor('Role ajouté', `https://i.pinimg.com/originals/ed/a7/f3/eda7f39a28ff7d7e34ad4d5e99fb814a.png` , `${message.url}` )
.setDescription(`Vous avez reçu le **${rrRole.name}** role en réagissant dans ${guildName}`)
.setFooter(`/novaworld`)
.setColor(message.client.color.green)



let remEmbed = new MessageEmbed()
.setAuthor('Role retiré', `https://i.pinimg.com/originals/ed/a7/f3/eda7f39a28ff7d7e34ad4d5e99fb814a.png` , `${message.url}` )
.setDescription(`Vous avez supprimé le **${rrRole.name}** Rôle en réagissant dans ${guildName}`)
.setFooter(`/novaworld`)
.setColor(message.client.color.green)


let errorReaction = new MessageEmbed()
.setAuthor('Reaction Role Error', `https://i.pinimg.com/originals/ed/a7/f3/eda7f39a28ff7d7e34ad4d5e99fb814a.png` , `${message.url}` )
.setDescription(` Échec de l'ajout du rôle, car il me manque l'autorisation de gestion des rôles.\n\nVeuillez en informer un administrateur.`)
.setFooter(`/novaworld`)
.setColor(message.client.color.green)

if(reactionCooldown.has(user.id)) {

 
 user.send(slowDownEmbed).catch(()=>{});
 botCooldown.add(message.guild.id)
 setTimeout(()=>{
 botCooldown.delete(message.guild.id)
 }, 4000)


}





if(db.option === 1) {
      try {
       if(!member.roles.cache.find(r => r.name.toLowerCase() === rrRole.name.toLowerCase())){

  

        await member.roles.add(rrRole).catch(()=>{})
        if(guildDB.reactionDM === true){
        member.send(addEmbed).catch(()=>{})
        }
        reactionCooldown.add(user.id);
        setTimeout(()=>{
        reactionCooldown.delete(user.id)
        }, 2000);
      }
      } catch {


        if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return;
       botCooldown.add(message.guild.id)
 setTimeout(()=>{
 botCooldown.delete(message.guild.id)
 }, 6000)
        return member.send(errorReaction).catch(()=>{})
    }
  }

if(db.option === 2) {
  try {
      if (!member.roles.cache.find(r => r.name.toLowerCase() === rrRole.name.toLowerCase())) {
      await member.roles.add(rrRole).catch(()=>{})
        if(guildDB.reactionDM === true){
        member.send(addEmbed).catch(()=>{})
        }
      reactionCooldown.add(user.id);
      setTimeout(() => {
        reactionCooldown.delete(user.id)
      }, 2000);
      }
  } catch (err) {
    if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return;
 botCooldown.add(message.guild.id)
 setTimeout(()=>{
 botCooldown.delete(message.guild.id)
 }, 6000)
    return member.send(errorReaction).catch(()=>{})
   }
  }
  
  if(db.option === 3) {
    try {
      if (member.roles.cache.find(r => r.name.toLowerCase() === rrRole.name.toLowerCase())){
      await member.roles.remove(rrRole).catch(()=>{})
        if(guildDB.reactionDM === true){
        member.send(remEmbed).catch(()=>{})
        }
      reactionCooldown.add(user.id);
      setTimeout(() => {
        reactionCooldown.delete(user.id)
      }, 2000);
     }
    } catch (err) {
    if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return;
 botCooldown.add(message.guild.id)
 setTimeout(()=>{
 botCooldown.delete(message.guild.id)
 }, 6000)
    return member.send(errorReaction).catch(()=>{})
    }
  }
  
  if(db.option === 4) {
    try {
         if (member.roles.cache.find(r => r.name.toLowerCase() === rrRole.name.toLowerCase())){
        await member.roles.remove(rrRole).catch(()=>{})
        reactionCooldown.add(user.id);
        if(guildDB.reactionDM === true){
        member.send(remEmbed).catch(()=>{})
        }
        setTimeout(()=>{
        reactionCooldown.delete(user.id)
        }, 2000);
        }
    } catch (err) {
    if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return;
 botCooldown.add(message.guild.id)
 setTimeout(()=>{
 botCooldown.delete(message.guild.id)
 }, 6000)
    return member.send(errorReaction).catch(()=>{})   
    }
  }
  
  if(db.option === 5) {
    try {
  if (member.roles.cache.find(r => r.name.toLowerCase() === rrRole.name.toLowerCase())){
      await member.roles.remove(rrRole);
     message.reactions.cache.find(r => r.emoji.name == emoji.name).users.remove(user.id).catch(()=>{})
      
        if(guildDB.reactionDM === true){
        member.send(remEmbed).catch(()=>{})
        }
      reactionCooldown.add(user.id);
      setTimeout(() => {
        reactionCooldown.delete(user.id)
      }, 2000);
     }
    } catch (err) {
    if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return;
 botCooldown.add(message.guild.id)
 setTimeout(()=>{
 botCooldown.delete(message.guild.id)
 }, 6000)
   return member.send(errorReaction).catch(()=>{})
    }
  }


  if(db.option === 6) {
      try {



        if (member.roles.cache.find(r => r.name.toLowerCase() === rrRole.name.toLowerCase())){
          
     message.reactions.cache.find(r => r.emoji.name == emoji.name).users.remove(user.id).catch(()=>{})
        await member.roles.remove(rrRole).catch(()=>{})
    
                reactionCooldown.add(user.id);
        setTimeout(()=>{
        reactionCooldown.delete(user.id)
        }, 5000);

        return;

        } else  if (!member.roles.cache.find(r => r.name.toLowerCase() === rrRole.name.toLowerCase())) {

     message.reactions.cache.find(r => r.emoji.name == emoji.name).users.remove(user.id).catch(()=>{})
        await member.roles.add(rrRole).catch(()=>{})

        if(guildDB.reactionDM === true){
        member.send(addEmbed).catch(()=>{})
        }
        reactionCooldown.add(user.id);
        setTimeout(()=>{
        reactionCooldown.delete(user.id)
        }, 5000);
      }

      } catch (err) {

        if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return;
 botCooldown.add(message.guild.id)
 setTimeout(()=>{
 botCooldown.delete(message.guild.id)
 }, 6000)
      return member.send(errorReaction).catch(()=>{})
    }
  }


    });
    
    
 
 }
}
