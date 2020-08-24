import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity()
export class User {
    @PrimaryColumn({ type: 'varchar', length: 50 })
    userId!: string

    @Column({ type: 'varchar', length: 20, nullable: false })
    userName!: string

    @Column({ type: 'varchar', length: 50, nullable: false })
    location!: string

    @Column({ type: 'varchar', length: 10, nullable: false })
    lang!: string
}
export default User
