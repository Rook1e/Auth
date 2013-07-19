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
        id       : { type:'text', required:true },
        password : { type:'text', required:true }
    }


Model.advanced  = {
    validations:{
    }
    //definition
    /*
        methods: {
            example: function () {
                return this.id +' '+this.password
            }
        }
    */
    //advanced
}
