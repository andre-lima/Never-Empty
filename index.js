const fs = require('fs');
const walkTree = require('./walktree');

let startModule = function startModule() {

    //default options
    const options = {
        root: './',
        create: false,
        file: '.gitkeep',
        countFoldersAsFiles: false,
        refresh: true,
        ignore: ['.git', 'node_modules', 'partial_modules']
    };

    //Remove then create the files where necessary
    if (options.refresh) {
        options.create = false;
        walkTree(options.root, options);
        options.create = true;
    }

    walkTree(options.root, options);

};

module.exports = startModule;
