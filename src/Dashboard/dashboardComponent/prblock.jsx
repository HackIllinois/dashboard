import React from 'react';

function PRBlock(props) {
  const {
 title, avatarUrl, name, repo,
} = props;
  return (
    <div className="pr-block">
      <img className="avatar" src={avatarUrl} alt={`${name} avatar`} />
      <div className="vertical-center-text details">
        <h2 className="info">
          {name} to {repo}
        </h2>
        <h3 className="title">{title}</h3>
      </div>
    </div>
  );
}

export default PRBlock;
