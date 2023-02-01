import React from 'react';
import { getRecentPRs, getDashConfig } from 'api';
import PRBlock from 'Dashboard/dashboardComponent/prblock';
import Loading from 'components/Loading';

const NUM_RECENT_PRS = 10;
const UPDATE_INTERVAL_SECS = 15;

function renderPRs(prsToDisplay) {
  return prsToDisplay.map(val => {
    const {
 title, avatarUrl, name, repo, time,
} = val;

    return (
      <PRBlock
        title={title}
        avatarUrl={avatarUrl}
        name={name}
        repo={repo}
        time={time}
        key={time}
      />
    );
  });
}

export default class RecentPRs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingPRs: true,
      recentPRs: [],
      shouldHide: false,
    };

    this.updatePRs = this.updatePRs.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(this.updatePRs, 1000 * UPDATE_INTERVAL_SECS); // every minute
    this.updatePRs();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updatePRs() {
    getRecentPRs().then(prs => {
      // pick random index of PRs to display, in the most recent NUM_RECENT_PRS
      const maxIdx = Math.min(prs.length - 1, NUM_RECENT_PRS);
      const i = Math.floor(Math.random() * maxIdx);
      const eventSlice = prs.slice(i, i + 2);

      this.setState({
        loadingPRs: false,
        recentPRs: eventSlice,
      });
    });
    getDashConfig().then(result => {
      this.setState({
        shouldHide: result.hideRecentPRs,
      });
    });
  }

  render() {
    const { loadingPRs, recentPRs, shouldHide } = this.state;

    if (shouldHide) {
      return (
        <div
          className="cell short-cell"
          id="stats-cell"
          style={{ backgroundColor: 'none' }}
        />
      );
    }

    if (loadingPRs) {
      return (
        <div className="cell short-cell" id="recentprs-cell">
          <Loading />
        </div>
      );
    }

    return (
      <div className="cell short-cell" id="recentprs-cell">
        <h1>CONTRIBUTIONS</h1>
        {renderPRs(recentPRs.slice(0, 2))}
      </div>
    );
  }
}
