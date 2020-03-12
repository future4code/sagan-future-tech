import React, { Component } from 'react';

class CarrinhoPrincipal extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    return (
      <div>

        {/* <img src={this.props.image}/>  */}
        <p id={this.props.id}>
         id: {this.props.id}
        </p>

        <p id={this.props.id}>
         nome: {this.props.name}
        </p>

        <p id={this.props.id}> 
         entrega: {this.props.shipping}
        </p>

        <p id={this.props.id}>
         descrição:  {this.props.description}
        </p>

        <p id={this.props.id}>
        pagamento:  {this.props.paymentMethod}
        </p>

        <p id={this.props.id}>
         preço: {this.props.price}
        </p>
        
        <hr />
        <button>Endereço de Entrega</button>
        <select>
          <option>Cartão de Crédito</option>
          <option>Boleto Bancário</option>
        </select>
      </div>
    );
  }
}

export default CarrinhoPrincipal
