
 module.exports = {
   name: "unmute",
   permission: ["MANAGE_CHANNELS", "MANAGE_MESSAGES"],
   usage: "<user>",
   module: "moderator",
   execute: (message, args) => {
     let user = message.mentions.members.first();
     if (!user) {
       user = message.guild.members.find(
         m =>
           m.id == args[0] || m.tag == args[0] || m.name == args[0].toLowerCase()
       );
       if (!user) return message.channel.send("That user is not found.");
     }
     let role = message.client.mod.get(`mute_${message.guild.id}`);
     if (!role) {
       role = message.guild.roles.find(m => m.name == "Muted");
       if (!role) {
         return message.channel.send(
           "It looks like this guild has no `Muted` role. If you want to setup it, use `;setmutedrole <role>`"
         );
       } else {
         role = role.id;
       }
     }
     if (
       !user.roles.find(m =>
         message.client.mod.has(`mute_${message.guild.id}`)
           ? m.id == role
          : m.name == "Muted"
       )
     )
       return message.channel.send("That user has already unmuted");
     user.removeRole(role);
     return message.channel.send(
       `${!user.tag ? user.user.tag : user.tag} has been unmuted!`
     );
   }
};
