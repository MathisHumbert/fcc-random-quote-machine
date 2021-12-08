import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const url = `https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json`;

const App = () => {
  const [quote, setQuote] = useState([]);

  const fetchData = async () => {
    const response = fetch(url);
    const data = response.json();
    console.log(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main id="quote-box">
      <div className="container">
        <h1></h1>
      </div>
    </main>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
