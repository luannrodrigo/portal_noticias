module.exports = function(app){
	app.get('/discreta', function(req, res){
		res.render("discreta/discreta");
	});
}