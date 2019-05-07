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

var raiz = exec(bnf);

err.adding();

raiz.comprobacion_global(tabla,err);
err.imprimir();

if(err.size()==0)
{
    raiz.comprobacion(tabla,err);
    err.imprimir();
}

if(err.size()==0)
{
    raiz.traduccion_global(tabla,trad);
    raiz.traducir(tabla,trad);   
    trad.imprimir(trad.in+":");
    trad.imprimir("call main_temporal();")
    trad.imprimir(trad.salida+":");
    //trad.imprimir("call metojjpsmain_();");
}


//trad.save();
//console.log(lista[0].getTree());
//dibujar.GenerarArbol(raiz.getTree());
/*
var arreglo=[[1,2],[3,4],[5,6]];

console.log(arreglo[2][0]);


var arreglo=[[[1,2,3,4],[5,6,7,8]],[[9,10,11,12],[13,14,15,16]],[[17,18,19,20],[21,22,23,24]]];
arreglo={{{10,20,30,40},{50,60}},{{90,100,110},{130,140,150,160}},{{170},{210,220,230,240,250}}};					

var arreglo=[[[1,2,3,4],[5,6,7,8]],[[9,10,11,12],[13,14,15,16]],[[17,18,19,20],[21,22,23,24]]];

console.log(arreglo[3][1][2]);
*/

