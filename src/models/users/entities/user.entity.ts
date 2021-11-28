import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    pk: number;

    @Column({ type: "varchar", length: 20, unique: true })
    userId: string;

    @Column({ type: "varchar", length: 20 })
    password: string;
}