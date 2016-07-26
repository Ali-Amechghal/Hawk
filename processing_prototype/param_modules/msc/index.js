(function(){

	function __init(hawk_configuration_instance){
		//console.log('Init MSC...');
		//console.log(hawk_configuration_instance);

	   __hawk_database_instance = hawk_configuration_instance.database_instance;
		  __hawk_database_instance.authenticate()
		  .then(function(err) {
		    console.log('Connection has been established successfully.');
		  })
		  .catch(function (err) {
		    console.log('Unable to connect to the database:', err);
		  });

	}
	function  __start(){
		//console.log('starting parameter moduel');
	}
    function __receive(data){
    	console.log('=================== REVEIVE ==');
        console.log(data);
        console.log('PID : '+process.pid);
        console.log('============END======= REVEIVE ==');
    }
	module.exports  = {
		init  :  __init,
		start : __start,
        receive : __receive
	}
}());
