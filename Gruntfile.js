/* globals module, require */

module.exports = function (grunt) {
	'use strict';

	// Load custom tasks
	grunt.task.loadTasks('tasks/');
	// Load 3rd party tasks
	grunt.loadNpmTasks('grunt-react');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Project configuration
	grunt.initConfig({
		// Metadata
		pkg: grunt.file.readJSON('package.json'),
		// Task configuration
		react: {
			dist: {
				src:  'webpagetest-bookmarklet-src.jsx',
				dest: 'webpagetest-bookmarklet.js'
			}
		},
		uglify: {
			bookmarklet: {
				src:  'bookmarklet-url-src.js',
				dest: 'bookmarklet-url.js',
			},
			script: {
				src:  '<%= react.dist.dest %>',
				dest: 'webpagetest-bookmarklet-min.js',
			}
		},
		jshint: {
			dist: {
				src: [
					'Gruntfile.js',
					'<%= uglify.bookmarklet.src %>',
					'<%= uglify.script.src %>',
				]
			},
		},
		urlifyjs: {
			dist: {
				src:  'bookmarklet-url.js',
				dest: 'bookmarklet-url.txt'
			}
		},
	});

	// Default task
	grunt.registerTask('default', [
		'react',
		'jshint',
		'uglify',
		'urlifyjs'
	]);
};
