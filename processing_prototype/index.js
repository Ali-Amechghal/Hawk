var cluster =  require('cluster');
var fs =  require('fs');
var numCPUs = require('os').cpus().length;
var parser =  require('xml2js');

var Stomp = require('stomp-client');
var destination = '/queue/TEST_PC_01';
var client = new Stomp('127.0.0.1', 61613, 'admin', 'admin');

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

i 		initFork(params);
	}

}

function initFork(params){
	console.log(JSON.stringify(params));
	console.log('initparam..');
	params.forEach(function(paramobj){


	var modulename = paramobj.module[0];
	console.log('\tParam name : '+modulename);
	var module = require(modulename);
	module.init({db:'databasename'});
	module.start();
	//subscribe for activeMQ qspacename

	client.connect(function(sessionId) {
		client.subscribe(destination, function(body, headers) {
			module.receive( body);
		});
	  });
   });
}

