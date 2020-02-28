import React from 'react';
import { getStats, getDashConfig } from 'api';

import Loading from 'components/Loading';
import {
  VictoryChart,
  VictoryLabel,
  VictoryBar,
  VictoryArea,
  VictoryTheme,
  VictoryAxis,
} from 'victory';

const LINE_GRAPH_TICK_INTERVAL = 60 * 30;
const UPDATE_INTERVAL_SECS = 21;

export default class Stats extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingPRs: true,
      stats: {},
      languages: [],
      counter: 3,
      maxCounter: 3,
      shouldHide: false,
    };

    this.updateStats = this.updateStats.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(this.updateStats, 1000 * UPDATE_INTERVAL_SECS); // every minute
    this.updateStats();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updateStats() {
    getStats().then(result => {
      let languages = [];
      let languagesDict = {};
      if (result.history.length > 0) {
        languagesDict = result.history[0].prLanguages;
        languages = Object.keys(languagesDict);
      }

      // Display at least one and at most three carousel panels which
      // show PR language stats
      const numberPrPanels = Math.max(
        1,
        Math.min(Math.floor(languages.length / 5), 3),
      );
      languages = languages.sort((a, b) => languagesDict[b] - languagesDict[a]);

      const maxCounter = 3 + numberPrPanels;

      this.setState(prevState => ({
        loadingPRs: false,
        stats: result,
        languages,
        maxCounter,
        counter: (prevState.counter + 1) % maxCounter,
      }));
    });
    getDashConfig().then(result => {
      this.setState({
        shouldHide: result.hideStats,
      });
    });
  }

  renderGraph(counter) {
    if (counter === 0) {
      return this.renderLineGraph(
        'COMMITS PUSHED',
        'totalCommits',
        'rgba(227, 103, 85, 1)',
        'rgba(227, 103, 85, 0.5)',
      );
    }
    if (counter === 1) {
      return this.renderLineGraph(
        'LINES OF CODE PUSHED',
        'totalLoc',
        'rgb(106, 174, 196)',
        'rgb(106, 174, 196, 0.5)',
      );
    }
    if (counter === 2) {
      return this.renderLineGraph(
        'PULL REQUESTS OPENED',
        'totalPRs',
        'rgba(93, 154, 122, 1)',
        'rgba(93, 154, 122, 0.5)',
      );
    }
    return this.renderPRLanguages(5 * (counter - 3));
  }

  renderDots() {
    const { maxCounter, counter } = this.state;

    const out = [];
    for (let i = 0; i < maxCounter; i++) {
      out.push(
        <div key={i} className={`dot${i === counter ? ' selected' : ''}`} />,
      );
    }

    return out;
  }

  renderLineGraph(title, trackedValue, color, lightColor) {
    const { stats } = this.state;
    const { history } = stats;

    let minTime = Number.MAX_VALUE;
    let maxTime = 0;
    let maxValue = 0;

    const points = history.map(entry => {
      minTime = Math.min(minTime, entry.time);
      maxTime = Math.max(maxTime, entry.time);
      maxValue = Math.max(maxValue, entry[trackedValue]);

      return {
        x: entry.time,
        y: entry[trackedValue],
      };
    });

    const firstHour = Math.ceil(minTime / LINE_GRAPH_TICK_INTERVAL) * LINE_GRAPH_TICK_INTERVAL;
    const lastHour = Math.floor(maxTime / LINE_GRAPH_TICK_INTERVAL) * LINE_GRAPH_TICK_INTERVAL;
    const ticks = [];
    for (let i = firstHour; i <= lastHour; i += LINE_GRAPH_TICK_INTERVAL) {
      ticks.push(i);
    }

    return (
      <VictoryChart
        animate={{ duration: 2000, easing: 'quadInOut' }}
        theme={VictoryTheme.grayscale}
        padding={{
          left: 50,
          top: 40,
          right: 50,
          bottom: 95,
        }}
        responsive={false}
        height={240}
        width={400}
      >
        <VictoryArea
          interpolation="monotoneY"
          style={{
            data: {
              stroke: color,
              fill: lightColor,
              strokeWidth: 5,
            },
          }}
          data={points}
        />
        <VictoryLabel
          text={title}
          x={200}
          y={25}
          textAnchor="middle"
          style={{
            fontSize: 16,
            fontWeight: 600,
            fontFamily: 'Montserrat',
            color: '#222B5C',
          }}
        />
        <VictoryAxis
          tickFormat={t => {
            const d = new Date(t * 1000);

            // let date = d.getDay();
            // date = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date];

            let hours = d.getHours() + (d.getMinutes() >= 59 ? 1 : 0);
            const suffix = hours <= 12 ? 'AM' : 'PM';
            hours = hours <= 12 ? hours : hours - 12;

            if (hours === 0) {
              hours = 12;
            }

            let mins = d.getMinutes() + Math.round(d.getSeconds() / 60);
            mins = (mins < 10 ? '0' : '') + mins;

            return `${hours}:${mins} ${suffix}`;
          }}
          tickValues={ticks}
          tickCount={5}
          style={{
            tickLabels: {
              angle: 45,
              textAnchor: 'start',
              padding: 0,
              fontSize: 11,
              fontWeight: 600,
            },
          }}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={name => Math.round(name)}
          domain={{ y: [0, maxValue * 1.25] }}
          crossAxis
          style={{ tickLabels: { fontSize: 11, fontWeight: 600 } }}
        />
      </VictoryChart>
    );
  }

  renderPRLanguages(offset) {
    const { stats, languages } = this.state;

    const colors = ['#e36755', '#275063', '#5d9a7a', '#a4395c', '#6aaec4'];
    const { history } = stats;
    const languagesDict = history[0].prLanguages;

    const numLanguages = languages.length;

    const ind = offset % numLanguages;
    const currentLanguages = languages.slice(ind, ind + 5);

    const points = currentLanguages.map((key, i) => ({
      x: i + 0.7,
      y: languagesDict[key],
      label: key,
    }));

    return (
      <div>
        <VictoryChart
          animate={{ duration: 2000, easing: 'quadInOut' }}
          theme={VictoryTheme.grayscale}
          padding={{
            left: 50,
            top: 40,
            right: 50,
            bottom: 45,
          }}
          domainPadding={{ y: 30 }}
          responsive={false}
          height={240}
          width={400}
        >
          <VictoryBar
            style={{ data: { fill: d => colors[d.index % colors.length] } }}
            data={points}
          />
          <VictoryLabel
            text="PR LANGUAGES"
            x={200}
            y={25}
            textAnchor="middle"
            style={{
              fontSize: 16,
              fontWeight: 600,
              fontFamily: 'Montserrat',
              color: '#222B5C',
            }}
          />

          <VictoryAxis
            domain={{ x: [0, 5] }}
            style={{ tickLabels: { display: 'none' } }}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={name => Math.round(name)}
            style={{ tickLabels: { fontSize: 11, fontWeight: 600 } }}
          />
        </VictoryChart>
      </div>
    );
  }

  render() {
    const { loadingPRs, counter, shouldHide } = this.state;

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
        <div className="cell short-cell" id="stats-cell">
          <Loading />
        </div>
      );
    }

    return (
      <div className="cell short-cell" id="stats-cell">
        <div className="chart">{this.renderGraph(counter)}</div>
        <div className="dots">{this.renderDots()}</div>
      </div>
    );
  }
}
