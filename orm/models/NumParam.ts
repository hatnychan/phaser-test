import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity()
export class NumParam extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number

    @PrimaryGeneratedColumn()
    public seq: number

    @Column()
    public value: string

    constructor(id: number, seq: number, value: string) {
        super()
        this.id = id
        this.seq = seq
        this.value = value
    }
}
