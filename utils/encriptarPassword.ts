import bcrypt from "bcryptjs"
const NSALT = 10

export default async function encriptarPassword(password: string) {
    const encriptar = await bcrypt.hash(password, NSALT)
    return encriptar
}