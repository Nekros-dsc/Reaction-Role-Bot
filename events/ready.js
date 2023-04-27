
const Event = require('../structures/Event');
const config = require('../config.json');

module.exports = class extends Event {
    async run() {


    
    const activities = [
      { name: `${config.bot_name || 'Reaction Roles Bot'}`, type: 'WATCHING' }, 
      { name: '/novawoeld', type: 'WATCHING' }
    ];
  

    this.client.user.setPresence({ status: 'online', activity: activities[0] });
  
    let activity = 1;
  

    setInterval(() => {
      activities[2] = { name: `${config.prefix}help | ${ this.client.guilds.cache.size} serveurs`, type: 'WATCHING' };
      activities[3] = { name: `${config.prefix}help | ${ this.client.users.cache.size} utilisateurs`, type: 'WATCHING' }; 
      if (activity > 3) activity = 0;
      this.client.user.setActivity(activities[activity]);
      activity++;
    }, 35000);


      
  
}

}

