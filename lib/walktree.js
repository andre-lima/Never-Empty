'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//USING NODE 8 POLYFILL FOR PROMISIFY
// **************************************
/*const util = require('util');
require('util.promisify').shim();

const readFileAsync = util.promisify(fs.readFile);

readFileAsync('./README.md', {encoding: 'utf8'})
  .then((text) => {
      console.log('CONTENT:', text);
  })
  .catch((err) => {
      console.log('ERROR:', err);
  });
*/
function walkTree(opts) {
    var create = opts.create;
    var ignored = opts.ignore;
    var countFolders = opts.countFoldersAsFiles;
    var nameOfPlaceholder = opts.file;

    walkTreeRecursive(opts.root);

    function walkTreeRecursive(dirPath) {
        _fs2.default.readdir(dirPath, function (err, elements) {
            if (err) {
                throw new Error('Failed to read the directory at: ' + dirPath);
            }

            var fileCount = 0;

            elements.forEach(function (element) {
                var fullPathToElement = _path2.default.join(dirPath, element);

                // Skip ignored folder and tries next folder in line
                if (ignored.includes(element) || !_fs2.default.existsSync(fullPathToElement)) {
                    return;
                }

                var stat = _fs2.default.statSync(fullPathToElement);
                if (stat.isDirectory()) {
                    if (create && countFolders) {
                        fileCount++;
                    }

                    walkTreeRecursive(fullPathToElement);
                } else if (stat.isFile()) {
                    fileCount++;

                    if (!create && element === nameOfPlaceholder) {
                        _fs2.default.unlink(fullPathToElement);
                    }
                }
            });

            // Creates a file
            if (create && fileCount === 0) {
                var pathToPlaceholder = _path2.default.join(dirPath, nameOfPlaceholder);
                _fs2.default.open(pathToPlaceholder, 'w', function (err, fd) {
                    if (err) {
                        throw new Error('Encountered an error while creating a file: ' + pathToPlaceholder);
                    }
                    _fs2.default.close(fd);
                });
            }
        });
    }
}

module.exports = walkTree;