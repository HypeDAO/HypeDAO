import express from 'express'
import { createArtistProfile, getArtistProfiles } from '../handlers/artists'
const router = express.Router()

router.post('/profile', createArtistProfile)
//this will eventually have params for paging, sorting and searching
router.get('/profiles', getArtistProfiles)

export default router

