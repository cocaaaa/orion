const { MessageEmbed } = require('discord.js')

module.exports = {
    config: {
        name: "warn",
        description: "warn un membre",
        usage: "+warn <membre> [raison]",
        aliases: []
    },
    run: async (bot, message, args) => {
        let warnPermErr = new MessageEmbed()
        .setTitle("**User Permission Error!**")
        .setDescription("**Tu ne peux pas faire ça ! **")
            if(!message.channel.permissionsFor(message.member).has(['MANAGE_MESSAGES'])) return message.channel.send(warnPermErr);
    
            let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            if(!member) return message.reply("Je ne trouve pas cet utilisateur");
        
            let reason = args.slice(1).join(' ');
            if(!reason) reason = "(Pas de raison donnée )";
            
            member.send(`Tu as été warn par <${message.author.username}> pour: ${reason}`)
            .catch(error => message.channel.send(`Sorry <${message.author}> Je ne peux pas warn cet utilisateur : ${error}`));
            let warnEmbed = new MessageEmbed()
            .setTitle("**__Warn Report__**")
            .setDescription(`**<@${member.user.id}> has been warned by <@${message.author.id}>**`)
            .addField(`**Reason:**`, `\`${reason}\``)
            .addField(`**Action:**`, `\`Warn\``)
            .addField(`**Moderator:**`, `${message.author}`)

            message.channel.send(warnEmbed)

    }
}