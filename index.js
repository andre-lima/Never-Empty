'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var walkTree = require('./lib/walktree');

var startModule = function startModule() {
    // Default options
    var options = {
        root: './',
        file: '.gitkeep',
        create: true,
        countFoldersAsFiles: false,
        ignore: ['.git', 'node_modules', 'partial_modules']
    };

    return {
        setOptions: function setOptions(newOptions) {
            if ((typeof newOptions === 'undefined' ? 'undefined' : _typeof(newOptions)) !== 'object') {
                throw new Error('Options is not an object!');
            }
            options = Object.assign({}, options, newOptions);
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
    };
}();

module.exports = startModule;