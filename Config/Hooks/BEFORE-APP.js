// runs after app is bootstraped and before app is brought up
module.exports = (function(RABBOT,cb){  
  console.log('[:running:][:HOOK:] BEFORE-APP.js')
  
  /*
  RABBOT.ORM.drop(function(err){
    if(err) throw new Error(err)
    RABBOT.ORM.sync(function(err){ 
      if(err) throw new Error(err)
      cb()
    })
  })
  */
  cb()
})
