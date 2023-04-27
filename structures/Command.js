const { Permissions } = require('discord.js');

module.exports = class Command {
    constructor(client, name, options = {}) {
        this.client = client;
        this.name = options.name || name;
        this.aliases = options.aliases || [];
        this.description = options.description || "Aucune description.";
        this.category = options.category || "General";
        this.usage = `${this.name} ${options.usage || ''}` || "Aucune utilisation.";
        this.examples = options.examples || [];
        this.disabled = options.disabled || false;
        this.cooldown = "cooldown" in options ? options.cooldown : 5 || 5;
        this.ownerOnly = options.ownerOnly || false;
        this.guildOnly = options.guildOnly || false;
        this.nsfwOnly = options.nsfwOnly || false;
        this.botPermission = options.botPermission || ['SEND_MESSAGES', 'EMBED_LINKS'];
        this.userPermission = options.userPermission  || null;
        
    }

    // eslint-disable-next-line no-unused-vars
    async run(message, args) {
        throw new Error(`La méthode run a été implémenté ${this.name}`);
    }

    reload() {
        return this.store.load(this.file.path);
    }
}