import express from 'express'
import { createNFT, updateNFT, deleteNFT, getUrlContent } from '../handlers/nfts'
const router = express.Router()

router.post('/nft/url-content', getUrlContent)
router.post('/nft', createNFT)
router.put('/nft', updateNFT)
router.delete('/nft/:id', deleteNFT)

export default router