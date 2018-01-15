import React, {Component} from 'react';
import {render} from 'react-dom';

import Panel from '../../src/components/Panel/Panel.js';

class Panels extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {
      return (
        <div>
            <div className="demoRow">
                <div className="margin-wrapper"><Panel primary title="i´m the title">I´m the modal body</Panel></div>
                <div className="margin-wrapper"><Panel secondary title="i´m the title">I´m the modal body</Panel></div>
                <div className="margin-wrapper"><Panel danger title="i´m the title">I´m the modal body</Panel></div>
            </div>
            <div className="demoRow">
                <div className="margin-wrapper"><Panel primary float title="i´m the title">I´m the modal body</Panel></div>
                <div className="margin-wrapper"><Panel secondary float title="i´m the title">I´m the modal body</Panel></div>
                <div className="margin-wrapper"><Panel danger float title="i´m the title">I´m the modal body</Panel></div>
            </div>
        </div>
    );
    }
  }


export default Panels;