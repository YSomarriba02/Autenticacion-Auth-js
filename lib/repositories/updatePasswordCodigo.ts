import querySQL2 from "../bd"

type updatePasswordCodigotype = {
    id: number,
    nuevoCodigo: string
}

export default async function updatePasswordCodigo({ id, nuevoCodigo }: updatePasswordCodigotype) {
    const resp = await querySQL2("update cambiosPasswCodigo set intentos = 0, fecha_creacion = GETUTCDATE(), codigo = @nuevoCodigo output inserted.id_usuario where id_usuario = @id", [{ name: "nuevoCodigo", type: "string", value: nuevoCodigo }, { name: "id", type: "number", value: id }])

    return resp[0] || null
}