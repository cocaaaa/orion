const db = require("quick.db")
const { MessageEmbed } = require("discord.js");
const { measureMemory } = require("vm");

module.exports = {
    config: {
        name: "hackban",
        aliases: ['forceban'],
        usage: "+hackban (membre/id)",
    },

    run: async(bot, message, args) => {
        const target = args[0];
        if (isNaN(target)) return message.reply(`Merci de donner un id `);

        const reason   = args.splice(1, args.length).join(' ');

            try {
                message.guild.members.ban(target, {reason: reason.length < 1 ? 'Pas de raison donnée': reason});
                const embed2 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription("**J'ai banni cet utilisateur**");
                await message.channel.send(embed2);                
                const channel  = db.fetch(`modlog_${message.guild.id}`);
                if (!channel) return;
            const embed = new MessageEmbed()
                .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
                .setColor("#ff0000")
                .setFooter(message.guild.name, message.guild.iconURL())
                .addField("**Moderation**", "ban")
                .addField("**ID**", `${target}`)
                .addField("**Banned By**", message.author.username)
                .addField("**Reason**", `${reason || "**No Reason**"}`)
                .addField("**Date**", message.createdAt.toLocaleString())
                .setTimestamp();
  
            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send(embed)
            
            } catch (error) { console.log(error)}
    }
}