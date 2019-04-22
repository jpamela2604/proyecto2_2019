
var nodoArbol =require("../nodoArbol.js");
const simbolo = require("../../mng_ts/simbolo.js");
const tablaTipos= require("../tablaTipos.js");
const nodoDimension=require("./nodoDimension.js");
const valores = require("../values_manager.js");
class s_arreglo_hojas{
    constructor(valores,hash) 
    {
        this.valores=valores;
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
        //var respuesta=new simbolo(tablaTipos.tipo_error);
        var tipos=new Array();
        for(var i=0;i<this.valores.length;i++)
        {
            var r=this.valores[i].comprobacion(ts,er);
            
            if(r.tipo.indice==tablaTipos.error)
            {
                return new nodoDimension(tablaTipos.tipo_error,new Array(),"");
            }
            tipos.push(r.tipo);
        }
        if(this.valuaTipos(tipos))
        {
            var l=new Array();
            l.push(this.valores.length);
           
            return new nodoDimension(tipos[0],l,"");
        }else
        {
            return new nodoDimension(tablaTipos.tipo_error,new Array(),"Los valores del arreglo no son del mismo tipo");
        }
    }
    traducir(ts,traductor)
    {
        var tx=valores.getTemporal();
        traductor.imprimir(tx+"=h;");
        traductor.imprimir("heap[h]="+this.valores.length+";");
        traductor.imprimir("h=h+1;");
        for(var x=0;x<this.valores.length;x++)
        {
            var v=this.valores[x].traducir(ts,traductor);
            if(v.tipo.indice==tablaTipos.booleano)
            {
                etiquetaToTemp(v);
            }
            traductor.imprimir("heap[h]="+v.aux+";");
            traductor.imprimir("h=h+1;");
        }

        return tx;
    }
    valuaTipos(tipos)
    {
        var refe=tipos[tipos.length-1];
        for(var i=0;i<tipos.length-1;i++)
        {
            var otro=tipos[i];
            if(refe.nombre!=otro.nombre||
                (refe.indice==otro.indice&&refe.indice==tablaTipos.arreglo&&
                    refe.tipoArr.nombre!=otro.tipoArr.nombre))
            {
                return false;
            }
        }

        return true;
    }
}

module.exports = s_arreglo_hojas;