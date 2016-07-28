(function(){

	module.exports  = {
		__hawk_database_instance:{},
		__kernel_Dao:{},
		init  :function(hawk_configuration_instance){

		   __hawk_database_instance =hawk_configuration_instance.database_instance;
		   __kernel_Dao = hawk_configuration_instance.kernelDao;

			  __hawk_database_instance.authenticate()
			  .then(function(err) {
			    console.log('Connection has been established successfully.');
			  })
			  .catch(function (err) {
			    console.log('Unable to connect to the database:', err);
			  });

		},
		start : function(){},
        receive : function(data){
        	__kernel_Dao.database_instance=__hawk_database_instance;
	        var CdrModel = __kernel_Dao.getModelByName('cdr' ,  __hawk_database_instance);
	        if(CdrModel){
				__kernel_Dao.save('Platine' ,'DataWareHouse', {data:'data test'}, CdrModel);
	        }
	    }
	}
}());
