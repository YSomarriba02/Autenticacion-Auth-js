import querySQL2 from "../bd"

type CambiosPasswordCodigoType = {
    id: number,
    codigo: string,
}

export default async function insertCambiosPasswordCodigo({ id, codigo }: CambiosPasswordCodigoType) {
    console.log("nuevo cod en bd")
    const insert = await querySQL2("insert into cambiosPasswCodigo(id_usuario,codigo) output inserted.id_usuario values(@id,@codigo)", [
        { name: "id", type: "number", value: id }, { name: "codigo", type: "string", value: codigo }
    ])

    return insert[0] || null
}

