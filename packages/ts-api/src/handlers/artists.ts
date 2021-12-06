import { Request, Response } from 'express';
import { ArtistFilter, ArtistProfile, ArtistProfileRequest, ArtistSorting, GetArtistsParams } from "../types/artists";

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
		values: [
			wallet_address,
			name,
			bio,
			stringSocials,
			collection
		]
	}
	const client = await db.getConnection()
	const response = await client.query(query)
		.then(res => res.rows[0])
		.catch(error => console.log(error))
		.finally(() => db.endConnection(client))

	return res.json(response)
}

export async function updateArtistProfile(req: Request, res: Response) {
	const {
		name,
		bio,
		socials,
		collection,
		id
	}: ArtistProfile = req.body;

	const stringSocials = JSON.stringify(socials) //Must stringify an array of objects

	const query = {
		text: `
			UPDATE artist_profile
			SET
				name = $1,
				bio = $2,
				socials = $3,
				collection = $4
			WHERE id = $5
			RETURNING *
		`,
		values: [
			name,
			bio,
			stringSocials,
			collection,
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

export async function getArtistProfiles(req: Request, res: Response) {
	const {
		limit = 20,
		page = 1,
		sorting,
		filter = null,
		search = ""
	}: GetArtistsParams = req.body

	const offset = (page - 1) * limit

	const sortChecked = Object.values(ArtistSorting).includes(sorting)
		? sorting
		: ArtistSorting.Random

	function getQuery() {
		switch (filter) {
			case ArtistFilter.pastFeatured: {
				return `
					SELECT
						fa.*,
						ap.*,
						json_agg(n.*) AS collection
					FROM
						FeaturedArtist fa
						LEFT JOIN artist_profile ap ON fa.wallet_address = ap.wallet_address
						LEFT JOIN nft n ON n.id = ap.collection[1]
					WHERE
						name LIKE $1
					GROUP BY ap.id
					ORDER BY ${sortChecked}
					LIMIT $2
					OFFSET $3
				`
			}
			default: {
				return `
					SELECT
						ap.*,
						json_agg(n.*) AS collection
					FROM
						artist_profile ap
						LEFT JOIN nft n ON n.id = ap.collection[1]
					WHERE
						name LIKE $1
					GROUP BY ap.id
					ORDER BY ${sortChecked}
					LIMIT $2
					OFFSET $3
				`
			}
		}
	}
	const query = {
		text: getQuery(),
		values: [`%${search}%`, limit, offset]
	}
	const client = await db.getConnection()
	const response = await client.query(query)
		.then(res => res.rows)
		.catch(error => console.log(error))
		.finally(() => db.endConnection(client))

	return res.json(response)
}

export async function getArtistProfile(req: Request, res: Response) {
	const { id } = req.params;
	const query = {
		text: `
			SELECT
				ap.*,
				json_agg(n.*) AS collection
			FROM
				artist_profile ap
				LEFT JOIN nft n ON n.id = ANY (ap.collection)
				WHERE ap.id = $1
				GROUP BY ap.id
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
