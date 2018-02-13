var http = require('express');
var bodyParser = require('body-parser');
var mysql = require("mysql");
var path = require("path");
var engines = require('consolidate');
var app = http();


app.set('views', __dirname + '/public/angular/src/app');
app.engine('html', engines.mustache);
app.set('view engine', 'html');
app.use(bodyParser());
// app.use(http.static(__dirname + '/public/angular/src/app'));
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "node_test"
});


app.get('/',function(request, response) {
    response.render("111");
})
app.post('/post',function(request, response) {
    response.send("1");
    // if(request.body.exeite == "yes") {
    //     response.send("1");
    // }else{
    //     response.send(request.body.exeite);
    // }

})
app.get('/home',function(request, response) {
    con.connect();

    con.query('SELECT * from users', function(err, rows, fields) {
        if (!err)
            response.send(200,rows[0].id);
        else
            console.log('Error while performing Query.'+ err);
    });

    con.end();


})

app.listen(8000);