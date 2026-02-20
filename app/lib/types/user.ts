export interface user {
    id: number
    email: string,
    passw?: string
}

export interface userBd extends user {
    provider_name: string
}