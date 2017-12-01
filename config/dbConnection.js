var mysql = require('mysql')

// fazer esse processo para não fazer conexões desnecessarias
var connMySQL = function(){
	return connection = mysql.createConnection({
		host: '127.0.0.1',
		port: '3306',
		user: 'root',
		password: '',
		database: 'portal_noticias'
	})
}

module.exports = function () {
	return connMySQL
}