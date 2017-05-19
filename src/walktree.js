import fs from 'fs';
import path from 'path';

function walkTree (opts) {
    const create = opts.create;
    const ignored = opts.ignore;
    const countFolders = opts.countFoldersAsFiles;
    const nameOfPlaceholder = opts.file;

    walkTreeRecursive(opts.root);

    function walkTreeRecursive(dirPath) {
        fs.readdir(dirPath, function(err, elements) {
            if (err) {
              throw new Error('Failed to read the directory at: ' + dirPath);
            }

            var fileCount = 0;

            elements.forEach(function(element) {
                var fullPathToElement = path.join(dirPath, element);

                // Skip ignored folder and tries next folder in line
                if (ignored.includes(element) || !fs.existsSync(fullPathToElement)) {
                    return;
                }

                var stat = fs.statSync(fullPathToElement);
                if (stat.isDirectory()) {
                    if (create && countFolders) {
                        fileCount++;
                    }

                    walkTreeRecursive(fullPathToElement);

                } else if (stat.isFile()) {
                    fileCount++;

                    if (!create && element === nameOfPlaceholder) {
                        fs.unlink(fullPathToElement);
                    }

                }
            });

            // Creates a file
            if (create && fileCount === 0) {
                var pathToPlaceholder = path.join(dirPath, nameOfPlaceholder);
                fs.open(pathToPlaceholder, 'w', function(err, fd) {
                  if (err) {
                    throw new Error('Encountered an error while creating a file: ' + pathToPlaceholder);
                  }
                  fs.close(fd);
                });
            }
        });
    }

}

module.exports = walkTree;
