import querySQL2 from "../bd"

type CambiosPasswordCodigoType = {
    id: number,
    codigo: string,
}

export default async function insertCambiosPasswordCodigo({ id, codigo }: CambiosPasswordCodigoType) {
    const insert = await querySQL2("insert into cambiosPasswCodigo(id,codigo) output inserted.id values(@id,@codigo)", [
        { name: "id", type: "number", value: id }, { name: "codigo", type: "string", value: codigo }
    ])

    return insert[0] || null
}

