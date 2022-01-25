import logo from './logo.svg';
import './App.css';
import {useState} from "react";

function App() {

    const [articles, setArticles] = useState("")
    const [error, setError] = useState("")

  fetch('http://localhost:9000/articles', {
    method: 'GET', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
  })
      .then(response => response.json())
      .then(data => {
          setArticles(data)
        console.log('Success:', data);
      })


  return (
    <div className="App">
      <header className="App-header">
        <h1>{articles}</h1>
        <h1>{error}</h1>
      </header>
    </div>
  );
}

export default App;
