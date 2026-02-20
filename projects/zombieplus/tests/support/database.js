import { Pool } from 'pg'

const DbConfig = {
    user: 'neondb_owner',
    host: 'ep-misty-salad-ah7o3245-pooler.c-3.us-east-1.aws.neon.tech',
    database: 'neondb',
    password: 'npg_43TaAMCSqZLz',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
      }
}

export async function executeSQL(sqlScript) {

    try {
        const pool = new Pool(DbConfig)
        const client = await pool.connect()

        const result = await client.query(sqlScript)
        console.log(result.rows)

    } catch (error) {
        console.log(`Erro ao executar SQL ${error}`)
    
    }

    
}