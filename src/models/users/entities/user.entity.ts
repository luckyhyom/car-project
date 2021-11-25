import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryColumn({ type: "varchar", length: 20 })
    userId: string;

    @Column({ type: "varchar", length: 20 })
    password: string;
}