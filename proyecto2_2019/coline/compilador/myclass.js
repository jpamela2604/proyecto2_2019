
var nodoArbol =require("../nodoArbol.js");
const vari=require("../../var.js");
class myclass{
    constructor(mods,id,extiende,sentencias,linea,columna,archivo,hash) 
    {
        this.mods=mods;
        this.id=id;
        this.extiende=extiende;
        this.sentencias=sentencias;
        this.linea=linea; 
        this.columna=columna;
        this.archivo=archivo;
        this.hash=hash;
    }
    comprobacion_global(ts,er)
    {
        
        for(var x=0;x<this.sentencias.length;x++)
        {
            this.sentencias[x].comprobacion_global(ts,er);
        }
    }
    traduccion_global(ts,traductor)
    {
        for(var x=0;x<this.sentencias.length;x++)
        {
            this.sentencias[x].traduccion_global(ts,traductor);
        }
    }
    getTree()
    {
        var raiz =new nodoArbol("CLASS",this.hash);
        vari.hash++;
        var myid=new nodoArbol(this.id,vari.hash);        
        raiz.agregarHijo(myid);
        if(this.extiende!=null)
        {
            vari.hash++;
            var ex=new nodoArbol(this.extiende,vari.hash);
            raiz.agregarHijo(ex);
        }
        vari.hash++;
        var sent =new nodoArbol("LSENT",vari.hash);
        for(var i=0;i<this.sentencias.length;i++)
        {
            sent.agregarHijo(this.sentencias[i].getTree());
        }
        raiz.agregarHijo(sent);
        return raiz;
    }
    comprobacion(ts,er)
    {
        for(var x=0;x<this.sentencias.length;x++)
        {
            this.sentencias[x].comprobacion(ts,er);
        }
    }
    traducir(ts,traductor)
    {
        for(var x=0;x<this.sentencias.length;x++)
        {
            this.sentencias[x].traducir(ts,traductor);
        }
    }
}

module.exports = myclass;