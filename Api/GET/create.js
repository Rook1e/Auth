// save req.params.${x} 
// to   req.models.prams.${x}

// req.models || req.Models is what you want 
module.exports = create = function(req,res){
  req.models.user.create({
    id:       req.params.id,
    password: req.params.password
  },function(err){
    if(err)
      res.json({err:err,result:null})
    else
      res.json({err:null,result:'ok'})
  })
}

create._route  = '/:user/create/:password'
create._weight =  2
create._skip   =  false
