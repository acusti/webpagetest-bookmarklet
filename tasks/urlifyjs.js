/**
 * Run within context of Node + Grunt and return
 */

module.exports = function(grunt) {
	'use strict';

	grunt.registerMultiTask('urlifyjs', 'Make JS work as bookmarklet javascript: URL', function() {
		this.files.forEach(function(file) {
			var validFile,
			    srcFile,
				destFile;
			validFile = file.src.filter(function(filepath) {
				// Warn on and remove invalid source files (if nonull was set).
				if (!grunt.file.exists(filepath)) {
					grunt.log.warn('Source file "' + filepath + '" not found.');
					return false;
				}
				return true;
			});
			srcFile = validFile.map(grunt.file.read)
				.join(grunt.util.normalizelf(grunt.util.linefeed));
			destFile = validFile.map(function(file) {
				return 'javascript:' + encodeURIComponent(grunt.file.read(file));
			}).join('');

			if (destFile.length < 1) {
				grunt.log.warn('Destination not written because URL encoded JS was empty.');
			} else {
				grunt.file.write(file.dest, destFile);
				grunt.log.writeln('File ' + file.dest + ' created.');
			}
		});
	});
};
