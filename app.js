var app = require('./config/server');

// var rotaHome = require('./app/routes/home');
// rotaHome(app);

// var rotaDiscreta = require('./app/routes/discreta');
// rotaDiscreta(app);

app.listen(8080, function(){
	console.log('rodando');
});