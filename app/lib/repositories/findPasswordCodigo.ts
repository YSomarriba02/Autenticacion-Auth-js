import querySQL2 from "../bd";

export default async function findPasswordCodigo({ id }: { id: number }) {
    const passwordCodigo = await querySQL2(`select id_usuario,codigo,fecha_creacion,intentos from cambiosPasswCodigo where id_usuario = @id`, [{ name: "id", type: "number", value: id }])

    return passwordCodigo[0] || null
}


