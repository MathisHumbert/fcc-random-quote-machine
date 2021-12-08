import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const url = `https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json`;

const colors = [
  '#fad390',
  '#f8c291',
  '#6a89cc',
  '#82ccdd',
  '#b8e994',
  '#f6b93b',
  '#e55039',
  '#4a69bd',
  '#60a3bc',
  '#78e08f',
  '#fa983a',
  '#eb2f06',
  '#1e3799',
  '#3c6382',
  '#38ada9',
  '#e58e26',
  '#b71540',
  '#0c2461',
  '#0a3d62',
  '#079992',
];

const App = () => {
  const [loading, setLoading] = useState(true);
  const [quotes, setQuotes] = useState([]);
  const [uniqueQuote, setUniqueQuote] = useState({ quote: '', author: '' });
  const [color, setColor] = useState('');
  const quoteContainer = useRef(null);

  const fetchData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setQuotes(data.quotes);
    getQuote(data.quotes);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getQuote = (quoteArr) => {
    if (quoteContainer.current) {
      quoteContainer.current.style.opacity = 0;
    }

    const randomNumber = Math.floor(Math.random() * quoteArr.length);
    const randomQuotes = quoteArr[randomNumber];
    const quote = randomQuotes.quote;
    const author = randomQuotes.author;

    const randomColor = Math.floor(Math.random() * colors.length);
    setColor(colors[randomColor]);
    document.body.style.background = colors[randomColor];

    setTimeout(() => {
      setUniqueQuote({ quote, author });
      if (quoteContainer.current) {
        quoteContainer.current.style.opacity = 1;
      }
    }, 600);
  };

  if (loading) {
    return <></>;
  }

  return (
    <main id="quote-box" style={{ color: `${color}` }}>
      <div className="container">
        <div className="quote-container" ref={quoteContainer}>
          <h1 id="text">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill={color}
              >
                <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
              </svg>
            </span>
            {uniqueQuote.quote}
          </h1>
          <p id="author">{uniqueQuote.author}</p>
        </div>
        <div className="btn-container">
          <a
            href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text="${uniqueQuote.quote}" by ${uniqueQuote.author}`}
            className="btn"
            style={{ background: `${color}` }}
            id="tweet-quote"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg>
          </a>
          <button
            className="btn"
            onClick={() => getQuote(quotes)}
            id="new-quote"
            style={{ background: `${color}` }}
          >
            new quote
          </button>
        </div>
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
