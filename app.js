var express = require('express')
var app     = express()

var _CONFIG = require('./CONFIG.js')
var _DATABASE_CONFIG = _CONFIG.database_config
var _PATH_TO_MODLES  = _CONFIG.path_to_models
var _PATH_TO_API     = _CONFIG.path_to_api
var _PORT            = _CONFIG.port
var _INTERFACE       = _CONFIG.interface
var _REPL_PORT       = _CONFIG.repl_port
var _RUN_RABBIT      = _CONFIG.run_rabbit


var API             = require('Api')(__dirname+'/Api') 
var ORM             = null
var Models          = null

  module.exports = app
  module.exports.bootstrap = bootstrap
  module.exports._CONFIG = _CONFIG 

  if(!module.parent){  debugger;bootstrap(run)  }

function bootstrap(cb){ 
    require('Model')(_DATABASE_CONFIG,_PATH_TO_MODLES,function(err,_ORM){ 
      if(err) throw new Error('ORM exploded')
      ORM = _ORM
      Models = ORM.models 
      _app(null,cb)
    })
}


var html = require('fs').readFileSync(__dirname+'/public/index.html')

function _app(err,cb){
  if(err) throw new Error(err)

      // Configuration
      app.configure(function(){
        app.set('interface', _INTERFACE);
        app.set('port'     , _PORT     );
        //app.set('views', __dirname + '/public');
        //app.set('view engine', 'jade');
        //app.set('view options', {layout:false });
        //app.set('reload', false );
        //app.use(express.bodyParser());
        //app.use(express.methodOverride());
        //app.use(express.compress())
        app.use(app.router);
        //app.use(express.directory(__dirname +'/public'));
        app.use(express.static(__dirname + '/public'));
        app.use(express.favicon());
        app.use(express.logger('dev'));
      });
      
      
      API.attachGet(app)

      if(module.parent && _RUN_RABBIT) require('rabbit')(__dirname)


   if(cb) cb()
}


function run(err,cb){
    if(err) throw new Error(err)
    require('http').createServer(app).listen(app.get('port'), function(){
      console.log("App listening on interface "+app.get('interface') + " using port " + app.get('port'));
        if(cb) cb()
        if(_REPL_PORT)  require('repel')(_REPL_PORT,{app:app,Models:Models})
        if(_RUN_RABBIT) require('rabbit')(__dirname)
    });
}

