
var HardingPointAPI = require("../HardingPointAPI.js");

var filename = "Sample.json";

HardingPointAPI.getfile(filename, function(error, data){
    if (error){
        console.log("HardingPointAPI.getfile Failed! -> " + error);
    }else{
        console.log("HardingPointAPI.getfile Success -> " + data + "\n");
    }
});