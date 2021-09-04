const db = require("quick.db")
const { MessageEmbed } = require("discord.js")
const { PREFIX } = require("../../config")

module.exports = {
    config: {
        name: "prefix",
        description: "Changer/connaître le prefix actuel du bot",
        usage: "+prefix <nouveau prefix/reset>",
        exemple: "1) +prefix = \n2) +prefix reset",
        aliases: ["prefix"]
    },

    run: async (bot, message, args) => {
        let option = args[0];

            //PERMISSION
     if(!message.member.hasPermission("MANAGE_GUILD")) {
                return message.channel.send("Tu n'as pas la permission de modifier mon prefix")
              }
            
            if(!option) {
                prefix = db.fetch(`prefix_${message.guild.id}`)
                if (!prefix) prefix = PREFIX;
                let prefEmbed = new MessageEmbed()
                .setColor('YELLOW')
                .setThumbnail(message.guild.iconURL())
                .setDescription(`**\nMon prefix sur \`${message.guild.name}\`  est  **` + `  \`${prefix}\` \n**Ecris \`${prefix}help prefix \` pour plus d'informations**`)
              
              message.channel.send(prefEmbed);
            }

            if(option.toLowerCase() === "reset") {
                db.delete(`prefix_${message.guild.id}`)
                return await message.channel.send("Prefix réinitialisé ✅")
            }
            
            if(args[1]) {
              return message.channel.send("Incorrect [+Prefix (ton prefix)]")
            }
            
            if(args[0].length > 4) {
              return message.channel.send("Mon prefix ne peut pas contenir plus de 4 caractères")
            }
            
            if(args.join("") === PREFIX) {
              db.delete(`prefix_${message.guild.id}`)
             return await message.channel.send("Prefix réinitialisé ✅")
            }
            
            db.set(`prefix_${message.guild.id}`, args[0])
          await message.channel.send(`Fait ✅ | Mon nouveau prefix est ${args[0]}`)
            

        }
        
    }