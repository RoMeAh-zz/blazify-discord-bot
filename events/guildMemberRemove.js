module.exports = async (client, member) => {
  
  const channel = member.guild.channels.find(
    channel => channel.id === "698993244230647829"
  );
  if (!channel) return;
  channel.send(`What a bad user he was, he left our server, ${member}`);
  
}