module.exports = function(application){
	application.get('/noticia', function(req,res){

		var connection = application.config.dbConnection()
		//instanciando o noticias models para ser acesso de qualquer lugar da aplicação
		var noticiaModel = new application.app.models.NoticiasDAO(connection)

		noticiaModel.getNoticia(function(error, result){
			res.render('noticias/noticia', { noticia : result})
		})


	})
}