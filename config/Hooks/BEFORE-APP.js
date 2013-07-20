// runs after app is bootstraped and before app is brought up
module.exports = (function(app,cb){ 
  console.log('[:running:] BEFORE-APP.js')
  app.ORM.db.drop(function(){
    app.ORM.db.sync(function(){
      cb()
    })
  })
})
