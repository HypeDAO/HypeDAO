import { Pool, QueryConfig, QueryResult } from 'pg';
import fs from 'fs';

//Check out the docs here:
//https://node-postgres.com/

const {
	PG_PORT,
	PG_USER,
	PG_HOST,
	PG_PASSWORD
} = process.env

const pool = new Pool({
	user: PG_USER,
	host: PG_HOST,
	database: 'postgres',
	password: PG_PASSWORD,
	port: Number(PG_PORT),
	// ssl: {
	// 	ca: fs.readFileSync('../../ca.pem')
	// }
})

pool.on('error', (err, client) => {
	console.error('Unexpected error on idle client', err)
	process.exit(-1)
})

//Check out these docs for <pool.query> vs <client = await pool.connect -> client.query>
//TLDR: don't use the shortcut pool.query for transactions
//https://node-postgres.com/api/pool
export default {
	query: (query: string | QueryConfig) => pool.query(query)
}