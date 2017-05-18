const walkTree = require('./walktree');

const startModule = (function startModule() {
    const options = { //Default options
        root: './',
        file: '.gitkeep',
        create: true,
        countFoldersAsFiles: false,
        ignore: ['.git', 'node_modules', 'partial_modules']
    }

    return {
        setOptions: function setOptions(opts) {
            if (typeof opts === 'object') {
                for (let key in opts) {
                    if (options.hasOwnProperty(key)) {
                        options[key] = opts[key];
                    }
                }
            }
        },
        showOptions: function () {
            console.log(options);
        },
        remove: function () {
            options.create = false;
            walkTree(options);
        },
        refresh: function () {
            this.remove();
            options.create = true;
            walkTree(options);
        }
    }

})();

module.exports = startModule;
