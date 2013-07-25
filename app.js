// PREFERENCES
var _ = require('./Config/config.js') 
    console.log(_)
var _RUN_RABBIT        = _.run_rabbit

var _PORT              = _.port
var _INTERFACE         = _.interface
var _REPL_PORT         = _.repl_port

var _DATABASE_CONFIG   = _.database_config


var _MODELS_OFF        = _.models_off
var _ROUTED_OFF        = _.routed_off 
var    _ACL_OFF        =    _.acl_off
var    _API_OFF        =    _.api_off

var _PATH_TO_MODLES    = _.path_to_models
var _PATH_TO_ACL       = _.path_to_acl
var _PATH_TO_POLICIES  = _.path_to_policies
var _PATH_TO_ROUTES    = _.path_to_routes
var _PATH_TO_API       = __dirname+'/Api'

var _SERVE_STATIC      = _.serve_static
var _SERVE_DIRECTORY   = _.serve_directory

var _PATH_TO_DIRECTORY = _.path_to_directory
var _PATH_TO_STATIC    = _.path_to_static

// LOADED DURING BOOTSTRAP PROCESS EVERY APP HAS THIS
var ORM       = null 
var Models    = null 

var ACL    = (_ACL_OFF)   ? null : require('Acl')   (_PATH_TO_ACL,_PATH_TO_POLICIES)
var API    = (_API_OFF)   ? null : require('Api')   (_PATH_TO_API) 
var ROUTED = (_ROUTED_OFF)? null : require('routed')(_PATH_TO_ROUTES)

var express = require('express')
var app     = express()
 
  // exports for rig
  module.exports = app
  module.exports.bootstrap = bootstrap
  module.exports._CONFIG = _ 



  if(!module.parent){  bootstrap(run)  }


function bootstrap(cb){ 

  if(!_MODELS_OFF){
    require('Model')(_DATABASE_CONFIG,_PATH_TO_MODLES,function(err,_ORM){ 
      if(err) throw new Error('ORM exploded')
      ORM = _ORM
      Models = ORM.models 
    
        require(__dirname+'/Config/Hooks/BEFORE-APP.js')(app,function(){
        _app(null,cb)
        })
    })
  }else{
        require(__dirname+'/Config/Hooks/BEFORE-APP.js')(app,function(){
        _app(null,cb)
        })
  }
}


function _app(err,cb){
  if(err) throw new Error(err)

      // Configuration
      app.configure(function(){
        app.set('interface', _INTERFACE);
        app.set('port'     , _PORT     );
 
        app.use(require('enhance')) 
        app.use(require('log'))

        if(!_ROUTED_OFF) app.use(ROUTED) 
        if(!_ACL_OFF)    app.use(ACL)

        //app.use(express.bodyParser()); 
        
        // what is this i don`t understand it what it does or if i need it?
        //app.use(express.methodOverride());
         
        // how to extend req prototype?      

        // how to extend req prototype?
        //

        if(!_MODELS_OFF){
          app.use(function(req,res,next){
            req.Models = Models 
            req.models = Models
            next()
          })
        }


        //app.use(express.compress())
        app.use(app.router);
        app.use(express.favicon());
      });
     
  
      if(API){
        API.attachGet(app)
        //API.attachPost(app)
      }


     
      if(_SERVE_STATIC)   { app.use( express.static(_PATH_TO_STATIC))       }
      if(_SERVE_DIRECTORY){ app.use( express.directory(_PATH_TO_DIRECTORY)) }

      if(module.parent && _RUN_RABBIT) require('rabbit')(__dirname)


   if(cb) cb()
}


function run(err,cb){
    if(err) throw new Error(err)
    require('http').createServer(app).listen(app.get('port'), function(){
      console.log("App listening on interface "+app.get('interface') + " using port " + app.get('port'));
        if(cb) cb() 

        var context  = {}
            context.RABBOT = {}
            context.RABBOT._ = _
            context.RABBOT.app     = app 
            context.RABBOT.models  = Models
            context.RABBOT.ORM     = ORM
              if(API)     context.RABBOT.API = API
              if(ROUTED)  context.RABBOT.ROUTED = ROUTED
              if(ACL)     context.RABBOT.ACL = ACL 

        if(_REPL_PORT)  require('repel')(_REPL_PORT,context)
        if(_RUN_RABBIT) require('rabbit')(__dirname)
    });
}

