import React, {Component} from 'react'
import {render} from 'react-dom'

import Buttons from './buttons';

import './demo.css';
import '../../src/main.css';
import Spinner from '../../src/components/Spinner/Spinner';
import Checkbox from '../../src/components/Checkbox/Checkbox';
import Calendar from '../../src/components/Calendar/Calendar';
import FormItem from '../../src/components/FormItem/FormItem';
import Widget from '../../src/components/Widget/Widget';
import Button from '../../src/components/Button/Button';
import Modal from '../../src/components/Modal/Modal';
import LoadinModal from '../../src/components/LoadingModal/LoadingModal';
import Page from '../../src/components/Page/Page';
import TextInput from '../../src/components/TextInput/TextInput';
import Header from '../../src/components/Header/Header';
import ListMasterDetail from '../../src/components/ListMasterDetail/ListMasterDetail';
import Alert from '../../src/components/Alert/Alert';
import List from '../../src/components/List/List';
import ListItem from '../../src/components/ListItem/ListItem';
import Dropdown from '../../src/components/Dropdown/Dropdown';
import Breadcrumb from '../../src/components/Breadcrumb/Breadcrumb';
import Panels from './panels';
import Popover from '../../src/components/Popover/Popover';
import { POSITION } from '../../src/constants';
import NavBar from '../../src/components/NavBar/NavBar';

const footerModal = props => {
  return (
    [
      <Button className="margin-right-sm">OK</Button>,
      <Button>DISMISS</Button>
    ]
  );
}

class Demo extends Component {
  state = {
    modalOpen: false,
    primary: true,
    secondary: false,
    danger: false,
    loadingModal: false,
    float: false,
    alertOpen: false,
    fluidModalOpen: false,
    selectedDropDownItem: '123',
    data: [
      {
        sala: 'Sala 1',
        dias: [
          {
            dia: 1,
            horarios: [
              {hora: 8},
              {hora: 9},
              {hora: 10},
            ]
          },
          {
            dia: 2,
            horarios: [
              {hora: 11},
              {hora: 12},
              {hora: 13},
            ]
          },
          {
            dia: 3,
            horarios: [
              {hora: 14},
              {hora: 15},
              {hora: 16},
            ]
          }
        ]
      },
      {
        sala: 'Sala 2',
        dias: [
          {
            dia: 4,
            horarios: [
              {hora: 8},
              {hora: 9},
              {hora: 10},
            ]
          },
          {
            dia: 5,
            horarios: [
              {hora: 8},
              {hora: 9},
              {hora: 10},
            ]
          },
          {
            dia: 6,
            horarios: [
              {hora: 8},
              {hora: 9},
              {hora: 11},
            ]
          }
        ]
      },
      {
        sala: 'Sala 3',
        dias: [
          {
            dia: 6,
            horarios: [
              {hora: 18},
              {hora: 19},
              {hora: 20},
            ]
          }
        ]
      }
    ]
  };

  render() {
    return <div>
      <NavBar title="CodeFlow" 
        left={<Button flat hover={false}><i className="fa fa-bars"></i></Button>}
        right={<Dropdown displayPlaceHolderOnList={false} flat hover={false} placeholder="Profile" icon={<i className="fa fa-user"></i>}></Dropdown>}
        >
        <Button flat hover={false} ><i className="fa fa-bell margin-right-sm"> </i>Notifications</Button>
        <Button flat hover={false} ><i className="fa fa-envelope margin-right-sm"> </i>Contact</Button>
        <Button flat hover={false} ><i className="fa fa-comments-o margin-right-sm"> </i>Support</Button>
      </NavBar>
      <h1>codeflow-react-ui Demo</h1>

      <Panels />
      <div>
        <div className="margin-wrapper">
          <Breadcrumb>
            <Button flat>Home</Button>
            <Button flat>Users</Button>
            <Button flat>Rodrigo</Button>
          </Breadcrumb>
        </div>
      </div>
      <div className="margin-wrapper">
        <Popover isOpen={this.state.overlayOpen} content={<h1>Tesaasdasdasdasdasdassdaste</h1>} arrow>
          <Button primary onClick={() => this.setState({overlayOpen: !this.state.overlayOpen})}>PopOver</Button>
        </Popover>
      </div>
      <div className="margin-wrapper">
        <Button primary onClick={() => this.setState({fluidModalOpen: true})}>Open Fluid Modal</Button>
      </div>
      <div className="margin-wrapper">
        <Dropdown items={['123', '456', '789']} placeholder="Select an item" outline primary rounded />
      </div>
      <div className="margin-wrapper">
        <Dropdown placeholder="Select an item" outline danger rounded>
          <ListItem label="Title" disabled />
          <ListItem label="X_123" />
          <ListItem label="X_456" />
          <ListItem label="X_789" />
        </Dropdown>
      </div>
      <div className="margin-wrapper">
        <Dropdown value={this.state.selectedDropDownItem} 
          onChange={(item) => this.setState({selectedDropDownItem: item.value})}
          items={[
            {value: 5, label: '5 linhas'},
            {value: 10, label: '10 linhas'}
          ]} placeholder="Select an item" material primary />
      </div>
      <div className="margin-wrapper">
        <Popover isOpen={this.state.overlayOpen} content={<h1>adsdasdasdasdasdasdasd</h1>} position={POSITION.LEFT}>
          <Button primary onClick={() => this.setState({overlayOpen: !this.state.overlayOpen})}>PopOver</Button>
        </Popover>
      </div>
      <div className="margin-wrapper">
        <Dropdown items={['123', '456', '789']} placeholder="Select an item" flat hover={false} />
      </div>
      <div className="margin-wrapper">
        <Dropdown items={['123', '456', '789']} placeholder="Select an item" flat />
      </div>
      <Buttons />
      <div className="margin-wrapper">
        <Dropdown placeholder="Select an item" outline danger>
          <ListItem label="Title" disabled />
          <ListItem label="X_123" />
          <ListItem label="X_456" />
          <ListItem label="X_789" />
        </Dropdown>
      </div>
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
          <FormItem name="ativo" label="Ativo">
            <Checkbox value={true} danger />
          </FormItem>
          <FormItem name="nome" label="Nome">
            <input type="text" />
          </FormItem>
          <FormItem name="inline" label="Nome" inline>
            <input type="text" />
          </FormItem>
        </div>
      </div>
      <div className="demoRow">
        <div className="margin-wrapper">
          <Widget />
        </div>
      </div>
      <div className="demoRow">
        <Page>
          <div className="margin-wrapper">
            <Button primary onClick={() => this.setState({alertOpen: true})}>Open Alert</Button>
          </div>
          <div className="margin-wrapper">
            <Button primary onClick={() => this.setState({modalOpen: true, primary: true, secondary: false, danger: false, float: false, neutral: false})}>Open Modal</Button>
          </div>
          <div className="margin-wrapper">
            <Button secondary onClick={() => this.setState({modalOpen: true, primary: false, secondary: true, danger: false, float: true, neutral: false})}>Open Modal</Button>
          </div>
          <div className="margin-wrapper">
            <Button danger onClick={() => this.setState({modalOpen: true, primary: false, secondary: false, danger: true, float: false, neutral: false})}>Open Modal</Button>
          </div>
          <div className="margin-wrapper">
            <Button primary onClick={() => this.setState({modalOpen: true, primary: false, secondary: false, danger: false, overflow: false, footerModal})}>Open Neutral</Button>
          </div>
          <div className="margin-wrapper">
            <Button primary onClick={() => this.setState({loadingModal: true})}>Open Loading Modal</Button>
          </div>
          <FormItem name="materialinput" label="Material input">
            <TextInput />
          </FormItem>
        </Page>
      </div>
      <div className="demoRow">
        <Page>
          <Calendar startDate={new Date()}
            data={[]}
            />
        </Page>
      </div>
      <div className="demoRow">
          <ListMasterDetail title="Horários" value={this.state.data}  titleIcon="fa fa-home"
            columns={[{labelProperty: 'sala', valueProperty: 'dias', title: 'Salas', manageable: true, titleIcon: 'fa fa-edit'}, {labelProperty: 'dia', valueProperty: 'horarios', title: 'Dias da Semana', manageable: true}, {labelProperty: 'hora', valueProperty: 'hora', title: 'Horários', manageable: true, final: true}]}  />
      </div>
      <div className="demoRow">
        <div className="margin-wrapper">
          <List items={['123', '456', '789']} selectedItem='789'>
          </List>
        </div>
        <div className="margin-wrapper">
          <List primary selectedItem='123'>
            <ListItem label="123" value="123" icon="fa fa-pencil"/>
            <ListItem label="456" icon="fa fa-pencil"/>
            <ListItem label="789" icon="fa fa-pencil"/>
          </List>
        </div>
        <div className="margin-wrapper">
          <List secondary>
            <ListItem label="123" icon="fa fa-pencil"/>
            <ListItem label="456" icon="fa fa-pencil"/>
            <ListItem label="789" icon="fa fa-pencil"/>
          </List>
        </div>
        <div className="margin-wrapper">
          <List danger>
            <ListItem label="123" icon="fa fa-pencil"/>
            <ListItem label="456" icon="fa fa-pencil"/>
            <ListItem label="789" icon="fa fa-pencil"/>
            <ListItem separator/>
            <ListItem label="789" icon="fa fa-pencil"/>
            <ListItem label="789" icon="fa fa-pencil"/>
            <ListItem label="789" icon="fa fa-pencil"/>
          </List>
        </div>
      </div>
      <Alert 
        isOpen={this.state.alertOpen} 
        danger
        onDismiss={() => this.setState({alertOpen: false})}
        onConfirm={() => this.setState({alertOpen: false})}
        title="My Alert Title" confirmButtonLabel="Agree" dismissButtonLabel="Disagree">
        My Alert Body
      </Alert>
      <Modal icon="fa fa-pencil" 
        isOpen={this.state.modalOpen} 
        float={this.state.float}
        neutral={this.state.neutral}
        primary={this.state.primary} secondary={this.state.secondary} danger={this.state.danger} onClose={() => this.setState({modalOpen: false})}
        footer={this.state.footerModal}>
        Modal de teste
      </Modal>
      <Modal title="Fluid modal"
        position="top"
        showOverlay={true}
        isOpen={this.state.fluidModalOpen} 
        onClose={() => this.setState({fluidModalOpen: false})}
        float={this.state.float}
        neutral={this.state.neutral}
        primary={this.state.primary} secondary={this.state.secondary} danger={this.state.danger}>
        Modal de teste
      </Modal>
      <LoadinModal isOpen={this.state.loadingModal} primary={this.state.primary} secondary={this.state.secondary} danger={this.state.danger}>
        Modal de teste
      </LoadinModal>

    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
