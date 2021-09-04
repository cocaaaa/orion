const { ownerID } = require("../../owner.json")

module.exports = {
    config: {
    
        name: "undeafen",
        description: "Unmute casque un membre",
        usage: "Undeafen <utilisateur>",
        aliases: ["undeaf"]
       
    },

    run: async(bot, message, args) => {
     if (!message.member.hasPermission("DEAFEN_MEMBERS") && !ownerID .includes(message.author.id)) return message.channel.send("**Tu ne peux pas faire ça ! **");

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase());

        if(!member) return message.channel.send("Je ne parviens pas à trouve cet utilisateur")

        let reason = args.slice(1).join(" ");
        if (!reason) reason = "Pas de raison donnée"


        try {
            member.voice.setDeaf(false, reason);
            message.channel.send("Fait ✅ : Membre unmute ")
        } 
        
        catch (error) {
            console.log(error)
            message.channel.send("Oups ! Une erreur inconnue s'est produite. ")
        }

    }
}