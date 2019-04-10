
var nodoArbol =require("../nodoArbol.js");
class s_decla{
    constructor(id,noDimensiones,valor,linea,columna,archivo,hash) 
    {
        this.id=id;
        this.noDimensiones=noDimensiones;
        this.valor=valor;
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
        var raiz =new nodoArbol("VAR",this.hash);
        var name=this.id;
        for(var i=0;i<this.noDimensiones;i++)
        {
            name=name+"[]";
        }
        vari.hash++; 
        var id=new nodoArbol(name,vari.hash);
        raiz.agregarHijo(id);
        if(valor!=null)
        {
            raiz.agregarHijo(this.valor.getTree());
        }
        return raiz;
    }
    
}

module.exports = s_decla;