//constants

var _param_modules_dir = __dirname+'/param_modules/';
var _dao_module_dir = __dirname+'/dao_modules/';

var cluster =  require('cluster');
var fs =  require('fs');
var numCPUs = require('os').cpus().length;
var parser =  require('xml2js');
var Stomp = require('stomp-client');
var kernelDao  = require(_dao_module_dir+'dao_kernel');
var _Queue = '/queue/';

//activeMQ configuration
var client = new Stomp('127.0.0.1', 61613, 'admin', 'admin');
//read parameter configuraiton file
fs.readFile(__dirname+'/paramsConfig.xml' ,  function(err, data){
 parser.parseString(data, function (err, result) {
        if(err) throw new Error('cannot load configuration , starting abort');
	    var params = result.configuration.params[0].param;
        initHawk(params);
    });
});
//initialize application
function initHawk(params){
	//prepare the configuration object that will be injected to each parametering module

	var database_configuration = {
		database_name:'ra_db',
		user_name:'root',
		user_password:'',
		host:'localhost',
		dialect:'postgres',
		pool:{
			max:5,
			min:0,
			idle:1000
		}
	}
    var _kernelDao  = kernelDao.getInstance(database_configuration);
    var _database_instance=_kernelDao.connect();
	var hawk_configuration_instance = {
		kernelDao:_kernelDao,
		database_instance:_database_instance,
		middleware_configuration_instance : {},
		logging_instance : {},
		globale_configuration : {}
	};
	//implementing clusering 
	if (cluster.isMaster) {

	  for (var i = 0; i < numCPUs; i++) {
	    cluster.fork();
	  }
	  cluster.on('exit',function(worker, code, signal) {
	    console.log('worker' + worker.process.pid +'died');
	    cluster.fork();
	  });
	} else {
	//call each parameter module with configuration object
	params.forEach(function(paramobj){
			var modulename = paramobj.module[0];
			var qSpace = _Queue+paramobj.QSpace[0];
			var module = require(_param_modules_dir+modulename);
			module.init(hawk_configuration_instance);
			module.start('qSpace : '+qSpace+' , module : '+module);
			//subscribe for activeMQ qspacename
			client.connect(function(sessionId) {
				var curDate = new Date();
                var subscriptionId = 'HawkSubscriber-'+curDate.getTime();
				client.subscribe(qSpace, { ack: 'client-individual', id: subscriptionId } , function(body, headers) {
					client.ack(headers["message-id"], subscriptionId);
					module.receive(body);
				});
			});
   });
 }

}
