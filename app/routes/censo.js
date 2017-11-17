module.exports = function(app){
	app.get('/censo', function(req, res){
		res.render("censo/censo");
	});
}