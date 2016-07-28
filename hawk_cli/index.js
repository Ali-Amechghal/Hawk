var vorpal = require('vorpal')();
console.log('============= Hawk =============');

vorpal
  .command('conf <name>', 'Outputs configuration files conf <configuration name>')
  .action(function(args, callback) {
  	console.log(args);
  	if(Object.keys(args.options).length < 1){

  		console.log('provide configuration name  argument :');
  		console.log('\t db : database');
  		console.log('\t param : parameter');
  	}

    callback();
  });

vorpal.delimiter('Hawk >').show();
