var _CONFIG = require('./CONFIG.js') 
    console.log(_CONFIG)

var DATABASE_CONFIG = _CONFIG.database

var ORM = require('./../index.js')(DATABASE_CONFIG,__dirname+'/Models',function(err,ORM){
    
    if(err) throw new Error(err) 
    ORM.drop(function(){
    ORM.sync(function(){

      ORM.models.user.create({id:'spoasd',password:'xxxxxx'},function(err,result){
          result.generatePin(function(err,pin){ 
            debugger
          })
      })
    


    })})

    require('repel')(5001,{ORM:ORM})
})


