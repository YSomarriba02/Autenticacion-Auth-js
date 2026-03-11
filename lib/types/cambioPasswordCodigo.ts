export interface cambioPasswCodigo {
    id_usuario: number,
    codigo: number,
    fecha_creacion: Date,
    isActive: boolean,
    intentos: number,
}