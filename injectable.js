module.exports = function injectable(src) {
    this.cacheable();
    return "module.exports = function (injects) {\nvar module = {exports: {}};" + src.replace(/require\(([^\)]+)\)/g, "injects[$1]") + " return module.exports;\n}";
};