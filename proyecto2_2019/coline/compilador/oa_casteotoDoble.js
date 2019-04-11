
var nodoArbol =require("../nodoArbol.js");
const tablaTipos= require("../tablaTipos.js");
var simbolo = require("../../mng_ts/simbolo.js");
class oa_casteotoDouble{
    constructor(valor,linea,columna,archivo,hash) 
    {
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
        var raiz =new nodoArbol("BREAK",this.hash);
        
        return raiz;
    }
   comprobacion (ts,er)
    {
        var respuesta=new simbolo(tablaTipos.tipo_error); 
        var val=this.valor.comprobacion (ts,er);
        if(val.tipo.indice==tablaTipos.error)
        {
            return respuesta;
        }
        if(val.tipo.indice==tablaTipos.cadena||val.tipo.indice==tablaTipos.doble)
        {
            respuesta=new simbolo(tablaTipos.tipo_doble,null);
        }else
        {
            er.addError("No se puede castear(toDouble) un "+val.tipo.nombre,this.linea,this.columna,this.archivo,
            "SEMANTICO");
        }
        return respuesta;
    }
    traducir(ts,traductor)
    {
        var val=this.valor.traducir(ts,traductor);
        if(val.tipo.indice==tablaTipos.cadena)
        {

        }
        return new simbolo(tablaTipos.tipo_doble,val.aux);
    }
}

module.exports = oa_casteotoDouble;