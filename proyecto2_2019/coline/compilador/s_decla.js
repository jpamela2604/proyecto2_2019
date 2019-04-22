
var nodoArbol =require("../nodoArbol.js");
const vari = require("../../var");
const nodoTipo=require("../../mng_ts/nodoTipo.js");
const tablaTipos= require("../tablaTipos.js");
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
        this.tipo=null;
    }
    setTipo(tipo)
    {
        if(this.noDimensiones>0)
        {
            this.tipo=new nodoTipo(tablaTipos.arreglo,"",tipo);
            this.tipo.dimen=this.noDimensiones;
        }else
        {
            this.tipo=tipo;
            this.tipo.dimen=0;
        }
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
        if(this.valor!=null)
        {
            raiz.agregarHijo(this.valor.getTree());
        }
        return raiz;
    }
    
}

module.exports = s_decla;