var express = require('express')
var consign = require('consign')
var bodyParser = require('body-parser')
var expressValidator = require('express-validator')


var app = express();
//setando a engine de views
app.set('view engine', 'ejs')
//setando o diretorio de views
app.set('views', './app/views')

app.use(express.static('./app/public'))
//setando o body parser para envio do formulario
app.use(bodyParser.urlencoded({extended: true}))
app.use(expressValidator())


//setando o diretorio das rota com o consign
consign()
	.include('app/routes')
	.then('config/dbConnection.js')
	.then('app/models')
	.then('app/controllers')
	.into(app)

module.exports = app