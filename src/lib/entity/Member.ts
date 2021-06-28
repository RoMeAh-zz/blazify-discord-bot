import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MemberEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  _id: string;

  @Column()
  id: string;

  @Column()
  guild: string;

  @Column({ default: 0 })
  level: number;

  @Column({ default: 0 })
  xp: number;
}
