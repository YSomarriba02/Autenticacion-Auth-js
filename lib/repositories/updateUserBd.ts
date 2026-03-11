import querySQL2 from "../bd";

export default async function updateUserBd({ isVerificado, id }: { isVerificado: boolean, id: number }) {
    console.log(isVerificado, id);
    const resp = await querySQL2("update usuarios set isVerificado = @isVerificado output inserted.id, inserted.provider_name, inserted.email where id = @id", [{ name: "isVerificado", type: "boolean", value: isVerificado }, { name: "id", type: "number", value: id }])

    console.log(resp[0]);
    return resp[0] || null
}