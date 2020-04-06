module.exports = {
    name: "afk",
    aliases: ["away"],
    category: "moderation",
    description: "Sets the AFK Status of a user",
    run: async (client, message, args) => {
      
      let reason = args.join(" ") ? args.join(" ") : "AFKING";
      let afks = client.afk.get(message.author.id);

      if (!afks) {
        let data = {
          id: message.author.id,
          reason: reason
        };
        
        client.afk.set(message.author.id, data);
        return message.channel.send(`You are now afk. Reason: ${reason}`)
      };
    }
}