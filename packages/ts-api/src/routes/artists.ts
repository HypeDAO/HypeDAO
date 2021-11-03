import express from 'express'
import { createArtistProfile, getArtistProfiles, updateArtistProfile, getArtistProfile } from '../handlers/artists'
const router = express.Router()

router.post('/profile', createArtistProfile)
router.put('/profile', updateArtistProfile)
router.get('/profile/:id', getArtistProfile)
router.get('/profiles', getArtistProfiles)

export default router

