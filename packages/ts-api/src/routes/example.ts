
import express from 'express'
import { exampleGetHandler, examplePostHandler } from '../handlers/example'
const router = express.Router()

router.post('/hello/:name', examplePostHandler);
router.get('/hello', exampleGetHandler)

export default router
