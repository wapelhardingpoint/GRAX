const fs = require('fs');
var HardingPointAPI = require("../HardingPointAPI.js");

var filename = "./Sample.json";

fs.readFile(filename, function(err, data) {
    console.log("Before: " + data);
    HardingPointAPI.savefile(filename,data,function(error,data){
        console.log("Filedata: " + data);
    });
});


