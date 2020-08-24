import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity()
export class GameLog {
    @PrimaryColumn({ type: 'varchar', length: 50 })
    gameLogCd!: string

    @PrimaryColumn({ type: 'varchar', length: 50 })
    key!: string

    @PrimaryColumn({ type: 'varchar', length: 10 })
    lang!: string

    @Column({ type: 'varchar', length: 1000, nullable: true })
    value!: string
}
export default GameLog
