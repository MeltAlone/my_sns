let fs =require("fs");
let globalConfig = require("./config");

let pathMap = new Map();

function init(app) {

    var files = fs.readdirSync(globalConfig["web_path"]);

    for (var i = 0; i < files.length; i++) {
        var temp = require("./" + globalConfig["web_path"] + "/" + files[i]);
        if (temp.path) {
            for (var [key, value] of temp.path) {
                if (pathMap.get(key) == null) {
                    pathMap.set(key, value);
                    app.get(key, value);
                } else {
                    throw new Error("url path 异常,url:" + key);
                }
            }
        }
    }
}

module.exports.init = init;
module.exports.pathMap = pathMap;