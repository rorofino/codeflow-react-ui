import React, {Component} from 'react'
import {render} from 'react-dom'

import Button from '../../src/components/Button/Button.js';

class Buttons extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        };
    }

    render() {
      return (
        <div>
            <div className="demoRow">
                Loadings? {this.state.isLoading.toString()} <Button primary onClick={() => this.setState({isLoading: !this.state.isLoading})}>Toggle</Button>
            </div>
            <div className="demoRow">
                Default:
                <div className="margin-wrapper"><Button primary loading={this.state.isLoading}>Primary</Button></div>
                <div className="margin-wrapper"><Button secondary loading={this.state.isLoading}>Secondary</Button></div>
                <div className="margin-wrapper"><Button danger loading={this.state.isLoading}>Danger</Button></div>
            </div>
            <div className="demoRow">
                Outline:
                <div className="margin-wrapper"><Button primary outline loading={this.state.isLoading}>Primary</Button></div>
                <div className="margin-wrapper"><Button secondary outline loading={this.state.isLoading}>Secondary</Button></div>
                <div className="margin-wrapper"><Button danger outline loading={this.state.isLoading}>Danger</Button></div>
            </div>
            <div className="demoRow">
                Flat:
                <div className="margin-wrapper"><Button primary flat loading={this.state.isLoading}>Primary</Button></div>
                <div className="margin-wrapper"><Button secondary flat loading={this.state.isLoading}>Secondary</Button></div>
                <div className="margin-wrapper"><Button danger flat loading={this.state.isLoading}>Danger</Button></div>
            </div>
            <div className="demoRow">
                Rounded:
                <div className="margin-wrapper"><Button primary rounded loading={this.state.isLoading}>Primary</Button></div>
                <div className="margin-wrapper"><Button secondary rounded loading={this.state.isLoading}>Secondary</Button></div>
                <div className="margin-wrapper"><Button danger rounded loading={this.state.isLoading}>Danger</Button></div>
            </div>
            <div className="demoRow">
                Outline Rounded:
                <div className="margin-wrapper"><Button primary outline rounded loading={this.state.isLoading}>Primary</Button></div>
                <div className="margin-wrapper"><Button secondary outline rounded loading={this.state.isLoading}>Secondary</Button></div>
                <div className="margin-wrapper"><Button danger outline rounded loading={this.state.isLoading}>Danger</Button></div>
            </div>
            
        </div>
    );
    }
  }


export default Buttons;