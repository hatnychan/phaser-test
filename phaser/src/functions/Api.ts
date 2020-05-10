import axios from 'axios'
import { ParamData } from '../../../server/domain/types/ParamData'

export const getInitData = axios.get<ParamData>('/api/init').then(
    (res): ParamData => {
        // システムパラメータ全取得
        const param: ParamData = res.data
        return param
    }
)
