import express from 'express';
import {getArticles, createArticle} from './controllers/articleController.js'
import bodyParser from 'body-parser';
import cors from 'cors';

const server = express();
server.use(cors());

server.use(bodyParser.json({limit: "30mb", extended: true}));
server.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

server.get('/articles', getArticles)
server.post('/articles', createArticle)

server.listen(9000, () => {
    console.log('Server Running on Port 9000')
})






// server.use(cors());

