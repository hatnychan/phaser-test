import { Entity, PrimaryColumn, Column, BaseEntity } from 'typeorm'

@Entity()
export class NumCharacterAttribute extends BaseEntity {
    @PrimaryColumn({ type: 'varchar', length: 50 })
    charId!: string

    @PrimaryColumn({ type: 'varchar', length: 50 })
    charAttrCd!: string

    @PrimaryColumn({ type: 'varchar', length: 50 })
    key!: string

    @Column({ type: 'double precision', nullable: true })
    value?: number
}
export default NumCharacterAttribute
