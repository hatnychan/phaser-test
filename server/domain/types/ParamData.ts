export type ParamData = [SerializeNumParam, SerializeStrParam]

export type SerializeNumParam = {
    [x: string]: {
        [x: string]: number
    }
}

export type SerializeStrParam = {
    [x: string]: {
        [x: string]: string
    }
}
