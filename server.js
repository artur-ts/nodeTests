var http = require('express');
var bodyParser = require('body-parser');
var jwt = require("jsonwebtoken");
var mysql = require("mysql");
var path = require("path");
var engines = require('consolidate');
var app = http();


app.set('views', __dirname + '/public/angular/src/app');
app.engine('html', engines.mustache);
app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(http.static(__dirname + '/public/angular/src/app'));
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "node_test"
});


app.all("*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});

app.get('/api',function(request, response) {
    response.json({
        text : "this is my api"
    });
})

app.post('/api/login',function(request, response) {
    con.query('SELECT * from users WHERE username= ? AND password = ?',[request.body.username, request.body.password], function(err, rows, fields) {
        if (!err) {
            if (rows.length > 0) {
                var token = userLogin(rows[0].id, request.body.username, request.body.password);
                response.json({
                    token : token,
                    logStatus: "LOG IN SUCCESS"
                });
            } else {
                response.status(403).json({
                    message: "INVALID CREDENTIALS"
                });
            }
        }
        else{
            response.send(err);
        }

    });
})



app.post('/api/protected', ensureToken, function(req, res) {
    jwt.verify(req.token, "my_secret_key", function(err, data) {
        if(err) {
            res.sendStatus(403);
        }else{
            res.json({
                text : "this is protected",
                data: data
            });
        }
    })

})


function ensureToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

function userLogin(uid, uname, upass) {
    var user = {id : uid ,username: uname, password: upass};
    var token = jwt.sign({ user }, "my_secret_key",{expiresIn:1000});
    return token;
}
app.post('/post',function(request, response) {


    con.query('SELECT * from users WHERE username= ? AND password = ?',[request.body.user, request.body.pass], function(err, rows, fields) {
        if (!err) {
            if (rows.length > 0) {
                response.send("EVERYTHING IS OK");
            } else {
                response.send("INVALID CREDENTIALS");
            }
        }
        else{
            response.send(err);
        }

    });


})
// app.get('/home',function(request, response) {
//     con.connect();
//
//     con.query('SELECT * from users', function(err, rows, fields) {
//         if (!err)
//             response.send(200,rows[0].id);
//         else
//             console.log('Error while performing Query.'+ err);
//     });
//
//     con.end();
//
//
// })

app.listen(8000);