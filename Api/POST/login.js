module.exports = login = function(req,res){
  req.models.user.login({
    email:req.body.email,
    password:req.body.password
  },function(err,result){
      if(err){
        res.json({err:err,result:null})
        return
      }else{ 
          console.log(result)
        if(result){
          res.json({err:null,result:'ok'})
          return   
        }else{
          res.json({err:'AUTH',result:null})
          return   
        }
      }
  })
}

login._weight = 2
login._route  = '/login'
//login._skip   = true
