const { ownerID } = require('../../owner.json') 

module.exports = {
    config: {
      name: "dm",
      description: "DM un membre du serveur",
      aliases: ['pm']
    },
    run: async (bot, message, args) => {
        
        if(!message.channel.permissionsFor(message.member).has("MANAGE_MESSAGES") && !ownerID.includes(message.author.id)) return;


      let user =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);
      if (!user)
        return message.channel.send(
          `Tu n'as pas mentionné d'utilisateur ou l'id donné est invalide`
        );
      if (!args.slice(1).join(" "))
        return message.channel.send("Veuillez spécifier un message a envoyer");
      user.user
        .send(args.slice(1).join(" "))
        .catch(() => message.channel.send("Cet utilisateur ne peut pas être dm!"))
        .then(() => message.channel.send(`Message envoyé a  ${user.user.tag}`));
    },
  };