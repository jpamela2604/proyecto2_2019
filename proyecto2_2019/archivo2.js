const ts_manager = require("./mng_ts/ts_manager.js");
const traducir=require("./coline/traducir.js");
const error_manager=require("./mng_error/error_manager.js");


var errores=new error_manager();
errores.addError("error de tipos ",1,1,"mi arch","LEXICO");
errores.addError("error var repetida",3,3,"mi arch","SEMANTICO");

errores.imprimir();