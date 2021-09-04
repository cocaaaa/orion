const Discord = require("discord.js")
const { readdirSync } = require("fs");

module.exports = {
    config: {
        name: "reloadmod",
        description: "Recharger une commande ",
        aliases: ['rmod']
    },

    run: async (bot, message, args) => {

        let embed = new Discord.MessageEmbed()
        .setTitle("Reload")
        .setDescription("Cette commande ne peut être executée que par mon créateur ")
        .setColor("#cdf785");
        if(message.author.id !== '677096276126466079') return message.channel.send(embed);

        if(!args[0].toLowerCase()) return message.channel.send("Quelle commande dois-je recharger ? ")

        let commandName = args[0].toLowerCase()

        try {
          
          delete require.cache[require.resolve(`./${commandName}.js`)]
          const pull = require(`./${commandName}.js`)
          bot.commands.set(pull.config.name, pull)
          message.channel.send(`J'ai rechargé \`${commandName}\``)
        }

        catch (e) {
          console.log(e)
          return message.channel.send(`Je ne peux pas recharger la commande ${commandName} car \n${e}`)
        }


      }
} 