import React, { Component } from 'react';
import axios from 'axios'

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

  cadastrarUsuario = () => {
    const novoCadastro = {
      name: this.state.inputNome,
      description: this.state.inputDescricao,
      price: this.state.inputPreco,
      paymentMethod: this.state.inputPagamento,
      shipping: this.state.inputEnvio
    };
    const cadastraUsuario = axios.post(
      `https://us-central1-future-apis.cloudfunctions.net/futureTech/products`,
      novoCadastro,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    cadastraUsuario.then(response => {
      alert("Produto criado com sucesso!")
      this.setState({
        inputNome: '',
        inputDescricao: '',
        inputPreco: '',
        inputPagamento: '',
        inputEnvio: ''
      })
    }).catch(error => {
      alert("Algo deu errado. Tente novamente.")
      console.log(error.response.data.message)
    })
  }

  lidaComImputNome = (event) => {
    const novoValor = event.target.value
    this.setState({ inputNome: novoValor })
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
        <button onClick={this.cadastrarUsuario}>Cadastrar Produtos</button>
      </div>
    );
  }
}

export default Administracao
