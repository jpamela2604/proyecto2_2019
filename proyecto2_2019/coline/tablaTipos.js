const etiqueta= require("./etiqueta.js");
const valoresm = require("./values_manager.js");
const nodoTipo = require("../mng_ts/nodoTipo");
const booleano=0;
const entero=1;
const doble=2;
const caracter=3;
const cadena=4;
const error=5;
const vacio=6;
const objeto=7;
const nulo=8;
const arreglo=9;
const error2=50;
const allow=51;
const tipo_booleano = new nodoTipo(booleano,"boolean");
const tipo_entero = new nodoTipo(entero,"int");
const tipo_doble = new nodoTipo(doble,"double");
const tipo_caracter = new nodoTipo(caracter,"char");
const tipo_cadena = new nodoTipo(cadena,"String");
const tipo_error = new nodoTipo(error,"error");
const tipo_vacio = new nodoTipo(vacio,"void");
const tipo_nulo = new nodoTipo(nulo,"null");
const all=51;
const igual_booleano=52;
const igual_cadena=53;
const igual_dif=54;
const fin_cadena=557886;
const valor_nulo=557886;
const caracter_nulo=00;

const publico=200;
const protegido=201;
const privado=202;
const estatico=203;
const ffinal=204;
const abstracto=205;

function getMod(m)
{
    if(m==publico)
    {
        return "PUBLIC";
    }else if(m==protegido)
    {
        return "PROTEGIDO";
    }else if(m==privado)
    {
        return "PRIVATE";
    }else if(m==estatico)
    {
        return "STATIC";
    }else if(m==ffinal)
    {
        return "FINAL";
    }else
    {
        return "ABSTRACT"
    }
}

//rol
const rol_variable=300;
const rol_metodo=301;
const rol_constructor=302;
const rol_main=303;
const rol_this=304;

function getTipoObjeto(nombre)
{
    return new nodoTipo(objeto,nombre);
}



const suma=
[
    /*0 */[error,error,error,error,cadena,error2,error,error,error,error],
    /*1 */[error,entero,doble,entero,cadena,error2,error,error,error,error],
    /*2 */[error,doble,doble,doble,cadena,error2,error,error,error,error],
    /*3 */[error,entero,doble,entero,cadena,error2,error,error,error,error],
    /*4 */[cadena,cadena,cadena,cadena,cadena,error2,error,error,error,error],
    /*5 */[error2,error2,error2,error2,error2,error2,error2,error2,error2,error2],
    /*6 */[error,error,error,error,error,error2,error,error,error,error],
    /*7 */[error,error,error,error,error,error2,error,error,error,error],
    /*8 */[error,error,error,error,error,error2,error,error,error,error],
    /*9 */[error,error,error,error,error,error2,error,error,error,error],
    /*10*/[error,error,error,error,error,error2,error,error,error,error]
];
//resta,multiplicacion,modulo,division tienen la misma tabla
const valores=
[
          [error,error,error,error,error,error2,error,error,error,error],
          [error,entero,doble,entero,error,error2,error,error,error,error],
          [error,doble,doble,doble,error,error2,error,error,error,error],
          [error,entero,doble,entero,error,error2,error,error,error,error],
          [error,error,error,error,error,error2,error,error,error,error],
    /*5 */[error2,error2,error2,error2,error2,error2,error2,error2,error2,error2],
    /*6 */[error,error,error,error,error,error2,error,error,error,error],
    /*7 */[error,error,error,error,error,error2,error,error,error,error],
    /*8 */[error,error,error,error,error,error2,error,error,error,error],
    /*9 */[error,error,error,error,error,error2,error,error,error,error],
    /*10*/[error,error,error,error,error,error2,error,error,error,error]
];

const potencia=
[
        [error,error,error,error,error,error2,error,error,error,error],
        [error,doble,doble,doble,error,error2,error,error,error,error],
        [error,doble,doble,doble,error,error2,error,error,error,error],
        [error,doble,doble,doble,error,error2,error,error,error,error],
        [error,error,error,error,error,error2,error,error,error,error],
/*5 */  [error2,error2,error2,error2,error2,error2,error2,error2,error2,error2],
 /*6 */[error,error,error,error,error,error2,error,error,error,error],
    /*7 */[error,error,error,error,error,error2,error,error,error,error],
    /*8 */[error,error,error,error,error,error2,error,error,error,error],
    /*9 */[error,error,error,error,error,error2,error,error,error,error],
    /*10*/[error,error,error,error,error,error2,error,error,error,error]
];

const relacional=
[
            [igual_booleano,error,error,error,error,error2,error,error,error,error],
            [error,all,all,all,error,error2,error,error,error,error],
            [error,all,all,all,error,error2,error,error,error,error],
            [error,all,all,all,error,error2,error,error,error,error],
            [error,error,error,error,igual_cadena,error2,error,error,igual_dif,error],
    /*5 */  [error2,error2,error2,error2,error2,error2,error2,error2,error2,error2],
    /*6 */[error,error,error,error,error,error2,error,error,error,error],
    /*7 */[error,error,error,error,error,error2,error,igual_dif,igual_dif,error],
    /*8 */[error,error,error,error,igual_dif,error2,error,igual_dif,igual_dif,igual_dif],
      /*9 */[error,error,error,error,error,error2,error,error,igual_dif,igual_dif],
];

const casteo=
[
            [allow,error,error,error,error,error2],
            [error,allow,error,allow,error,error2],
            [error,allow,allow,allow,error,error2],
            [error,error,error,allow,error,error2],
            [error,error,error,error,allow,error2],
    /*5 */  [error2,error2,error2,error2,error2,error2]
];

function AsignValid(tipo1,tipo2)
{
    var bandera=true;
    if((tipo1.indice==cadena||tipo1.indice==objeto||tipo1.indice==arreglo)&&tipo2.indice==nulo)
    {
        return true;
    }
    else if(tipo1.indice==tipo2.indice&&tipo1.indice==arreglo)
    {
        return AsignValid(tipo1.tipoArr,tipo2.tipoArr)&&tipo1.dimen==tipo2.dimen;
    }
    else if(tipo1.indice==objeto&&tipo1.indice==tipo2.indice)
    {
        if(tipo1.nombre==tipo2.nombre)
        {
            return true;
        }
        return false;
    }else if(tipo1.indice>6||tipo2.indice>6)
    {
        bandera=false;
    }else
    {
        
        var op=casteo[tipo1.indice][tipo2.indice];
        if(op==error)
        {
            bandera=false;
        }
    } 
    return bandera;
}
function etiquetaToTemp(sim,traductor)
{
    if(sim.aux instanceof etiqueta)
    {
        var tw=valoresm.getTemporal();
        for(var i=0;i<sim.aux.verdadero.length;i++)
        {
            traductor.imprimir_L(sim.aux.verdadero[i]+":");
        }
        var salida=valoresm.getEtiqueta();
        traductor.imprimir(tw+"=1;");
        traductor.imprimir("goto "+salida+";");
        for(var i=0;i<sim.aux.falso.length;i++)
        {
            traductor.imprimir_L(sim.aux.falso[i]+":");
        }
        traductor.imprimir(tw+"=0;");
        traductor.imprimir_L(salida+":");
        sim.aux=tw;
    }
}
module.exports.suma=suma;
module.exports.valores=valores;
module.exports.potencia=potencia;
module.exports.booleano=booleano;
module.exports.entero=entero;
module.exports.doble=doble;
module.exports.caracter=caracter;
module.exports.cadena=cadena;
module.exports.error=error;
module.exports.vacio=vacio;
module.exports.error2=error2;
module.exports.tipo_booleano=tipo_booleano;
module.exports.tipo_entero=tipo_entero;
module.exports.tipo_doble=tipo_doble;
module.exports.tipo_caracter=tipo_caracter;
module.exports.tipo_cadena=tipo_cadena;
module.exports.tipo_error=tipo_error;
module.exports.tipo_vacio=tipo_vacio;
module.exports.tipo_nulo=tipo_nulo;
module.exports.all=all;
module.exports.igual_booleano=igual_booleano;
module.exports.igual_cadena=igual_cadena;
module.exports.igual_dif=igual_dif;
module.exports.relacional=relacional;
module.exports.fin_cadena=fin_cadena;
module.exports.valor_nulo=valor_nulo;
module.exports.publico=publico;
module.exports.protegido=protegido;
module.exports.privado=privado;
module.exports.estatico=estatico;
module.exports.ffinal=ffinal;
module.exports.abstracto=abstracto;
module.exports.objeto=objeto;
module.exports.getTipoObjeto=getTipoObjeto;
module.exports.rol_variable=rol_variable;
module.exports.rol_metodo=rol_metodo;
module.exports.rol_constructor=rol_constructor;
module.exports.rol_main=rol_main;
module.exports.rol_this=rol_this;
module.exports.caracter_nulo=caracter_nulo;
module.exports.allow=allow;
module.exports.casteo=casteo;
module.exports.AsignValid=AsignValid;
module.exports.etiquetaToTemp=etiquetaToTemp;
module.exports.getMod=getMod;
module.exports.nulo=nulo;
module.exports.arreglo=arreglo;
//console.log("a "+suma[3][5]);