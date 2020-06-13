import {Entity , Column , PrimaryGeneratedColumn , ObjectIdColumn , ObjectID} from "typeorm";

@Entity("warns")
export class Warns {
    @ObjectIdColumn({name: "_id"})
    public _id?: ObjectID;

    @Column("guild")
    public guild?: string

    @Column("user")
    public user?: string

    @Column("moderator")
    public moderator?: string

    @Column("reason")
    public reason?: string
}