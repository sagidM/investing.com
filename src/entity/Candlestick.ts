import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { MoneyType } from "../types";

@Entity('candlesticks')
export class Candlestick {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    open: MoneyType;

    @Column()
    close: MoneyType;

    @Column()
    high: MoneyType;

    @Column()
    low: MoneyType;

    @Column()
    volume: string;

    @Column()
    moment: Date;
}
