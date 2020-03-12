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

const baseUrl = "https://us-central1-future-apis.cloudfunctions.net/"

const generateClassName = createGenerateClassName()
const jss = create({
	...jssPreset(),
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
		})
	this.setState({ products: arraytemp })
	}).catch((error) => {
	console.log(error.message)
	})
} 

adicionarProdutoPrincipal = (indexId) => {
	const arrayfilter = [...this.state.products].filter(produto => {
	return produto.id === indexId})
	this.setState({
	arrayFiltrado: arrayfilter,
	mostraProdutos: false,
	mostraPrincipal: true,
	mostraPesquisa: false
	})
}
encontrarOIndex = (Idpassado) => {
	let arr = this.state.products
	for(var i=0; i<arr.length; i++) {
        if(arr[i].id === Idpassado) {
            return i
        }
}}
adicionarProdutoNoCarrinho = async (indexId) => {
	let indexe = await this.encontrarOIndex(indexId)
	const arrayDeProdutosCopia = [...this.state.products]
	arrayDeProdutosCopia[indexe].carrinho =+ 1
const arrayDeCarrinho = [...this.state.products].filter(produto => {
return produto.carrinho > 0})
const somaCarrinho = arrayDeCarrinho.map(item => item.price * item.carrinho).reduce((soma, subtotal) => subtotal + soma,0)
const qtdCarrinho = arrayDeCarrinho.map(item => 1 * item.carrinho).reduce((soma, subtotal) => subtotal + soma,0)
	this.setState({
	products: arrayDeProdutosCopia,
	arrayDeCarrinho: arrayDeCarrinho,
	mostraPrincipal: false,
	mostraCarrinho: true,
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
const produtoPesquisa = arrayDeProdutosCopia.filter(produto =>{
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
}  else if (event.target.value === "nomecrescente") {
	const arrayDeProdutosCopia = [...this.state.products]
	const valoresOrdenados = arrayDeProdutosCopia.sort((item1, item2) => { return (item1.name < item2.name) ? -1 : 1})
	this.setState({
	products: valoresOrdenados,
	})
}   else if (event.target.value === "nomedecrescente") {
	const arrayDeProdutosCopia = [...this.state.products]
	const valoresOrdenados = arrayDeProdutosCopia.sort((item1, item2) => { return (item1.name > item2.name) ? -1 : 1})
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
		mostraAdministracao: false,  
		mostraCarrinho: false,
		mostraProdutos: true,
		mostraPrincipal: false,
		mostraPesquisa: false,
	})
}
render() {
const cabecalho = (
	<div>
		<input type="text" value={this.state.inputPesquisa} onChange={this.inputPesquisa} placeholder="Qual produto deseja?"></input>
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
	<h3>Soma dos produtos no carrinho {this.state.somaCarrinho}</h3>
	<h3>Quantidade de produtos no carrinho {this.state.qtdCarrinho}</h3>
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
	{this.state.productsPesquisa.map(element => {
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