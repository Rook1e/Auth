module.exports = function(cb){

var request = require('request')
var should  = require('should')

var path = 'http://localhost:8787'

require('async').series([
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




],function(err,results){
if(err) throw new Error(err)
console.log(results)

cb()
})




}
