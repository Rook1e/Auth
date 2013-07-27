// runs after app is bootstraped and before app is brought up
module.exports = (function(RABBOT,cb){  
  console.log('[:running:][:HOOK:] BEFORE-APP.js')
  cb()
})
