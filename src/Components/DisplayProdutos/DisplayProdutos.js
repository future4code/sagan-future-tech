import React, { Component } from 'react';

class DisplayProdutos extends Component {
  constructor() {
    super();
    this.state = {

    };
  }
  
  render() {
    return (
      <div>
        <img src={this.props.image}/>
        <p>
         id: {this.props.id}
        </p>
        <p>
         nome: {this.props.name}
        </p>
        <p>
         entrega: {this.props.shipping}
        </p>
        <p>
         descrição: {this.props.description}
        </p>
        <p>
        pagamento:  {this.props.paymentMethod}
        </p>
        <p>
         preço: {this.props.price}
        </p>
        <hr />
      </div>
    );
  }
}

export default DisplayProdutos
