import { Message , MessageEmbed , MessageReaction  , User} from "discord.js";
import { Repository } from "typeorm";
import { Giveaways } from "..";


export class GiveawayManager {
    static start =  async function (end : number , time : number , item : string, giveawayRepo : Repository<Giveaways> , message : Message) {
        // @ts-ignore
        const msg: Message = await message.util?.send(new MessageEmbed()
            .setAuthor(`Giveaway | Ends at ${end}`)
            .setColor("RANDOM")
            .setTitle(`\`${item}\` is been given away!`)
            .setDescription(`${message.author} is giving away **${item}!**`)
            .setFooter("Giveaway Ends")
            .setTimestamp(end)
        )
        await msg.react("🎉");
        await giveawayRepo.insert ({
            channel: msg.channel.id ,
            message: msg.id ,
            end: end,
            time: time,
        });
        let fetchedRepo = await giveawayRepo.findOne({ message: msg.id})
        // @ts-ignore
        let fetchedTime =  fetchedRepo.time;
        if (!msg) return;
        setTimeout(() => {
            GiveawayManager.end( giveawayRepo , msg )
        }, fetchedTime);
    }
    static edit = async function (end : number , time : number , item : string , giveawayRepo : Repository<Giveaways> , msg : Message) {
        let fetchedRepo = await giveawayRepo.findOne ({message: msg.id})
        // @ts-ignore
        fetchedRepo?.end = end;
        // @ts-ignore
        fetchedRepo?.time = time;
        // @ts-ignore
        await giveawayRepo.save(fetchedRepo);
        const embed: MessageEmbed = msg.embeds[0];
          embed.setAuthor(`Giveaway | Ends at ${end}`)
          embed.setColor("RANDOM")
          embed.setTitle(`\`${item}\` is been given away!`)
          embed.setDescription(`${msg.author} is giving away **${item}!**`)
          embed.setFooter("Giveaway Ends")
          embed.setTimestamp(end)

        await msg.edit (embed)

        await msg.channel.send("Giveaway Edited Successfully")

        setTimeout(() => {
            GiveawayManager.end( giveawayRepo , msg )
        }, time);

    }
    static reroll = async function(giveawayRepo: Repository<Giveaways>, msg: Message) {
        await msg.fetch()
    let result = await giveawayRepo.findOne({ message: msg.id })
        if (result) {
            msg.channel.send ( "The giveaway hasn't end yet" )
        } else {
            // @ts-ignore
            const reaction: MessageReaction = await msg.reactions.cache.filter(r => r.emoji.name === "🎉").first().fetch();
            await reaction.users.fetch ();
            const winner : User = reaction.users.cache.filter ( w => ! w.bot ).random ();

            msg.channel.send ( `${winner} has won the giveaway` )
        }
    }
    static end = async function (giveawayRepo : Repository<Giveaways> , msg : Message) {

        if(!msg) return ;

        let repo = await giveawayRepo.findOne ( {message: msg.id} )
        if(!repo) return ;
        await giveawayRepo.delete ({message: msg.id});

        // @ts-ignore
        const reaction: MessageReaction = await msg.reactions.cache.filter(r => r.emoji.name === "🎉").first().fetch();
        await reaction.users.fetch();
        const winner: User = reaction.users.cache.filter(w => !w.bot ).random();

        const embed: MessageEmbed = msg!.embeds![0];
        embed.setFooter("Giveaway Ended");
        embed.setColor("RANDOM");
        embed.addField("Winner:", winner ? `${winner} (${winner.tag})` : "No Winners");
        await msg!.edit!(embed);

        if(!winner) return;

        await winner.send(`You won a giveaway!! Link to the Giveaway: ${msg.url}`)
    }
    static delete = async function(giveawayRepo: Repository<Giveaways>, msg: Message) {
        await giveawayRepo.delete({message: msg.id})

        await msg.delete ()
    }
}