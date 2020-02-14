import React from 'react';

import bus from 'assets/vehicle/bus.svg';
import car from 'assets/vehicle/car.svg';
import bike from 'assets/vehicle/bike.svg';

import capitalOne from 'assets/sponsors/capitalOne.svg';
import caterpillar from 'assets/sponsors/caterpillar.svg';
import imc from 'assets/sponsors/imc.svg';
import optum from 'assets/sponsors/optum.svg';

import google from 'assets/sponsors/google.svg';
import grainger from 'assets/sponsors/grainger.svg';
import schlumberger from 'assets/sponsors/schlumberger.svg';

function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex > 0) {
    // Pick a remaining element...
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    const temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }

  return array;
}

export default class Sponsors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listOfSponsors: [],
    };
  }

  render() {
    return (
      <div className="cell long-cell" id="sponsors-cell">
        <div className="top-half">
          <h2>Sponsors</h2>
          <div className="bus-sponsors">
            <img src={bus} alt="bus" id="bus" />
            <img src={capitalOne} alt="Capital One" id="capitalOne" />
            <img src={imc} alt="IMC" id="imc" />
            <img src={caterpillar} alt="Caterpillar" id="caterpillar" />
            <img src={optum} alt="Optum" id="optum" />
          </div>
        </div>
        <div className="bottom-half">
          <div className="small car-sponsors">
            <img src={car} alt="car" id="car" />
            <img src={grainger} alt="Grainger" id="grainger" />
            <img src={google} alt="Google" id="google" />
            <img src={schlumberger} alt="Schlumberger" id="schlumberger" />
          </div>``
          <div className="small bike-sponsors">
            <img src={bike} alt="bike" id="bike" />
          </div>
        </div>
      </div>
    );
  }
}
