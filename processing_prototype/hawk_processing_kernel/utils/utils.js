var bson = require('bson');
var fs =  require('fs');
var BSON = new bson.BSONPure.BSON();
var Long = bson.BSONPure.Long;
var config = require('../config/db.json');
var doc = { long: Long.fromNumber(100) };

// Serialize a document
/*var data = BSON.serialize(config, false, true, false);
console.log('data:', data);

fs.writeFile("../config/db.bson", data, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});
*/

fs.readFile("../config/db.cfg",function(err , data){
	if(err)
		throw new Error(err.toString());
	var doc_2 = BSON.deserialize(data);
	console.log('deserialized data :', doc_2);
})
// Deserialize the resulting Buffer
