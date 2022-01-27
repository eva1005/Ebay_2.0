//import package
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

//execute package
const app = express();

//middleware für cors
app.use(cors());

//middleware, damit body-parser funktioniert => damit in der Konsole angezeigt werden kann, was in Postman gesendet wurde
app.use(bodyParser.json());

//import routes => middleware
const artikelRoute = require ('./routes/artikel');
app.use('/artikel', artikelRoute);                   //jedes Mal, wenn man auf die Seite "/posts" geht, wird postsRoute verwendet 
//app.use('/user', userRoute);

//middlewares => Funktionen, die greifen, sobald man eine Route aufruft (z.B. /articles)
//damit kann man bspw. feststellen, ob ein User authentifiziert ist, wenn er eine Route besucht (index.use(auth);)
//index.use('/articles', () => {
//    console.log('this is a middleware running');    //dieser Text wird dann im Terminal angezeigt, wenn man die Seite http://localhost:1337/articles aufruft
//});



//Connect to DB                         //ACHTUNG: package dotenv installieren, da sonst User und PW eingesehen werden können von außen!!
mongoose.connect(
    process.env.DB_CONNECTION,              //Account auf MongoDB erstellen und DB erstellen, User und PW vergeben und URL dafür hier einfügen
    {useNewUrlParser: true }, 
    () => console.log('connected to MongoDB')
); 

//how to start listening to the server
app.listen(1337);