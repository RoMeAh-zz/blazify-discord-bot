import {Entity , Column , PrimaryGeneratedColumn , ObjectIdColumn , ObjectID} from "typeorm";


@Entity("RoleReaction")
export class RoleReaction {
    @ObjectIdColumn({name: "_id"})
    public _id?: ObjectID;

    @Column("message")
    public message?: string

    @Column("reason")
    public emojiRoleMappings?: Array<string>
}