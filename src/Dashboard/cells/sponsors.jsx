import React from 'react';
import ThemeContext from 'Dashboard/theme-context';

import bus from 'assets/vehicle/bus.svg';
import car from 'assets/vehicle/car.svg';
import bike from 'assets/vehicle/bike.svg';

// Bus Sponsors
import capitalOne from 'assets/sponsors/capital_one.svg';
import caterpillar from 'assets/sponsors/caterpillar.svg';
import imc from 'assets/sponsors/imc.svg';
import optumNight from 'assets/sponsors/optum_night.svg';
import optum from 'assets/sponsors/optum.svg';

// Car Sponsors
import google from 'assets/sponsors/google.svg';
import grainger from 'assets/sponsors/grainger.svg';
import schlumbergerNight from 'assets/sponsors/schlumberger_night.svg';
import schlumberger from 'assets/sponsors/schlumberger.svg';
import checkbook from 'assets/sponsors/checkbook.svg';
import checkbookNight from 'assets/sponsors/checkbook_night.svg';
import facebook from 'assets/sponsors/facebook.svg';
import mirusResearch from 'assets/sponsors/mirus_research.svg';
import johnDeere from 'assets/sponsors/john_deere.png';
import collinsAerospaceNight from 'assets/sponsors/collins_aerospace_night.svg';
import collinsAerospace from 'assets/sponsors/collins_aerospace.svg';

// Bike Sponsors
import orchidLabs from 'assets/sponsors/orchid_labs.svg';
import hrt from 'assets/sponsors/hrt.svg';
import bp from 'assets/sponsors/bp.svg';

const NUM_CAR_SPONSORS = 3;
const NUM_BIKE_SPONSORS = 4;

const carSponsors = [
  grainger,
  google,
  schlumberger,
  checkbook,
  facebook,
  mirusResearch,
  collinsAerospace,
  johnDeere,
];
const nightCarSponsors = [
  grainger,
  google,
  schlumbergerNight,
  checkbookNight,
  facebook,
  mirusResearch,
  collinsAerospaceNight,
  johnDeere,
];
const altCarSponsors = [
  'Grainger',
  'Google',
  'Schlumberger',
  'Checkbook',
  'Facebook',
  'Mirus Research',
  'Collins Aerospace',
  'John Deere',
];

const bikeSponsors = [
  bp,
  hrt,
  orchidLabs,
];
const altBikeSponsors = [
  'BP',
  'HRT',
  'Orchid Labs',
];

class Sponsors extends React.Component {
  constructor(props) {
    super(props);

    const renderedCarSponsors = [];
    renderedCarSponsors.push(0);
    renderedCarSponsors.push(1);
    renderedCarSponsors.push(2);

    const renderedBikeSponsors = []; // Array of indices of actually displayed.
    renderedBikeSponsors.push(0);
    renderedBikeSponsors.push(1);
    renderedBikeSponsors.push(2);
    renderedBikeSponsors.push(3);
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

    renderedCarSponsors[nextCarRenderIndex] = nextCarSponsorIndex;

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
    renderedBikeSponsors[nextBikeRenderIndex] = nextBikeSponsorIndex;
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

    const sponsors = this.context === 'day' ? carSponsors : nightCarSponsors;

    return renderedCarSponsors.map((sponsorIndex, index) => {
      if (index === nextCarRenderIndex) {
        return (
          <div className="sponsor-wrapper" key={altCarSponsors[index]}>
            <img src={sponsors[sponsorIndex]} className="old-image" alt={altCarSponsors[index]} />
            <img src={sponsors[nextCarSponsorIndex]} className="new-image" alt={altCarSponsors[nextCarSponsorIndex]} />
          </div>
        );
      }
      return (
        <div className="sponsor-wrapper" key={altCarSponsors[index]}>
          <img src={sponsors[sponsorIndex]} alt={altCarSponsors[index]} />
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

    return renderedBikeSponsors.map((imageIndex, index) => {
      if (index === nextBikeRenderIndex) {
        return (
          <div className="sponsor-wrapper" key={altCarSponsors[index]}>
            <img src={bikeSponsors[imageIndex]} className="old-image" alt={altBikeSponsors[index]} />
            <img src={bikeSponsors[nextBikeSponsorIndex]} className="new-image" alt={altBikeSponsors[nextBikeSponsorIndex]} />
          </div>
        );
      }
      return (
        <div className="sponsor-wrapper" key={altCarSponsors[index]}>
          <img src={bikeSponsors[imageIndex]} alt={altBikeSponsors[index]} />
        </div>
      );
    });
  }

  render() {
    const theme = this.context;
    return (
      <div className="cell long-cell" id="sponsors-cell">
        <div className="top-half">
          <h2>SPONSORS</h2>
          <div className="bus-sponsors">
            <img src={bus} alt="bus" id="bus" />
            {
              theme === 'day'
              ? <img src={optum} alt="Optum" id="optum" />
              : <img src={optumNight} alt="Optum" id="optum" />
            }
            <img src={imc} alt="IMC" id="imc" />
            <img src={caterpillar} alt="Caterpillar" id="caterpillar" />
            <img src={capitalOne} alt="Capital One" id="capital-one" />
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
              bikeSponsors.map((sponsor, index) => (
                <div className="sponsor-wrapper" key={altBikeSponsors[index]}>
                  <img src={sponsor} alt={altBikeSponsors[index]} />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

Sponsors.contextType = ThemeContext;
export default Sponsors;
