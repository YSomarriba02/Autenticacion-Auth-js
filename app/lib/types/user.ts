export interface user {
    id: number
    email: string,
    passw?: string,
    isVerificado: boolean
}

export interface userBd extends user {
    provider_name: string
}