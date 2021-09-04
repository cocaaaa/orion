const db = require("quick.db");

module.exports = {
  config: {
    name: "setmuterole",
    aliases: ["setmute", "smrole", "smr"],
    description: "Définir le rôle mute",
    usage: "+setmurerole (nom du rôle/id) ",
  },
  run: async (bot, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        "**Tu n'e peux pas faire ça ! **"
      );
    if (!args[0]) {
      let b = await db.fetch(`muterole_${message.guild.id}`);
      let roleName = message.guild.roles.cache.get(b);
      if (message.guild.roles.cache.has(b)) {
        return message.channel.send(
          `**Le role mute pour ce serveur est \`${roleName.name}\`!**`
        );
      } else
        return message.channel.send(
          "**Merci d'entrer un rôle**"
        );
    }

    let role =
      message.mentions.roles.first() ||
      bot.guilds.cache.get(message.guild.id).roles.cache.get(args[0]) ||
      message.guild.roles.cache.find(
        c => c.name.toLowerCase() === args.join(" ").toLocaleLowerCase()
      );

    if (!role)
      return message.channel.send("**Je ne trouve pas ce rôle**");

    try {
      let a = await db.fetch(`muterole_${message.guild.id}`);

      if (role.id === a) {
        return message.channel.send(
          "**Ce rôle est déjà défini comme rôle mute **"
        );
      } else {
        db.set(`muterole_${message.guild.id}`, role.id);

        message.channel.send(
          `**Le rôle mute est maintenant \`${role.name}\` **`
        );
      }
    } catch (e) {
      return message.channel.send(
        "**Je ne peux pas faire ça **",
        `\n${e.message}`
      );
    }
  }
};
