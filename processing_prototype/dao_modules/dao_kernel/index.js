var Sequelize =require('sequelize');

function DaoKernel(_database_config){
     return{

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
     	}


     }
	  

}
module.exports = {
	getInstance:function(database_configuration){
		var daoInstance = DaoKernel().getInstance(database_configuration);
		var databaseInstance = daoInstance.connect();
		//console.log(databaseInstance);
		return databaseInstance;
	}

};