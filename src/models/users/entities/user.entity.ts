import { Car } from "src/models/cars/entities/car.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    pk: number;

    @Column({ type: "varchar", length: 20, unique: true })
    userId: string;

    @Column({ type: "varchar", length: 20 })
    password: string;

    @OneToMany((type) => Car, (car) => car.user)
    cars: Car[];
}