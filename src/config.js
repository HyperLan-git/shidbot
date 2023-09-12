const fs = require('fs');
const config = fs.existsSync(module.path + "/../resources/config.json") ? require("../resources/config.json") : {};
const defaults = require("../resources/defaults.json");

for (let k in defaults)
    if (!(k in config))
        config[k] = defaults[k];


module.exports = config;