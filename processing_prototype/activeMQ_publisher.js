var Stomp = require('stomp-client');
var destination = '/queue/TEST_PC_01';
var client = new Stomp('127.0.0.1', 61613, 'admin', 'admin');

client.connect(function(sessionId) {
setInterval(function(){

	var msg = {
	Ostring:[
	  '0xAD90',
	  '0xAD90',
	  '0xAD91'
	],
	CALLING:'061233444',
	SEQUENCE:123,
	SUBREC:{
		message:'hello to nodejs'
	}
   };
   client.publish(destination, JSON.stringify(msg));
   console.log('Message published');
},1000);
});
