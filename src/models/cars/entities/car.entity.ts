import { Tire } from "src/models/tires/entities/tire.entity";
import { User } from "src/models/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Car {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'mediumint', unsigned: true })
    trimId: number;

    @ManyToOne((type) => User, (user) => user.cars)
    user: User;

    @OneToMany((type) => Tire, (tire) => tire.car)
    tires: Tire[];
}