var Model = module.exports = {}
var validators = require('orm').validators

/*
Properties

Types

Native  String  Native  String
String  'text'  Date  'date '
Number  'number'  Object  'object'
Boolean 'boolean' Buffer  'binary'
--- 'enum'
Options

[all types]

required: true marks the column as NOT NULL, false (default)
defaultValue: sets the default value for the field
string

size: max length of the string
number

rational: true (default) creates a FLOAT/REAL, false an INTEGER
size: byte size of number, default is 4. Note that 8 byte numbers have limitations
unsigned: true to make INTEGER unsigned, default is false
date

time: true (default) creates a DATETIME/TIMESTAMP, false a DATE
Note that these may vary accross drivers.
*/




Model.definition ={
        id       : { type:'text'  , required:true },
        password : { type:'text'  , required:true },
        //access   : { type:'number', required:true }, // this might need to be hacked in
        //created   : { type:'number', /*required:true*/ }, // beforeSave and beforeCreate hooks are busted can`t use em changes don`t persist
        modify    : { type:'number', /*required:true*/ }
    }

Model.advanced  = {
/*
Predefined Validations
Predefined validations accept an optional last parameter msg that is the Error.msg if it's triggered.

required(msg)
Ensures property is not null or undefined. It does not trigger any error if property is 0 or empty string.

rangeNumber(min, max, msg)
Ensures a property is a number between min and max. Any of the parameters can be passed as undefined to exclude a minimum or maximum value.

rangeLength(min, max, msg)
Same as previous validator but for property length (strings).

insideList(list, msg)
Ensures a property value is inside a list of values.

outsideList(list, msg)
Ensures a property value is not inside a list of values.

equalToProperty(property, msg)
Ensures a property value is not the same as another property value in the instance. This validator is good for example for password and password repetition check.

notEmptyString(msg)
This is an alias for rangeLength(1, undefined, 'empty-string').

unique(msg)
Ensures there's not another instance in your database already with that property value. This validator is good for example for unique identifiers.

password([ checks, ]msg)
Ensures the property value has some defined types of characters, usually wanted in a password. checks is optional and defaults to "luns6" which leans lowercase letters, uppercase letters, numbers, special characters, with a minimum length of 6.

patterns.match(pattern, modifiers, msg)
Ensures the property value passes the regular expression pattern (and regex modifiers).

The next patterns.* are comodity alias to this one.

patterns.hexString(msg)
Ensures the property value is an hexadecimal string (uppercase or lowercase).

patterns.email(msg)
Ensures the property value is a valid e-mail (more or less).
patterns.ipv4(msg)

Ensures the property value is a valid IPv4 address. It does not accept masks (example: 0 as last number is not valid).
*/

    validations:{ 

    },

  /*
  afterLoad : (no parameters) Right after loading and preparing an instance to be used;
  afterAutoFetch : (no parameters) Right after auto-fetching associations (if any), it will trigger regardless of having associations or not;
  beforeSave : (no parameters) Right before trying to save;
  afterSave : (bool success) Right after saving;
  beforeCreate : (no parameters) Right before trying to save a new instance (prior to beforeSave);
  afterCreate : (bool success) Right after saving a new instance;
  beforeRemove : (no parameters) Right before trying to remove an instance;
  afterRemove : (bool success) Right after removing an instance;
  beforeValidation : (no parameters) Before all validations and prior to beforeCreate and beforeSave;
  All hook function are called with this as the instance so you can access anything you want related to it.
  */

    hooks:{
      beforeValidation:function(){ 
        this.modify = new Date().getTime()
      },
    },


    methods:{

    },
    
    /*
    cache : (default: true) Set it to false to disable Instance cache (Singletons) or set a timeout value (in seconds);
    autoSave : (default: false) Set it to true to save an Instance right after changing any property;
    autoFetch : (default: false) Set it to true to fetch associations when fetching an instance from the database;
    autoFetchLimit : (default: 1) If autoFetch is enabled this defines how many hoops (associations of associations) you want it to automatically fetch.
    */

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



