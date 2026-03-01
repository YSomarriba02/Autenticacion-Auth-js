export default interface TokensVerificacionEmail {
    id: number,
    token: string,
    fecha_creacion: Date,
    isValid: boolean,
    id_usuario: number
}