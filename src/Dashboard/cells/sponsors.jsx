import React from 'react';

import bus from 'assets/vehicle/bus.svg';
import car from 'assets/vehicle/car.svg';
import bike from 'assets/vehicle/bike.svg';

// Bus Sponsors
import capitalOne from 'assets/sponsors/capital_one.svg';
import caterpillar from 'assets/sponsors/caterpillar.svg';
import imc from 'assets/sponsors/imc.svg';
import optum from 'assets/sponsors/optum.svg';

// Car Sponsors
import google from 'assets/sponsors/google.svg';
import grainger from 'assets/sponsors/grainger.svg';
import schlumberger from 'assets/sponsors/schlumberger.svg';

// Bike Sponsors
import orchidLabs from 'assets/sponsors/orchid_labs.svg';
import hrt from 'assets/sponsors/hrt.svg';

const NUM_CAR_SPONSORS = 3;
const NUM_BIKE_SPONSORS = 4;
// Temp fix while not enough sponsors to create unique arrays
let a = [];
for (let i = 0; i < 40; ++i) a[i] = i;

// http://stackoverflow.com/questions/962802#962890
function shuffle(array) {
  let tmp;
  let current;
  let top = array.length;
  if (top) {
    while (--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }
  }
  return array;
}

a = shuffle(a);

const carSponsors = [grainger, google, schlumberger];
const altCarSponsors = ['Grainger', 'Google', 'Schlumberger'];

const bikeSponsors = [hrt, orchidLabs, hrt, orchidLabs];
const altBikeSponsors = ['HRT', 'OrchidLabs', 'HRT', 'OrchidLabs'];
export default class Sponsors extends React.Component {
  constructor(props) {
    super(props);

    const renderedCarSponsors = [];
    renderedCarSponsors.push(carSponsors[0]);
    renderedCarSponsors.push(carSponsors[1]);
    renderedCarSponsors.push(carSponsors[2]);

    const renderedBikeSponsors = []; // Array of images actually displayed.
    renderedBikeSponsors.push(bikeSponsors[0]);
    renderedBikeSponsors.push(bikeSponsors[1]);
    renderedBikeSponsors.push(bikeSponsors[2]);
    renderedBikeSponsors.push(bikeSponsors[3]);
    this.state = {
      renderedCarSponsors,
      nextCarRenderIndex: 2,
      nextCarSponsorIndex: 2 % carSponsors.length,

      renderedBikeSponsors, // length 4
      nextBikeRenderIndex: 3, // index in rendered bike sponsors to change
      nextBikeSponsorIndex: 3 % bikeSponsors.length,
    };

    this.renderBikeSponsors = this.renderBikeSponsors.bind(this);
    this.incrementBike = this.incrementBike.bind(this);

    this.renderCarSponsors = this.renderCarSponsors.bind(this);
    this.incrementCar = this.incrementCar.bind(this);

    this.bikeInterval = null;
    this.carInterval = null;
  }

  componentDidMount() {
    this.bikeInterval = setInterval(this.incrementBike, 6000); // 8 seconds
    this.carInterval = setInterval(this.incrementCar, 10000); // 10 seocnds
  }

  componentWillUnmount() {
    clearInterval(this.bikeInterval);
    clearInterval(this.carInterval);
  }

  incrementCar() {
    const {
      nextCarRenderIndex,
      nextCarSponsorIndex,
      renderedCarSponsors,
    } = this.state;
    renderedCarSponsors[nextCarRenderIndex] = carSponsors[nextCarSponsorIndex];

    this.setState({
      renderedCarSponsors,
      nextCarRenderIndex: (nextCarRenderIndex + 1) % NUM_CAR_SPONSORS,
      nextCarSponsorIndex: (nextCarSponsorIndex + 1) % carSponsors.length,
    });
  }

  incrementBike() {
    const {
      nextBikeRenderIndex,
      nextBikeSponsorIndex,
      renderedBikeSponsors,
    } = this.state;
    renderedBikeSponsors[nextBikeRenderIndex] = bikeSponsors[nextBikeSponsorIndex];
    this.setState({
      renderedBikeSponsors,
      nextBikeRenderIndex: (nextBikeRenderIndex + 1) % NUM_BIKE_SPONSORS,
      nextBikeSponsorIndex: (nextBikeSponsorIndex + 1) % bikeSponsors.length,
    });
  }

  renderCarSponsors() {
    const {
      renderedCarSponsors,
      nextCarRenderIndex,
      nextCarSponsorIndex,
    } = this.state;


    return renderedCarSponsors.map((sponsor, index) => {
      if (index === nextCarRenderIndex) {
        return (
          <div className="sponsor-wrapper" key={a[index]}>
            <img src={sponsor} className="old-image" alt={altCarSponsors[index]} />
            <img src={carSponsors[nextCarSponsorIndex]} className="new-image" alt={altCarSponsors[nextCarSponsorIndex]} />
          </div>
        );
      }
      return (
        <div className="sponsor-wrapper" key={a[index]}>
          <img src={sponsor} alt={altCarSponsors[index]} />
        </div>
      );
    });
  }

  renderBikeSponsors() {
    const {
      renderedBikeSponsors,
      nextBikeRenderIndex,
      nextBikeSponsorIndex,
    } = this.state;

    return renderedBikeSponsors.map((sponsor, index) => {
      if (index === nextBikeRenderIndex) {
        return (
          <div className="sponsor-wrapper" key={a[index]}>
            <img src={sponsor} className="old-image" alt={altBikeSponsors[index]} />
            <img src={bikeSponsors[nextBikeSponsorIndex]} className="new-image" alt={altBikeSponsors[nextBikeSponsorIndex]} />
          </div>
        );
      }
      return (
        <div className="sponsor-wrapper" key={a[index]}>
          <img src={sponsor} alt={altBikeSponsors[index]} />
        </div>
      );
    });
  }

  render() {
    return (
      <div className="cell long-cell" id="sponsors-cell">
        <div className="top-half">
          <h2>Sponsors</h2>
          <div className="bus-sponsors">
            <img src={bus} alt="bus" id="bus" />
            <img src={capitalOne} alt="Capital One" id="capital-one" />
            <img src={imc} alt="IMC" id="imc" />
            <img src={caterpillar} alt="Caterpillar" id="caterpillar" />
            <img src={optum} alt="Optum" id="optum" />
          </div>
        </div>
        <div className="bottom-half">
          <div className="car-sponsors">
            <img src={car} alt="car" id="car" />
            {
              this.renderCarSponsors()
            }
          </div>
          <div className="bike-sponsors">
            <img src={bike} alt="bike" id="bike" />
            {
              this.renderBikeSponsors()
            }
          </div>
        </div>
      </div>
    );
  }
}
