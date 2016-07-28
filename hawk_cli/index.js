var vorpal = require('vorpal')();
var path =  require('path');

var configurationPaths =  require('./config/configPaths.json');

console.log('\t\t\t$$$$$$$$$$$$$$$$$$$$$ Hawk $$$$$$$$$$$$$$$$$$$$$$');
console.log('\t\t\t$$  Tool to Manage Hawk internal Processing  $$');
console.log('\t\t\t$$  =========== CopyRights @Hawk ===========  $$');
vorpal
  .command('secureConf <name>', 'Convert config file to secure format')
  .action(function(args, callback) {
    callback();
  });
  //initialize the referentiel
  vorpal
  .command('initRefTable <table_name> <data_file>', 'Initialize the referential table')
  .action(function(args, callback) {
    callback();
  });
  vorpal
  .command('insertToRefTable <table_name> <data_file>', 'Insert  or append given data to the referential table')
  .action(function(args, callback) {
    callback();
  });
  vorpal
  .command('updateRefTable <table_name> <data_ligne> <activate>', 'Activate/Deactivate MSISCN in the referential table')
  .action(function(args, callback) {
    callback();
  });
  vorpal
  .command('truncateRefTable <table_name> <why>', 'truncate the referential table')
  .action(function(args, callback) {
    callback();
  });
  vorpal
  .command('deleteFromRefTable <table_name> <key>', 'delete given Msisdn from the referential table')
  .action(function(args, callback) {
    callback();
  });

vorpal.delimiter('Hawk $').show();
