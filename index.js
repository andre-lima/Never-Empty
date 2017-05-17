var fs = require('fs');

var root = './';
var options = {
    create: true,
    file: '.gitkeep',
    countFoldersAsFiles: false,
    refresh: true,
    ignore: ['node_modules', 'partial_modules']
};

findDirs(root, options);

function findDirs(root, options) {
    var fileName = options.file;
    var create = options.create; //if false, means delete
    var countFolders = options.countFoldersAsFiles;
    var ignored = options.ignore;

    //Remove then create the files where necessary
    if (options.refresh) {
        create = false;
        findDirsRecursive(root);
        create = true;
    }

    findDirsRecursive(root);

    function findDirsRecursive(path) {
        var elements = fs.readdirSync(path);
        var fileCount = 0;

        while (elements.length > 0) {
            var element = elements.pop();
            var elementPath = path + '/' + element;

            if (ignored.includes(element)) {
                console.log('Found ignored folder:', element);
                continue;
            }

            var stat = fs.statSync(elementPath);

            if (stat.isDirectory()) {
                if (create && countFolders) {
                    fileCount++;
                }

                findDirsRecursive(elementPath);

            } else if (stat.isFile()) {
                fileCount++;

                if (!create && element === fileName) {
                    fs.unlinkSync(elementPath);
                }

            } else {
                return;
            }
        }

        // Creates a file
        if (create && fileCount === 0) {
            fs.closeSync(fs.openSync(path + '/' + fileName, 'w'));
        }

        return;
    }

    console.log('THE END!');
}
