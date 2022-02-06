// Hier wird alles importiert, was man für die Registrierung braucht
/*import { createContext, useEffect, useState } from 'react';
import { authApp, firestoreApp } from '../config/firebase';const express = require('express');

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [globalMsg, setGlobalMsg] = useState(''); */

const router = express.Router();    // Funktion => Routen in verschiedenen Dateien und in app.js importieren
const Artikel = require('../models/Artikel');
const User = require('../models/User'); 

/* router.get('/', (req, res) => {
    res.send('Du bist auf der Artikel-Seite');
}); 
*/

//REGISTER
//Der User kann sich registrieren
//const register = (email, password) => {
//    return authApp.createUserWithEmailAndPassword(email, password);
//  };

//LOGIN
//Der User kann sich in seinen zuvor erstellten Account einloggen
//const login = (email, passwort) => {
//    return authApp.signInWithEmailAndPassword(email, password);
//  };

//LOGOUT
//Der User kann sich aus seinem zuvor erstellten Account ausloggen
//const logout = () => {
//    return authApp.signOut();
//  };

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
//console.log(req.body) => zum Testen - dann wird das, was bei Postman eingegeben wurde, auf der Konsole ausgegeben
router.post('/', async (req, res) => {
   const artikel = new Artikel({
       artikelbezeichnung: req.body.artikelbezeichnung,
       beschreibung: req.body.beschreibung,
       preis: req.body.preis
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
//const bidAuction = ('/:artikelID', price) => {
//    if (!currentUser) {
//      return setGlobalMsg('Please login first');
//    }

//    let newPrice = Math.floor((price / 100) * 110);
//    const db = firestoreApp.collection('auctions');

//    return db.doc(auctionId).update({
//      curPrice: newPrice,
//      curWinner: currentUser.email,
//    });
//  };

//artikel muss als verkauft gekennzeichnet werden können
//Wie kann man das statt löschen verschieben?
//const endAuction = (auctionId, price) => {
//    const db = firestoreApp.collection('auctions');

//    return db.doc(auctionId).delete();
//  };

//artikel kann zum bieten freigeschalten werden

//artikel wird nach 15min als verkauft gekennzeichnet => verschieben in Route "verkaufte Artikel"?

// bild bei der Artikelanlage hinzufügen?

//Gebote müssen sich in Echtzeit/ jede Minute aktualisieren
//Effekte (wie z.B. Echtzeit) werden angewendet)
/* useEffect(() => {
    const subscribe = authApp.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return subscribe;
  }, []);

  useEffect(() => {
    const interval = setTimeout(() => setGlobalMsg(''), 5000);
    return () => clearTimeout(interval);
  }, [globalMsg]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        register,
        login,
        logout,
        bidAuction,
        endAuction,
        globalMsg,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}; */


module.exports = router;       // Routen können in anderen Dateien importiert werden

