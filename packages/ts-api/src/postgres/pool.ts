import { query } from 'express';
import { Client, Pool, QueryConfig, QueryResult } from 'pg';
//Check out the docs here:
//https://node-postgres.com/

const {
	DATABASE_URL,
	DATABASE_CONNECTION_POOL
} = process.env

const client = new Client({
	connectionString: DATABASE_URL,
	ssl: {
		rejectUnauthorized: false
	}
});

client.connect();

export default {
	query: (query: string | QueryConfig) => client.query(query),
	endConnection: () => client.end()
}



//We are currently on Heroku Hobby tier which doesn't allow pooling, leaving the code here for when we upgrade
// const pool = new Pool({
// 	connectionString: DATABASE_CONNECTION_POOL,
// 	ssl: {
// 		rejectUnauthorized: false
// 	}
// })

// pool.on('error', (err, client) => {
// 	console.error('Unexpected error on idle client', err)
// 	process.exit(-1)
// })

//Check out these docs for <pool.query> vs <client = await pool.connect -> client.query>
//TLDR: don't use the shortcut pool.query for transactions
//https://node-postgres.com/api/pool
// export default {
// 	query: (query: string | QueryConfig) => pool.query(query)
// }