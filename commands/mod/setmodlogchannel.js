const db = require("quick.db")

module.exports = {
    config: {
        name: "setmodlogchannel",
        category: "moderation",
        aliases: ['setm', 'sm', 'smc', 'setmodlog'],
        description: "Définit le salon de logs ",
        usage: "+setmodlogchannel (nom du salon/id)",
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**Tu ne peux pas faire ça ! **")
    if (!args[0]) {
      let b = await db.fetch(`modlog_${message.guild.id}`);
      let channelName = message.guild.channels.cache.get(b);
      if (message.guild.channels.cache.has(b)) {
        return message.channel.send(
          `**Le salon de log est maintenant  \`${channelName.name}\`!**`
        );
      } else
        return message.channel.send(
          "**Merci d'entrer un salon/id**"
        );
    }
        let channel = message.mentions.channels.first() || bot.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name.toLowerCase() === args.join(' ').toLocaleLowerCase());

        if (!channel || channel.type !== 'text') return message.channel.send("**Je ne trouve pas ce salon**");

        try {
            let a = await db.fetch(`modlog_${message.guild.id}`)

            if (channel.id === a) {
                return message.channel.send("**Ce salon est déjà le salon de logs **")
            } else {
                bot.guilds.cache.get(message.guild.id).channels.cache.get(channel.id).send("**Fait **")
                db.set(`modlog_${message.guild.id}`, channel.id)

                message.channel.send(`**Le salon de log est maintenant  \`${channel.name}\`!**`)
            }
        } catch {
            return message.channel.send("**Je ne peux pas faire ça **");
        }
    }
};