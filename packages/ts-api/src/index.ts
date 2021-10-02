import express from 'express'
import cors from 'cors'
import dotenv from "dotenv"
dotenv.config() // must be fired before handlers are imported
import { rootHandler } from './handlers/index';
import artistRoutes from './routes/artists'
import exampleRoutes from './routes/example'


const app = express();
const port = process.env.PORT || '8000';

app.use(express.json())
app.use(cors())

app.get('/', rootHandler);
app.use('/api/v1/example', exampleRoutes)
app.use('/api/v1/artists', artistRoutes)

app.listen(port, () => {
	return console.log(`Server is listening on ${port}`);
});

export default app