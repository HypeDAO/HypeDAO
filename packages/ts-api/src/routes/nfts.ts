import express from 'express'
import { createNFT, updateNFT, deleteNFT } from '../handlers/nfts'
const router = express.Router()

router.post('/nft', createNFT)
router.put('/nft', updateNFT)
router.delete('/nft', deleteNFT)

export default router