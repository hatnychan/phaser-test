import { Entity, PrimaryColumn, Column, BaseEntity } from 'typeorm'

@Entity()
export class MapTilePosotion extends BaseEntity {
    @PrimaryColumn({ type: 'varchar', length: 50 })
    mapId!: string

    @Column({ type: 'jsonb', nullable: true })
    value?: number[][]
}
export default MapTilePosotion
