module.exports = function(cb){

var request = require('request')
var should  = require('should')

var path = 'http://localhost:8787'


var _ = require(__dirname+'/../Config/config.js')
var _DATABASE_CONFIG = _.database_config

var User = null 

var Cary = null




require('async').series([ 

function(cb){
  require('Model')(_DATABASE_CONFIG,__dirname+'/../Config/Models',function(err,ORM){
    if(err) throw new Error(err) 
    User = ORM.models.user 
    cb(null,'Loaded User model')
  })
},

function(cb){
  request(path,function(err,res,body){
    if(err) throw new Error(err)
    body.should.equal('index')
    cb(null,'index route working')
  })
},

function(cb){
    request.post({uri:path+'/create',
    json:true,
    body:{
      email:'mage@tower.com',
      password:'password'
    }
    },
    function(err,res,body){
    if(err) throw new Error(err)
      body.result.should.equal('ok')
      cb(null,'create route working')
    })

},

function(cb){
    request.post({uri:path+'/login',
    json:true,
    body:{
      email:'mage@tower.com',
      password:'paassword'
    }
    },
    function(err,res,body){
    if(err) throw new Error(err) 
      body.err.should.equal('AUTH')
      cb(null,'Stopped bad login')
    })

},

function(cb){
    request.post({uri:path+'/login',
    json:true,
    body:{
      email:'mage@tower.com',
      password:'password'
    }
    },
    function(err,res,body){
    if(err) throw new Error(err) 
      body.result.should.equal('ok')
      cb(null,'Allowed good login')
    })
},

function(cb){
  User.find({email:'mage@tower.com'},function(err,result){
    if(err) throw new Error(err)
    Cary = result[0].pin
    cb(null,'Retrived mage@tower.com`s pin '+Cary)
  })
},

function(cb){
    request.post({uri:path+'/verify',
    json:true,
    body:{
      email:'mage@tower.com',
      pin:'asdasd'
    }
    },
    function(err,res,body){
    if(err) throw new Error(err)
    body.err.should.equal('AUTH')
    cb(null,'Bad email verify stopped')
    })
},

function(cb){
    request.post({uri:path+'/verify',
    json:true,
    body:{
      email:'mage@tower.com',
      pin:Cary
    }
    },
    function(err,res,body){
    if(err) throw new Error(err)
    body.result.should.equal('ok')
    cb(null,'Good email verify allowed')
    })
},
function(cb){
    request.post({uri:path+'/verify',
    json:true,
    body:{
      email:'mage@tower.com',
      pin:Cary
    }
    },
    function(err,res,body){
    if(err) throw new Error(err)
    body.err.should.equal('AUTH')
    cb(null,'Bad email verify stopped')
    })

},

function(cb){
    request.post({uri:path+'/update',
    json:true,
    body:{
      email:'mage@tower.com',
      password:'password',
      new_password:'cartel'
    }
    },
    function(err,res,body){
    if(err) throw new Error(err)
    body.result.should.equal('ok')
    cb(null,'Changed password succesfully with password')
    })
},

function(cb){
    request.post({uri:path+'/login',
    json:true,
    body:{
      email:'mage@tower.com',
      password:'cartel'
    }
    },
    function(err,res,body){
    if(err) throw new Error(err) 
      body.result.should.equal('ok')
      cb(null,'Allowed good login with new password')
    })
},

function(cb){
  User.find({email:'mage@tower.com'},function(err,result){
    if(err) throw new Error(err) 
            result[0].pin.should.not.equal(Cary)
     Cary = result[0].pin
    cb(null,'Retrived mage@tower.com`s new pin '+Cary) 
  })
},

function(cb){
    request.post({uri:path+'/update',
    json:true,
    body:{
      email:'mage@tower.com',
      pin:Cary,
      new_password:'password'
    }
    },
    function(err,res,body){
    if(err) throw new Error(err)
    body.result.should.equal('ok')
    cb(null,'Changed password succesfully with pin')
    })
},

function(cb){
    request.post({uri:path+'/login',
    json:true,
    body:{
      email:'mage@tower.com',
      password:'password'
    }
    },
    function(err,res,body){
    if(err) throw new Error(err) 
      body.result.should.equal('ok')
      cb(null,'Allowed good login with new password')
    })
},





],function(err,results){
if(err) throw new Error(err)
console.log('CACHING ACTING WEIRD HARD TURNED IT OFF IN singleton.js FILE')
console.log(results)

cb()
})




}

