var orm = require('orm')
var db = null
var async = require('async')

module.exports = Output  = (function (_CONFIG,path_to_models,cb){
   Output = orm.connect(_CONFIG, function (err, _db) { 

      db = _db 

      db.settings.set("instance.returnAllErrors", true); // .. local

      if(err) throw new Error(err) 
      //console.log(path_to_models)

      var models_list = require('moduleloader').required({
      dirname:path_to_models,
      filter: /(.+)\.(js)$/ // bug wont show file name as key if not set
      })

      for (var key in models_list){
        console.log()
        console.log('loading '+key)
        console.log(models_list[key])
        console.log()
         db.define(key,models_list[key].definition,models_list[key].advanced)
      }

      if(cb) cb(null,Output)

  });

  Output._CONFIG =  _CONFIG
  Output.path_to_models = path_to_models

  return Output

})

  Output.describe = function(){
    var output = ['',
  
  
    ]
    console.log(output.join(''))
  }
