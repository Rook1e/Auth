module.exports = one = function(req,res){

  res.end('index')


}

one._weight = 1
one._route  = /\/|index.html|/
//one._skip   = true
