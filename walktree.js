const fs = require('fs');

let walkTree = function walkTree(path, opts) {
    console.log(path);
    let elements = fs.readdirSync(path);
    let fileCount = 0;

    while (elements.length > 0) {
        let element = elements.pop();
        let elementPath = path + '/' + element;

        if (opts.ignore.includes(element)) {
            console.log('Found ignored folder:', element);
            continue;
        }

        let stat = fs.statSync(elementPath);

        if (stat.isDirectory()) {
            if (opts.create && opts.countFolders) {
                fileCount++;
            }

            walkTree(elementPath, opts);

        } else if (stat.isFile()) {
            fileCount++;

            if (!opts.create && element === opts.fileName) {
                fs.unlinkSync(elementPath);
            }

        } else {
            return;
        }
    }

    // Creates a file
    if (opts.create && fileCount === 0) {
        fs.closeSync(fs.openSync(path + '/' + fileName, 'w'));
    }

    return;
}

module.exports = walkTree;
