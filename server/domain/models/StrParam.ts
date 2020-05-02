import { Entity, PrimaryColumn, Column, BaseEntity } from 'typeorm'

@Entity()
export class StrParam extends BaseEntity {
    @PrimaryColumn({ type: 'varchar', length: 50 })
    paramCd!: string

    @PrimaryColumn({ type: 'varchar', length: 50 })
    key!: string

    @Column({ type: 'varchar', length: 1000, nullable: true })
    value?: string
}
export default StrParam