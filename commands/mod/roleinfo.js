const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: 'roleinfo',
        description: "montres les infos du role",
        usage: "+roleinfo <rôle>",
        aliases: ['rinfo', 'rolei']
    },
    run: async (bot, message, args) => {
        if (!args[0]) return message.channel.send("**Merci d'entrer un rôle**")
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase());
        if (!role) return message.channel.send("**Ce rôle n'existe pas**");

        const status = {
            false: "Non",
            true: "Oui"
        }

        let roleembed = new MessageEmbed()
            .setColor("#2F3136")
            .setTitle(`Role Info: \`[  ${role.name}  ]\``)
            .setThumbnail(message.guild.iconURL())
            .addField("**ID**", `\`${role.id}\``, true)
            .addField("**Nom**", role.name, true)
            .addField("**Hex**", role.hexColor, true)
            .addField("**Membres**", role.members.size, false)
            .addField("**Position**", role.position, true)
            .addField("**Mentionable**", status[role.mentionable], true)
            .setFooter(message.member.displayName, message.author.displayAvatarURL(), true)
            .setTimestamp()

        message.channel.send(roleembed);
    }
}