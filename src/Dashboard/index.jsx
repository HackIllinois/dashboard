import React from 'react';
import './styles/dashboard.scss';
import backgroundDay from 'assets/gradient_background.png';
import backgroundNight from 'assets/gradient_background_dark.png';
import cityscapeDay from 'assets/cityscape.svg';
import cityscapeNight from 'assets/night_cityscape.png';

import ThemeContext from './theme-context';

// All the various cells I'm using have their own jsx files
import CountDown from './cells/countdown';
import Logo from './cells/logo';
import Sponsors from './cells/sponsors';
import Time from './cells/time';
import Events from './cells/events';

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
          {
            theme === 'day'
            ? <img src={backgroundDay} id="background-gradient" alt="background" />
            : <img src={backgroundNight} id="background-gradient" alt="background" />
          }
          <button id="theme-handler" type="button" aria-label="button" onClick={disabledThemes ? this.changeTheme : this.disableTheme} />
          {
            theme === 'day'
            ? <img src={cityscapeDay} id="cityscape" alt="cityscape background" />
            : <img src={cityscapeNight} style={{ transform: 'scaleX(-1)' }} id="cityscape" alt="cityscape background" />
          }
          <div className={`dashboard ${theme}`}>
            <Logo />
            <CountDown />
            <Time />
            <Events />
            <Sponsors />
          </div>
        </div>
      </ThemeContext.Provider>
    );
  }
}
