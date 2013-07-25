var config = module.exports  = {}

config.port       = '8787'
config.repl_port  = '5001'
config.interface  = '192.168.56.101'

 config.routed_off = true
 config.acl_off    = true
 //config.api_off    = true
 //config.models_off = true

 config.run_rabbit = true


 config.serve_static    = true
 config.serve_directory = true

// ALL PATHS ARE RELATIVE TO THE Config FOLDER NOT MAIN APP!

 config.path_to_directory = __dirname+'/../public'
 config.path_to_static    = __dirname+'/../public'

config.path_to_models  = __dirname +'/Models' 
config.path_to_routes  = __dirname +'/Routes'
config.path_to_acl     = __dirname +'/ACL'


config.database_config =  {
  database : "testAuth",
  //protocol : "[mysql|postgres|redshift|sqlite]",
  protocol : "mysql",
  host     : "127.0.0.1",
  //port     : 3306,         // optional, defaults to database default
  user     : "root",
  password : "password",
  query    : {
    pool     : true|false,   // optional, false by default
    debug    : true|false,   // optional, false by default
    strdates : true|false    // optional, false by default
  }
};

