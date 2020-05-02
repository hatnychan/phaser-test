import { Entity, PrimaryColumn, Column, BaseEntity } from 'typeorm'

@Entity()
export class User extends BaseEntity {
    @PrimaryColumn({ type: 'varchar', length: 50 })
    userId!: string

    @Column({ type: 'varchar', length: 50 })
    userName!: string
}
export default User
