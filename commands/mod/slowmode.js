module.exports = {
    config: {
          name: "slowmode",
          description: "Actives le mode lent dans un salon",
          aliases: ['sm']
    },
  run: async (bot, message, args) => {
  
    if (!args[0])
      return message.channel.send(
        `Tu n'as pas précisé le cooldown (en secondes)`
      );
      
    if (isNaN(args[0])) return message.channel.send(`Ce n'est pas un nombre`);
    
    message.channel.setRateLimitPerUser(args[0]);
    message.channel.send(
      `Le mode lent de ce salon est maintenant de  **${args[0]}**`
    );
  },
};