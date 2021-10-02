import { Request, Response } from 'express';
import db from '../postgres/pool'

export async function examplePostHandler(req: Request, res: Response) {
	const { name = 'World' } = req.params;

	const query = {
		text: `INSERT INTO test_table(username) VALUES($1) RETURNING *`,
		values: [name]
	}
	const response = await db.query(query)
		.then(res => res.rows[0])
		.catch(error => console.log(error))

	return res.json(response);
};

export async function exampleGetHandler(req: Request, res: Response) {
	const query = "SELECT * FROM test_table"

	const response = await db.query(query)
		.then(res => res.rows)
		.catch(error => console.log(error))

	return res.json(response)
}