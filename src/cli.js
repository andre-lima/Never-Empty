#!/usr/bin/env node

'use strict';

const program = require('commander');
const chalk = require('chalk');
const ne = require('./index');
const pkg = require('./package.json');

program
    .version(pkg.version)
    //.option('-n, --file-name <filename>', 'Change file name')
    .option('-d, --directory <directory>', 'Choose root directory')
    .option('-f, --folders', 'Don\'t add a file if directory has sub-folders' )
    .option('-a, --add', 'Add files on empty directories (also removes if directory is no longer empty)')
    .option('-r, --remove', 'Remove files from all directories')
    .option('-o, --show-options', 'Show current options')
program.parse(process.argv);


/*if (program.fileName) {
    ne.setOptions({file: program.fileName});
}*/

if (program.directory) {
    ne.setOptions({root: program.directory});
}

if (program.folders) {
    ne.setOptions({countFoldersAsFiles: program.folders});
}

if (program.add) {
    ne.create();
} else if (program.remove) {
    ne.remove();
}

if (program.showOptions) {
    console.log(ne.showOptions());
}

// if program was called with no arguments, show help.
//if (program.args.length === 0 ) program.help();
