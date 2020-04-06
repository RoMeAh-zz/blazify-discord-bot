module.exports = async (client, member) => {
  
  const channel = member.guild.channels.find(
    channel => channel.name === "leavers"
  );
  if (!channel) return;
  channel.send(`What a bad user he was, he left our server, ${member}`);
  
}