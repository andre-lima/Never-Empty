(function () {
    "use strict";

    var walk = require('walk'),
        fs = require('fs'),
        createFile = require('create-file'),
        walker;

    var options = {};

    walker = walk.walk("./", options);

    var dirs = {};

    walker.on("directories", function (root, dirStatsArray, next) {
        dirStatsArray.forEach(function (dir) {
            var f_walker = walk.walk('src/' + dir.name, options);
            dirs[dir.name] = 0;
            console.log(root);

            f_walker.on("file", function (root, fileStats, next) {
                fs.readFile(fileStats.name, function () {
                    //console.log(" -- " + fileStats.name)
                    dirs[dir.name]++;
                    createFile('src/' + dir.name + '/.gitkeep', ' ', function (err) {
                        // file either already exists or is now created (including non existing directories) 
                    });
                    next();
                });
            });

        }, this);
        next();
    });

    walker.on("errors", function (root, nodeStatsArray, next) {
        next();
    });

    walker.on("end", function () {
        console.log("all done");
        console.log(dirs);
    });




}());