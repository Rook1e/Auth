module.exports = verify = function(req,res){
  req.models.user.verify({
    email:req.body.email,
    pin:req.body.pin
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

verify._weight = 4
verify._route  = '/verify'
//verify._skip   = true
