var express = require('express')
var app     = express()
  
  module.exports = app
  module.exports.bootstrap = bootstrap
  module.exports.config ={}
    module.exports.config.mount = '/'
    module.exports.config.port = '8787'
    module.exports.config.interface = '192.168.56.101'
  
  //console.log('lifted function')
  if(!module.parent){  debugger;bootstrap(run)  }

function bootstrap(cb){ 
    _app(null,cb)
}


var html = require('fs').readFileSync(__dirname+'/public/index.html')

function _app(err,cb){
  if(err) throw new Error(err)

      // Configuration
      app.configure(function(){
        app.set('interface', module.exports.config.interface);
        app.set('port',      module.exports.config.port);
        app.set('views', __dirname + '/public');
        app.set('view engine', 'jade');
        app.set('view options', {layout:false });
        app.set('reload', false );
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(express.compress())
        app.use(app.router);
        app.use(express.directory(__dirname +'/public'));
        app.use(express.static(__dirname + '/public'));
        app.use(express.favicon());
        app.use(express.logger('dev'));
      });

      app.get('/',function(req,res){
        res.end(html)
      })

   if(cb) cb()
}


function run(err,cb){
    if(err) throw new Error(err)
    require('http').createServer(app).listen(app.get('port'), function(){
      console.log("App listening on interface "+app.get('interface') + " using port " + app.get('port'));
        if(cb) cb()
    });
}

