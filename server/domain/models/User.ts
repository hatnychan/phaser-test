import { Entity, PrimaryColumn, BaseEntity } from 'typeorm'

@Entity()
export class User extends BaseEntity {
    @PrimaryColumn({ type: 'varchar', length: 50 })
    userId!: string
}
export default User
