import React from 'react';
import getTime from 'Dashboard/formattingFunctions';


export default class Time extends React.Component {
  constructor(props) {
    super(props);

    this.state = getTime(new Date());

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
