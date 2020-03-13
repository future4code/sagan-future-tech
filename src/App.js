import React, { Component } from 'react';
import JssProvider from 'react-jss/lib/JssProvider'
import { create } from 'jss'
import { MuiThemeProvider, createGenerateClassName, jssPreset } from '@material-ui/core/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import axios from 'axios'
import Administracao from './Components/Administracao/Administracao.js'
import CarrinhoAtalho from './Components/CarrinhoAtalho/CarrinhoAtalho'
import CarrinhoPrincipal from './Components/CarrinhoPrincipal/CarrinhoPrincipal'
import DisplayProdutos from './Components/DisplayProdutos/DisplayProdutos'
import ProdutoPrincipal from './Components/ProdutoPrincipal/ProdutoPrincipal'
import Header from './Components/Header/Header'
import { Paper, Card } from '@material-ui/core'

const baseUrl = "https://us-central1-future-apis.cloudfunctions.net/"

const generateClassName = createGenerateClassName()
const jss = create({
  ...jssPreset(),
  insertionPoint: document.getElementById('jss-insertion-point'),
})

const theme = createMuiTheme({
  palette: {
    common: {
      black: "#000",
      white: "#fff"
    },
    background: {
      paper: "#fff",
      default: "#fafafa"
    },
    primary: {
      light: "rgba(173, 160, 198, 1)",
      main: "rgba(140, 82, 255, 1)",
      dark: "rgba(53, 3, 152, 1)",
      contrastText: "#fff"
    },
    secondary: {
      light: "rgba(245, 175, 65, 1)",
      main: "rgba(243, 156, 18, 1)",
      dark: "rgba(211, 84, 0, 1)",
      contrastText: "#fff"

    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fff"
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)"
    }
  }
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      mostraCabecalho: true,
      mostraOpcoesDeFiltro: true,
      mostraAdministracao: false,
      mostraCarrinho: false,
      mostraProdutos: true,
      mostraPrincipal: false,
      mostraPesquisa: false,
      products: [],
      productsPesquisa: [],
      arrayFiltrado: [],
      ProdPrinci: '',
      arrayDeCarrinho: [],
      inputMenor: "",
      inputMaior: "",
      inputPesquisa: "",
      somaCarrinho: "",
      qtdCarrinho: ""
    };
  }

  componentDidMount() {
    this.capturaListaProdutos()
  }

  capturaListaProdutos = () => {
    const response = axios.get(`${baseUrl}futureTech/products`)
    response.then((response) => {
      const arraytemp = response.data.products
      arraytemp.forEach((item, index, array) => {
        item.carrinho = 0
        item.image = (`https://i.picsum.photos/id/1/${this.gna()}${this.gna()}${this.gna()}/${this.gna()}${this.gna()}${this.gna()}.jpg`)
      })
      this.setState({ products: arraytemp })
    }).catch((error) => {
      console.log(error.message)
    })
  }

  gna = () => {
    return (Math.floor(Math.random() * 9))
  }

  adicionarProdutoPrincipal = (indexId) => {
    const arrayfilter = [...this.state.products].filter(produto => {
      return produto.id === indexId
    })
    this.setState({
      arrayFiltrado: arrayfilter,
      mostraProdutos: false,
      mostraPrincipal: true,
      mostraPesquisa: false
    })
  }
  encontrarOIndex = (Idpassado) => {
    let arr = this.state.products
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].id === Idpassado) {
        return i
      }
    }
  }
  adicionarProdutoNoCarrinho = async (indexId) => {
    let indexe = await this.encontrarOIndex(indexId)
    const arrayDeProdutosCopia = [...this.state.products]
    arrayDeProdutosCopia[indexe].carrinho = + 1
    const arrayDeCarrinho = arrayDeProdutosCopia.filter(produto => {
      return produto.carrinho > 0
    })
    const somaCarrinho = arrayDeCarrinho.map(item => item.price * item.carrinho).reduce((soma, subtotal) => subtotal + soma, 0)
    const qtdCarrinho = arrayDeCarrinho.map(item => 1 * item.carrinho).reduce((soma, subtotal) => subtotal + soma, 0)
    this.setState({
      products: arrayDeProdutosCopia,
      arrayDeCarrinho: arrayDeCarrinho,
      mostraPrincipal: false,
      mostraCarrinho: true,
      mostraOpcoesDeFiltro: false,
      qtdCarrinho: qtdCarrinho,
      somaCarrinho: somaCarrinho
    })
  }
  inputMenor = (event) => {
    this.setState({
      inputMenor: event.target.value
    })
  }

  inputMaior = (event) => {
    this.setState({
      inputMaior: event.target.value
    })
  }

  pesquisaPorValor = () => {
    const arrayDeProdutosCopia = [...this.state.products]
    const valorMenor = (this.state.inputMenor.length > 0 ? this.state.inputMenor : 0)
    const valorMaior = (this.state.inputMaior.length > 0 ? this.state.inputMaior : 99999999999)
    const produtoPesquisa = arrayDeProdutosCopia.filter(produto => {
      return (produto.price >= valorMenor && produto.price <= valorMaior)
    })
    this.setState({
      productsPesquisa: produtoPesquisa,
      mostraProdutos: false,
      mostraPesquisa: true,
    })
  }
  organizaDisplay = (event) => {
    if (event.target.value === "precocrescente") {
      const arrayDeProdutosCopia = [...this.state.products]
      const valoresOrdenados = arrayDeProdutosCopia.sort((item1, item2) => item1.price - item2.price)
      this.setState({
        products: valoresOrdenados,
      })
    } else if (event.target.value === "precodecrescente") {
      const arrayDeProdutosCopia = [...this.state.products]
      const valoresOrdenados = arrayDeProdutosCopia.sort((item1, item2) => item2.price - item1.price)
      this.setState({
        products: valoresOrdenados,
      })
    } else if (event.target.value === "prazocrescente") {
      const arrayDeProdutosCopia = [...this.state.products]
      const valoresOrdenados = arrayDeProdutosCopia.sort((item1, item2) => item1.shipping - item2.shipping)
      this.setState({
        products: valoresOrdenados,
      })
    } else if (event.target.value === "prazodecrescente") {
      const arrayDeProdutosCopia = [...this.state.products]
      const valoresOrdenados = arrayDeProdutosCopia.sort((item1, item2) => item2.shipping - item1.shipping)
      this.setState({
        products: valoresOrdenados,
      })
    } else if (event.target.value === "nomecrescente") {
      const arrayDeProdutosCopia = [...this.state.products]
      const valoresOrdenados = arrayDeProdutosCopia.sort((item1, item2) => { return (item1.name < item2.name) ? -1 : 1 })
      this.setState({
        products: valoresOrdenados,
      })
    } else if (event.target.value === "nomedecrescente") {
      const arrayDeProdutosCopia = [...this.state.products]
      const valoresOrdenados = arrayDeProdutosCopia.sort((item1, item2) => { return (item1.name > item2.name) ? -1 : 1 })
      this.setState({
        products: valoresOrdenados,
      })
    }
  }

  inputPesquisa = (event) => {
    const arrayDeProdutosCopia = [...this.state.products]
    const produtoPesquisa = arrayDeProdutosCopia.filter(produto =>
      produto.name.toLowerCase().includes(this.state.inputPesquisa) || produto.description.toLowerCase().includes(this.state.inputPesquisa))
    this.setState({
      inputPesquisa: event.target.value.toLowerCase(),
      productsPesquisa: produtoPesquisa,
      mostraProdutos: false,
      mostraPesquisa: true,
    })
  }
  voltaPrincipal = () => {
    this.setState({
      mostraCabecalho: true,
      mostraOpcoesDeFiltro: true,
      mostraAdministracao: false,
      mostraCarrinho: false,
      mostraProdutos: true,
      mostraPrincipal: false,
      mostraPesquisa: false,
    })
  }
  acionarCarrinho = () => {
    this.setState({
      mostraCabecalho: true,
      mostraOpcoesDeFiltro: false,
      mostraAdministracao: false,
      mostraCarrinho: true,
      mostraProdutos: false,
      mostraPrincipal: false,
      mostraPesquisa: false,
    })
  }
  acionarAdministracao = () => {
    this.setState({
      mostraCabecalho: true,
      mostraOpcoesDeFiltro: false,
      mostraAdministracao: true,
      mostraCarrinho: false,
      mostraProdutos: false,
      mostraPrincipal: false,
      mostraPesquisa: false,
    })
  }
  render() {
    const cabecalho = (
      <div>
        <Header
          quantidade={this.state.qtdCarrinho}
          acionaCarrinho={this.acionarCarrinho}
          acionaAdministracao={this.acionarAdministracao}
          acionaOnChange={this.inputPesquisa}
          valorDaBusca={this.state.inputPesquisa}
        />
      </div>
    )
    const opcoesDeFiltro = (
      <div>
        <Card>
          <input type="number" value={this.state.inputMenor} onChange={this.inputMenor} placeholder="Menor"></input>
          <input type="number" value={this.state.inputMaior} onChange={this.inputMaior} placeholder="Maior"></input>
          <button onClick={this.pesquisaPorValor}>Filtra</button>
          <select onChange={this.organizaDisplay}>
            <option value="">Selecione uma opção de ordenação</option>
            <option value="precocrescente">Preço: Crescente</option>
            <option value="precodecrescente">Preço: Decrescente</option>
            <option value="prazocrescente">Prazo: Crescente</option>
            <option value="prazodecrescente">Prazo: Decrescente</option>
            <option value="nomecrescente">Titulo: Crescente</option>
            <option value="nomedecrescente">Titulo: Decrescente</option>
          </select>
        </Card>
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
        <h3>Soma dos produtos no carrinho: R$ {this.state.somaCarrinho}</h3>
        <h3>Quantidade de produtos no carrinho: {this.state.qtdCarrinho}</h3>
        {this.state.arrayDeCarrinho.map(element => {
          return (
            <div key={this.state.products.indexOf(element)}>
              <CarrinhoPrincipal
                image={element.image}
                id={element.id}
                name={element.name}
                shipping={element.shipping}
                description={element.description}
                paymentMethod={element.paymentMethod}
                price={element.price}
                qtd={element.carrinho}
                adicionaAoCarrinho={this.adicionarProdutoNoCarrinho}

              />
            </div>
          )
        })}
        <button onClick={this.voltaPrincipal}>Voltar</button>
      </div>
    )

    const produtos = (
      <div>
        {this.state.products.map(element => {
          return (
            <div key={this.state.products.indexOf(element)}>
              <DisplayProdutos
                image={element.image}
                id={element.id}
                name={element.name}
                shipping={element.shipping}
                description={element.description}
                paymentMethod={element.paymentMethod}
                price={element.price}
                mostraPrincipal={this.adicionarProdutoPrincipal}
                adicionaAoCarrinho={this.adicionarProdutoNoCarrinho}
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
            <div key={this.state.products.indexOf(element)}>
              <ProdutoPrincipal
                image={element.image}
                id={element.id}
                name={element.name}
                shipping={element.shipping}
                description={element.description}
                paymentMethod={element.paymentMethod}
                price={element.price}
                adicionaAoCarrinho={this.adicionarProdutoNoCarrinho}
              />
            </div>
          )
        })}
      </div>
    )
    const pesquisa = (
      <div>
        {this.state.productsPesquisa.map(element => {
          return (
            <div key={this.state.products.indexOf(element)}>
              <DisplayProdutos
                image={element.image}
                id={element.id}
                name={element.name}
                shipping={element.shipping}
                description={element.description}
                paymentMethod={element.paymentMethod}
                price={element.price}
                mostraPrincipal={this.adicionarProdutoPrincipal}
                adicionaAoCarrinho={this.adicionarProdutoNoCarrinho}
              />
            </div>
          )
        })}
      </div>
    )
    return (
      <JssProvider jss={jss} generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          {this.state.mostraCabecalho ? cabecalho : ""}
          {this.state.mostraOpcoesDeFiltro ? opcoesDeFiltro : ""}
          {this.state.mostraAdministracao ? administracao : ""}
          {this.state.mostraCarrinho ? carrinhoPrincipal : ""}
          {this.state.mostraPrincipal ? produtoPrincipal : ""}
          {this.state.mostraProdutos ? produtos : ""}
          {this.state.mostraPesquisa ? pesquisa : ""}
        </MuiThemeProvider>
      </JssProvider>
    );
  }
}
export default App