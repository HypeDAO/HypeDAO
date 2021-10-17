import { Request, Response } from 'express';
import { ArtistFilter, ArtistProfile, ArtistProfileRequest, ArtistSorting, GetArtistsProps } from "../types/artists";

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

export async function updateArtistProfile(req: Request, res: Response) {
	const {
		wallet_address,
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
				wallet_address = $1,
				name = $2,
				bio = $3,
				socials = $4,
				collection = $5
			WHERE id = $6
			RETURNING *
		`,
		values: [wallet_address, name, bio, stringSocials, collection, id]
	}

	const response = await db.query(query)
		.then(res => res.rows[0])
		.catch(error => console.log(error))

	return res.json(response)
}

export async function getArtistProfiles(req: Request, res: Response) {
	//this will eventually have params for paging, sorting and searching
	const {
		limit = 20,
		page = 1,
		sorting,
		filter = null,
		search = ""
	}: GetArtistsProps = req.body

	const offset = (page - 1) * limit

	const sortChecked = Object.values(ArtistSorting).includes(sorting) ? sorting : ArtistSorting.Random

	function getFilterQuery() {
		switch (filter) {
			case ArtistFilter.pastFeatured: {
				return {
					text: `
						SELECT * FROM FeaturedArtist fa
						LEFT JOIN artist_profile ap
							on fa.wallet_address = ap.wallet_address
						WHERE
							name LIKE $1
						ORDER BY ${sortChecked}
						LIMIT $2
						OFFSET $3
					`,
					values: [`%${search}%`, limit, offset]
				}
			};
			default: return ""
		}
	}
	const query = filter
		? getFilterQuery()
		: {
			text: `
				SELECT * FROM artist_profile
				WHERE
					name LIKE $1
				ORDER BY ${sortChecked}
				LIMIT $2
				OFFSET $3
			`,
			values: [`%${search}%`, limit, offset]
		}

	const response = await db.query(query)
		.then(res => res.rows)
		.catch(error => console.log(error))

	return res.json(response)
}


export async function getArtistProfile(req: Request, res: Response) {
	const { id } = req.params;
	const query = {
		text: `
			SELECT * FROM artist_profile
			WHERE id = $1
		`,
		values: [id]
	}

	const response = await db.query(query)
		.then(res => res.rows[0])
		.catch(error => console.log(error))

	return res.json(response)
}