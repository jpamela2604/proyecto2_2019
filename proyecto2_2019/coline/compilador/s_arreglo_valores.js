
var nodoArbol =require("../nodoArbol.js");
const tablaTipos= require("../tablaTipos.js");
const simbolo = require("../../mng_ts/simbolo.js");
class s_arreglo_valores{
    constructor(values,linea,columna,archivo,hash) 
    {
        this.values=values;
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
        var raiz =new nodoArbol("BREAK",this.hash);
        
        return raiz;
    }
    comprobacion(ts,er)
    {
        var r=this.values.comprobacion(ts,er);
        
        if(r.tipo.indice==tablaTipos.error&&(r.message!=undefined&&r.message!=null&&r.message!=""))
        {
            er.addError(r.message,this.linea,this.columna,this.archivo,
            "SEMANTICO");
            r.message="";
        }
        r.dimension=r.dimension+1;
        return r;
    }
    traducir(ts,traductor)
    {
        return this.values.traducir(ts,traductor);
    }
}

module.exports = s_arreglo_valores;