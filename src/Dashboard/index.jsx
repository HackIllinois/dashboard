import React from 'react';
import './styles/dashboard.scss';

import ThemeContext from './theme-context';

// All the various cells I'm using have their own jsx files
import TwitterFeed from './cells/twitter';
import CountDown from './cells/countdown';
import Logo from './cells/logo';
import Sponsors from './cells/sponsors';
import Time from './cells/time';
import Events from './cells/events';
import RecentPRs from './cells/recentprs';
import Stats from './cells/stats';

// This function will retrieve the new theme that should be applied to the dashboard.
function getTheme() {
  const currentTime = new Date();
  let currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();
  currentHour += currentMinute / 60;
  if (currentHour >= 7 && currentHour < 18) {
    // 7Aam to 6pm
    return 'day';
  }
  // 6pm to 7am
  return 'night';
}

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: getTheme(),
      disabledThemes: false,
    };

    this.updateTheme = this.updateTheme.bind(this);

    this.disableTheme = this.disableTheme.bind(this);
    this.changeTheme = this.changeTheme.bind(this);
  }

  componentDidMount() {
    this.themeInterval = setInterval(this.updateTheme, 30 * 1000); // every 30 seconds
  }

  componentWillUnmount() {
    clearInterval(this.themeInterval);
  }

  updateTheme() {
    const { theme } = this.state;
    const newTheme = getTheme();

    if (newTheme !== theme) {
      this.setState({
        theme: newTheme,
      });
    }
  }

  disableTheme() {
    clearInterval(this.themeInterval);
    this.setState({
      disabledThemes: true,
    });
  }

  changeTheme() {
    const { theme: oldTheme } = this.state;
    if (oldTheme === 'day') {
      this.setState({
        theme: 'night',
      });
    } else {
      this.setState({
        theme: 'day',
      });
    }
  }

  render() {
    const { theme, disabledThemes } = this.state;
    return (
      <ThemeContext.Provider value={theme}>
        <div className="dashboard-wrapper">
          <button id="theme-handler" type="button" aria-label="button" onClick={disabledThemes ? this.changeTheme : this.disableTheme} />
          <div className={`dashboard ${theme}`}>
            <Logo />
            <CountDown />
            <Time />
            <RecentPRs />
            <Events />
            <Sponsors />
            <Stats />
          </div>
        </div>
      </ThemeContext.Provider>
    );
  }
}
