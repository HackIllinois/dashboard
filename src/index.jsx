import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import Leaderboard from './leaderboard';

import 'index.css';

const App = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload();
    }, 1000 * 60 * 60);

    return () => clearInterval(interval);;
  }, []);

  return (
    <>
      <div className="overlay"></div>
      <div className="content">
        <div className="col col1">
          <img src="/assets/logo.svg" alt="HackIllinois Logo" className="logo" />
          <p className="makingMemories">making memories</p>
          <Leaderboard />
        </div>
        <div className="col col2"></div>
        <div className="col col3"></div>
      </div>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
