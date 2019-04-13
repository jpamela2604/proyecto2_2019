const ts_manager = require("./mng_ts/ts_manager.js");
const traducir=require("./coline/traducir.js");
const valores = require("./coline/values_manager.js");
const dibujar =require("./coline/dibujar.js");
const error_manager=require("./mng_error/error_manager.js");
//const oa_suma=require("./coline/compilador/oa_suma.js");
//const o_valorPuntual=require("./coline/compilador/o_valorPuntual.js");
const vari = require("./var.js");
var fs = require("fs");
var err=new error_manager();
var tabla= new ts_manager(err);
var trad = new traducir();
var parser = require("./coline/gramatica_coline/gramatica").parser;
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
vari.archivo="new file";
var bnf = fs.readFileSync("testcalc", "utf8");
function exec (input) {
    return parser.parse(input);
}

var lista = exec(bnf);
err.adding();

for (x=0;x<lista.length;x++)
{    
    lista[x].comprobacion_global(tabla,err);
}
for (x=0;x<lista.length;x++)
{    
    lista[x].comprobacion(tabla,err);
}



err.imprimir();
if(err.size()==0)
{
    
    for (x=0;x<lista.length;x++)
    {
        lista[x].traduccion_global(tabla,trad);
    } 
    for (x=0;x<lista.length;x++)
    {
        lista[x].traducir(tabla,trad);
    }
    trad.imprimir(trad.salida+":");
    //trad.imprimir("call metojjpsmain_();");
}

//trad.save();
//console.log(lista[0].getTree());
dibujar.GenerarArbol(lista[0].getTree());

