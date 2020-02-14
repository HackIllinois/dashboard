import React from 'react';
import getTime from 'Dashboard/formattingFunctions';


export default class Time extends React.Component {
  constructor(props) {
    super(props);

    const initialState = getTime(new Date());
    initialState.loadingEvents = true;
    initialState.events = [];
    initialState.leadingEventIndex = 0; // Which event is closest approaching/ocurring
    initialState.eventsToRemove = []; //

    this.state = initialState;

    this.interval = null;

    this.setTime = this.setTime.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(this.setTime, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  setTime() {
    const newTime = getTime(new Date());
    this.setState(newTime);
  }

  render() {
    const {
      hours,
      minutes,
      isAm,
    } = this.state;

    return (
      <div className="cell short-cell" id="time-cell">
        <div className="clock">
          <p>{hours.toString().padStart(2, '0')} <span>:</span> {minutes} {isAm ? 'AM' : 'PM'}</p>
        </div>
      </div>
    );
  }
}
