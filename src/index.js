var walkTree = require('./lib/walktree');
//import * from './lib/walktree';

const startModule = (function startModule() {
    // Default options
    let options = {
        root: './',
        file: '.gitkeep',
        create: true,
        countFoldersAsFiles: false,
        ignore: ['.git', 'node_modules', 'partial_modules'],
    };

    return {
        setOptions: (newOptions) => {
            if (typeof newOptions !== 'object') {
                throw new Error('Options is not an object!');
            }
            options = Object.assign({}, options, newOptions);
        },
        showOptions: () => options,
        remove: () => {
            options.create = false;
            walkTree(options);
        },
        create: () => {
            options.create = true;
            walkTree(options);
        }
    }
}());

module.exports = startModule;
