
var nodoArbol =require("../nodoArbol.js");
const tablaTipos= require("../tablaTipos.js");
var simbolo = require("../../mng_ts/simbolo.js");
const valores = require("../values_manager.js");
class oa_casteotoString{
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
        if(val.tipo.indice==tablaTipos.entero||val.tipo.indice==tablaTipos.cadena||
            val.tipo.indice==tablaTipos.doble|| val.tipo.indice==tablaTipos.caracter)
        {
            respuesta=new simbolo(tablaTipos.tipo_cadena,null);
        }else
        {
            er.addError("No se puede castear(toString) un "+val.tipo.nombre,this.linea,this.columna,this.archivo,
            "SEMANTICO");
        }
        return respuesta;
    }
    traducir(ts,traductor)
    {
        var val=this.valor.traducir(ts,traductor);
        if(val.tipo.indice==tablaTipos.entero||val.tipo.indice==tablaTipos.doble)
        {
            var no_decimales=val.tipo.indice==tablaTipos.entero?0:4;
            var tsim=valores.getTemporal();var tp1=valores.getTemporal();var tp2=valores.getTemporal();
            var r=valores.getTemporal();
            traductor.imprimir(tsim+"=p+"+ts.getTamActual()+";");
            traductor.imprimir(tp1+"="+tsim+"+1;");
            traductor.imprimir("stack["+tp1+"]="+val.aux+";");
            traductor.imprimir(tp2+"="+tsim+"+2;");
            traductor.imprimir("stack["+tp2+"]="+no_decimales+";");

            traductor.imprimir("p=p+"+ts.getTamActual()+";");
            traductor.imprimir("call ftoa();");
            traductor.imprimir(r+"=stack[p];");
            traductor.imprimir("p=p-"+ts.getTamActual()+";");
            val.aux=r;
        }else if(val.tipo.indice==tablaTipos.caracter)
        {
            var tw=valores.getTemporal();
            traductor.imprimir(tw+"=h;");
            traductor.imprimir("heap[h]="+val.aux+";");
            traductor.imprimir("h=h+1;");
            traductor.imprimir("heap[h]="+tablaTipos.fin_cadena+";");
            traductor.imprimir("h=h+1;");
            val.aux=tw;
        }
        return new simbolo(tablaTipos.tipo_cadena,val.aux);
    }
}

module.exports = oa_casteotoString;