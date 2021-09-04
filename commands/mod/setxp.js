const db = require('quick.db');

module.exports = {
    config: {
        name: 'setxp',
        aliases: ['enablexp'],
        description: 'Active le système d xp sur le serveur',
        usage: ' '
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**Tu ne peux pas faire ça ! **")

        try {
            let a = await db.fetch(`guildMessages_${message.guild.id}`)

            if (a) {
                return message.channel.send("**Le système d'xp est déjà activé sur le serveur**")
            } else {
                db.set(`guildMessages_${message.guild.id}`, 1)

                message.channel.send("**Le système d'xp est maintenant activé sur le serveur **")
            }
            return;
        } catch (e) {
            console.log(e)
            return message.channel.send("**Quelque chose s'est mal passé**")
        }
    }
}