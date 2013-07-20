var config = module.exports  = {}

config.database =  {
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

