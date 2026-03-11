import querySQL2 from "../bd"


interface params {
    email: string, nuevaPassword: string
}

export default async function updatePassword({ email, nuevaPassword }: params) {
    const resp = await querySQL2("update usuarios set passw = @nuevaPassword output inserted.id where email = @email", [
        { name: "nuevaPassword", type: "string", value: nuevaPassword }, { name: "email", type: "string", value: email }
    ])
    const update = resp[0] || null
    return update

}