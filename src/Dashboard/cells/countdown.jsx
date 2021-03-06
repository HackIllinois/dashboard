import React from 'react';
import { getTimes } from 'api';
import Loading from 'components/Loading';

import ThemeContext from 'Dashboard/theme-context';

function getOnesDigit(number) {
  return number % 10;
}

function getTensDigit(number) {
  return Math.floor(number / 10);
}

function renderValue(value, type, shouldAnimate) {
  const tensDigit = getTensDigit(value);
  const onesDigit = getOnesDigit(value);

  if (!shouldAnimate) {
    return (
      <div className="counter">
        <h4>{type}</h4>
        <div className="number">
          <div className="digit-wrapper digit-wrapper-top">
            <p className="digit digit-top">{tensDigit}{onesDigit}</p>
          </div>
          <div className="digit-wrapper digit-wrapper-bottom">
            <p className="digit digit-bottom">{tensDigit}{onesDigit}</p>
          </div>
        </div>
      </div>
    );
  }

  // When value changes, the old value is seen before animation occurs
  const oldValue = (value + 1) % 60;
  const oldTensDigit = getTensDigit(oldValue);
  const oldOnesDigit = getOnesDigit(oldValue);
  return (
    <div className="counter">
      <h4>{type}</h4>
      <div className="number">
        <div className="digit-wrapper digit-wrapper-top digit-wrapper-top-new">
          <p className="digit digit-top">{tensDigit}{onesDigit}</p>
        </div>
        <div className="digit-wrapper digit-wrapper-top digit-wrapper-top-old">
          <p className="digit digit-top">{oldTensDigit}{oldOnesDigit}</p>
        </div>
        <div className="digit-wrapper digit-wrapper-bottom">
          <p className="digit digit-bottom">{oldTensDigit}{oldOnesDigit}</p>
        </div>
        <div className="digit-wrapper digit-wrapper-bottom digit-wrapper-bottom-new">
          <p className="digit digit-bottom">{tensDigit}{onesDigit}</p>
        </div>
      </div>
    </div>
  );
}


// This component is in the top row, center
class CountDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: -1,
      completed: false,
      hasStarted: false,
      startTime: -1, // negative value acts as sentinel value
      endTime: -1, // to check if initalize state has finished
    };

    this.initializeState();

    this.interval = null;

    this.setTime = this.setTime.bind(this);
    this.initializeState = this.initializeState.bind(this);
  }

  componentDidMount() {
    const { completed } = this.state;
    if (!completed) {
      this.interval = setInterval(this.setTime, 1000);
    }
  }

  componentWillUnmount() {
    const { completed } = this.state;
    if (!completed) {
      clearInterval(this.interval);
    }
  }

  setTime() {
    const { startTime, endTime } = this.state;
    const currentTime = Math.floor(Date.now() / 1000);
    let difference = startTime - currentTime;

    let hasStarted = false;
    if (difference <= 0) { // passed the start time
      difference = endTime - currentTime;
      hasStarted = true;
    }
    if (difference <= 0) { // passed the end time
      this.setState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: -1,
        completed: true,
        hasStarted,
        startTime,
        endTime,
      });
      return;
    }

    const seconds = difference % 60;

    // In order to make minutes add up, need to effectively add back in the seconds subtracted
    // This is done with the ceil.
    difference = Math.ceil(difference / 60);

    const minutes = difference % 60;
    difference = (difference - minutes) / 60;

    const hours = difference % 24;
    difference = (difference - hours) / 24;

    const days = difference;

    this.setState({
      days,
      hours,
      minutes,
      seconds,
      completed: false,
      hasStarted,
      startTime,
      endTime,
    });
  }

  initializeState() {
    getTimes().then(data => {
      const { eventStart: startTime, hackEnd: endTime } = data;

      const currentTime = Math.floor(Date.now() / 1000);
      let difference = startTime - currentTime;

      let hasStarted = false;
      if (difference <= 0) { // passed the start time
        difference = endTime - currentTime;
        hasStarted = true;
      }
      if (difference <= 0) { // passed the end time
        this.setState({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: -1,
          completed: true,
          hasStarted,
          startTime,
          endTime,
        });
        return;
      }

      const seconds = difference % 60;

      // In order to make minutes add up, need to effectively add back in the seconds subtracted
      // This is done with the ceil.
      difference = Math.ceil(difference / 60);

      const minutes = difference % 60;
      difference = (difference - minutes) / 60;

      const hours = difference % 24;
      difference = (difference - hours) / 24;

      const days = difference;

      this.setState({
        days,
        hours,
        minutes,
        seconds,
        completed: false,
        hasStarted,
        startTime,
        endTime,
      });
    });
  }


  render() {
    const {
      days,
      hours,
      minutes,
      seconds,
      hasStarted,
      startTime,
      endTime,
      completed,
    } = this.state;

    if (startTime === -1 || endTime === -1) {
      return <Loading />;
    }

    const shouldUpdateMinutes = seconds === 0;
    let shouldUpdateHours = false;
    let shouldUpdateDays = false;
    if (shouldUpdateMinutes) {
      shouldUpdateHours = minutes === 0;
      if (shouldUpdateHours) {
        shouldUpdateDays = hours === 0;
      }
    }

    if (completed) {
      return (
        <div className="cell short-cell" id="countdown-cell">
          <h1>THANKS FOR ATTENDING</h1>
          <div className="clock">
            {renderValue(0, 'Days', shouldUpdateDays)}
            {renderValue(0, 'Hours', shouldUpdateHours)}
            {renderValue(0, 'Minutes', shouldUpdateMinutes)}
          </div>
        </div>
      );
    }
    return (
      <div className="cell short-cell" id="countdown-cell">
        <h1>{!hasStarted ? 'HACKILLINOIS STARTS IN' : 'HACKING ENDS IN'}</h1>
        <div className="clock">
          {renderValue(days, 'Days', shouldUpdateDays)}
          {renderValue(hours, 'Hours', shouldUpdateHours)}
          {renderValue(minutes, 'Minutes', shouldUpdateMinutes)}
        </div>
      </div>
    );
  }
}

CountDown.contextType = ThemeContext;
export default CountDown;
