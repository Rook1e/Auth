module.exports = update = function(req,res){


  var params = {
  email:req.body.email,
  new_password:req.body.new_password,
  }

  if(req.body.pin)
    params.pin = req.body.pin
    else
    params.password = req.body.password

  req.models.user.change_password(params,function(err,result){
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

update._weight = 5
update._route  = '/update'
//update._skip   = true
