const db = require('quick.db');

module.exports = {
    config: {
        name: "disablemodlogchannel",
        aliases: ['dmc', 'disablem', 'disablemodlog'],
        category: 'moderation',
        description: 'Désactive les logs ',
        usage: '+disablemodlogchannel (salon/id)',
        accessableby: 'Administrators'
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**Tu ne peux pas faire ça ! **")

        try {
            let a = db.fetch(`modlog_${message.guild.id}`)

            if (!a) {
                return message.channel.send('**Aucun salon de log trouvé**')
            } else {
                let channel = message.guild.channels.cache.get(a)
                bot.guilds.cache.get(message.guild.id).channels.cache.get(channel.id).send("**Salon désactivé**")
                db.delete(`modlog_${message.guild.id}`)

                message.channel.send(`**Les logs ont été désactivés**`)
            }
            return;
        } catch {
            return message.channel.send("**Ce salon n'existe pas **")
        }
    }
}