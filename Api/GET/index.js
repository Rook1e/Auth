// req.models || req.Models is what you want
module.exports = index = function(req,res){
  //debugger
  res.end('index')
}

index._route  = '/'
index._weight =  1
index._skip   =  false
