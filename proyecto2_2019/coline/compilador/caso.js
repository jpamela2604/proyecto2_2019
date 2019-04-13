
const tablaTipos= require("../tablaTipos.js");
const etiqueta=require("../etiqueta.js");
const valores = require("../values_manager.js");
const vari = require("../../var");
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
        var cond=new nodoArbol("VALOR",this.hash);
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
                    er.addError("La expresion del caso debe ser tipo primitivo, no "+t.tipo.nombre,
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
    traducir(ts,traductor)
    {
        //traducir la condicion
        var der=this.valor.traducir(ts,traductor);
        var temporal=new etiqueta();
        //temporal.verdadero.push(valores.getEtiqueta());
        temporal.falso.push(valores.getEtiqueta());
        //viene con etiquetas
        if(this.principal.aux instanceof etiqueta)
        {
            var aux=valores.getEtiqueta();
            var mitemp=valores.getTemporal();
            for(var i=0;i<this.principal.aux.verdadero.length;i++)
            {
                traductor.imprimir_L(this.principal.aux.verdadero[i]+":");
            }
            traductor.imprimir(mitemp+"=1;");
            traductor.imprimir("goto "+aux+";");
            for(var i=0;i<this.principal.aux.falso.length;i++)
            {
                traductor.imprimir_L(this.principal.aux.falso[i]+":");
            }
            traductor.imprimir(mitemp+"=0;");
            traductor.imprimir_L(aux+":");
            this.principal.aux=mitemp;
        }
        if(der.aux instanceof etiqueta)
        {
            var aux=valores.getEtiqueta();
            var mitemp=valores.getTemporal();
            for(var i=0;i<der.aux.verdadero.length;i++)
            {
                traductor.imprimir_L(der.aux.verdadero[i]+":");
            }
            traductor.imprimir(mitemp+"=1;");
            traductor.imprimir("goto "+aux+";");
            for(var i=0;i<der.aux.falso.length;i++)
            {
                traductor.imprimir_L(der.aux.falso[i]+":");
            }
            traductor.imprimir(mitemp+"=0;");
            traductor.imprimir_L(aux+":");
            der.aux=mitemp;
        }
        traductor.imprimir("if ("+this.principal.aux+"!="+der.aux+")  goto "+temporal.falso[0]+";");
        //traductor.imprimir("goto "+temporal.falso[0]+";");
        //etiquetas verdaderas
        
        //sentencias
        ts.cambiarAmbito(false);
        for(var x=0;x<this.sentencias.length;x++)
        {
            this.sentencias[x].traducir(ts,traductor);
        }
        ts.regresarAmbito(false);
        //etiquetas falsas
        traductor.imprimir(temporal.falso[0]+":");
        
    }
}

module.exports = caso;