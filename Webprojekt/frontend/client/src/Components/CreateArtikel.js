import React from 'react';
import './CreateArtikel.css';



function CreateArtikel() {

  return (
    <div className='create-container'>
      <label htmlFor="userfile">Datei auswählen:</label><br />
      <br />
      <input type="file" name="my-file" /><br />
      <br />
      <input type="submit" value="Genehmigen!" />
    </div>
  
);
};

export default CreateArtikel; 

//function createArtikel() {
//  return <CreateArtikel />;}