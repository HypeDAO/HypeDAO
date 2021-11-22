import { Request, Response } from 'express';
import { NFTRequest, NFT } from "../types/artists";

import db from '../postgres/pool'

export async function createNFT(req: Request, res: Response) {
	const {
		owner_address,
		title,
		description,
		market_url,
		preview_url
	}: NFTRequest = req.body;

	const query = {
		text: `
			INSERT INTO nft (
				owner_address,
				title,
				description,
				market_url,
				preview_url
			)
			VALUES ($1, $2, $3, $4, $5)
			RETURNING *;
		`,
		values: [
			owner_address,
			title,
			description,
			market_url,
			preview_url
		]
	}
	const client = await db.getConnection()
	const response = await client.query(query)
		.then(res => res.rows[0])
		.catch(error => console.log(error))
		.finally(() => db.endConnection(client))

	return res.json(response)
}
export async function updateNFT(req: Request, res: Response) {
	const {
		owner_address,
		title,
		description,
		market_url,
		preview_url,
		id
	}: NFT = req.body;

	const query = {
		text: `
			UPDATE nft
			SET
				owner_address = $1,
				title = $2,
				description = $3,
				market_url = $4,
				preview_url = $5
			WHERE id = $6
			RETURNING *;
		`,
		values: [
			owner_address,
			title,
			description,
			market_url,
			preview_url,
			id
		]
	}
	const client = await db.getConnection()
	const response = await client.query(query)
		.then(res => res.rows[0])
		.catch(error => console.log(error))
		.finally(() => db.endConnection(client))

	return res.json(response)
}

export async function deleteNFT(req: Request, res: Response) {
	const { id } = req.params;
	const query = {
		text: `
			DELETE FROM nft
			WHERE id = $1
			RETURNING *
		`,
		values: [id]
	}

	const client = await db.getConnection()
	const response = await client.query(query)
		.then(res => res.rows[0])
		.catch(error => console.log(error))
		.finally(() => db.endConnection(client))

	return res.json(response)
}

