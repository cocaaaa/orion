const { ownerID } = require('../../owner.json') 

module.exports = {
    config: {
        name: "purge",
        aliases: [],
        category: "moderation",
        description: "Supprimes des messages dans un salon ",
        usage: "+purge [nombre de messages]"
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Tu ne peux pas faire ça ! ")
        if (isNaN(args[0]))
            return message.channel.send('**Entres un nombre valide de messages**');

        if (args[0] > 100)
            return message.channel.send("**Merci d'entrer un nombre de messages inférieur à 1OO**");

        if (args[0] < 1)
            return message.channel.send("**Merci d'entrer un nombre de messages supérieur à 1 **");

        message.channel.bulkDelete(args[0])
            .then(messages => message.channel.send(`**J'ai supprimé \`${messages.size}/${args[0]}\` messages**`).then(msg => msg.delete({ timeout: 5000 }))).catch(() => null)
    }
}