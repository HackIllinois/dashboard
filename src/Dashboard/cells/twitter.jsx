import React from 'react';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import ThemeContext from '../theme-context';

function renderTwitterFeed(theme) {
  const darkClass = `twitter-wrapper ${theme !== 'night' ? 'hidden' : ''}`;
  const lightClass = `twitter-wrapper ${theme === 'night' ? 'hidden' : ''}`;

  return (
    <div className="cell long-cell" id="twitter-cell">
      <div className={darkClass}>
        <TwitterTimelineEmbed
          sourceType="url"
          url="https://twitter.com/HackIllinois?ref_src=twsrc%5Etfw"
          screenName="HackIllinois"
          theme="dark"
          noScrollbar
          noBorders
          noFooter
          options={{ height: 1000 }}
        />
      </div>
      <div className={lightClass}>
        <TwitterTimelineEmbed
          sourceType="url"
          url="https://twitter.com/HackIllinois?ref_src=twsrc%5Etfw"
          screenName="HackIllinois"
          theme="light"
          noScrollbar
          noBorders
          noFooter
          options={{ height: 1000 }}
        />
      </div>
    </div>
  );
}

function TwitterFeed() {
  return (
    <ThemeContext.Consumer>
      {value => renderTwitterFeed(value)}
    </ThemeContext.Consumer>
  );
}

export default TwitterFeed;
