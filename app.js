var http        = require('http');
var express     = require('express')
var mongoose    = require('mongoose')
var bodyParser  = require('body-parser')
// var rp          = require('request-promise');
var $           = require('cheerio');
var Users       = require('./user');

// Server Config
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}))
var server  = http.createServer(app);
// MongoDB Config
var mongourl = 'mongodb://localhost:27017/detail';
mongoose.connect(mongourl, { useNewUrlParser: true });
mongoose.connection.on('connected', () => {
  console.log('Connected to Database');
});
// var url     = "http://omiid.ir/";
//
// rp(url)
//   .then(function(html){
//     //success!
//     console.log($('h1', html).text());
//   })
//   .catch(function(err){
//     //handle error
//     console.log(err)
//   });

app.post('/', (req, res, next) => {
  if( req.body.html ){

    var html    = req.body.html;
    var details = $('.list-group-item strong', html);

    var username      = $(details[0]).text().trim();
    var usergroup     = $(details[1]).text().trim();
    var userip        = $(details[2]).text().trim();
    var userlocation  = $(details[3]).text().trim();

    var newData = new Users({
      username: username,
      group:    usergroup,
      ip:       userip,
      location: userlocation
    });
    newData.save((err) => {
      if( err ){

        res.send('Faild to save with error:' + err);
      }else{
        res.send('Done');
      }
    })
  }else{
    res.send('No Data');
  }
})

server.listen(7070, () => {
  console.log('Listening on Port 7070')
})
