import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios'
import Administracao from './Components/Administracao/Administracao.js'
import CarrinhoAtalho from './Components/CarrinhoAtalho/CarrinhoAtalho'
import CarrinhoPrincipal from './Components/CarrinhoPrincipal/CarrinhoPrincipal'
import DisplayProdutos from './Components/DisplayProdutos/DisplayProdutos'
import ProdutoPrincipal from './Components/ProdutoPrincipal/ProdutoPrincipal'

const baseUrl = "https://us-central1-future-apis.cloudfunctions.net/"

class App extends Component {
  constructor() {
    super();
    this.state = {
      mostraCabecalho: true,
      mostraAdministracao: false,
      mostraCarrinho: false,
      mostraProdutos: true,
      mostraPrincipal: false,
      mostraPesquisa: false,
      products: [],
      arrayFiltrado: [],
      ProdPrinci: ''
    };
  }


  componentDidMount() {
    this.capturaListaProdutos()
  }

  capturaListaProdutos = () => {
    const response = axios.get(`${baseUrl}futureTech/products`)
    console.log(response)

    response.then((response) => {
      this.setState({ products: response.data.products })
    }).catch((error) => {
      console.log(error.message)
    })
  } 

  // capturaListaProdutos = async () => {
  //   const response = await axios.get(`${baseUrl}futureTech/products`)
  //   this.setState({products: response.data.products})
  //   console.log(response.data)
  // }


  adicionarProdutoPrincipal = (indexId) => {
    this.setState({
      prodPrinci: indexId,
      mostraProdutos: false,
      mostraPrincipal: true
    })
    console.log(indexId)
  }


  filtraProdutoPrincipal = () => {
    const arrayFilter = [...this.state.products]
    arrayFilter.filter(produto => 
      produto.id === this.state.prodPrinci
      )
      this.setState({
        arrayFiltrado: arrayFilter
      })
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
      {this.state.products.map(element => {
        return (
          <div>
            <DisplayProdutos
              image={"https://semantic-ui.com/images/wireframe/image.png"}
              id={element.id}
              // key={this.state.products.indexOf(element)} ->BUGZINHO
              name={element.name}
              shipping={element.shipping}
              description={element.description}
              paymentMethod={element.paymentMethod}
              price={element.price}
              mostraPrincipal={this.adicionarProdutoPrincipal}
            />

          </div>
        )
      })}
    </div>
  )

   const produtoPrincipal = (
    <div>
      
      {this.state.arrayFiltrado.map(element => {
        return (
          <div>
            <ProdutoPrincipal
              image={"https://semantic-ui.com/images/wireframe/image.png"}
              id={element.id}
              // key={this.state.products.indexOf(element)} ->BUGZINHO
              name={element.name}
              shipping={element.shipping}
              description={element.description}
              paymentMethod={element.paymentMethod}
              price={element.price}
              mostraPrincipal={this.adicionarProdutoPrincipal}
            />

          </div>
        )
      })}
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
