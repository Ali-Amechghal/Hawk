var fs = require('fs'),
    xml2js = require('xml2js');

 var xmlfilename = process.argv[2];
 var jsonfilename = process.argv[3];

if(!xmlfilename || !jsonfilename || !fs.lstatSync(xmlfilename).isFile()){
    console.log('please provide the file names , in xml file and name of json out file ');
    process.exit();
}


var parser = new xml2js.Parser();
var buffer;
fs.readFile(__dirname +'/'+ xmlfilename, function(err, data) {
    parser.parseString(data, function (err, result) {
        console.log('pars=ing xml');
        if(err)
            console.log(err);

        buffer = JSON.stringify(result, undefined , 2);
        fs.writeFile(jsonfilename , buffer , function(err){
            if(err)
                console.log(err);
            else
                console.log('....done !');

        });

     });
});


