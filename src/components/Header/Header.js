import React from "react";
import cc from 'classcat';

const Header = props => (
  <header className={cc(["codeflow-header", props.className])}>
    {props.children}
  </header>
);

export default Header;
