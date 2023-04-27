const Command = require('../../structures/Command');
const Guild = require('../../database/guild');

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'setprefix',
        aliases: ['prefix'],
        description: 'Définit le préfixe pour ce serveur',
        category: 'Config',
        usage: [ '<prefix>' ],
        examples: [ 'prefix $', 'prefix +', 'prefix ?' ],
        cooldown: 3,
        guildOnly: true,
        userPermission: ['MANAGE_GUILD']
      });
    }

    async run(message, args) {
      if (!message.member.permissions.has("ADMINISTRATOR")) {
        message.reply(`:x: | Tu n'as pas les permissions pour effectuer cette commande`)
}
      const settings = await Guild.findOne({
        guildId: message.guild.id,
      }, (err, guild) => {
        if (err) console.log(err)
      });

      if (args.length < 1) {
        return message.channel.send(`Merci de me donner un préfixe !`)
      }

      await settings.updateOne({
        prefix: args[0]
      });

      return message.channel.send(`Définissez avec succès le préfixe sur **${args[0]}**`)
    }
};
