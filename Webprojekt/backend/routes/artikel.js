const express = require('express');
const router = express.Router();    // Funktion => Routen in verschiedenen Dateien und in app.js importieren
const Artikel = require('../models/Artikel');
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
        const artikel = await Artikel.find();
        res.json(artikel);
    }catch(err){
        res.json({message: err});
    }
});

//GET
//EINEN speziellen Artikel zurückgeben
router.get('/:artikelID', async (req, res) => {
    try{
    const artikel = await Artikel.findById(req.params.artikelID);
    res.json(artikel);
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
router.post('/', upload.single('produktBild'), async (req, res) => {     //single = man kann nur ein File parsen
   //console.log(req.file); 
   const artikel = new Artikel({
       artikelbezeichnung: req.body.artikelbezeichnung,
       beschreibung: req.body.beschreibung,
       preis: req.body.preis,
       produktBild: req.file.path                   //geht durch multer => damit speichern wir die Bildinformation in der DB
   });

   try{
   const angelegterArtikel = await artikel.save();
   res.json(angelegterArtikel);
   }catch(err){
       res.json({message: err});

   }
});


//PATCH
//Einen vorhanden Artikel ändern
//Hier wird festgelegt, dass die Artikelbezeichnung verändert werden kann
router.patch('/:artikelID', async (req, res) => {
    try{
    const modifizierterArtikel = await Artikel.updateOne({_id: req.params.artikelID}, {$set:{artikelbezeichnung: req.body.artikelbezeichnung}});
    res.json(modifizierterArtikel);
    }catch(err){
        res.json({message: err});
    }
});



//DELETE
//Einen vorhanden Artikel löschen
router.delete('/:artikelID', async (req, res) => {
    try{
    const geloeschterArtikel = await Artikel.remove({_id: req.params.artikelID});
    res.json(geloeschterArtikel);
    }catch(err){
        res.json({message: err});
    }
});


//nach einem oder mehreren artikeln muss gesucht werden können

router.get('/suche/:artikelbezeichnung', async (req, res) => {
    try{
    var regex = new RegExp(req.params.artikelbezeichnung, 'i');
    await Artikel.find({artikelbezeichnung: regex}).then((ergebnis) => {
        res.status(200).json(ergebnis)
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