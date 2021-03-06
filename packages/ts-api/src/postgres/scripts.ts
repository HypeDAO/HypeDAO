require('../index') //needs the server to be running for SSL to work, but you can't already be running the API;
import db from './pool'

// async function createArtistProfileTable() {
// 	const query = `CREATE TABLE IF NOT EXISTS artist_profile (
// 		id serial PRIMARY KEY,
// 		wallet_address VARCHAR(64) UNIQUE NOT NULL,
// 		name VARCHAR(64) UNIQUE NOT NULL,
// 		bio TEXT,
// 		collection INT[],
// 		socials JSONB
// 	)`
// 	const client = await db.getConnection()
// 	client.query(query)
// 		.then(res => console.log("finished creating artist profile table", res))
// 		.catch(e => console.log("error creating table: ", e))
// 		.finally(() => db.endConnection(client))
// }
// createArtistProfileTable()


// async function createNftTable() {
// 	const query = `CREATE TABLE IF NOT EXISTS nft (
// 		id serial PRIMARY KEY,
// 		owner_address VARCHAR(64) NOT NULL,
// 		title VARCHAR(64) NOT NULL,
// 		description TEXT,
// 		market_url TEXT NOT NULL,
// 		preview_url TEXT
// 	)`
// 	const client = await db.getConnection()
// 	client.query(query)
// 		.then(res => console.log("finished creating nft table", res))
// 		.catch(e => console.log("error creating table: ", e))
// 		.finally(() => db.endConnection(client))
// }
// createNftTable()


// async function createFeaturedArtistTable() {
// 	const query = `CREATE TABLE IF NOT EXISTS featured_artist (
// 		id serial PRIMARY KEY,
// 		wallet_address VARCHAR(64) UNIQUE NOT NULL,
// 		is_current BOOLEAN,
// 		start_date DATE NOT NULL DEFAULT CURRENT_DATE
// 	)`
// 	const client = await db.getConnection()
// 	client.query(query)
// 		.then(res => console.log("finished creating featured artist table", res))
// 		.catch(e => console.log("error creating table: ", e))
// 		.finally(() => db.endConnection(client))
// }
// createFeaturedArtistTable()

// async function createArtistEntriesTable() {
// 	const query = `CREATE TABLE IF NOT EXISTS featured_artist_entries (
// 		id serial PRIMARY KEY,
// 		wallet_address VARCHAR(64) NOT NULL,
// 		tickets_entered INT NOT NULL,
// 		entry_date DATE NOT NULL DEFAULT CURRENT_DATE
// 	)`
// 	const client = await db.getConnection()
// 	client.query(query)
// 		.then(res => console.log("finished creating featured artist entries table", res))
// 		.catch(e => console.log("error creating table: ", e))
// 		.finally(() => db.endConnection(client))
// }
// createArtistEntriesTable()

