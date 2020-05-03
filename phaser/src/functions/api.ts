import axios from 'axios'
import { SerializeNumParam } from '../../../server/domain/types/SerializeNumParam'
import { SerializeStrParam } from '../../../server/domain/types/SerializeStrParam'

export const getInitData = axios.get<[SerializeNumParam[], SerializeStrParam[]]>('/api/init').then((res): [
    SerializeNumParam[],
    SerializeStrParam[]
] => {
    // システムパラメータ全取得
    const param: [SerializeNumParam[], SerializeStrParam[]] = res.data
    return param
})
