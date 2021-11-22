import express from 'express'
import { createArtistProfile, getArtistProfiles, updateArtistProfile, getArtistProfile } from '../handlers/artists'
const router = express.Router()

router.post('/artist/profile', createArtistProfile)
router.put('/artist/profile', updateArtistProfile)
router.get('/artist/profile/:id', getArtistProfile)
router.get('/artist/profiles', getArtistProfiles)

export default router

