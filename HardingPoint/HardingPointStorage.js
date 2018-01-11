/**
 * Copyright 2017 Harding Point
 *
 *  Contact Support@HardingPoint.com
 *
 *  https://www.hardingpoint.com/
 *  https://github.com/HardingPoint
 *
 **/
var HardingPointConfig = require("./HardingPointConfig.js");
var HardingPointAPI = require("./HardingPointAPI.js");
var debug = require("./debug.js");

var when = require('when');
var util = require('util');

var settings;
var HardingPointConfig;
var appname;

function timeoutWrap(func) {
    return when.promise(function(resolve,reject,notify) {
        var promise = func().timeout(5000,"timeout");
        promise.then(function(a,b,c,d) {
            //heartBeatLastSent = (new Date()).getTime();
            resolve(a,b,c,d);
        });
        promise.otherwise(function(err) {
            console.log("TIMEOUT: ",func.name);
            if (err == "timeout") {
                //close().then(function() {
                    resolve(func());
                //}).otherwise(function(err) {
                //    reject(err);
                //});
            } else {
                reject(err);
            }
        });
    });
}

function getFlows() {
    var defer = when.defer();
    HardingPointAPI.getfile("flows.json",function(error,data){
        if (error) {
            if (error.toString().indexOf("File Empty")!=-1){
                debug.write("HardingPointStorage.getFlows","HardingPointAPI.getFlows","File Empty Defaulting to Blank");
                defer.resolve([]);
            }else{
                debug.outputiferror("HardingPointStorage.getFlows","HardingPointAPI.getfile",error);
                defer.reject(error);
            }
        }else{
            if (data){
                defer.resolve(JSON.parse(data));
            }else{
                defer.resolve([]);
            }
        }
    });
    return defer.promise;
}

function saveFlows(flows) {
    var defer = when.defer();
    HardingPointAPI.savefile("flows.json",flows,function(error,data){
        if (error){
            debug.outputiferror("HardingPointStorage.saveFlows","HardingPointAPI.savefile",error);
            defer.reject(error);
        }
        else
            defer.resolve();
    });
    return defer.promise;
}

function getCredentials() {
    var defer = when.defer();
    HardingPointAPI.getfile("credentials.json",function(error,data){
        if (error) {
            if (error.toString().indexOf("File Empty")!=-1){
                debug.write("HardingPointStorage.getCredentials","HardingPointAPI.getCredentials","File Empty Defaulting to Blank");
                defer.resolve({});
            }else{
                debug.outputiferror("HardingPointStorage.getCredentials","HardingPointAPI.getfile",error);
                defer.reject(error);
            }
        }else{
            if (data){
                debug.write("HardingPointStorage.getCredentials", "Loaded Credentials");
                defer.resolve(JSON.parse(data));
            }else{
                defer.resolve({});
            }
        }
    });
    return defer.promise;
}

function saveCredentials(credentials) {
    debug.write("HardingPointStorage.saveCredentials", JSON.stringify(credentials));
    var defer = when.defer();
    HardingPointAPI.savefile("credentials.json",credentials,function(error,data){
        if (error){
            debug.outputiferror("HardingPointStorage.saveCredentials","HardingPointAPI.savefile",error);
            defer.reject(error);
        }else
            defer.resolve();
    });
    return defer.promise;
}

function getSettings () {
    var defer = when.defer();
    HardingPointAPI.getfile("settings.json",function(error,data){
        if (error) {
            if (error.toString().indexOf("File Empty")!=-1){
                debug.write("HardingPointStorage.getSettings","HardingPointAPI.getfile","File Empty Defaulting to Blank");
                defer.resolve({});
            }else{
                debug.outputiferror("HardingPointStorage.getSettings","HardingPointAPI.getfile",error);
                defer.reject(error);
            }
        }else{
            if (data){
                defer.resolve(JSON.parse(data));
            }else{
                defer.resolve({});
            }
        }
    });
    return defer.promise;
}

function saveSettings (settings) {
    var defer = when.defer();
    HardingPointAPI.savefile("settings.json",settings,function(error,data){
        if (error){
            debug.outputiferror("HardingPointStorage.saveSettings","HardingPointAPI.savefile",error);
            defer.reject(error);
        }else
            defer.resolve();
    });
    return defer.promise;
}

function getFlow(fn) {
    debug.write("HardingPointStorage.getFlow",JSON.stringify(fn));
    var defer = when.defer();
    HardingPointAPI.getfile("settings.json",function(error,data){
        if (error) {
            if (error.toString().indexOf("File Empty")!=-1){
                defer.resolve({});
            }else{
                debug.outputiferror("HardingPointStorage.getFlow","HardingPointAPI.getfile",error);
                defer.reject(error);
            }
        }else{
            if (data){
                defer.resolve(JSON.parse(data));
            }else{
                defer.resolve({});
            }
        }
    });
    return defer.promise;
}

function saveFlow(fn,data) {
    var defer = when.defer();
    HardingPointAPI.savefile("Flow-" + fn, data, function(error,data){
        if (error){
            debug.outputiferror("HardingPointStorage.saveFlow","HardingPointAPI.savefile",error);
            defer.reject(error);
        }else
            defer.resolve();
    });
    return defer.promise;
}

function getAllFlows() {
    var defer = when.defer();
    HardingPointAPI.getfile("flows.json",function(error,data){
        if (error) {
            if (error.toString().indexOf("File Empty")!=-1){
                defer.resolve([]);
            }else{
                debug.outputiferror("HardingPointStorage.getAllFlows","HardingPointAPI.getfile",error);
                defer.reject(error);
            }
        }else{
            if (data){
                defer.resolve(JSON.parse(data));
            }else{
                defer.resolve({});
            }
        }
    });
    return defer.promise;
}

function saveLibraryEntry(type,path,meta,body) {
    var defer = when.defer();
    debug.write("HardingPointStorage.saveLibraryEntry","type: " + type + " path: " + path + " meta: " + meta + " body: " + body);
    return defer.promise;
}

function getLibraryEntry(type,path) {
    var defer = when.defer();
    debug.write("HardingPointStorage.getLibraryEntry","type : " + type + " path: " + path);
    return defer.promise;
}


var HardingPointStorage = {
    init: function(_settings) {
        settings = _settings;
        appname = settings.mongoAppname || require('os').hostname();
        // return db();
    },
    getFlows: function() {
        return timeoutWrap(getFlows);
    },
    saveFlows: function(flows) {
        return timeoutWrap(function(){return saveFlows(flows);});
    },

    getCredentials: function() {
        return timeoutWrap(getCredentials);
    },

    saveCredentials: function(credentials) {
        return timeoutWrap(function(){return saveCredentials(credentials);});
    },

    getSettings: function() {
        return timeoutWrap(function() { return getSettings();});
    },

    saveSettings: function(data) {
        return timeoutWrap(function() { return saveSettings(data);});
    },

    getFlow: function(fn) {
        return timeoutWrap(function() { return getFlow(fn);});
    },

    saveFlow: function(fn,data) {
        return timeoutWrap(function() { return saveFlow(fn,data);});
    },
    getAllFlows: function() {
        return timeoutWrap(getAllFlows);
    },
    getLibraryEntry: function(type,path) {
        // console.log("@@ getLibraryEntry: " + type);
        return timeoutWrap(function() { return getLibraryEntry(type,path);});
    },
    saveLibraryEntry: function(type,path,meta,body) {
        return timeoutWrap(function() { return saveLibraryEntry(type,path,meta,body);});
    }
};

module.exports = HardingPointStorage;


/*
function getAllFlows() {
    var defer = when.defer();
    libCollection().then(function(libCollection) {
        libCollection.find({appname:appname, type:'flow'},{sort:'path'}).toArray(function(err,docs) {
            if (err) {
                defer.reject(err);
            } else if (!docs) {
                defer.resolve({});
            } else {
                var result = {};
                for (var i=0;i<docs.length;i++) {
                    var doc = docs[i];
                    var path = doc.path;
                    var parts = path.split("/");
                    var ref = result;
                    for (var j=0;j<parts.length-1;j++) {
                        ref['d'] = ref['d']||{};
                        ref['d'][parts[j]] = ref['d'][parts[j]]||{};
                        ref = ref['d'][parts[j]];
                    }
                    ref['f'] = ref['f']||[];
                    ref['f'].push(parts.slice(-1)[0]);
                }
                defer.resolve(result);
            }
        });
    }).otherwise(function(err) {
        defer.reject(err);
    });
    return defer.promise;
}

function jconv(credentials) {
    var jconvs = {};
    for (id in credentials) {
        jconvs[id.replace("_", ".")] = credentials[id];
    }
    return jconvs;
}

function bconv(credentials) {
    var bconvs = {};
    for (id in credentials) {
        bconvs[id.replace(".", "_")] = credentials[id];
    }
    return bconvs;
}

function db() {
    return when.promise(function(resolve,reject,notify) {
        if (!HardingPointConfig.APITOKEN && HardingPointConfig.GATEWAYTOKEN) {
            resolve(HardingPointConfig);
        } else {
            resolve(HardingPointConfig);
        }
    });
}

function collection() {
    return when.promise(function(resolve,reject,notify) {
        db().then(function(db) {
            db.collection(settings.mongoCollection||"nodered",function(err,_collection) {
                if (err) {
                    util.log("Mongo DB error:"+err);
                    reject(err);
                } else {
                    resolve(_collection);
                }
            });
        }).otherwise(function (err) {
            reject(err);
        })
    });
}

function libCollection() {
    return when.promise(function(resolve,reject,notify) {
        db().then(function(db) {
            db.collection(settings.mongoCollection||"nodered"+"-lib",function(err,_collection) {
                if (err) {
                    util.log("Mongo DB error:"+err);
                    reject(err);
                } else {
                    resolve(_collection);
                }
            });
        }).otherwise(function (err) {
            reject(err);
        })
    });
}

function getLibraryEntry(type,path) {
    var defer = when.defer();
    libCollection().then(function(libCollection) {
        libCollection.findOne({appname:appname, type:type, path:path}, function(err,doc) {
            if (err) {
                defer.reject(err);
            } else if (doc) {
                defer.resolve(doc.data);
            } else {
                if (path != "" && path.substr(-1) != "/") {
                    path = path+"/";
                }
                libCollection.find({appname:appname, type:type, path:{$regex:path+".*"}},{sort:'path'}).toArray(function(err,docs) {
                    if (err) {
                        defer.reject(err);
                    } else if (!docs) {
                        defer.reject("not found");
                    } else {
                        var dirs = [];
                        var files = [];
                        for (var i=0;i<docs.length;i++) {
                            var doc = docs[i];
                            var subpath = doc.path.substr(path.length);
                            var parts = subpath.split("/");
                            if (parts.length == 1) {
                                var meta = doc.meta;
                                meta.fn = parts[0];
                                files.push(meta);
                            } else if (dirs.indexOf(parts[0]) == -1) {
                                dirs.push(parts[0]);
                            }
                        }
                        defer.resolve(dirs.concat(files));
                    }
                });
            }
        });
    }).otherwise(function(err) {
        defer.reject(err);
    });
    return defer.promise;
}

function close() {
    return when.promise(function(resolve,reject,notify) {
        if (mongodb) {
            mongodb.close(true, function(err,result) {
                if (err) {
                    util.log("Mongo DB error:"+err);
                    reject(err);
                } else {
                    resolve();
                }
            })
            mongodb = null;
        }
    });
}

function saveLibraryEntry(type,path,meta,body) {
    var defer = when.defer();
    debug.write("saveLibraryEntry","type: " + type + " path: " + path + " meta: " + meta + " body: " + body);
    libCollection().then(function(libCollection) {
        libCollection.update({appname:appname,type:type,path:path},{appname:appname,type:type,path:path,meta:meta,data:body},{upsert:true},function(err) {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve();
            }
        });
    }).otherwise(function(err) {
        defer.reject(err);
    });
    return defer.promise;
}
*/
