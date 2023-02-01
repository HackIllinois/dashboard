import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

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
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
