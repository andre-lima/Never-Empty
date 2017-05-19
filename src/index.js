var walkTree = require('./lib/walktree');

var startModule = (function startModule() {
    var options = { // Default options
        root: './',
        file: '.gitkeep',
        create: true,
        countFoldersAsFiles: false,
        ignore: ['.git', 'node_modules', 'partial_modules'],
    };

    return {
        setOptions: function setOptions(opts) {
            if (typeof opts === 'object') {
                for (var key in opts) {
                    if (options.hasOwnProperty(key)) {
                        options[key] = opts[key];
                    }
                }
            } else {
                throw new Error('Options is not an object!');
            }
        },
        showOptions: function showOptions() {
            return options;
        },
        remove: function remove() {
            options.create = false;
            walkTree(options);
        },
        create: function create() {
            options.create = true;
            walkTree(options);
        }
    }
}());

module.exports = startModule;
