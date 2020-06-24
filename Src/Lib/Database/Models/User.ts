import {Entity , Column , PrimaryGeneratedColumn , ObjectIdColumn , ObjectID} from "typeorm";

@Entity("user_econony")
export class User {
    @ObjectIdColumn({name: "_id"})
    public _id?: ObjectID;

    @Column("user")
    public user?: string

    @Column("coins")
    public coins?: number

    @Column("items")
    public items?: Array<string>

    @Column("blacklisted")
    public blacklisted?: boolean
}