import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
	card: {
		width: 250,
		height: 310,
		margin: 10,
	},
	media: {
		height: 120,
	},
};

function MediaCard(props) {
	const { classes } = props;
	return (
		<Card id={props.id} onClick={() => { props.mostraPrincipal(props.id) }} className={classes.card}>
			<CardActionArea>
				<CardMedia
					className={classes.media}
					image={props.image}
					title={props.name}
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						{props.name}
					</Typography>
					<Typography component="p">
						R$ {props.price} - {props.description}
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Button size="small" color="primary">
					Ver produto
        </Button>
				<Button onClick={() => { props.adicionaAoCarrinho(props.id) }} size="small" color="primary">
					Adicionar ao carrinho
        </Button>
			</CardActions>
		</Card>
	);
}

MediaCard.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);