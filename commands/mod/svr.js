const { ownerID } = require("../../owner.json")

module.exports = {
    config: {
          name: "svr",
          description: "Change la région du serveur",
          usage: "+svr <region >",
          example: "+svr jp",
          aliases: ['svr'],  
        
},
  run: async (bot, message, args) => {
  
    if (!message.member.hasPermission("MANAGE_GUILD") && !ownerID.includes(message.author.id)) return message.channel.send("Tu ne peux pas faire ça ! ");

    let serverRegion = args.slice(0).join(' ')

    if(!serverRegion) return message.channel.send("Merci d'entrer une region");

    

    
    var availableRegions = ['bz', 'hk', 'jp', 'rus', 'sng', 'sa', 'syd', 'ind', 'usc', 'use', 'usw', 'uss', 'eur']

    if(availableRegions.includes(serverRegion)) {
      try {
        const serverAliases = {
          'bz' : "brazil",
          'hk' : "hongkong",
           'ind' : "india",
          'jp' : "japan",
           'rus' : "russia",
           'sng' : "singapore",
          'sa' : "southafrica",
           'syd' : "sydney",
           'usc' : "us-central",
           'use' : "us-east",
           'uss' : "us-south",
           'usw' : "us-west",
           'eur' : "europe"
         }
        await message.guild.setRegion(serverAliases[serverRegion])
        message.channel.send(`Région du serveur modifiée par  ${serverAliases[serverRegion]}`)
        
      }

      catch(error) {
        console.log(error)
        message.channel.send(`Oups ! Une erreur inconnue s'est produite.`)
      }
    }

    else {
      return message.channel.send("Please provide a valid region ID! Please use \`m/help region\` to view all available region IDs!")
    }

  },
};