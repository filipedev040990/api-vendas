import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

const SERVER_PORT = process.env.SERVER_PORT;

app.listen(SERVER_PORT, console.log(`Server started on port ${SERVER_PORT}`));
