
import bcrypt from "bcryptjs"

export default async function compararHashes(password: string, hash: string) {
    return await bcrypt.compare(password, hash)
}