import React from "react";

const Header = props => (
  <div className="headerComponent">
    <div className="header">
      <div className="ham">{props.renderLeft ? props.renderLeft() : null}</div>
      <div className="title">{props.renderTitle ? props.renderTitle() : props.title}</div>
      <div className="controls">
        {props.renderRight ? props.renderRight() : null}
      </div>
    </div>
    <div className="header-content" >
      {props.children}
    </div>
  </div>
);

export default Header;
