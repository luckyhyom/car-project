import { Car } from "src/models/cars/entities/car.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tire {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100, nullable: true })
    brand: string;

    @Column({type: 'varchar', length: 10})
    side: string;

    @Column({ type: 'smallint',unsigned: true, nullable: true })
    drivingDistance: number;

    @Column({type: 'smallint', unsigned: true })
    width: number;

    @Column({ type: 'tinyint',unsigned: true })
    aspectRatio: number;

    @Column({type: 'tinyint', unsigned: true })
    wheelDiameter: number;

    @Column({ type: 'varchar', length: 10 })
    constructionType: string;

    @ManyToOne(
        (type) => Car,
        (car) => car.tires,
        {nullable: false, onDelete: 'CASCADE'
    })
    car: Car
}