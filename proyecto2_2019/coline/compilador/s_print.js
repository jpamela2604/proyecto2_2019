var nodoArbol =require("../nodoArbol.js");
const etiqueta= require("../etiqueta.js");
const tablaTipos= require("../tablaTipos.js");
const valores = require("../values_manager.js");
class s_print{
    constructor(valor,linea,columna,archivo,hash) 
    {
        this.valor=valor;
        this.linea=linea; 
        this.columna=columna;
        this.archivo=archivo;
        this.hash=hash;
    }
    getTree()
    {
        var raiz =new nodoArbol("print",this.hash);
        raiz.agregarHijo(this.valor.getTree());
        return raiz;
    }
    comprobacion(ts,er)
    {
        var va=this.valor.comprobacion(ts,er);
        if(va.tipo.indice==tablaTipos.error||va.tipo.indice==tablaTipos.booleano||
            va.tipo.indice==tablaTipos.entero||va.tipo.indice==tablaTipos.doble||
            va.tipo.indice==tablaTipos.caracter||va.tipo.indice==tablaTipos.cadena)
        {
            if(va.aux instanceof etiqueta)
            {
                var mitemp=valores.getTemporal();
                for(var i=0;i<va.aux.verdadero.length;i++)
                {
                    traductor.imprimir(va.aux.verdadero[i]+":");
                }
                traductor.imprimir(mitemp+"=1;");
                for(var i=0;i<va.aux.falso.length;i++)
                {
                    traductor.imprimir(va.aux.falso[i]+":");
                }
                traductor.imprimir(mitemp+"=0;");
                va.aux=mitemp;
            }
        }
        else
        {
            er.addError("Tipos incompatibles: No se puede imprimir un valor de tipo "+va.tipo.nombre
            ,this.linea,this.columna,this.archivo,
            "SEMANTICO");
        }
        return null;
    }
    traducir(ts,traductor)
    {
        traductor.comentario("sentencia imprimir");
        var va=this.valor.traducir(ts,traductor);
        if(va.tipo.indice==tablaTipos.booleano)
        {

        }else if(va.tipo.indice==tablaTipos.entero)
        {
            traductor.imprimir("print(\"%e\","+va.aux+");");
        }else if(va.tipo.indice==tablaTipos.doble)
        {
            traductor.imprimir("print(\"%d\","+va.aux+");");
        }else if(va.tipo.indice==tablaTipos.caracter)
        {
            traductor.imprimir("print(\"%c\","+va.aux+");");
        }else if(va.tipo.indice==tablaTipos.cadena)
        {

        }
        return null;
    }
}

module.exports = s_print;