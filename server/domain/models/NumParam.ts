import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity()
export class NumParam extends BaseEntity {
    @PrimaryColumn({ type: 'char', length: 5 })
    paramCd!: number

    @PrimaryGeneratedColumn()
    seq!: number

    @Column({ type: 'decimal', nullable: true })
    value?: number
}
