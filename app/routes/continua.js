module.exports = function(app){
	app.get('/continua', function(req, res){
		res.render("continua/continua");
	});
}