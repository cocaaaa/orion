const Discord = require("discord.js")
const moment = require('moment');

const status = {
    online: "En ligne",
    idle: "Inactif",
    dnd: "Ne pas déranger",
    offline: "Hors ligne/Invisible"
};

module.exports = {
    config: {
        name: "ui",
        description: "info utilisateur",
        usage: "+ui <membre/id>",
        aliases: ['userinfo']
    },
    run: async (bot, message, args) => {
        var permissions = [];
        var acknowledgements = 'Rien';
        let whoisPermErr = new Discord.MessageEmbed()
        .setTitle("**User Permission Error!**")
        .setDescription("**Tu ne peux pas faire ça  !**")

        if(!message.channel.permissionsFor(message.author).has("MANAGE_MESSAGES") ) return message.channel.send(whoisPermErr)

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        

        if(member.hasPermission("KICK_MEMBERS")){
            permissions.push("Kick Members");
        }
        
        if(member.hasPermission("BAN_MEMBERS")){
            permissions.push("Ban Members");
        }
        
        if(member.hasPermission("ADMINISTRATOR")){
            permissions.push("Administrator");
        }
    
        if(member.hasPermission("MANAGE_MESSAGES")){
            permissions.push("Manage Messages");
        }
        
        if(member.hasPermission("MANAGE_CHANNELS")){
            permissions.push("Manage Channels");
        }
        
        if(member.hasPermission("MENTION_EVERYONE")){
            permissions.push("Mention Everyone");
        }
    
        if(member.hasPermission("MANAGE_NICKNAMES")){
            permissions.push("Manage Nicknames");
        }
    
        if(member.hasPermission("MANAGE_ROLES")){
            permissions.push("Manage Roles");
        }
    
        if(member.hasPermission("MANAGE_WEBHOOKS")){
            permissions.push("Manage Webhooks");
        }
    
        if(member.hasPermission("MANAGE_EMOJIS")){
            permissions.push("Manage Emojis");
        }
    
        if(permissions.length == 0){
            permissions.push("Tu ne peux pas faire ça ! ");
        }
    
        if(member.user.id == message.guild.ownerID){
            acknowledgements = 'Couronne du serv';
        }
    
        const embed = new Discord.MessageEmbed()
            .setDescription(`<@${member.user.id}>`)
            .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL())
            .setColor('#2F3136')
            .setFooter(`ID: ${message.author.id}`)
            .setThumbnail(member.user.displayAvatarURL())
            .setTimestamp()
            .addField("__Status__",`${status[member.user.presence.status]}`, true)
            .addField('__A rejoint le serveur le:__ ',`${moment(member.joinedAt).format("DD/MM/YYYY")}`, true)
            .addField('__Compte crée le:__', member.user.createdAt.toLocaleString(), true)
            .addField(`\n__Roles [${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).length}]__`,`${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `<@&${roles.id }>`).join(" **|** ") || "Pas de rôles"}`, true)
            .addField("\n__Statut:__ ", `${acknowledgements}`, true)
            .addField("\n__Perms:__ ", `${permissions.join(` | `)}`);
            
        message.channel.send({embed});
    
    }
    }
