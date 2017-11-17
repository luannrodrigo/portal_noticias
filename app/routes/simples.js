module.exports = function(app){
	app.get('/simples', function(req, res){
		res.render("simples/simples");
	});
}