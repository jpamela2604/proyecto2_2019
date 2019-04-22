
var nodoArbol =require("../nodoArbol.js");
const tablaTipos= require("../tablaTipos.js");
var simbolo = require("../../mng_ts/simbolo.js");
const valores = require("../values_manager.js");
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
            er.addError("No se puede castear(toDouble) un "+val.tipo.getName(),this.linea,this.columna,this.archivo,
            "SEMANTICO");
        }
        return respuesta;
    }
    traducir(ts,traductor)
    {
        var val=this.valor.traducir(ts,traductor);
        if(val.tipo.indice==tablaTipos.cadena)
        {
            var tsim=valores.getTemporal();var tp1=valores.getTemporal();var tp2=valores.getTemporal();
            var tp3=valores.getTemporal();
            var r=valores.getTemporal();
            traductor.imprimir(tsim+"=p+"+ts.getTamActual()+";");
            traductor.imprimir(tp1+"="+tsim+"+1;");
            traductor.imprimir("stack["+tp1+"]="+val.aux+";");
            traductor.imprimir(tp2+"="+tsim+"+2;");
            traductor.imprimir("stack["+tp2+"]="+this.linea+";");
            traductor.imprimir(tp3+"="+tsim+"+3;");
            traductor.imprimir("stack["+tp3+"]="+this.columna+";");
            traductor.imprimir("p=p+"+ts.getTamActual()+";");
            traductor.imprimir("call  StringToNum();");
            traductor.imprimir(r+"=stack[p];");
            traductor.imprimir("p=p-"+ts.getTamActual()+";");
            val.aux=r;
        }
        return new simbolo(tablaTipos.tipo_doble,val.aux);
    }
}

module.exports = oa_casteotoDouble;