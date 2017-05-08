//	server2

"use strict";

const express = require('express'),
    bodyParser = require('body-parser'),
    http = require('http'),
    path = require('path'),
    o2x = require('object-to-xml'),
    app = express(),
    route = express.Router();

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, "/")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.all("/json", (req, res) => {
    res.setHeader("Access-Control-Allow-Method", "GET, POST, HEAD");
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Headers", "X-Custom-Header");
    res.setHeader("Access-Control-Allow-Origin", "http://www.lawyer.cn");

    // var recived = req.body,
    //     method = req.method.toLowerCase(),
    //     response;
    // if (method === "get") {
    //     recived = req.query;
    // }

    var response;

    response = {
        "status": 1,
        "type": "different domain",
        "res": []
    };

    for (var i = 0; i < 50; i++) {
        response.res.push({
            "data": "test",
            "arr": [1 * i, 2 * i, 3 * i],
            "index": i
        });
    }

	res.type("application/json");
    res.status(200).send(response);	
});

app.all("/xml", (req, res) => {
    res.setHeader("Access-Control-Allow-Method", "GET, POST, HEAD");
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Headers", "X-Custom-Header");
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");

    var recived = req.body,
        method = req.method.toLowerCase(),
        response;
    if (method === "get") {
        recived = req.query;
    }

    response = o2x({
        "status": 1,
        "type": "different domain",
        "recived": recived,
        "res": {
            "data": "test",
            "arr": [1, 2, 3]
        }
    });

    res.type(req.headers.accept);
    res.status(200).send(response);
});

app.all("/script", (req, res) => {
    res.setHeader("Access-Control-Allow-Method", "GET, POST, HEAD");
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Headers", "X-Custom-Header");
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");

    var recived = req.body,
        method = req.method.toLowerCase(),
        response;
    if (method === "get") {
        recived = req.query;
    }

    response = '(function(data){return data;})(' + JSON.stringify({
        "status": 1,
        "type": "different domain",
        "recived": recived,
        "res": {
            "data": "test",
            "arr": [1, 2, 3]
        }
    }) + ')';

    res.type(req.headers.accept);
    res.status(200).send(response);
});

app.all("/other", (req, res) => {
    res.setHeader("Access-Control-Allow-Method", "GET, POST, HEAD");
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Headers", "X-Custom-Header");
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");

    var recived = req.body,
        method = req.method.toLowerCase(),
        response;
    if (method === "get") {
        recived = req.query;
    }

    response = {
        "status": 1,
        "type": "different domain",
        "recived": recived,
        "res": {
            "data": "test",
            "arr": [1, 2, 3]
        }
    };

    res.type(req.headers.accept);
    res.status(200).send(response);
});

app.get("/jsonp", (req, res) => {
    res.jsonp(req.query);
});

app.use(function(req, res, next) {

    res.sendfile(path.resolve(path.join(__dirname, "index.html")));
});

http.createServer(app).listen(app.get('port'), () => {
    console.log('Express server listening on port ' + app.get('port'));
});
