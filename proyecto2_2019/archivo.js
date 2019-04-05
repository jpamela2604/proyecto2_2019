const ts_manager = require("./mng_ts/ts_manager.js");
const traducir=require("./coline/traducir.js");
const dibujar =require("./coline/dibujar.js");
const error_manager=require("./mng_error/error_manager.js");
//const oa_suma=require("./coline/compilador/oa_suma.js");
//const o_valorPuntual=require("./coline/compilador/o_valorPuntual.js");
const vari = require("./var.js");
var parser = require("./coline/gramatica_coline/gramatica").parser;
var fs = require("fs");
var err=new error_manager();
var tabla= new ts_manager();
var trad = new traducir();
/*
var uno = new oa_suma(new o_valorPuntual(5,0,0,"",0),new o_valorPuntual(5,0,0,"",1),0,0,"",2);
var dos = new oa_suma(new o_valorPuntual(3,0,0,"",3),new o_valorPuntual(8,0,0,"",4),0,0,"",5);
var tres = new oa_suma(dos,new o_valorPuntual(26,0,0,"",6),0,0,"",7);

var lista= new Array();
lista.push(uno);
lista.push(tres);

for (x=0;x<lista.length;x++)
{
    lista[x].traducir(tabla,trad);
}*/
var bnf = fs.readFileSync("testcalc", "utf8");
function exec (input) {
    return parser.parse(input);
}
vari.archivo="new file";
var lista = exec(bnf);
for (x=0;x<lista.length;x++)
{
    lista[x].comprobacion(tabla,err);
}
err.imprimir();
if(err.size()==0)
{
    for (x=0;x<lista.length;x++)
    {
        lista[x].traducir(tabla,trad);
    }
}

trad.save();

//dibujar.GenerarArbol(lista[0].getTree());

