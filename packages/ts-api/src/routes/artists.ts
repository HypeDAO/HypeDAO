import express from 'express'
import { createArtistProfile, getArtistProfiles, updateArtistProfile, getArtistProfile } from '../handlers/artists'
const router = express.Router()

router.post('/profile', createArtistProfile)
router.put('/profile', updateArtistProfile)
router.get('/profile/:id', getArtistProfile)
//this will eventually have params for paging, sorting and searching
router.get('/profiles', getArtistProfiles)

export default router

