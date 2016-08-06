var vorpal = require('vorpal')();
var path =  require('path');
var cli =  require('./Hawk_cli');
var fs =  require('fs');
var configurationPaths =  require('./config/configPaths.json');


var buf = fs.readFileSync('./hawk.logo', "utf8"); 
console.log(buf);          
// console.log('\t\t\t$$$$$$$$$$$$$$$$$$$$$ Hawk $$$$$$$$$$$$$$$$$$$$$$');
// console.log('\t\t\t$$  Tool to Manage Hawk internal Processing  $$');
// console.log('\t\t\t$$  =========== CopyRights @Hawk ===========  $$');
vorpal
  .command('secureConf <name>', 'Convert config file to secure format')
  .action(function(args, callback) {
    callback();
  });
  //initialize the referentiel
  vorpal
  .command('initRefTable <table_name> <data_file> <redefine>', 'Initialize the referential table')
  .action(function(args, callback) {
    cli.init(args.table_name , args.data_file,true);
    callback();
  });
  vorpal
  .command('insertToRefTable <table_name> <data_file>', 'Insert  or append given data to the referential table')
  .action(function(args, callback) {
    if(cli.isTableExists(args.table_name)){
        // convert the BSON to JSON and add the new line
        // and convert it back to BSON
    }else{
      throw new Error('the referential table  : '+args.table_name+' doent exists');
    }
    callback();
  });
  vorpal
  .command('updateRefTable <table_name> <data_ligne> <activate>', 'Activate/Deactivate MSISCN in the referential table')
  .action(function(args, callback) {
    if(cli.isTableExists(args.table_name)){
        // convert the BSON to JSON and udpate the given MSISDN line
        // and convert it back to BSON
    }else{
      throw new Error('the referential table  : '+args.table_name+' doent exists');
    }    callback();
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
//getting configuration data:
var hawk_cli_configuration={
  data_folder_path:path.join(__dirname,'data')
};
//init cli
cli.config(hawk_cli_configuration);
vorpal.delimiter('Hawk $').show();
