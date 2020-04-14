const ascii = require('ascii-art');

module.exports = {
    name: "ascii",
    description: "Ascii art",
    usage: "!leaderboard",
    category: "economy",
    accessableby: "Members",
    aliases: ["asci"],
    run: async (client, message, args) => {

    if (!args.join(' ')) return message.reply('please specify texts for the ascii conversion');

    ascii.font(args.join(' '), 'Doom', async txt => {
        message.channel.send(txt, {
            code: 'md'
        });
    });

}
}
