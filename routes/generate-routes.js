const path = require('path');

const vueRoutes =  require(path.join(__dirname, '../resources/src/router/routes.js'));
const serverPaths = vueRoutes.default.flatMap(route => {
    if (route.path.includes("?")) {
        return [route.path.replace("?", ""), route.path.replace(":id?", "")];
    }
    return [route.path];
});

module.exports = serverPaths;