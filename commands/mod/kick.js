const { MessageEmbed } = require("discord.js");
const db = require('quick.db');

module.exports = {
    config: {
        name: "kick",
        category: "moderation",
        description: "Kick l'utilisateur",
        accessableby: "Administrator",
    usage: "+kick (utilisateur)",
        aliases: [],
    },
    run: async (bot, message, args) => {
        try {
            if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("**Tu n'as pas la permission de faire ça ! **");
            if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send("**I Tu n'as pas la permission de faire ça ! **");

            if (!args[0]) return message.channel.send('**Dis moi qui je dois kick**')

            var kickMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
            if (!kickMember) return message.channel.send("**Cet utilisateur n'existe pas**");

            if (kickMember.id === message.member.id) return message.channel.send("**Tu ne peux pas te kick toi même**")

            if (!kickMember.kickable) return message.channel.send("**Je ne peux pas kick cet utilisateur**")
            if (kickMember.user.bot) return message.channel.send("**Je ne peux pas kick cet utilisateur**")

            var reason = args.slice(1).join(" ");
            try {
                const sembed2 = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`**Tu as été kick de  ${message.guild.name} pour - ${reason || "Aucune raison!"}**`)
                    .setFooter(message.guild.name, message.guild.iconURL())
                kickMember.send(sembed2).then(() =>
                    kickMember.kick()).catch(() => null)
            } catch {
                kickMember.kick()
            }
            if (reason) {
            var sembed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**${kickMember.user.username}** a été kick pour ${reason}`)
            message.channel.send(sembed);
            } else {
                var sembed2 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**${kickMember.user.username}** a été kick`)
            message.channel.send(sembed2);
            }
            let channel = db.fetch(`modlog_${message.guild.id}`)
            if (!channel) return;

            const embed = new MessageEmbed()
                .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
                .setColor("#ff0000")
                .setThumbnail(kickMember.user.displayAvatarURL({ dynamic: true }))
                .setFooter(message.guild.name, message.guild.iconURL())
                .addField("**Moderation**", "kick")
                .addField("**User Kicked**", kickMember.user.username)
                .addField("**Kick par**", message.author.username)
                .addField("**Raison**", `${reason || "**Pas de raison**"}`)
                .addField("**Date**", message.createdAt.toLocaleString())
                .setTimestamp();

            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send(embed)
        } catch (e) {
            return message.channel.send(`**${e.message}**`)
        }
    }
}