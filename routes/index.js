var express = require('express');
var fs = require('fs');
var pug = require('pug');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Center For Integrated Medicine'});
});

// rest endpoint fetches the pug template, converts to html, then sends to page
router.get('/REST/getHTML', function(req, res, next) {
    var pugFile = __dirname + '/../views/templates/' + req.query.path + req.query.file + '.pug';
    fs.readFile(pugFile, 'utf8', function(err, str){
        if (err) {
            throw err;
        }
        var fn = pug.compile(str, { filename: pugFile, pretty: true });
        var html = fn();
        res.send({html: html});
    });
});

module.exports = router;
