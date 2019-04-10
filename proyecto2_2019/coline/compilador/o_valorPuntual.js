var nodoArbol =require("../nodoArbol.js");
var simbolo = require("../../mng_ts/simbolo.js");
const tablaTipos= require("../tablaTipos.js");
const valores = require("../values_manager.js");
class o_valorPuntual{
    constructor(tipo,valor,linea,columna,archivo,hash) 
    {
        this.tipo=tipo;
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
        if(tipo==null)
        {
            return this.valor.getTree();
        }
        return new nodoArbol(this.valor,this.hash);
    }
    comprobacion(ts,er)
    {   if(this.tipo!=null)
        {
            return new simbolo(this.tipo);
        }else
        {
            this.valor.IsExp=true;
            var r=this.valor.comprobacion(ts,er);
           // console.log(r);
            return r;
        }
    }
    traducir(ts,traductor)
    {
        if(this.tipo!=null)
        {
            if(this.tipo.indice==tablaTipos.cadena)
            {
                var aux=valores.getTemporal();
                traductor.imprimir(aux+"=h;")
                for(var x=0;x<this.valor.length;x++)
                {
                    traductor.imprimir("heap[h]="+this.valor.charCodeAt(x)+";");
                    traductor.imprimir("h=h+1;");
                }
                traductor.imprimir("heap[h]="+tablaTipos.fin_cadena+";");
                traductor.imprimir("h=h+1;");

                return new simbolo(this.tipo,aux);
            }
        }else
        {
            return this.valor.traducir(ts,traductor);
            
        }
        return new simbolo(this.tipo,this.valor);
    }
}

module.exports = o_valorPuntual;