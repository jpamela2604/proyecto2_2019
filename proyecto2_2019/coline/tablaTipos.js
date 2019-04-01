const nodoTipo = require("../mng_ts/nodoTipo");
const booleano=0;
const entero=1;
const doble=2;
const caracter=3;
const cadena=4;
const error=5;
const error2=50;
const tipo_booleano = new nodoTipo(booleano,"bool");
const tipo_entero = new nodoTipo(entero,"int");
const tipo_doble = new nodoTipo(doble,"double");
const tipo_caracter = new nodoTipo(caracter,"char");
const tipo_cadena = new nodoTipo(cadena,"string");
const tipo_error = new nodoTipo(error,"error");
const all=51;
const igual_booleano=52;
const igual_cadena=53;

const suma=
[
    [error,error,error,error,cadena,error2],
    [error,entero,doble,entero,cadena,error2],
    [error,doble,doble,doble,cadena,error2],
    [error,entero,doble,entero,cadena,error2],
    [cadena,cadena,cadena,cadena,cadena,error2],
    [error2,error2,error2,error2,error2,error2]
];
//resta,multiplicacion,modulo,division tienen la misma tabla
const valores=
[
    [error,error,error,error,error,error2],
    [error,entero,doble,entero,error,error2],
    [error,doble,doble,doble,error,error2],
    [error,entero,doble,entero,error,error2],
    [error,error,error,error,error,error2],
    [error2,error2,error2,error2,error2,error2]
];

const potencia=
[
    [error,error,error,error,error,error2],
    [error,doble,doble,doble,error,error2],
    [error,doble,doble,doble,error,error2],
    [error,doble,doble,doble,error,error2],
    [error,error,error,error,error,error2],
    [error2,error2,error2,error2,error2,error2]
];

const relacional=
[
    [igual_booleano,error,error,error,error,error2],
    [error,all,all,all,error,error2],
    [error,all,all,all,error,error2],
    [error,all,all,all,error,error2],
    [error,error,error,error,igual_cadena,error2],
    [error2,error2,error2,error2,error2,error2]
];
module.exports.suma=suma;
module.exports.valores=valores;
module.exports.potencia=potencia;
module.exports.booleano=booleano;
module.exports.entero=entero;
module.exports.doble=doble;
module.exports.caracter=caracter;
module.exports.cadena=cadena;
module.exports.error=error;
module.exports.error2=error2;
module.exports.tipo_booleano=tipo_booleano;
module.exports.tipo_entero=tipo_entero;
module.exports.tipo_doble=tipo_doble;
module.exports.tipo_caracter=tipo_caracter;
module.exports.tipo_cadena=tipo_cadena;
module.exports.tipo_error=tipo_error;
module.exports.all=all;
module.exports.igual_booleano=igual_booleano;
module.exports.igual_cadena=igual_cadena;
module.exports.relacional=relacional;
//console.log("a "+suma[3][5]);