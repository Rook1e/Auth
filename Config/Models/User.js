var validators = require('orm').validators
var Model = module.exports = {}

// get better version then this
var generateHash = function(cb){
require('crypto').randomBytes(16,function(err,bytes){
  cb(err,bytes.toString('hex'))
})

}

Model.instance_methods = {
login:function(params,cb){
  var email    = params.email
  var password = params.password 
  this.find({email:email,password:password},function(err,result){
    if(err) throw new Error(err)
    if(result.length) 
        cb(null,true)
      else 
        cb(null,false)
  })
},

verify:function(params,cb){
  var email = params.email 
  var pin   = params.pin
  this.find({email:email,pin:pin},function(err,user){
    if(err) throw new Error(err)
    if(user.length){ 
     user = user[0]
      user.save({verified:true},function(err,result){
        if(err) throw new Error(err)
          cb(null,'ok')
      })
    }else{
      cb('Bad pin or email',null)
    }
  })
},
change_password:function(params,cb){
  var email        = params.email
  var new_password = params.new_password
  var pin          = params.pin
  var password     = params.password
  if(pin && password) throw new Error('Change takes password or pin not both.')

  if(params.pin){
      this.find({email:email,pin:pin},function(err,user){
      if(err) throw new Error(err)
        if(!user.length){
          cb('Not found',null)
         return
        }else{
          user = user[0]
          user.password = new_password
          generateHash(function(err,hash){
            if(err) throw new Error(err)
            user.pin = hash
            user.save(function(err,result){
              if(err) throw new Error(err)
              cb(null,'ok')
              return
            })
          })
        }
      })
  }else if(params.password){
     this.find({email:email,password:password},function(err,user){
      if(err) throw new Error(err)
        if(!user.length){
          cb('Not found',null)
         return
        }else{
          user = user[0]
          user.password = new_password
          user.save(function(err,result){
            if(err) throw new Error(err)
            cb(null,'ok')
            return
          })
        }
      }) 
  }else{
    cb('Params',null) 
    return
  }
},
generate_pin:function(params,cb){
  var email = params.email 

  this.find({email:email},function(err,user){
    if(err) throw new Error(err) 
    if(user.length){
      user = user[0]
      generateHash(function(err,pin){
        if(err) throw new Error(err)
          user.pin = pin
             user.save((function(pin){ return function(err){
               cb(err,pin)
             }})(user.pin))
      })
    }else{
      cb('Not found',null)
    }
  })
}


}


Model.definition ={
        id       : { type:'text'                   , unique:true },
        pin      : { type:'text'                                 },
        password : { type:'text'   , required:true               },
        email    : { type:'text'   , required:true , unique:true },
        verified : { type:'boolean', defaultValue:false          },
        access   : { type:'number'                               },
        created  : { type:'number'                               }, 
        modify   : { type:'number'                               }
    }

Model.advanced  = {
    validations:{ 
      email:validators.patterns.email('not email')
      //password:
    },

    hooks:{
      beforeCreate:function(cb){ 
        var self = this 
            if(self.id){
            cb(new Error('Id should not be set'))
            return
            } 

            if(self.pin){
            cb(new Error('Pin should not be set'))
            return
            }

            if(self.created){
            cb(new Error('Created should not be set'))
            return
            }

            if(self.verified){
            cb(new Error('Verified should not be set'))
            return
            }

            self.created = new Date().getTime()
          generateHash(function(err,bytes){
            if(err) throw new Error(err)
            self.id = bytes
              generateHash(function(err,bytes){
               if(err) throw new Error(err)
              self.pin = bytes
              cb()
              })
          })
      },
      beforeSave:function(){ 
        var self = this
            self.modify  = new Date().getTime()
      },
      afterLoad:function(){
        // manually update access time record
      },
      beforeRemove:function(cb){  // does not seem to be firing
          debugger
        var output = {}
          for(var key in this)
              output[key] = this[key]
        output = JSON.stringify(output) 
          debugger
        require('fs').appendFile(__dirname+'/../../DATA/deleted',output+'\n',function(err){ 
          if(err) throw new Error(err)
          cb()
        })
      }
    },

    methods:{

    }
    
}


/* how the fuck does this work in?
Associations

An association is a relation between one or more tables.

hasOne

Is a many to one relationship. It's the same as belongs to.
Eg: Animal.hasOne('owner', Person).
Animal can only have one owner, but Person can have many animals.
Animal will have the owner_id property automatically added.

The following functions will become available:

animal.getOwner(function..)         // Gets owner
animal.setOwner(person, function..) // Sets owner_id
animal.hasOwner(function..)         // Checks if owner exists
animal.removeOwner()                // Sets owner_id to 0
Reverse access

Animal.hasOne('owner', Person, {reverse: 'pets'})
will add the following:

person.getPets(function..)
person.setPets(cat, function..)
hasMany

Is a many to many relationship (includes join table).
Eg: Patient.hasMany('doctors', Doctor, { why: String }, { reverse: 'patients' }).
Patient can have many different doctors. Each doctor can have many different patients.

This will create a join table patient_doctors when you call Patient.sync():

column name type
patient_id  Integer
doctor_id Integer
why varchar(255)
The following functions will be available:

patient.getDoctors(function..)           // List of doctors
patient.addDoctors(docs, function...)    // Adds entries to join table
patient.setDoctors(docs, function...)    // Removes existing entries in join table, adds new ones
patient.hasDoctors(docs, function...)    // Checks if patient is associated to specified doctors
patient.removeDoctors(docs, function...) // Removes specified doctors from join table

doctor.getPatients(function..)
etc...
To associate a doctor to a patient:

patient.addDoctor(surgeon, {why: "remove appendix"}, function(err) { ... } )
which will add {patient_id: 4, doctor_id: 6, why: "remove appendix"} to the join table.

extendsTo

If you want to split maybe optional properties into different tables or collections. Every extension will be in a new table, where the unique identifier of each row is the main model instance id. For example:

var Person = db.define("person", {
    name : String
});
var PersonAddress = Person.extendsTo("address", {
    street : String,
    number : Number
});
This will create a table person with columns id and name. The extension will create a table person_address with columns person_id, street and number. The methods available in the Person model are similar to an hasOne association. In this example you would be able to call .getAddress(cb), .setAddress(Address, cb), ..

Note: you don't have to save the result from Person.extendsTo. It returns an extended model. You can use it to query directly this extended table (and even find the related model) but that's up to you. If you only want to access it using the original model you can just discard the return.
*/

//Model.associations = {}



