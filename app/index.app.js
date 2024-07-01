import express from 'express';
import mainRouter from './routers/index.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use(mainRouter)

export default app;