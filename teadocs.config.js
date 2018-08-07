'use strict';
const path = require('path')

module.exports = {
    doc: {
        name: "阮一峰的JavaScript教程",
        description: "阮一峰的JavaScript教程",
        version: "v0.0.1",
        dir: "",
        outDir: "",
        staticDir: ""
    }, 
    theme: {
        dir: "", 
        title: "",
        headHtml: "",
        footHtml: "",
        isMinify: true,
        rootPath: "/docs/javascript/"
    },
    nav: {
        tree: "./tree"
    }
}