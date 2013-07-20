// runs after app is bootstraped and before app is brought up
module.exports = (function(app,cb){ 
  console.log('BEFORE-APP.js')



  cb()
})
