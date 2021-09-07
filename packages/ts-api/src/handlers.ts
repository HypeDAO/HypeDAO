import { Request, Response } from 'express';

import { Client } from 'pg';
import fs from 'fs';

const client = new Client({
	user: 'sgpostgres',
	host: 'SG-NewPostgreCluster-5-pgsql-master.devservers.scalegrid.io',
	database: 'postgres',
	password: ‘password’',
  port: 6432,
	ssl: {
		ca: fs.readFileSync('<path to CA cert file>')
	}
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

export const helloHandler = (req: Request, res: Response) => {
	const { params } = req;
	const { name = 'World' } = params;
	const response = helloBuilder(name);

	return res.json(response);
};