import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("giveaway")
export class Giveaways {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({type: "varchar", length: 22})
    channel!: string

    @Column({ type: "varchar", length: 22 })
    message!: string

    @Column({ type: "varchar", length: 22 })
    end!: number

    @Column({ type: "varchar", length: 22 })
    time!: number
}