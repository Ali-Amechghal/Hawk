var fs = require('fs');
var path =  require('path');

var hawk_cli={
	hawk_referentiel_data_folder:'',
	config:function(referentiel_configuration){
		this.hawk_referentiel_data_folder = referentiel_configuration.data_folder_path;
		fs.lstat(this.hawk_referentiel_data_folder , function (err, stats){
			if(err || !stats.isDirectory())
				throw new Error('Cannot find the given path or is not folder');
		});
	},
	isTableExists:function(tableName){
		fs.lstat(path.join(this.hawk_referentiel_data_folder , tableName), function(err, stats){
			if(err || !stats.isFile())
				return false;
			else
				return true;
		});
	},
	init: function(tableName , dataFile , redefine){
		//check if data file exists
		fs.lstat(dataFile, function(err, stats){
			if(!err && stats.isFile() && (redefine === true || !(isTableExists(tableName)))){
				var dataFileStream = fs.createReadStream(dataFile);
				var referentialDataFileStream = fs.createWriteStream(tableName);

				//referentialDataFileStream.setEncoding('utf8');
				dataFileStream.setEncoding('utf8');
				
				dataFileStream.pipe(referentialDataFileStream);
				console.log('end of creating file');
				//read.stream.bson.stream(write)

			}
				
		});
	}
	
}

module.exports = hawk_cli;
