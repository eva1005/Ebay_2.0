const mongoose = require('mongoose');


//Schema erstellen - damit wird festgelegt, wie ein Artikel aussieht


const ArtikelSchema = mongoose.Schema({
    artikelbezeichnung: {
        type: String,
        required: true 
    },
    beschreibung: {
        type: String,
        required: true 
    },
   preis: {
       type: Number,
       required: true
   },
    datum: {
        type: Date,
        default: Date.now 
    },
});

module.exports = mongoose.model('Artikel', ArtikelSchema);         //dies sieht man dann in der Datenbank als "Artikel"