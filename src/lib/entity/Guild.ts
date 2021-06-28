import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class GuildEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  _id: string;

  @Column()
  id: string;

  @Column({ default: "b!" })
  prefix: string;
}
