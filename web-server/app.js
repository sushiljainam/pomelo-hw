var express = require('express');
var pub = require('../shared/infoPublisher');

var port = 7007;
pub.bind('tcp://*:'+port, function(err) {
    console.log('Listening for zmq subscribers  '+port+' ...');
  });

var app = express.createServer();

app.configure(function(){
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(app.router);
  app.set('view engine', 'jade');
  app.set('views', __dirname + '/public');
  app.set('view options', {layout: false});
  app.set('basepath',__dirname + '/public');
});

app.configure('development', function(){
  app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  var oneYear = 31557600000;
  app.use(express.static(__dirname + '/public', { maxAge: oneYear }));
  app.use(express.errorHandler());
});

console.log("Web server has started.\nPlease log on http://127.0.0.1:3006/index.html");

app.use('/',function(req,res){
  console.log('------------',req.body);

  res.json({info:"848fh9w24y892",msg:"request rcvd at web server"});
})
app.use('/',function(req,res){
  console.log(req.body);

  res.json({info:453988765443,msg:"request rcvd at web server"});
});


app.listen(3006);
