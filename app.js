var http        = require('http');
var express     = require('express')
var mongoose    = require('mongoose')
var bodyParser  = require('body-parser')
var rp          = require('request-promise');
var $           = require('cheerio');


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}))
var server = http.createServer(app);

var url = "http://omiid.ir/";

rp(url)
  .then(function(html){
    //success!
    console.log($('h1', html).text());
  })
  .catch(function(err){
    //handle error
    console.log(err)
  });

app.get('/', (reg, res, next) => {
  res.send('hi');
})

server.listen(7070, () => {
  console.log('Listening')
})
