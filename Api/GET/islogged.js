module.exports = index = function(req,res){
  res.end('it works')
}

index._route  = '/'
index._weight =  1
index._skip   =  true
