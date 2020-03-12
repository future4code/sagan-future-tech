import React, { Component } from 'react';
import JssProvider from 'react-jss/lib/JssProvider'
import { create } from 'jss'
import { MuiThemeProvider, createGenerateClassName, jssPreset } from '@material-ui/core/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
// import { AppContainer } from './components/AppContainer'
import axios from 'axios'
import Administracao from './Components/Administracao/Administracao.js'
import CarrinhoAtalho from './Components/CarrinhoAtalho/CarrinhoAtalho'
import CarrinhoPrincipal from './Components/CarrinhoPrincipal/CarrinhoPrincipal'
import DisplayProdutos from './Components/DisplayProdutos/DisplayProdutos'
import ProdutoPrincipal from './Components/ProdutoPrincipal/ProdutoPrincipal'

const baseUrl = "https://us-central1-future-apis.cloudfunctions.net/"

const generateClassName = createGenerateClassName()
const jss = create({
	...jssPreset(),
	// We define a custom insertion point that JSS will look for injecting the styles in the DOM.
	insertionPoint: document.getElementById('jss-insertion-point'),
})

const theme = createMuiTheme()

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
	ProdPrinci: '',
	arrayDeCarrinho: []
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
	const arrayfilter = [...this.state.products].filter(produto => {
	return produto.id == indexId})
	this.setState({
	arrayFiltrado: arrayfilter,
	mostraProdutos: false,
	mostraPrincipal: true
	})
}

adicionarProdutoNoCarrinho = (indexId) => {
	const arrayTemporario = [...this.state.arrayDeCarrinho]
	arrayTemporario.push(indexId)
	this.setState({
	arrayDeCarrinho: arrayTemporario,
	mostraPrincipal: false,
	mostraCarrinho: true
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
	
	{this.state.arrayDeCarrinho.map(element => {
	return (
		<div key={this.state.products.indexOf(element)}>
		<CarrinhoPrincipal
			image={"https://semantic-ui.com/images/wireframe/image.png"}
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

const produtos = (
	<div>
	{this.state.products.map(element => {
		return (
		<div key={this.state.products.indexOf(element)}>
			<DisplayProdutos
			image={"https://semantic-ui.com/images/wireframe/image.png"}
			id={element.id}
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
		<div key={this.state.products.indexOf(element)}>
			<ProdutoPrincipal
			image={"https://semantic-ui.com/images/wireframe/image.png"}
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
	<DisplayProdutos />
	</div>
)
return (
	<JssProvider jss={jss} generateClassName={generateClassName}>
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			{this.state.mostraCabecalho ? cabecalho : ""}
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