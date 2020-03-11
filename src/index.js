import React, { Component } from 'react';
import { render } from 'react-dom';
import Administracao from './Components/Administracao/Administracao.js'
import CarrinhoAtalho from './Components/CarrinhoAtalho/CarrinhoAtalho'
import CarrinhoPrincipal from './Components/CarrinhoPrincipal/CarrinhoPrincipal'
import DisplayProdutos from './Components/DisplayProdutos/DisplayProdutos'
import ProdutoPrincipal from './Components/ProdutoPrincipal/ProdutoPrincipal'

class App extends Component {
  constructor() {
    super();
    this.state = {
      mostraCabecalho: true,
      mostraAdministracao: false,
      mostraCarrinho: false,
      mostraProdutos: true,
      mostraPesquisa: false,
    };
  }
  render() {
    const cabecalho = (
      <div>
        <p>cabecalho</p>
        
      </div>
    )
        const administracao = (
      <div>
        <Administracao 
        />
      </div>
    )
        const carrinhoPrincipal = (
      <div>
        <CarrinhoPrincipal />
      </div>
    )
        const produtos = (
      <div>
        <DisplayProdutos 
        
        props name
        
        />
      </div>
    )
        const produtoPrincipal = (
      <div>
        <ProdutoPrincipal />
      </div>
    )
      const pesquisa = (
      <div>
        <DisplayProdutos />
      </div>
    )
    return (
      <div>
        {this.state.mostraCabecalho ? cabecalho : ""}
        {this.state.mostraAdministracao ? administracao : ""}
        {this.state.mostraCarrinho ? carrinhoPrincipal : ""}
        {this.state.mostraProdutos ? produtos : ""}
        {this.state.mostraPesquisa ? pesquisa : ""}
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
