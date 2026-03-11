import querySQL2 from "../bd";

export default async function insertTokenVerificacionEmail({ id_usuario, token }: { id_usuario: number, token: string }) {
    const resp = await querySQL2("insert into TokensVerificacionEmail(id_usuario,token) output inserted.id_usuario, inserted.token values(@id_usuario,@token)", [{ name: "id_usuario", type: "number", value: id_usuario }, { name: "token", type: "string", value: token }])

    return resp[0] || null
}