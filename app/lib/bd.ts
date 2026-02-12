import sql, { ConnectionPool, config } from "mssql"



const configConexion: config = {
    user: process.env.DB_user,
    password: process.env.DB_password,
    server: process.env.DB_server!,
    database: process.env.DB_database,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
}

let poolConfig: ConnectionPool | null = null

async function getPool() {
    if (!poolConfig) {
        poolConfig = await sql.connect(configConexion)
    }
    return poolConfig
}

const typesSql = {
    string: sql.VarChar,
    number: sql.Int,
    boolean: sql.Binary
}

type sqlTypes = keyof typeof typesSql

interface param {
    value: any,
    type: sqlTypes,
    name: string
}

export default async function querySQL2<T = any>(query: string, parametros: param[]): Promise<T[]> {
    const request = (await getPool()).request()

    for (const { name, type, value } of parametros) {
        const typeInput = typesSql[type]
        request.input(name, typeInput, value)
    }
    return (await request.query(query)).recordset as T[];
}

