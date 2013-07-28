
module.exports = function(_cb){

var _ = require(__dirname+'/../Config/config.js')

var async = require('async')

var _DATABASE_CONFIG = _.database_config
var _PATH_TO_MODLES  = _.path_to_models
var ORM  = null

require('Model')(_DATABASE_CONFIG,_PATH_TO_MODLES,function(err,_ORM){  
  if(err) throw new Error(err)
  ORM = _ORM 
  

  ORM.drop(function(){
    ORM.sync(function(){
      //require('repel')(5001,{User:ORM.models.user})
      Ready(ORM.models.user)
    })
  })


})

function Ready(User){

  var Carry = null

  async.series([
  function(cb){
    User.create({email:'spo@spo.com',password:'password'},function(err,result){
      if(err) cb(err)
      Carry = result.pin
      cb(null,'user created')
    })
  },
  function(cb){
    User.create({email:'spo@spo.com',password:'password'},function(err,result){
      if(!err) cb('something went wrong')
      cb(null,'duplicated not allowed')
    })
  },
  function(cb){
    User.login({email:'spo@spo.com',password:'password'},function(err,result){
    if(err) cb(err)
      if(result)
        cb(null,'user logged in')
        else
        cb('user should have been allowed to login')
    })
  },  
  function(cb){
    User.verify({email:'spo@spo.com',pin:'asasd'},function(err,result){
      if(result!='ok')
        cb(null,'bad user verify stopped')
        else
        cb('user should not have been able to verify')
    })
  },
  function(cb){
    User.verify({email:'spo@spo.com',pin:Carry},function(err,result){
      if(err) cb(err) 
      if(result=='ok')
        cb(null,'user verified')
        else
        cb('user should have been able to verify')
    })
  },
  function(cb){
    User.generate_pin({email:'spo@spo.com'},function(err,result){
      if(err) cb(err) 
      Carry = result
      cb(null,'New pin '+result)
    })
  },
  function(cb){
    User.change_password({email:'spo@spo.com',password:'password',new_password:'cartel'},function(err,result){
     if(err) cb(err)
      cb(null,'User changed password using old password')
    })
  },
  function(cb){
    User.login({email:'spo@spo.com',password:'cartel'},function(err,result){
    if(err) cb(err)
      if(result)
        cb(null,'user logged in using new password')
        else
        cb('user should have been allowed to login')
    })
  },  
  function(cb){
    User.change_password({email:'spo@spo.com',pin:Carry,new_password:'password'},function(err,result){
     if(err) cb(err)
      cb(null,'User changed password using pin')
    })
  },
  function(cb){
    User.login({email:'spo@spo.com',password:'password'},function(err,result){
    if(err) cb(err)
      if(result)
        cb(null,'user logged in using new password')
        else
        cb('user should have been allowed to login')
    })
  },

  ],function(err,results){
  if(err) throw new Error(err) 
  console.log('DELETE NOT WORKING')
  console.log('EMAILER NOT CONNECTED')
  console.log('RAW MYSQL QUERY TO SET ACCESS TIME')

  console.log(results)
  if(_cb) _cb()
  })

}
}

if(!module.parent) module.exports()
