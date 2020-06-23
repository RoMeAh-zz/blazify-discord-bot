import {Entity , Column , PrimaryGeneratedColumn , ObjectIdColumn , ObjectID} from "typeorm";

@Entity("guildsettings")
export class GuildSettings {
    @ObjectIdColumn({name: "_id"})
    public _id?: ObjectID;

    @Column("guild")
    public guild?: string

    @Column("prefix")
    public prefix?: string

    @Column("enableXPCoins")
    public enableXPCoins?: Boolean

    @Column("enableXP")
    public enableXP?: Boolean

    @Column("enableCaptcha")
    public enableCaptcha?: Boolean

    @Column("enableVerification")
    public enableVerification?: Boolean

    @Column("enableAntiSpam")
    public enableAntiSpam?: Boolean

    @Column("enableModeration")
    public enableModeration?: Boolean

    @Column("enableFun")
    public enableFun?: Boolean

    @Column("enableGiveaway")
    public enableGiveaway?: Boolean

    @Column("enableEconomy")
    public enableEconomy?: Boolean

    @Column("enableMusic")
    public enableMusic?: Boolean

    @Column("enableGaming")
    public enableGaming?: Boolean

    @Column("enableUtility")
    public enableUtility?: Boolean

    @Column("enableWelcome")
    public enableWelcome?: Boolean

    @Column("logChannel")
    public logChannel?:  string

    @Column("reportChannel")
    public reportChannel?: string

    @Column("welcomeChannel")
    public welcomeChannel?: string

    @Column("welcomeMessage")
    public welcomeMessage?:  string

    @Column("leaverChannel")
    public leaverChannel?:  string

    @Column("leaverMessage")
    public leaverMessage?:  string

    @Column("verifyChannel")
    public verifyChannel?:  string

    @Column("verifyRole")
    public verifyRole?:  string
}