(function(){

	function __init(__hawk_configuration_instance){
		console.log('Init MSC...');
		console.log(__hawk_configuration_instance);
	}
	function  __start(){
		console.log('starting parameter moduel');
	}
	module.exports  = {
		init  :  __init,
		start : __start
	}
}());