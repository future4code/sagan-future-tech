import React, { Component } from 'react';
import axios from 'axios'

const baseUrl = "https://us-central1-future-apis.cloudfunctions.net/"

class Administracao extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <h1>Nome do produto</h1>
        <h1>{this.props.varx}</h1>
        <button>{this.props.vary}></button>
      </div>
    );
  }
}

export default Administracao
