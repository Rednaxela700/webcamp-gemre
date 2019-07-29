/**
 * Created by alexander on 22/02/2019.
 */
module.exports = function (grunt) {
    // CONFIGURE GRUNT
    grunt.initConfig({
        // get the configuration info from package.json file
        // this way we can use things like name and version (pkg.name)
        pkg: grunt.file.readJSON('package.json'),


        //css concatenation
        concat_css: {
            options: {
                // Task-specific options go here.
            },
            all: {
                src: ["css/*.css"],
                dest: "merged.css"
            }
        },
        postcss: {
            //    file directories
            dist: {
                src: 'style.css',
                dest: 'styles.css'
            },
            options: {
                processors: [
                    //in last brackets put plugin configuration options
                    require('postcss-discard-duplicates')(), //remove duplicates
                    require('postcss-discard-unused')(), //remove unused rules
                    require('postcss-discard-empty')(), //remove empty rules and values
                    require('postcss-discard-unused')(), //remove counter styles
                    require('postcss-discard-comments')(), //remove comments
                    require('css-mqpacker')(), //join matching mediaqueries
                    require('postcss-merge-rules')(), //merge rules
                    require('postcss-font-magician')(), //optimize fonts
                    require('postcss-cssnext')(),
                    // require('precss')()
                ]
            }
        },
        cssmin: {
            target: {
                // cwd: 'release/css',
                src: 'styles.css',
                dest: '/styles.min.css'
            }
        }

    });

    // all of our configuration goes here


    // log something

    // Load the plugin that provides the "concatenation" task.
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-postcss');
// Load the plugin that provides the "uglify" task.
    /*grunt.loadNpmTasks('grunt-contrib-uglify');*/

    // Default task(s).
    grunt.registerTask('default', ['postcss']);
    console.log('Task has been done, nigga');
    // grunt.registerTask('default', ['postcss']);
};