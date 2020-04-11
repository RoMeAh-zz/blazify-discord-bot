module.exports = async (client, member, message ) => {
  
    const channel = member.guild.channels.find(
    channel => channel.name === "temp-chat"
  );
  if (!channel) return;
  channel.send(`Welcome to the Blaze 3 Official Server ${member}`)
  
  
}