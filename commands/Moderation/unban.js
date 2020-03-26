 module.exports = {
   name: "unban",
   permission: ["BAN_MEMBERS"],
   usage: "<name or ID>",
   module: "moderator",
   execute: (message, args) => {
     let o = args[0];
     if (!o) return message.channel.send("Please use `;unban <name or ID>`");
     message.guild.fetchBans().then(m => {
       let e = m
         .map(s => s)
         .find(f => f.username == args.join(" ") || f.id == args[0]);
       if (!e)
         return message.channel.send(
           "It looks like that user is already unbanned or not found."
         );
       message.guild.unban(e.id).then(e => {
         return message.channel.send(
           `**${e.tag} has been unbanned!**`
         );
       }).catch(e => message.channel.send(`It looks like I got an error:\n${e}`))
     });
   }
 };
