import Alert from './Alert';
import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      interpretedAlert: null,
      showDeclarative: false,
    };
  }

  declarativeAlert() {
    this.setState({ showDeclarative: true });
  }

  interpretedAlert() {
    const interpretedAlert = (
      <Alert
        onConfirmOrDismiss={() => this.setState({ interpretedAlert: null })}
        show={true}
        text={'This one is dynamically added and removed from the render() function'}
        title={'Interpreted'}
        type={'warning'}
      />
    );
    this.setState({ interpretedAlert: interpretedAlert });
  }

  render() {
    return (
      <div>
        {this.state.interpretedAlert}
        <Alert
          onConfirmOrDismiss={() => this.setState({ showDeclarative: false })}
          show={this.state.showDeclarative}
          showCancelButton={true}
          text={'This one is declaratively rendered and toggled based on state'}
          title={'Declarative'}
          type={'info'}
        />
        <p onClick={() => this.interpretedAlert()}>
          Click here to see the interpreted alert
        </p>
        <br />
        <p onClick={() => this.declarativeAlert()}>
          Click here to see the declarative alert
        </p>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));


// "react": "16.1.1",
// "react-dom": "16.1.1",
// "sweetalert2": "7.25.0"