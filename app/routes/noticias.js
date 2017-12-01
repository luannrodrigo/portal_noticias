// var dbConnection = require('../../config/dbConnection')

module.exports = function(application){

	application.get('/noticias', function(req,res){

		var connection = application.config.dbConnection()
		//instanciando o noticias models para ser acesso de qualquer lugar da aplicação
		var noticiasModel = new application.app.models.NoticiasDAO(connection)

		noticiasModel.getNoticias(function(error, result){
			res.render('noticias/noticias',{noticias: result})
		})

	})
}