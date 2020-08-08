import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity()
export class Certification {
    @PrimaryColumn({ type: 'varchar', length: 50 })
    userId!: string

    @Column({ type: 'varchar', length: 50 })
    passPhrase!: string
}
export default Certification
