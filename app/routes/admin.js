module.exports = function(application){
	application.get('/form', function(req, res){
		res.render('admin/form')
	})

	application.post('/noticias/salvar', function(req, res){
		var noticia = req.body
		console.log(noticia)
		//validando campos do fomulario
		// req.assert('titulo', 'Campo não pode ser vazio').notEmpty()
		// req.assert('resumo', 'Campo não pode ser vazio').notEmpty()
		// req.assert('resumo', 'Campo menor que 10').len(10,100)
		// req.assert('autor', 'Autor obrigatório').notEmpty()
		// req.assert('data', 'Autor obrigatório').notEmpty().isDate({format: 'YYYY-MM-DD'})
		// req.assert('noticia', 'Campo obrigatório').notEmpty()

		// var erros = req.validationErrors()
		// if(erros){
		// 	res.render('admin/form')
		// 	return
		// }


		var connection = application.config.dbConnection()
		//instanciando o noticias models para ser acesso de qualquer lugar da aplicação
		var noticiasModel = new application.app.models.NoticiasDAO(connection)

		noticiasModel.salvarNoticia(noticia, function(error, result){
			res.redirect('/noticias');
		})

	})
}