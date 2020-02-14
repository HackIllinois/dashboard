import React from 'react';
import getTime from 'Dashboard/formattingFunctions';
import { getEvents } from 'api';
import EventBlock from 'Dashboard/dashboardComponent/eventblock';
import Loading from 'components/Loading';

const NUM_EVENTS_DISPLAYED = 2;

function renderEvents(eventsToDisplay, isNow) {
  return eventsToDisplay.map(val => {
    const { name, locations, startTime } = val;

    const locationsList = [];
    locations.forEach(location => {
      locationsList.push(location.description);
    });

    const {
      hours: eventTimeHour,
      minutes: eventTimeMinute,
      isAm: eventTimeIsAm,
    } = getTime(new Date(startTime * 1000));

    const timeString = isNow ? 'NOW' : `${eventTimeHour} : ${eventTimeMinute} ${eventTimeIsAm ? 'AM' : 'PM'}`;

    return (
      <EventBlock
        key={`${name}${startTime}`}
        title={name}
        locations={locationsList}
        eventTime={timeString}
      />
    );
  });
}

function getEventsToDisplay(array, numEvents) {
  const n = array.length;
  const eventsToDisplay = [];
  for (let i = 0; i < Math.min(n, numEvents); i++) {
    eventsToDisplay.push(array[i]);
  }
  return eventsToDisplay;
}

function removeOldEvents(array, now) {
  const removedEvents = [];
  for (let i = 0; i < array.length; i++) {
    const event = array[i];
    if (now > event.startTime && now < event.endTime) {
      array.splice(i, 1);
      i--;
      removedEvents.push(event);
    }
  }

  return removedEvents;
}


export default class Events extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingEvents: true,
      eventsUpcoming: [],
      eventsNow: [],
    };

    this.updateEvents = this.updateEvents.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(this.updateEvents, 1000 * 60); // every minute
    getEvents().then(events => {
      events.sort((a, b) => (a.startTime - b.startTime));

      // Testing how it'll look when the time changes
      const myTimeTest = (new Date(2020, 1, 28, 16, 10, 0)).getTime() / 1000;
      const currentTime = Math.floor(myTimeTest);
      // const currentTime = Math.floor(Date.now() / 1000);

      // Filter out events that have already completed
      const notCompletedEvents = events.filter(event => currentTime < event.endTime);
      const happeningNow = [];
      const upcoming = [];
      notCompletedEvents.forEach(event => {
        if (currentTime > event.startTime) {
          happeningNow.push(event);
        } else {
          upcoming.push(event);
        }
      });

      this.setState({
        loadingEvents: false,
        eventsUpcoming: upcoming,
        eventsNow: happeningNow,
      });
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updateEvents() {
    const { eventsUpcoming, eventsNow } = this.state;
    const now = Math.floor(Date.now() / 1000);

    const newNowEvents = removeOldEvents(eventsUpcoming, now);
    newNowEvents.forEach(event => {
      eventsNow.push(event);
    });
    removeOldEvents(eventsNow, now);

    this.setState({
      eventsUpcoming,
      eventsNow,
    });
  }

  render() {
    const {
      loadingEvents,
      eventsUpcoming,
      eventsNow,
    } = this.state;

    if (loadingEvents) {
      return (
        <div className="cell long-cell" id="events-cell">
          <Loading />
        </div>
      );
    }

    const nowToDisplay = getEventsToDisplay(eventsNow, NUM_EVENTS_DISPLAYED);
    const upcomingToDisplay = getEventsToDisplay(eventsUpcoming, NUM_EVENTS_DISPLAYED);

    return (
      <div className="cell long-cell" id="events-cell">
        <div className="top-half">
          <h1>Happening Now</h1>
          {
            renderEvents(nowToDisplay, true)
          }
        </div>
        <div className="bottom-half">
          <h1>Upcoming</h1>
          {
            renderEvents(upcomingToDisplay, false)
          }
        </div>
      </div>
    );
  }
}
