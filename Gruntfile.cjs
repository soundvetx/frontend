module.exports = function (grunt) {
    grunt.loadNpmTasks("grunt-env");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-run");
    grunt.loadNpmTasks("grunt-contrib-copy");

    grunt.initConfig({
        env: {
            options: {},
            local: {
                VITE_API_URL: "http://localhost:91/api",
            },
            production: {
                VITE_API_URL: "https://soundvetx.soundvet.vet.br/api",
            },
        },
        clean: {
            options: {
                force: true,
            },
            public: [
                "../backend/public/assets",
                "../backend/public/index.html",
                "../backend/public/favicon.ico",
            ],
        },
        run: {
            options: {},
            build: {
                exec: "npm run build",
            },
        },
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: "dist",
                        src: ["**"],
                        dest: "../backend/public/",
                    },
                ],
            },
        },
    });

    const steps = (enviroment = "local") => [
        `env:${enviroment}`,
        "clean:public",
        "run:build",
        "copy:dist",
    ];

    const enviroments = ["local", "production"];

    for (const enviroment of enviroments) {
        grunt.registerTask(`deploy:${enviroment}`, steps(enviroment));
    }
};
