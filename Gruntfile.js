module.exports = function(grunt){
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		//
		// set environment variables for targeting specific platforms.
		// APP     - for app development in browser,
		// ANDROID - for deploying to android,
		// IOS     - for deploying to iOS
		//
		env : {
			options : {
			},
			app : {
				NODE_ENV : 'APP'
			},
			android : {
				NODE_ENV : 'ANDROID'
			},
			ios : {
				NODE_ENV : 'IOS'
			},
			web : {
				NODE_ENV : 'WEB'
			},
			ie: {
				NODE_ENV : 'IE'
			},
			desktop: {
				NODE_ENV : 'DESKTOP'
			}
		},

		//
		// concat all vendorfiles to one, all cordova specific files per platform to one
		// (-ios, -android for right platform), and merge all controllers,directives,services
		// and filters to one file each. put in temp folder before preprocessing them for
		// platform specific code-check
		//
		concat : {
			build: {
				files : {
					'www/js/vendor.js'      : ['app/vendor/js/**/*.js'],
					'www/js/controllers.js'     : ['app/js/controllers/**/*.js'],
					'www/js/directives.js'      : ['app/js/directives/**/*.js'],
					'www/js/filters.js'         : ['app/js/filters/**/*.js'],
					'www/js/services.js'        : ['app/js/services/**/*.js']
				}
			}
		},

		//
		// copy all files, one for each deploy target. ability to specify specific files
		// for different build targets.
		//
		copy : {
			options: {
		      separator: ';',
		    },
			app : {
				files : [
					// ONLY FILES
					{
						expand: true,
					    cwd: 'app/fonts/',
					    src: '**',
					    dest: 'www/fonts/',
					    flatten: false,
					    filter: 'isFile'
					},
					{
						expand: true,
					    cwd: 'app/img/',
					    src: '**',
					    dest: 'www/img/',
					    flatten: false,
					    filter: 'isFile'
					},
					{
						expand: true,
					    cwd: 'app/partials',
					    src: '**',
					    dest: 'www/partials/',
					    flatten: false,
					    filter: 'isFile'
					},
					{
						expand: true,
					    cwd: 'app/views',
					    src: '**',
					    dest: 'www/views',
					    flatten: false,
					    filter: 'isFile'
					},
					{
					    src: 'app/index.html',
					    dest: 'www/index.html',
					    filter: 'isFile'
					},
					{
					    src: 'app/config.xml',
					    dest: 'www/config.xml',
					    filter: 'isFile'
					},
					{
					    src: 'app/js/app.js',
					    dest: 'www/js/app.js',
					    filter: 'isFile'
					}
				]
			}
		},

		//
		// watch for new/changes js,scss,views,partials,vendorjs,fonts,imgs and update dev www.
		// also converts scss to css.
		// use when developing in browser
		//
		watch : {
			 app: {
			 	files : ['app/*','app/scss/**/*','app/fonts/**/*',
					'app/img/**/*','app/js/**/*','app/partials/**/*',
					'app/vendor/**/*','app/views/**/*'],
				tasks : ['concat:build','sass:app', 'copy:app']
			}
		},

		//
		// sass tasks for deploying code. one for each target
		//
		sass : {
			app : {
				options : {
					compass : false
					// sourcemap: true
				},
				files : {
					'www/css/style.css' : 'app/scss/style.scss'
				}
			}
		}



	});

	//
	// load all used grunt tasks
	//
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-preprocess');
	grunt.loadNpmTasks('grunt-env');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-angular-gettext');

	//
	// register workflows.
	// one per platform
	//
	grunt.registerTask('default',['concat:build','sass:app', 'copy:app']);

};