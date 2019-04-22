
var nodoArbol =require("../nodoArbol.js");
const simbolo = require("../../mng_ts/simbolo.js");
const tablaTipos= require("../tablaTipos.js");
const nodoDimension=require("./nodoDimension.js");
const valores = require("../values_manager.js");
class s_arreglo_lvals{
    constructor(values,hash) 
    {
        this.values=values;
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
        if(this.values.length==1)
        {
            return values[0].comprobacion(ts,er);
        }    
        var refe=this.values[this.values.length-1].comprobacion(ts,er);
        for(var x=0;x<this.values.length;x++)
        {
             var otro=this.values[x].comprobacion(ts,er);
             if(!refe.IsEqual(otro))
             {
                 otro.tipo=tablaTipos.tipo_error;
                 return otro;
             }
        }
        refe.tam.push(this.values.length);
        return refe;
    }
    traducir(ts,traductor)
    {
        var tx=valores.getTemporal();
        traductor.imprimir(tx+"=h;");
        traductor.imprimir("heap[h]="+this.values.length+";");
        traductor.imprimir("h=h+1;");
        var ty=valores.getTemporal();
        traductor.imprimir(ty+"=h;");
        for(var x=0;x<this.values.length;x++)
        {
            traductor.imprimir("h=h+1;");
        }
        var tw=valores.getTemporal();
        for(var x=0;x<this.values.length;x++)
        {           
            var v=this.values[x].traducir(ts,traductor);
            traductor.imprimir("heap["+ty+"]="+v+";");
            traductor.imprimir(ty+"="+ty+"+1;");
        }
        return tx;
    }
}

module.exports = s_arreglo_lvals;