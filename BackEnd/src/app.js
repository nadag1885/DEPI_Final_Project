import express, { json } from 'express';
import cors from 'cors';
import logger from 'morgan';
import usersRouter from './routes/users.js';
import blogsRouter from './routes/blogs.js';

const app = express();

app.use(cors({
    origin: "*",
    methods: "GET, POST, PUT, DELETE"
}));
app.use(logger('dev'));
app.use(json());

app.options('*', cors());

app.use("/users", usersRouter);
app.use("/blogs", blogsRouter);


export default app;