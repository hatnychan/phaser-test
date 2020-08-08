import { Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class User {
    @PrimaryColumn({ type: 'varchar', length: 50 })
    userId!: string
}
export default User
