import generarCodigo from "@/utils/generarCodigo";
import { findUserBd } from "../../repositories/findUserBd"
import { user } from "../../types/user";
import insertCambiosPasswordCodigo from "../../repositories/insertCambiosPasswordCodigo";


export default async function serviceCambioPasswordCodigo({ email }: { email: string }) {
    if (!email) return false

    const userBd = await findUserBd(email);
    const user = userBd as user
    const id = user.id

    const codigo = String(generarCodigo())
    const insertCod = await insertCambiosPasswordCodigo({ id, codigo })
    if (!insertCod) return false
    return codigo
}