import { BaseEntity , Column , PrimaryColumn , ObjectID , Entity , ObjectIdColumn } from "typeorm";

@Entity("Giveaways")
export class Giveaways extends BaseEntity {
    @ObjectIdColumn({name: "_id"})
    public _id?: ObjectID;

    @PrimaryColumn("message")
    public message?: string

    @Column("channel")
    public channel?: string

    @Column("end")
     public end?: number

    @Column("time")
    public time?: number
}