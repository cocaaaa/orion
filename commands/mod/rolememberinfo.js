const { MessageEmbed } = require('discord.js');

module.exports = { 
        config: {
            name: "rolememberinfo",
            description: "Donne la liste des membres ayant le rôle mentionné",
            usage: "+rolememberinfo <nom du rôle/id>",
            aliases: ['rmi', 'rmemberinfo']
        },
        run: async (client, message, args) => {
        if (args.includes("@everyone")) return;
        
        if (args.includes("@here")) return;

        if (!args[0]) return message.channel.send("**Merci d'entrer un rôle**")

        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase());

        if (!role) return message.channel.send("**Ce rôle n'existe pas **");

        let membersWithRole = message.guild.members.cache.filter(member => {
            return member.roles.cache.find(r => r.name === role.name);
        }).map(member => {
            return member.user.username;
        })
        if (membersWithRole > 2048) return message.channel.send('**La liste est trop longue**')

        let roleEmbed = new MessageEmbed()
            .setColor("#2F3136")
            .setThumbnail(message.guild.iconURL())
            .setTitle(`Utilisateurs avec le rôle ${role.name}`)
            .setDescription(membersWithRole.join("\n"));
        message.channel.send(roleEmbed);
    }
}