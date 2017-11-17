module.exports = function(app){
	app.get('/sistematica', function(req, res){
		res.render("sistematica/sistematica");
	});
}