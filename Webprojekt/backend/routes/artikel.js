const express = require('express');
const router = express.Router();    // Funktion => Routen in verschiedenen Dateien und in app.js importieren
const Artikel = require('../models/Artikel');
const User = require('../models/User');

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

//GET
//Man soll sich alle Artikel ausgeben lassen können, auf die geboten werden kann
//       TO DO !!!!  


/* router.post('/', (req, res) => {
    console.log(req.body);
});
*/

//POST - User kann dem Server etwas mitgeben (z.B. Login-Infos)
//ein neuer artikel muss angelegt werden können
//console.log(req.body) => zum Testen - dann wird das, was bei Postman eingegeben wurde, auf der Konsole ausgegeben
router.post('/', async (req, res) => {
   const artikel = new Artikel({
       artikelbezeichnung: req.body.artikelbezeichnung,
       beschreibung: req.body.beschreibung,
       preis: req.body.preis
   });

   try{
   const savedArtikel = await artikel.save();
   res.json(savedArtikel);
   }catch(err){
       res.json({message: err});

   }
});


//PATCH
//Einen vorhanden Artikel ändern
//Hier wird festgelegt, dass die Artikelbezeichnung verändert werden kann
router.patch('/:artikelID', async (req, res) => {
    try{
    const updatedArtikel = await Artikel.updateOne({_id: req.params.artikelID}, {$set:{artikelbezeichnung: req.body.artikelbezeichnung}});
    res.json(updatedArtikel);
    }catch(err){
        res.json({message: err});
    }
});



//DELETE
//Einen vorhanden Artikel löschen
router.delete('/:artikelID', async (req, res) => {
    try{
    const removedArtikel = await Artikel.remove({_id: req.params.artikelID});
    res.json(removedArtikel);
    }catch(err){
        res.json({message: err});
    }
});

// Folgende TO DOS sind noch zu erledigen:

//nach einem oder mehreren artikeln muss gesucht werden können

//alle user können ein gebot auf einen artikel abgeben

//artikel muss als verkauft gekennzeichnet werden können

//artikel kann zum bieten freigeschalten werden

//artikel wird nach 15min als verkauft gekennzeichnet




module.exports = router;       // Routen können in anderen Dateien importiert werden