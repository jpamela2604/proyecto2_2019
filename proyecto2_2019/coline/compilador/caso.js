
const tablaTipos= require("../tablaTipos.js");
const etiqueta=require("../etiqueta.js");
const valores = require("../values_manager.js");
const vari = require("../../var");
var nodoArbol =require("../nodoArbol.js");
class caso{
    constructor(valor,sentencias,linea,columna,archivo,hash) 
    {
        this.valor=valor;
        this.principal=null;
        this.sentencias=sentencias;
        this.linea=linea; 
        this.columna=columna;
        this.archivo=archivo;
        this.hash=hash;
        this.eti="";
    }
    comprobacion_global(ts,er)
    {

    }
    traduccion_global(ts,traductor)
    {
        
    }
    getTree()
    {
        var raiz =new nodoArbol("CASO",this.hash);
        vari.hash++;
        var cond=new nodoArbol("VALOR",vari.hash);
        cond.agregarHijo(this.valor.getTree());
        vari.hash++;
        var sent =new nodoArbol("LSENT",vari.hash);
        for(var i=0;i<this.sentencias.length;i++)
        {
            sent.agregarHijo(this.sentencias[i].getTree());
        }
        raiz.agregarHijo(cond);
        raiz.agregarHijo(sent);
        return raiz;
    }
    comprobacion(ts,er)
    {        
        if(this.principal!=null)
        {
            var v=this.valor.comprobacion(ts,er);
            if(v.tipo.indice!=tablaTipos.error&&this.principal.tipo.indice!=tablaTipos.error)
            {
                if(v.tipo.indice>3)//no es un valor primitivo
                {
                    er.addError("La expresion del caso debe ser tipo primitivo, no "+v.tipo.nombre,
                    this.linea,this.columna,this.archivo,
                "SEMANTICO");   
                }else 
                {
                    if(!(v.tipo.indice==this.principal.tipo.indice
                        &&v.tipo.nombre==this.principal.tipo.nombre))
                    {
                        er.addError("Tipos incompatibles switch entre valor "+this.principal.tipo.nombre+
                        " y "+v.tipo.nombre,
                            this.linea,this.columna,this.archivo,
                        "SEMANTICO"); 
                    }
                }
            }
            ts.cambiarAmbito(false);
            for(var x=0;x<this.sentencias.length;x++)
            {
                this.sentencias[x].comprobacion(ts,er);
            }
            ts.regresarAmbito(false);
        }
    }

    tradCond(ts,traductor)
    {
        this.eti=valores.getEtiqueta();
        //traducir la condicion
        var der=this.valor.traducir(ts,traductor);
        tablaTipos.etiquetaToTemp(der,traductor);
        traductor.imprimir("if ("+this.principal.aux+"=="+der.aux+")  goto "+this.eti+";");
    }
    traducir(ts,traductor)
    {        
        traductor.imprimir_L(this.eti+":");
        //sentencias
        ts.cambiarAmbito(false);
        for(var x=0;x<this.sentencias.length;x++)
        {
            this.sentencias[x].traducir(ts,traductor);
        }
        ts.regresarAmbito(false);
        
    }
}

module.exports = caso;