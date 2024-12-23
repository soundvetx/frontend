module.exports = function (grunt) {
  grunt.loadNpmTasks("grunt-run");
  grunt.loadNpmTasks("grunt-replace");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-rename");
  grunt.loadNpmTasks("grunt-contrib-clean");

  grunt.initConfig({
    clean: {
      options: {
        force: true
      },
      public: ['../backend/public/app']
    },
    run: {
      build: {
        exec: "npm run build",
      },
    },
    rename: {
      next: {
        files: [{ src: ["./out/_next"], dest: "./out/next" }],
      },
    },
    replace: {
      routes: {
        files: [
          {
            expand: true,
            cwd: "./out",
            src: ["**/*"],
            dest: "./out",
          },
        ],
        options: {
          patterns: [
            {
              match: /\/_next/g,
              replacement: './next',
            },
            {
              match: /href="\/favicon.ico/g,
              replacement: 'href="./favicon.ico',
            },
            {
              match: /href:"\/login"/g,
              replacement: 'href:"./login.html"',
            },
            {
              match: /href:"\/register"/g,
              replacement: 'href:"./register.html"',
            },
            {
              match: /\.replace\("\/login/g,
              replacement: '.replace("./login.html',
            },
            {
              match: /\.push\("\//g,
              replacement: '.push("./index.html',
            },
            {
              match: /\.push\(`\/login/g,
              replacement: '.push(`./login.html',
            },
            {
              match: /\["\/login","\/register"\]/g,
              replacement: '["./login.html","./register.html"]',
            },
            {
              match: /route:"\/users"/g,
              replacement: 'route:"./users.html"',
            },
            {
              match: /selected:"\/users"/g,
              replacement: 'selected:"./users.html"',
            },
            {
              match: /route:"\/"/g,
              replacement: 'route:"./index.html"',
            },
            {
              match: /selected:"\/"/g,
              replacement: 'selected:"./index.html"',
            },
            {
              match: /route:"\/profile"/g,
              replacement: 'route:"./profile.html"',
            },
            {
              match: /selected:"\/profile"/g,
              replacement: 'selected:"./profile.html"',
            },
          ],       
        },
      },
    },
    copy: {
      frontend: {
        files: [
          {
            expand: true,
            cwd: "./out",
            src: ["**"],
            dest: "../backend/public/app",
          },
        ],
      },
    },
  });

  grunt.registerTask("deploy", [
    "clean:public",
    "run:build",
    "rename:next",
    "replace:routes",
    "copy:frontend",
  ]);
};
