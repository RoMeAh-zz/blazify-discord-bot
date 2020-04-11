const { Client, Collection, RichEmbed } = require("discord.js");
const TOKEN = require("./config.json").token;
const mongoose = require("mongoose");
const client = new Client
client.mongoose = require("./utils/mongoose.js");
const guildInvites = new Map();
client.afk = new Map();
["commands", "aliases"].forEach(x => (client[x] = new Collection()));
["command", "event"].forEach(handler => {require(`./handlers/${handler}`)(client);});
client.on('inviteCreate', async invite => guildInvites.set(invite.guild.id, await invite.guild.fetchInvites()));
client.on('ready', () => {
    client.guilds.forEach(guild => {
        guild.fetchInvites()
            .then(invites => guildInvites.set(guild.id, invites))
            .catch(err => console.log(err));
    });
});
client.on("guildMemberAdd", async member => {
    const cachedInvites = guildInvites.get(member.guild.id);
    const newInvites = await member.guild.fetchInvites();
    guildInvites.set(member.guild.id, newInvites);
    try {
        const usedInvite = newInvites.find(inv => cachedInvites.get(inv.code).uses < inv.uses);
        const embed = new RichEmbed()
            .setDescription(`${member.user.tag} is the ${member.guild.memberCount} to join.\nJoined using ${usedInvite.inviter.tag}\nNumber of uses: ${usedInvite.uses}`)
            .setTimestamp()
            .setTitle(`${usedInvite.url}`);
            const channel = member.guild.channels.find(channel => channel.name === 'temp-chat');
        if(channel) {
            channel.send(embed).catch(err => console.log(err));
        }
    }
    catch(err) {
        console.log(err);
    }
})
client.mongoose.init();
client.login(TOKEN);
