const db = require('quick.db');

module.exports = {
    config: {
        name: 'disablexp',
        aliases: ['dxp'],
        description: 'Désactiver le système d xp sur le serveur',
        usage: '+disablexp '
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**Tu ne peux pas faire ça ! **")

        try {
            let a  = await db.fetch(`guildMessages_${message.guild.id}`)

            if (!a) {
                return message.channel.send("**Le système d'xp n'est pas activé sur ce serveur**")
            } else {
                db.delete(`guildMessages_${message.guild.id}`)

                message.channel.send("**J'ai désactivé le système d'xp sur le serveur**")
            }
            return;
        } catch {
            return message.channel.send("**Quelque chose s'est mal passé**")
        }
    }
}