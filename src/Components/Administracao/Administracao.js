import React, { Component } from 'react';
import axios from 'axios'

const baseUrl = "https://us-central1-future-apis.cloudfunctions.net/"
const {
  "name": "Produto",
  "description": "Esse é um produto muito legal!",
  "price": 10,
  "paymentMethod": "card",
"shipping": 5
}







class Administracao extends Component {
  constructor() {
    super();
    this.state = {
      inputNome: '',
      inputDescricao: '',
      inputPreco: '',
      inputPagamento: '',
      inputEnvio: ''
    };
  }


  cadastraProdutos = () => {
    const response = axios.post(`${baseUrl}futureTech/products`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    response.then((response) => {
      console.log(response)
      alert('Produto cadastrado com sucesso!')
    }).catch((error) => {
      console.log(error.message)
    })
  }


  lidaComImputNome = (event) => {
    this.setState({ inputNome: event.target.value })
  }
  lidaComImputDescricao = (event) => {
    this.setState({ inputDescricao: event.target.value })
  }
  lidaComImputPreco = (event) => {
    this.setState({ inputPreco: event.target.value })
  }
  lidaComImputPagamento = (event) => {
    this.setState({ inputPagamento: event.target.value })
  }
  lidaComImputEnvio = (event) => {
    this.setState({ inputEnvio: event.target.value })
  }


  render() {
    return (
      <div>

        <input type='text' onChange={this.lidaComImputNome} value={this.state.inputNome} placeholder='Nome' />
        <input type='text' onChange={this.lidaComImputDescricao} value={this.state.inputDescricao} placeholder='Descrição' />
        <input type='text' onChange={this.lidaComImputPreco} value={this.state.inputPreco} placeholder='Preço' />
        <input type='text' onChange={this.lidaComImputPagamento} value={this.state.inputPagamento} placeholder='Método de pagamento' />
        <input type='text' onChange={this.lidaComImputEnvio} value={this.state.inputEnvio} placeholder='Envio' />
        <button>{this.cadastraProdutos}></button>
      </div>
    );
  }
}

export default Administracao
