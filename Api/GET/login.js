// req.models || req.Models is what you want 

module.exports = login = function(req,res){
  //debugger
  res.end('login')
}

login._route  = '/login'
login._weight =  3
login._skip   =  false
