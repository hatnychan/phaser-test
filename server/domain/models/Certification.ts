import { Entity, PrimaryColumn, Column, BaseEntity } from 'typeorm'

@Entity()
export class Certification extends BaseEntity {
    @PrimaryColumn({ type: 'varchar', length: 50 })
    userId!: string

    @Column({ type: 'varchar', length: 50 })
    passPhrase!: string
}
export default Certification
