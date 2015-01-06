/* globals module, require */

module.exports = function (grunt) {
	'use strict';

	// Load custom tasks
	grunt.task.loadTasks('tasks/');
	// Load 3rd party tasks
	grunt.loadNpmTasks('grunt-react');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Project configuration
	grunt.initConfig({
		// Metadata
		// pkg: grunt.file.readJSON('package.json'),
		// Task configuration
		react: {
			dist: {
				src:  'webpagetest-bookmarklet-src.jsx',
				dest: 'webpagetest-bookmarklet-src.js'
			}
		},
		jshint: {
			dist: {
				src: [
					'Gruntfile.js',
					'tasks/urlifyjs.js',
					'<%= react.dist.dest %>',
					'<%= copy.dist.src %>',
				]
			},
		},
		copy: {
			dist: {
				src     : 'bookmarklet-url-src.tpl.js',
				dest    : 'bookmarklet-url.js',
				options : {
					process: function(content) {
						var reactjs       = grunt.file.read('bower_components/react/react.min.js'),
						    bookmarkletjs = grunt.file.read('webpagetest-bookmarklet.min.js');

						if (reactjs.indexOf('*/\n') !== -1) {
							reactjs = reactjs.substr(reactjs.indexOf('*/\n') + 3);
						}
						content = content.replace(/\n/g, '');
						content = content.replace('/* {reactjs} */', reactjs);
						content = content.replace('/* {bookmarkletjs} */', bookmarkletjs);
						return content;
					}
				}
			}
		},
		uglify: {
			script: {
				src:  '<%= react.dist.dest %>',
				dest: 'webpagetest-bookmarklet.min.js',
				options: {
					preserveComments: false
				}
			},
			// react: {
			// 	src:  '<%= copy.dist.dest %>',
			// 	dest: 'bookmarklet-url.js',
			// }
		},
		urlifyjs: {
			dist: {
				src:  '<%= copy.dist.dest %>',
				dest: 'bookmarklet-url.txt'
			}
		},
	});

	// Default task
	grunt.registerTask('default', [
		'react',
		'jshint',
		'uglify',
		'copy',
		'urlifyjs'
	]);
};
