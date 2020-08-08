import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity()
export class NumParam {
    @PrimaryColumn({ type: 'varchar', length: 50 })
    paramCd!: string

    @PrimaryColumn({ type: 'varchar', length: 50 })
    key!: string

    // typeormの注意。数値型でも型によっては文字型になってしまう。double precisionは数値の扱いになってくれる
    @Column({ type: 'double precision', nullable: true })
    value!: number
}
export default NumParam
