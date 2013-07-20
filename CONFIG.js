var config = module.exports  = {}

config.port       = '8787'
config.interface  = '192.168.56.101'


config.repl_port  = '5001'
config.run_rabbit = true

config.path_to_models = __dirname +'/config/Models'
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

