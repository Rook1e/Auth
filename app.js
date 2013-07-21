// PREFERENCES
var _CONFIG = require('./CONFIG.js') 
var _RUN_RABBIT       = _CONFIG.run_rabbit

var _PORT             = _CONFIG.port
var _INTERFACE        = _CONFIG.interface
var _REPL_PORT        = _CONFIG.repl_port

var _DATABASE_CONFIG  = _CONFIG.database_config

var _PATH_TO_MODLES   = _CONFIG.path_to_models
var _PATH_TO_ACL      = _CONFIG.path_to_acl
var _PATH_TO_POLICIES = _CONFIG.path_to_policies
var _PATH_TO_API      = _CONFIG.path_to_api
var _PATH_TO_ROUTES   = _CONFIG.path_to_routes



// LOADED DURING BOOTSTRAP PROCESS EVERY APP HAS THIS
var ORM       = null 
var Models    = null 

var ACL,API,ROUTED

// UNCOMMENT COMMENT TO TURN ON OFF

//ACL       = require('Acl')(_PATH_TO_ACL,_PATH_TO_POLICIES)
API       = require('Api')(_PATH_TO_API) 
//ROUTED    = require('routed')(_PATH_TO_ROUTES)

  ACL    = ( typeof ACL    == 'undefined' )? null : ACL
  API    = ( typeof API    == 'undefined' )? null : API 
  ROUTED = ( typeof ROUTED == 'undefined' )? null : ROUTED


var express = require('express')
var app     = express()
 

  // exports for rig
  module.exports = app
  module.exports.bootstrap = bootstrap
  module.exports._CONFIG = _CONFIG 


//var ACL             = require('ACL')()

    //app.ORM    = ORM
    //app.Models = Models
    //app.API    = API 
    //app.ORM    = ORM
    //app.ACL    = ACL
    //app.ROUTER = ROUTER

  if(!module.parent){  bootstrap(run)  }


// should be fancy async auto // looked into fancy auto synch have 
// to wrap all the modules strange to make it work
// opting for callback hell
function bootstrap(cb){ 
    require('Model')(_DATABASE_CONFIG,_PATH_TO_MODLES,function(err,_ORM){ 
      if(err) throw new Error('ORM exploded')
      ORM = _ORM
      Models = ORM.models 
    
        //require(__dirname+'/config/Hooks/BEFORE-APP.js')(app,function(){
        _app(null,cb)
        //})
    })
}


var html = require('fs').readFileSync(__dirname+'/public/index.html')

function _app(err,cb){
  if(err) throw new Error(err)

      // Configuration
      app.configure(function(){
        app.set('interface', _INTERFACE);
        app.set('port'     , _PORT     );
        
        if(ROUTED) app.use(ROUTED) 
        if(ACL)    app.use(ACL)

        //app.use(express.bodyParser()); 
        
        // what is this i don`t understand it what it does or if i need it?
        //app.use(express.methodOverride());
        //app.use(express.compress())
        
        // how to extend req prototype?
        app.use(require('enhance'))
        app.use(function(req,res,next){
          req.Models = Models 
          req.models = Models
          next()
        })

        app.use(app.router);
        app.use(express.favicon());
        app.use(express.logger('dev'));
      });
     
  
      if(API){
        API.attachGet(app)
        //API.attachPost(app)
      }

      if(module.parent && _RUN_RABBIT) require('rabbit')(__dirname)


   if(cb) cb()
}


function run(err,cb){
    if(err) throw new Error(err)
    require('http').createServer(app).listen(app.get('port'), function(){
      console.log("App listening on interface "+app.get('interface') + " using port " + app.get('port'));
        if(cb) cb() 

        var RABBOT ={}
            RABBOT._CONFIG = _CONFIG
            RABBOT.app     = app 
            RABBOT.models  = Models
            RABBOT.ORM     = ORM
              if(API)     RABBOT.API = API
              if(ROUTED)  RABBOT.ROUTED = ROUTED
              if(ACL)   { RABBOT.ACL = ACL }

        if(_REPL_PORT)  require('repel')(_REPL_PORT,RABBOT)
        if(_RUN_RABBIT) require('rabbit')(__dirname)
    });
}

