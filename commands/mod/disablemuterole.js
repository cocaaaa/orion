const db = require('quick.db');

module.exports = {
    config: {
        name: "disablemuterole",
        aliases: ['clearmuterole', 'dmr', 'disablemr', 'dmrole'],
        description: 'Desactiver le role mute sur le serveur',
        usage: '+disablemuterole (nom du role)',
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**Tu ne peux pas faire ça ! **")

        try {
            let a = db.fetch(`muterole_${message.guild.id}`)

            if (!a) {
                return message.channel.send("**Il n'y a pas de role mute a desactiver**")
            } else {
                let role = message.guild.roles.cache.get(a)
                db.delete(`muterole_${message.guild.id}`)

                message.channel.send(`**Le role mute a été désactivé**`)
            }
            return;
        } catch {
            return message.channel.send("**Ce rôle n'existe pas**")
        }
    }
}