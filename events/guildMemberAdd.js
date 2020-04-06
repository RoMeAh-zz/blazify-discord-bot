module.exports = async (client, member) => {
  
    const channel = member.guild.channels.find(
    channel => channel.name === "welcome"
  );
  if (!channel) return;
  channel.send(`Welcome to the Blaze 3 Official Server ${member}`);
  
}