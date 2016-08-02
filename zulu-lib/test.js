var Store = require('./Store');
var validator = require('./Validator');
var util = require('./Util');
var BaseModule = require('./BaseModule');
var Meta = require('./Meta');

var dbConnectionMeta = {
	type: 'mysql',
	database: 'TestDB',
	host: 'localhost',
	user: 'root',
	password: 'pass'
};

var meta =  {
    "name": {
      "singular": "group",
      "plural": "groups"
    },
    "label": {
      "singular": "Group",
      "plural": "Groups"
    },
    "primaryKey": "groupID",
    "fields": {
      "groupID": {
        "type": "integer",
        "required": true,
        "unique": true,
        "auto": true,
        "readonly": true
      },
      "name": {
        "type": "string",
        "length": [
          0,
          100
        ],
        "required": true,
        "unique": true,
        "pattern": [
          "^[A-Za-z0-9]+$",
          "i"
        ],
        "label": "Group Title",
        "placeholder": "Give a group name"
      },
      "shortName": {
        "type": "string",
        "length": [
          0,
          30
        ],
        "required": true,
        "unique": true,
        "pattern": [
          "^[A-Za-z0-9]+$",
          "i"
        ],
        "label": "Group Short Name",
        "placeholder": "Give a shortname for group"
      },
      "type": {
        "type": "enum",
        "label": "Group Type",
        "values": {
          "company": "Company",
          "branch": "Branch",
          "division": "Division",
          "team": "Team",
          "project": "Project"
        },
        "default": "company"
      },
      "address": {
        "type": "string",
        "length": [
          0,
          100
        ],
        "pattern": [
          "^[A-Za-z0-9]+$",
          "i"
        ],
        "label": "Address",
        "placeholder": "Give an address"
      },
      "parent": {
        "type": "integer",
        "label": "Parent Group"
      }
    }
  };

//  var data = {
//  	shortName: 'Madhushan',
//  	address:'21/7A, U.E.Perera Mw, Rajagiriya',
//  	parent:2	
//  	}

//var store = new Store(dbConnectionMeta);

// store.create(meta, data).then(function (result) {
// 	console.log(result);

// }).catch(function (error) {
// 	console.log(error);
// });

//  var data = {
//  	groupID: 41
//  };

//  store.delete(meta, data).then(function (result) {
// 	console.log(result);
// }).catch(function (error) {
// 	console.log(error);
// });


// var data = {
// 	groupID: 41,
// 	name: 'aeppppppebcd'	
// };

//  store.update(meta, data).then(function (result) {
// 	console.log(result);
// }).catch(function (error) {
// 	console.log(error);
// })



// var data = {
// 	 	name: '10:24 PM',
// 	 	//email: 'asa@fff.com',
// 	 	shortName: 's',
	 
// 	 	//address:'21/7A, U.E.Perera Mw, Rajagiriya',
// 	 	type: 'Company',
// 	 	parent:'2',
	 	
//     }

// var result = validator.validate('create', meta, data);
// console.log(result);
   
   // var result = util.cast('sad', 'boolean');
   // console.log(result);

var baseModule = new BaseModule();

 // var action = {
 //          input: {   
 //                      name: 'string',
 //                      shortname: 'string'
 //                  },
 //          output: {
          
 //          }
 //       }
 // var data = {
          
 //          shortname: 'ppwoeirp'
 //      }

 //   var result = baseModule.filter(action, data);
 //   console.log(result);
 
 // var result = baseModule.success('no error occured', {id: 1});

 // console.log(result);
 

 var meta = Meta.load('/user-module.yml');
 console.log(meta);