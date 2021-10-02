import { Request, Response } from 'express';
import { ArtistProfileRequest } from "artists";
import db from '../postgres/pool'

export async function createArtistProfile(req: Request, res: Response) {
	const {
		wallet_address,
		name,
		bio,
		socials,
		collection
	}: ArtistProfileRequest = req.body;

	const stringSocials = JSON.stringify(socials) //Must stringify an array of objects

	const query = {
		text: `
			INSERT INTO artist_profile (
				wallet_address,
				name,
				bio,
				socials,
				collection
			)
			VALUES($1, $2, $3, $4, $5)
			RETURNING *;
		`,
		values: [wallet_address, name, bio, stringSocials, collection]
	}

	const response = await db.query(query)
		.then(res => res.rows[0])
		.catch(error => console.log(error))

	return res.json(response)
}

export async function getArtistProfiles(req: Request, res: Response) {
	//this will eventually have params for paging, sorting and searching
	const query = {
		text: `
			SELECT * FROM artist_profile
		`
	}

	const response = await db.query(query)
		.then(res => res.rows)
		.catch(error => console.log(error))

	return res.json(response)
}