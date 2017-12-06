module.exports.formulario_inclusao_noticia = function(application, req, res) {
	res.render('admin/form', {validacao: {}, noticia: {}})
}

module.exports.noticias_salvar = function(application, req, res){
		var noticia = req.body
		// validando campos do fomulario
		req.assert('titulo', 'Campo Titulo não pode ser vazio').notEmpty()
		req.assert('resumo', 'Campo resumo não pode ser vazio e/ou menor que 10 e maior que 100').len(10,100)
		req.assert('autor', 'Autor obrigatório').notEmpty()
		req.assert('data_noticia', 'Data obrigatório').notEmpty()
		req.assert('noticia', 'Campo obrigatório').notEmpty()
		//retonando a mensagem de erro
		var erros = req.validationErrors()

		if(erros){
			res.render('admin/form', {validacao: erros, noticia: noticia})
			return
		}
		var connection = application.config.dbConnection()
		//instanciando o noticias models para ser acesso de qualquer lugar da aplicação
		var noticiasModel = new application.app.models.NoticiasDAO(connection)

		noticiasModel.salvarNoticia(noticia, function(error, result){
			res.redirect('/noticias');
		})

	}
