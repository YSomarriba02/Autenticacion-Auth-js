import querySQL2, { param } from "../bd";


interface userInsertParams {
    email: string, password?: string, provider?: string, isVerificado?: boolean
}

export interface userInsertResp {
    id: number,
    email: string
}

export default async function insertUserBd({ email, password, provider, isVerificado }: userInsertParams): Promise<userInsertResp | null> {
    const columns = ["email"]
    const values = ["@email"]
    const params: param[] = [{ name: "email", type: "string", value: email }]

    if (password) {
        columns.push("passw");
        values.push("@passw")
        params.push({ name: "passw", type: "string", value: password })
    }
    if (provider) {
        columns.push("provider_name");
        values.push("@provider_name")
        params.push({ name: "provider_name", type: "string", value: provider })
    }

    //en Bd por defecto es false, por eso cuando se usan proveedores,
    //se debe enviar esta propiedad en true en los parametros
    if (isVerificado) {
        columns.push("isVerificado"),
            values.push("@isVerificado")
        params.push({ name: "isVerificado", type: "boolean", value: isVerificado })
    }
    const query = `insert into usuarios(${columns.join(",")}) output inserted.id, inserted.email values(${values.join(",")})`
    const usuario = await querySQL2(query, params)
    return usuario[0] || null
}