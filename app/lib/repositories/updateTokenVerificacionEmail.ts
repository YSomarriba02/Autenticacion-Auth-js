import querySQL2 from "../bd";
import { param } from "../bd";

export default async function updateTokenVerificacionEmail({ id_usuario, nuevoToken, isValid }: { id_usuario: number, nuevoToken?: string, isValid?: boolean }) {

    const params: param[] = [{ name: "id_usuario", type: "number", value: id_usuario }]

    if (nuevoToken) {
        params.push({ name: "token", type: "string", value: nuevoToken })
    }
    if (isValid != undefined) {
        params.push({ name: "isValid", type: "boolean", value: isValid })
    }


    const arrSeters = params.reduce((ac, act, index) => {
        if (index > 0) {
            ac += `${act.name} = @${act.name}${index == params.length - 1 ? "" : ","}`
            return ac
        }
        return ac
    }, "")

    const query = `update TokensVerificacionEmail set ${arrSeters} output inserted.id where id_usuario = @id_usuario`
    console.log(query);
    const resp = await querySQL2(query, params)

    return resp[0] || null
}