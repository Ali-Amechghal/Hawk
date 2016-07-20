var cluster =  require('cluster');
var fs =  require('fs');
var numCPUs = require('os').cpus().length;
var parser =  require('xml2js');



var _param_modules_dir = __dirname+'/param_modules/'
fs.readFile(__dirname+'/paramsConfig.xml' ,  function(err, data){
 parser.parseString(data, function (err, result) {
        if(err) throw new Error('cannot load configuration , starting abort');
	    var params = result.configuration.params[0].param[0];
        initHawk(params);
    });
});

function initHawk(params){

	var hawk_configuration_instance = {
		middleware_configuration_instance : {},
		database_configuration : {},
		logging_instance : {},
		globale_configuration : {}
	};
	
	if (cluster.isMaster) {
	  
	  for (var i = 0; i < numCPUs; i++) {
	    cluster.fork();
	  }
	  cluster.on('exit', (worker, code, signal) => {
	    console.log('worker' + worker.process.pid +'died');
	    cluster.fork();
	  });
	} else {
	  

		console.log(JSON.stringify(params));
		var module_name =  params.module[0];
		var paramModile = require(_param_modules_dir+module_name);
		
		paramModile.init(hawk_configuration_instance);
		paramModile.start();

	}

}
