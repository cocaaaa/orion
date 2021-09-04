const { ownerID } = require("../../owner.json")

module.exports = {
    config: {
    
        name: "vcmove",
        description: "Déplacer un membre d'une voc à une autre ",
        usage: "vcmove <utilisateur> <salon vocal>",
       
    },

    run: async(bot, message, args) => {
         if (!message.member.hasPermission("MOVE_MEMBERS") && !ownerID .includes(message.author.id)) return message.channel.send("**Tu ne peux pas faire ça ! **");
        
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase());

        if(!member) return message.channel.send("Je ne trouve pas cet utilisateur")

        let channel = message.mentions.channels.first() || bot.guilds.cache.get(message.guild.id).channels.cache.get(args[1]) || message.guild.channels.cache.find(c => c.name.toLowerCase() === args.slice(1).join(' ').toLocaleLowerCase());
        if (!channel.type === "voice") return message.channel.send("Je ne trouve pas ce salon vocal") 

        try {
            member.voice.setChannel(channel);
            message.channel.send("Succès ✅ : Ce membre a été déplacé")
        } 
        
        catch(error) {
            console.log(error);
            message.channel.send("Oups ! Une erreur inconnue s'est produite. ")
        }

    }
}