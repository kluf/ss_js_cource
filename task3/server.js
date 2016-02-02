var http = require('http');
var port = 3000;
var fs = require('fs');
var serveStatic = require('serve-static');
var serve = serveStatic("public/");
var finalhandler = require('finalhandler');
var qs = require('querystring');

http.createServer(function(req, res) {
    var regExp = /^(([A-Za-z]+)\d?){3,}/;
    if (req.url.indexOf('/validate') !== -1) {
        var body = '', postData = '';
        req.on('data', function(data) {
            body += data.toString();
        });
        req.on('end', function() {
            if (regExp.test(qs.parse(body)['val'])) {
                postData = JSON.stringify({error: false});
            } else {
                postData = JSON.stringify({error: true});
            }
            res.write(postData);
            res.end();
        });
    } else {
        var done = finalhandler(req, res);
        serve(req, res, done);
    }
}).listen(port);


console.log("Sever in listening on port " + port);