//	example server

"use strict";

const express = require('express'),
    bodyParser = require('body-parser'),
    http = require('http'),
    path = require('path'),
    o2x = require('object-to-xml'),
    app = express(),
    route = express.Router();

app.set('port', process.env.PORT || 3001);
app.use(express.static(path.join(__dirname, "/")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.all("/json", (req, res) => {
    var recived = req.body,
        method = req.method.toLowerCase(),
        response;
    if (method === "get") {
        recived = req.query;
    }

    response = {
        "status": 1,
        "type": "same domain",
        "recived": recived,
        "res": {
            "data": "test",
            "arr": [1, 2, 3]
        }
    };

    res.type(req.headers.accept);
    res.status(200).send(response);
});

app.all("/xml", (req, res) => {
    var recived = req.body,
        method = req.method.toLowerCase(),
        response;
    if (method === "get") {
        recived = req.query;
    }

    response = o2x({
        "status": 1,
        "type": "same domain",
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
    var recived = req.body,
        method = req.method.toLowerCase(),
        response;
    if (method === "get") {
        recived = req.query;
    }

    response = '(function(data){return data;})(' + JSON.stringify({
        "status": 1,
        "type": "same domain",
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
    var recived = req.body,
        method = req.method.toLowerCase(),
        response;
    if (method === "get") {
        recived = req.query;
    }

    response = {
        "status": 1,
        "type": "same domain",
        "recived": recived,
        "res": {
            "data": "test",
            "arr": [1, 2, 3]
        }
    };

    res.type(req.headers.accept);
    res.status(200).send(response);
});

app.use(function(req, res, next) {
    res.sendfile(path.resolve(path.join(__dirname, "index.html")));
});

http.createServer(app).listen(app.get('port'), () => {
    console.log('Express server listening on port ' + app.get('port'));
});
