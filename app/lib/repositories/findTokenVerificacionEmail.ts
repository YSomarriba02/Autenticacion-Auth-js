import querySQL2 from "../bd";
import TokensVerificacionEmail from "../types/TokenVerificacionEmail";

export default async function findTokenVerificacionEmail({ id_usuario }: { id_usuario: number }): Promise<TokensVerificacionEmail | null> {
    const resp = await querySQL2("select fecha_creacion, isValid, id_usuario from TokensVerificacionEmail where id_usuario = @id_usuario", [{ name: "id_usuario", type: "number", value: id_usuario }])
    return resp[0] || null
}