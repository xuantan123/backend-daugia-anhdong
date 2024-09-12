import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine.js';
import initWebRoutes from './route/web.js';
import connectDB from './config/connectDB.js';
import dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer';

dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } 
});

app.use((req, res, next) => {
    req.upload = upload; 
    next();
});

viewEngine(app);
initWebRoutes(app);

connectDB();

const port = process.env.PORT || 8081;

app.listen(port, () => {
    console.log(`Backend Nodejs is running on the port: ${port}`);
});
