var Sequelize = require('sequelize');
var _MODEL_DIR= __dirname+'/models/';
var path = require('path');

function DaoKernel(_database_config){

     return{
     	database_instance:{},
     	connect : function(){
     		  var database = new Sequelize(_database_config.database_name,
     		   _database_config.user_name, _database_config.user_password, {
			  host: _database_config.host,
			  dialect: _database_config.dialect,

			  pool: {
			    max: _database_config.pool.max,
			    min: _database_config.pool.min,
			    idle: _database_config.pool.idleTime
			  }
			});

     		return database;
     	},
     	getInstance:function(_database_config){
     		return (this !== null && this instanceof DaoKernel) ? this 
     			: new DaoKernel(_database_config);
     	},
     	save:function(modelName, _saveObject){
 			modelName.sync({force: false}).then(function () {
			  return modelName.create(
			    _saveObject
			  );
			});

     	},
     	update:function(_updateObject){
     		return true;
     	},
     	delete:function(_deleteObject){
     		return true;
     	},
     	deleteById:function(modelName, _id){
     		return {};
     	},
     	retreive:function(modelName,_conditions ){
     		return [];
     	},
     	getById:function(modelName, _id){
     		return {};
     	},
     	getModelByName:function(modelName,database_instance){
 			var _modelname = path.join(_MODEL_DIR,modelName);
 			return 	require(_modelname).getModel(database_instance);

     	}

     }

}
module.exports = {
	getInstance:function(database_configuration){
		var daoInstance = DaoKernel().getInstance(database_configuration);
		return daoInstance;
	}

};