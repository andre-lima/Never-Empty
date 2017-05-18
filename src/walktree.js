const fs = require('fs');

const walkTree = function walkTree(opts) {
    const path = opts.root;
    const ignored = opts.ignore;
    const create = opts.create;
    const countFolders = opts.countFoldersAsFiles;
    const fileName = opts.file;

    walkTreeRecursive(path);

    function walkTreeRecursive(path) {
        let elements = fs.readdirSync(path);
        let fileCount = 0;

        while (elements.length > 0) {
            let element = elements.pop();
            let elementPath = path + '/' + element;

            if (ignored.includes(element)) {
                continue;
            }

            let stat = fs.statSync(elementPath);
            if (stat.isDirectory()) {
                if (create && countFolders) {
                    fileCount++;
                }

                walkTreeRecursive(elementPath);

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

}

module.exports = walkTree;
