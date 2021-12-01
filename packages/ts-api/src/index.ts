import express from 'express'
import cors from 'cors'
import dotenv from "dotenv"
dotenv.config() // must be fired before handlers are imported
import { rootHandler } from './handlers/index';
import artistRoutes from './routes/artists'
import nftRoutes from './routes/nfts'


const app = express();
const port = process.env.PORT || '8000';

app.use(express.json())
app.use(cors())

// app.use(function(req, res, next) {
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// 	next();
// });

app.get('/', rootHandler);
app.use('/api/v1', artistRoutes)
app.use('/api/v1', nftRoutes)

app.listen(port, () => {
	return console.log(`Server is listening on ${port}`);
});

export default app