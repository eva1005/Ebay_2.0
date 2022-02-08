const express = require('express');
const router = express.Router();    // Funktion => Routen in verschiedenen Dateien und in app.js importieren
const Article = require('../models/Article');
const User = require('../models/User');
const multer = require('multer');

//Bilder hochladen
const storage = multer.diskStorage({               //Dateien speichern
    destination: function(req, file, cb) {          //cb = call back
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);      // Datum und Originalname werden im Uploads-Ordner gespeichert => da Windows keine ":" in Dateinamen erlaubt, wird mit "replace" : durch - ausgetauscht
    }
});

//Filter, welche Art von Bildern hochgeladen werden darf:
const fileFilter = (req, file, cb) => {
    //Dateien akzeptieren oder abweisen:
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);         //Datei wird gespeichert
    } else {
        cb(new Error('Achtung: Bitte nur jpeg- und png-Dateien hochladen!'), false);        // Datei wird abgewiesen und nicht gespeichert
    }
   
    
};

// Bilder dürfen nur bis zu 50MByte groß sein
const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 50
    },
    fileFilter: fileFilter
}); 


/* router.get('/', (req, res) => {
    res.send('Du bist auf der Artikel-Seite');
}); 
*/

//GET
//Die Artikel, die angelegt werden, sollen ALLE ausgegeben werden
router.get('/', async (req, res) => {
    try {
        const article = await Article.find();
        res.json(article);
    }catch(err){
        res.json({message: err});
    }
});

//GET
//EINEN speziellen Artikel zurückgeben
router.get('/:articleID', async (req, res) => {
    try{
    const article = await Article.findById(req.params.articleID);
    res.json(article);
    }catch(err){
        res.json({message: err});
    }
});




/* router.post('/', (req, res) => {
    console.log(req.body);
});
*/

//POST - User kann dem Server etwas mitgeben (z.B. Login-Infos)
//ein neuer artikel muss angelegt werden können
//ein Bild kann hochgeladen werden
//console.log(req.body) => zum Testen - dann wird das, was bei Postman eingegeben wurde, auf der Konsole ausgegeben
router.post('/', upload.single('productImage'), async (req, res) => {     //single = man kann nur ein File parsen
   //console.log(req.file); 
   const article = new Article({
       title: req.body.title,
       description: req.body.description,
       price: req.body.price,
       productImage: req.file.path                   //geht durch multer => damit speichern wir die Bildinformation in der DB
   });

   try{
   const savedArticle = await article.save();
   res.json(savedArticle);
   }catch(err){
       res.json({message: err});

   }
});


//PATCH
//Einen vorhanden Artikel ändern
//Hier wird festgelegt, dass die Artikelbezeichnung verändert werden kann
router.patch('/:articleID', async (req, res) => {
    try{
    const modifiedArticle = await Article.updateOne({_id: req.params.articleID}, {$set:{title: req.body.title}});
    res.json(modifiedArticle);
    }catch(err){
        res.json({message: err});
    }
});



//DELETE
//Einen vorhanden Artikel löschen
router.delete('/:articleID', async (req, res) => {
    try{
    const deletedArticle = await Article.remove({_id: req.params.articleID});
    res.json(deletedArticle);
    }catch(err){
        res.json({message: err});
    }
});


//nach einem oder mehreren artikeln muss gesucht werden können

router.get('/search/:title', async (req, res) => {
    try{
    var regex = new RegExp(req.params.title, 'i');
    await Article.find({title: regex}).then((result) => {
        res.status(200).json(result)
    })
    }catch(err){
        res.json({message: err});
    }
});




// Folgende TO DOS sind noch zu erledigen:


//Man soll sich alle Artikel ausgeben lassen können, auf die geboten werden kann => mit Route für "verfügbare Aritkel" einfach get-request ermöglichen?

//alle user können ein gebot auf einen artikel abgeben

//Gebote müssen sich in Echtzeit/ jede Minute aktualisieren

//artikel muss als verkauft gekennzeichnet werden können

//artikel kann zum bieten freigeschalten werden

//artikel wird nach 15min als verkauft gekennzeichnet => verschieben in Route "verkaufte Artikel"?







module.exports = router;       // Routen können in anderen Dateien importiert werden