const valores = require("../values_manager.js");
var nodoArbol =require("../nodoArbol.js");
const tablaTipos= require("../tablaTipos.js");
var simbolo = require("../../mng_ts/simbolo.js");
class oa_negativo{
    constructor(op1,linea,columna,archivo,hash) 
    {
        this.op1=op1;
        this.linea=linea; 
        this.columna=columna;
        this.archivo=archivo;
        this.hash=hash;
    }
    getTree()
    {
        var raiz =new nodoArbol("-",this.hash);
        raiz.agregarHijo(this.op1.getTree());
        return raiz;
    }
    comprobacion(ts,er)
    {
        var respuesta=new simbolo(tablaTipos.tipo_error);   
        var o1=this.op1.comprobacion(ts,er);
        var ope=tablaTipos.valores[o1.tipo.indice][tablaTipos.entero];
        if(ope==tablaTipos.entero)
        {
            respuesta = new simbolo(tablaTipos.tipo_entero);   
        }else if(ope==tablaTipos.doble)
        {
            respuesta = new simbolo(tablaTipos.tipo_doble);   
        }else if(ope==tablaTipos.error)
        {
            er.addError("Tipos incompatibles: negativo(-) "+o1.tipo.nombre,this.linea,this.columna,this.archivo,
            "SEMANTICO");
        }
        return respuesta;
    }
    traducir(ts,traductor)
    {
        var o1=this.op1.traducir(ts,traductor);
        var ope=tablaTipos.suma[o1.tipo.indice][tablaTipos.entero];
        var temporal=valores.getTemporal();
        traductor.imprimir(temporal+"="+o1.aux+"*"+-1);
        if(ope==tablaTipos.entero)
        {            
            return  new simbolo(tablaTipos.tipo_entero,temporal);   
        }
        return  new simbolo(tablaTipos.tipo_doble,temporal);   
    }
}

module.exports = oa_negativo;