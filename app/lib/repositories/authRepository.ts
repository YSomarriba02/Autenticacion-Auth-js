import querySQL2 from "../bd";
import { user } from "../types/user";

export async function validateUserDB(email: string, password: string): Promise<user | boolean> {
    const resp = await querySQL2("select email from usuarios where email = @email", [{ name: "email", type: "string", value: email }])
    const usuario = resp[0]

    if (!usuario) {
        console.log(usuario)
        console.log("usuario no encontrado")
        return false
    }
    return usuario
}