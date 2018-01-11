/**
 * Copyright 2017 Harding Point
 *
 *  Contact Support@HardingPoint.com
 *
 *  https://www.hardingpoint.com/
 *  https://github.com/HardingPoint
 *
 **/

var debug = require("./debug.js");
var when = require("when");
var SHA256 = require("crypto-js/sha256");
var config = require("./HardingPointConfig");

var HardingPointSecurity = module.exports = {
    // This is a global admin user
    AdminUser: config.ADMINUSER,
    AdminPwd: config.ADMINPWD, // Unique Per Customer
    ReadonlyUser: config.READONLYUSER,
    ReadonlyPwd: config.READONLYPWD,
    SecureSalt: config.GATEWAYTOKEN // Gateway Token Is Unique Per Customer Used as Private Key,
};

function GenerateHash(unsecure){
    return SHA256(unsecure + HardingPointSecurity.SecureSalt).toString();
};

// We need to change this to Authenticate from the cloud for access.
HardingPointSecurity.adminAuth = {
    type: "credentials",
    users: function(username) {
        if (HardingPointSecurity.AdminUser.toLowerCase() == username.toLowerCase()) {
            // debug.write("HardingPointSettings.users", "Setting Admin Permissions : " + username);
            return when.resolve({username:username,permissions:"*"});
        } else {
            if (username.toLowerCase()==HardingPointSecurity.ReadonlyUser.toLowerCase()){
                // debug.write("HardingPointSettings.users", "Read Only Permissions: " + username);
                return when.resolve({username:username,permissions:"read"});
            } else {
                debug.write("HardingPointSettings.users", "No Permissions: " + username);
                return when.resolve(null);
            }
        }
    },
    // Global Override if Needed
    //default: {
    //    permissions: "read"
    //},
    authenticate: function(username, password) {
        try{
            if (HardingPointSecurity.AdminUser.toLowerCase() == username.toLowerCase() &&
                HardingPointSecurity.AdminPwd == password) {
                // debug.write("HardingPointSettings.authenticate", "Setting Admin Permissions: " + username);
                // debug.write("HardingPointSettings.authenticate", "Secure Hash: " + GenerateHash(password));
                return when.resolve({username:username,permissions:"*"});
            } else {
                if (username.toLowerCase()==HardingPointSecurity.ReadonlyUser.toLowerCase() && password==HardingPointSecurity.ReadonlyPwd){
                    // debug.write("HardingPointSettings.authenticate", "Read Only Permissions: " + username);
                    return when.resolve({username:username,permissions:"read"});
                } else {
                    debug.write("HardingPointSettings.authenticate", "No Permissions: " + username);
                    debug.write("HardingPointSettings.authenticate", "Read Only User: " + HardingPointSecurity.ReadonlyUser.toLowerCase());
                    // debug.write("HardingPointSettings.authenticate", "Does Pwd Match: " + (password == HardingPointSecurity.ReadonlyPwd).toString());
                    return when.resolve(null);
                }
            }
        }
        catch(e){
            debug.write("HardingPointSettings.authenticate", "EXCEPTION ", e);
        }
    }
};
