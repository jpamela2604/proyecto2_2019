
var nodoArbol =require("../nodoArbol.js");
const vari=require("../../var.js");
class archivo{
    constructor(importaciones,clases,linea,columna,archivo,hash) 
    {
        this.importaciones=importaciones;
        this.clases=clases;
        this.linea=linea; 
        this.columna=columna;
        this.archivo=archivo;
        this.hash=hash;
    }
    comprobacion_global(ts,er)
    {
        for(var x=0;x<this.clases.length;x++)
        {
            this.clases[x].comprobacion_global(ts,er);
        }
    }
    traduccion_global(ts,traductor)
    {
        for(var x=0;x<this.clases.length;x++)
        {
            this.clases[x].traduccion_global(ts,traductor);
        }
    }
    getTree()
    {
        var raiz =new nodoArbol("ARCHIVO",this.hash);
        if(this.importaciones.length>0)
        {vari.hash++;
        var imports=new nodoArbol("IMPORTS", vari.hash);     
        
        for(var x=0;x<this.importaciones.length;x++)
        {
            imports.agregarHijo(this.importaciones[x].getTree());
        }
        raiz.agregarHijo(imports);
        }
        if(this.clases.length>0)
        {
        vari.hash++;
        var clases=new nodoArbol("CLASES", vari.hash); 
        for(var x=0;x<this.clases.length;x++)
        {
            clases.agregarHijo(this.clases[x].getTree());
        }
        
        raiz.agregarHijo(clases);
        }
        return raiz;
    }
    comprobacion(ts,er)
    {
        for(var x=0;x<this.clases.length;x++)
        {
            this.clases[x].comprobacion(ts,er);
        }
    }
    traducir(ts,traductor)
    {
        for(var x=0;x<this.clases.length;x++)
        {
            this.clases[x].traducir(ts,traductor);
        }
    }
}

module.exports = archivo;