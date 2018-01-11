/**
 * Copyright 2017 Harding Point
 *
 *  Contact Support@HardingPoint.com
 *
 *  https://www.hardingpoint.com/
 *  https://github.com/HardingPoint
 *
 **/

var https = require('https');

var HardingPointConfig = require("./HardingPointConfig");
var debug = require("./debug.js");
const fs = require('fs');

const hardingPointAPIGet = HardingPointConfig.APIURL + HardingPointConfig.GET;
const hardingPointAPISave = HardingPointConfig.APIURL + HardingPointConfig.SAVE;
const hardingPointAPILogException = HardingPointConfig.APIURL + HardingPointConfig.LOGEXCEPTION;

function getHeaders(jsonObject,contenttype){

    debug.write("HardingPointAPI.getHeaders", "ENVIRONMENT: " + HardingPointConfig.ENVIRONMENT);
    var postheaders = {
        'Content-Type' : contenttype,
        'Content-Length' : Buffer.byteLength(jsonObject, 'utf8'),
        'authorizationToken' : HardingPointConfig.APITOKEN,
        'x-api-key' : HardingPointConfig.GATEWAYTOKEN,
        'environment' : HardingPointConfig.ENVIRONMENT,
        'licensetoken' : HardingPointConfig.LICENSETOKEN
    };
    return postheaders;
}

function getOptions(path,jsonObject,contenttype){
    var optionspost = {
        host : HardingPointConfig.URL,
        port : 443,
        path : '/' + HardingPointConfig.VERSION + '/api/' + path,
        method : 'POST',
        headers : getHeaders(jsonObject,contenttype)
    };
    return optionspost;
}


var hardingPointAPI = {
    isConnected:function(){
        if (HardingPointConfig.GATEWAYTOKEN && HardingPointConfig.APITOKEN){
            return true;
        }else{
            return false;
        }
    },
    nodered_writeFile:function(path,content,callback){
        if (this.isConnected()){
            var fileName = this.parseFileName(path);
            this.savefile(fileName,content,function(error,data){
                callback(error,data);
            });
        }else{
            callback("Harding Point : Cloud Not Connected","");
        }
    },
    nodered_readFile: function(path,callback){
        if (this.isConnected()){
            var fileName = this.parseFileName(path);
            this.getfile(fileName, function(error,data){
                callback(error, data);
            });
        }else{
            callback("Harding Point : Cloud Not Connected","");
        }
    },
    parseFileName: function (path){
        if (path){
            var filenameSplit = path.split("/");
            var filename = filenameSplit[filenameSplit.length-1];
            if (filename.substring(0,1)=='.'){
                filename = filename.substring(1,filename.length);
            }
            return filename;
        }else{
            return "";
        }},
    getfile: function(filename,callback){
        var jsonObject = "{\"filename\":\"" + filename + "\"}";
        debug.write('HardingPointAPI.getfile','filename: ' + filename);
        var optionspost = getOptions(HardingPointConfig.GET,jsonObject,'application/json');
        var reqPost = https.request(optionspost, function(res) {
            // debug.write("HardingPointAPI.getfile",'statusCode:' + res.statusCode);
            // debug.write("HardingPointAPI.getfile",'headers:' + res.headers);
            var str = '';
            res.on('data', function(d) {
                str+=d;
            });
            res.on('end', function () {
                var response = JSON.parse(str);
                if (response.message){
                    debug.write("HardingPointAPI.getfile","Bad Gateway Token - Email API Token and Gateway Token to Support@HardingPoint.com", str)
                    hardingPointAPI.loadFromCache(filename), function(err,data){
                        if (err || !data){
                            debug.write("HardingPointAPI.getfile","Failed : Loaded from Cache","Cache Empty");
                            callback(response.message, "");
                        }
                        else{
                            debug.write("HardingPointAPI.getfile","Success : Loaded from Cache", "");
                            callback("", data);
                        }
                    }
                }
                else if (response.Body){
                    var buffer = new Buffer(response.Body.data);
                    hardingPointAPI.saveCache(filename,buffer.toString(),function(err,data){
                        if (err){
                            debug.outputiferror("HardingPointAPI.getfile","saveCache",err);
                        }
                    });
                    callback("", buffer.toString());
                }else{
                    callback("File Empty (" + filename + ")", "");
                }
            });
        });
        reqPost.on('error', function(e) {
            debug.write("HardingPointAPI.getfile","HardingPointAPI.getfile.catch ERROR: ",e);
            callback(e, "");
        });
        reqPost.write(jsonObject);
        reqPost.end();
    },
    loadFromCache: function(filename, callback){
        var fullfilename = HardingPointConfig.CACHEDIR + filename;
        if (HardingPointConfig.CACHE){
            try{
                fs.readFile(fullfilename, function(err, data) {
                    callback(err,data);
                });
            }catch(e){
                debug.outputiferror('HardingPointAPI.loadFromCache', 'Cache Exception : ' + fullfilename, e);
                callback(e,HardingPointConfig.CACHEDIR + filename);
            }
        }
    },
    saveCache: function(filename,filedata, callback){
        var fullfilename = HardingPointConfig.CACHEDIR + filename;
        if (HardingPointConfig.CACHE.toString().toLowerCase()=="true"){
            try{
                debug.write('HardingPointAPI.saveCache', 'Cache Enabled [Saving] ', fullfilename);
                fs.rename(fullfilename, fullfilename + ".cache." + Date.now(), function (renameerr) {
                    fs.writeFile(fullfilename, filedata, 'utf8', function (err) {
                        if (err) {
                            callback(err, fullfilename);
                        }else{
                            callback("", fullfilename);
                        }
                    });
                });
            }catch(e){
                debug.outputiferror('HardingPointAPI.saveCache', 'Cache Exception : ' + fullfilename, e);
                callback(e, fullfilename);
            }
        }else{
            debug.write('HardingPointAPI.saveCache', 'Cache Disabled');
            callback("","");
        }
    },
    savefile: function(filename, filedata, callback){
        var parsedFileName = this.parseFileName(filename);
        var jsonObject = "{\"filename\":\"" + parsedFileName + "\",\"filedata\":\"" + JSON.stringify(filedata).replace(/(\\)/g, "\\\\").replace(/(")/g, "\\\"") + "\"}";
        var optionspost = getOptions(HardingPointConfig.SAVE,jsonObject,'application/json');
        try{
            hardingPointAPI.saveCache(this.parseFileName(parsedFileName),JSON.stringify(filedata),function(err,data){
                if (err){
                    // Ignore Errors Continue
                    debug.outputiferror("HardingPointAPI.savefile","saveCache : " + parsedFileName,err);
                }

                debug.write('HardingPointAPI.savefile', 'Filename: ' + filename);
                var reqPost = https.request(optionspost, function(res) {
                    // debug.write('HardingPointAPI.savefile', 'statusCode:' + res.statusCode);
                    // debug.write('HardingPointAPI.savefile', 'headers:' + res.headers);
                    var str = '';
                    res.on('data', function(d) {
                        str+=d;
                    });
                    res.on('end', function () {
                        if (callback){
                            callback("", str);
                        }
                    });
                });
                reqPost.on('error', function(e) {
                    debug.outputiferror('HardingPointAPI.savefile',"Post Error",e);
                    callback(e, "");
                });
                reqPost.write(jsonObject);
                reqPost.end();

            });
        }catch(e){
            debug.outputiferror('HardingPointAPI.savefile', "Exception : " + parsedFileName, e);
            callback(e, "");
        }

    },
    logexception:function(exception,env,callback){
        if (this.isConnected){
            // All logs are encrypted at rest on Harding Point servers for administrative review.
            // Harding Point only uses the exception details and will only view other information
            // when you contact Support@HardingPoint.com
            var jsonObject = "{\"exception\":\"" + JSON.stringify(exception).replace(/(")/g, "\\\"") + "\",\"environment\":\"" + JSON.stringify(env).replace(/(")/g, "\\\"") + "\"}";
            debug.write('HardingPointAPI.logexception', '');
            // hardingPointAPILogException
            var optionspost = getOptions(HardingPointConfig.SAVE,jsonObject,'application/json');
        }
    }
};

module.exports = hardingPointAPI;

/*
function callGetFile(){
    jsonObject = JSON.stringify({
        "message" : "The web of things is approaching, let do some tests to be ready!",
        "name" : "Test message posted with node.js",
        "caption" : "Some tests with node.js",
        "link" : "http://www.youscada.com",
        "description" : "this is a description",
        "picture" : "http://youscada.com/wp-content/uploads/2012/05/logo2.png",
        "actions" : [ {
            "name" : "youSCADA",
            "link" : "http://www.youscada.com"
        } ]
    });

    // prepare the header
    var postheaders = {
        'Content-Type' : 'application/json',
        'Content-Length' : Buffer.byteLength(jsonObject, 'utf8'),
        'authorizationToken' : HardingPointConfig.APITOKEN,
        'x-api-key' : HardingPointConfig.GATEWAYTOKEN
    };

    // the post options
    var optionspost = {
        host : 'prod.hardingpoint.com',
        port : 443,
        path : '/v9.3/api/orchestration/get',
        method : 'POST',
        headers : postheaders
    };

    try{
        var reqPost = https.request(optionspost, function(error,data) {
            if (error){
                console.log("Error: " + error);
            }else{
                console.log("data: " + data);
            }
        });
    }catch(ex){
        console.log("EXCEPTION!");
    }
}
*/