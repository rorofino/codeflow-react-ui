import React, {Component} from 'react'
import {render} from 'react-dom'

import Buttons from './buttons';
import Example from '../../src'

import './demo.css';
import '../../src/main.css';
import Spinner from '../../src/components/Spinner/Spinner';
import Checkbox from '../../src/components/Checkbox/Checkbox';
import FormItem from '../../src/components/FormItem/FormItem';
import Widget from '../../src/components/Widget/Widget';

class Demo extends Component {
  render() {
    return <div>
      <h1>codeflow-react-ui Demo</h1>
      <Buttons />
      <Spinner primary />
      <Spinner secondary />
      <Spinner danger />
      <div className="demoRow">
        <div className="margin-wrapper">
          <Checkbox value={false} label="bla" />          
        </div>
        <div className="margin-wrapper">
          <Checkbox value={true} />          
        </div>
        <div className="margin-wrapper">
          <Checkbox value={false} secondary />          
        </div>
        <div className="margin-wrapper">
          <Checkbox value={true} secondary/>          
        </div>
        <div className="margin-wrapper">
          <Checkbox value={false} danger />          
        </div>
        <div className="margin-wrapper">
          <Checkbox value={true} danger />          
        </div>
      </div>
      <div className="demoRow">
        <div className="margin-wrapper">
          <FormItem label="Ativo">
            <Checkbox value={true} danger />
          </FormItem>
          <FormItem label="Nome">
            <input type="text" />
          </FormItem>
          <FormItem label="Nome" inline>
            <input type="text" />
          </FormItem>
        </div>
      </div>
      <div className="demoRow">
        <div className="margin-wrapper">
          <Widget />
        </div>
      </div>
      <Example/>
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
