const { ownerID } = require("../../owner.json")

module.exports = {
    config: {
    
        name: "deafen",
        description: "Mute casque un membre ",
        usage: "deafen <utilisateur>",
        aliases: ["deaf"]
       
    },

    run: async(bot, message, args) => {
         if (!message.member.hasPermission("DEAFEN_MEMBERS") && !ownerID .includes(message.author.id)) return message.channel.send("**Tu n'as pas la permission de faire ça !**");
        
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase());

        if(!member) return message.channel.send("Je ne trouve pas ce membre")

        let reason = args.slice(1).join(" ");
        if (!reason) reason = "Pas de raison donnée"


        try {
            member.voice.setDeaf(true, reason);
            message.channel.send("Validé ✅ : Membre mute casque")
        } 
        
        catch(error) {
            console.log(error)
            message.channel.send("Oups ! Erreur inconnue, réessaies plus tard")
        }

    }
}