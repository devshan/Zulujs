 var Localize = require('localize');

 var myLocalize = new Localize('./translations/');

 //console.log(myLocalize.translate("Testing...")); // Testing...
 //console.log(myLocalize.translate("Substitution: $[1]", 5)); // Substitution: 5

 //myLocalize.setLocale("es");
 //console.log(myLocalize.translate("Testing...")); // Pruebas...

 //myLocalize.setLocale("sr");
 //console.log(myLocalize.translate("Substitution: $[1]", 5)); // замена: 5

 console.log(myLocalize.translate("Hello World!!")); // Hello World!!
 
 myLocalize.setLocale("sr");
 console.log(myLocalize.translate("Hello World!!"));