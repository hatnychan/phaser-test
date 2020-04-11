import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity()
export class NumParam extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @PrimaryGeneratedColumn()
    seq!: number

    @Column({ length: 1000 })
    value?: string
}
