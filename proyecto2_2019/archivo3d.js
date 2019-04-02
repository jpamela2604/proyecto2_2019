
const ejecucion=require("./interprete3d/ejecucion.js");
const error_manager=require("./mng_error/error_manager.js");
var parser = require("./interprete3d/gramatica_3d/g_3d").parser;
const vari = require("./var.js");
var fs = require("fs");
var err=new error_manager();
var execute= new ejecucion();
var bnf = fs.readFileSync("codigo3d", "utf8");
function exec (input) {
    return parser.parse(input);
}
vari.archivo="new file";
var raiz = exec(bnf);
raiz.guardarValores(execute,err);
raiz.ejecutar(execute,err);

