import { Entity, PrimaryColumn, BaseEntity } from 'typeorm'

@Entity()
export class Character extends BaseEntity {
    @PrimaryColumn({ type: 'varchar', length: 50 })
    charId!: string
}
export default Character
