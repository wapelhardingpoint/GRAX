/**
 * Copyright 2017 Harding Point
 *
 *  Contact Support@HardingPoint.com
 *
 *  https://www.hardingpoint.com/
 *  https://github.com/HardingPoint
 *
 **/

const WriteToConsole = true;

// Extremely Simple Debug Handler

exports.write = function(source,output,err){
    writeoutput(source,output,err);
};

function writeoutput(source,output,err){
    var outputString = "";
    var outputFlag = WriteToConsole;
    if (source) outputString = source + " : ";
    if (output) outputString += output;
    if (err){
        outputFlag = true;
        outputString += " ";
        outputString += err;
    }
    if (outputFlag) console.log("[https://www.hardingpoint.com/] : " + outputString);
};


exports.outputiferror = function(source,output,err){
    if(err){
        // JSON.stringify(process.env)
        writeoutput(source,output,err);
    }
};