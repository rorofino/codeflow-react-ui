import React from 'react';

const TitleBar = (props) => (
    <div className="titleBarComponent">
      <div className="titleBarLeft">{props.title}</div>
      <div className="titleBarRight">
        {props.renderButtons ? props.renderButtons() : null}
      </div>
    </div>
);

export default TitleBar;