import querySQL2 from "../bd"

type updatePasswordCodigotype = {
    id: number,
    intentos: number
}

export default async function updatePasswordCodigoIntento({ id, intentos }: updatePasswordCodigotype) {
    const resp = await querySQL2("update cambiosPasswCodigo set intentos = @intentos output inserted.id_usuario where id_usuario = @id", [{ name: "id", type: "number", value: id }, { name: "intentos", type: "number", value: intentos }])
    return resp[0] || null
}