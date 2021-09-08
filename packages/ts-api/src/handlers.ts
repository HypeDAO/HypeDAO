import { Request, Response } from 'express';

import { Client, Pool } from 'pg';
import fs from 'fs';

const {
	PG_PORT,
	PG_USER,
	PG_HOST,
	PG_PASSWORD
} = process.env
console.log({
	PG_PORT,
	PG_USER,
	PG_HOST,
	PG_PASSWORD
})

const client = new Client({
	user: PG_USER,
	host: PG_HOST,
	database: 'postgres',
	password: PG_PASSWORD,
	port: Number(PG_PORT),
	// ssl: {
	// 	ca: fs.readFileSync('../../ca.pem')
	// }
	ssl: false
})
client.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
});

interface HelloResponse {
	hello: string;
}

type HelloBuilder = (name: string) => HelloResponse;

const helloBuilder: HelloBuilder = name => ({ hello: name });

export const rootHandler = (_req: Request, res: Response) => {
	return res.send('API is working 🤓');
};

export const helloHandler = async (req: Request, res: Response) => {
	const { params } = req;
	const { name = 'World' } = params;
	// const response = helloBuilder(name);
	await client.query(`
	CREATE TABLE IF NOT EXISTS test_table (
		id serial PRIMARY KEY
		username VARCHAR (50) UNIQUE NOT NULL
	)`)
	const query = {
		text: `INSERT INTO test_table(username) VALUES($1) RETURNING *`,
		values: [name]
	}
	const response = await client.query(query).then(res => res.rows[0]).catch(e => console.log(e))

	return res.json(response);
};