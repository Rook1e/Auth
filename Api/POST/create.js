module.exports = create = function(req,res){
  req.models.user.create({
    email:req.body.email,
    password:req.body.password
  },function(err,result){
      if(err){
        res.json({err:err,result:null})
        return
      }else{
        res.json({err:null,result:'ok'})
        return      
      }
  })
}

create._weight = 1
create._route  = '/create'
//create._skip   = true
