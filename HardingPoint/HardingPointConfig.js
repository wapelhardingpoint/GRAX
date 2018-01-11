/**
 * Copyright 2017 Harding Point
 *
 *  Contact Support@HardingPoint.com
 *
 *  https://www.hardingpoint.com/
 *  https://github.com/HardingPoint
 *
 **/

module.exports = {
    APIURL: process.env.ENGAGEMENTMANAGER_APIURL || process.env.ENGAGEMENTGRAPH_APIURL || "https://test.hardingpoint.com/v9.3/api",
    GATEWAYTOKEN: process.env.ENGAGEMENTGRAPH_GATEWAYTOKEN || process.env.ENGAGEMENTMANAGER_GATEWAYTOKEN,
    APITOKEN: process.env.ENGAGEMENTGRAPH_APITOKEN || process.env.ENGAGEMENTMANAGER_APITOKEN,
    LICENSETOKEN: process.env.ENGAGEMENTGRAPH_LICENSETOKEN,
    ENVIRONMENT: process.env.ENGAGEMENTGRAPH_ENVIRONMENT || process.env.ENGAGEMENTMANAGER_ENVIRONMENT || "production",
    SAVE: "orchestration/save",
    GET:  "orchestration/get",
    LOGEXCEPTION: "log/exception",
    VERSION: process.env.ENGAGEMENTGRAPH_APIVERSION || process.env.ENGAGEMENTMANAGER_APIVERSION || "v9.3",
    URL: process.env.ENGAGEMENTGRAPH_URL || process.env.ENGAGEMENTMANAGER_URL || "test.hardingpoint.com",
    CACHEDIR: process.env.ENGAGEMENTMANAGER_CACHE_DIR || process.env.ENGAGEMENTGRAPH_CACHE_DIR || "./HardingPoint/cache/",
    CACHE: process.env.ENGAGEMENTMANAGER_CACHE_ENABLED || process.env.ENGAGEMENTGRAPH_CACHE_ENABLED || "true",
    ADMINUSER: process.env.ENGAGEMENTMANAGER_ADMINUSER || process.env.ENGAGEMENTGRAPH_ADMINUSER || "admin",
    ADMINPWD: process.env.ENGAGEMENTMANAGER_ADMINPWD || process.env.ENGAGEMENTGRAPH_ADMINPWD || process.env.ADMINPWD,
    READONLYUSER: process.env.ENGAGEMENTMANAGER_READONLYUSER || process.env.ENGAGEMENTGRAPH_READONLYUSER || "readonly",
    READONLYPWD: process.env.ENGAGEMENTMANAGER_READONLYPWD || process.env.ENGAGEMENTGRAPH_READONLYPWD || process.env.READONLYPWD
};