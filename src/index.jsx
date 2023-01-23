import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import Slide1 from './slides/slide1';
import Slide2 from './slides/slide2';
import Slide3 from './slides/slide3';
import Slide4 from './slides/slide4';
import Slide5 from './slides/slide5';
import Slide6 from './slides/slide6';
import Slide7 from './slides/slide7';

import 'index.css';

const slides = [
  Slide1,
  Slide2,
  Slide3,
  Slide4,
  Slide5,
  Slide6,
  Slide7
];

const App = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex(slideIndex => (slideIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [setSlideIndex]);

  return slides[slideIndex];
};

ReactDOM.render(<App />, document.getElementById('root'));
