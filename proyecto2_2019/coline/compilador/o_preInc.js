
var nodoArbol =require("../nodoArbol.js");
const valores = require("../values_manager.js");
const tablaTipos= require("../tablaTipos.js");
var simbolo = require("../../mng_ts/simbolo.js");
class o_preInc{
    constructor(accesos,linea,columna,archivo,hash) 
    {
        this.accesos=accesos;
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
        var raiz =new nodoArbol("Pre Incr",this.hash);
        raiz.agregarHijo(this.accesos.getTree());
        return raiz;
    }
    comprobacion(ts,er)
    {
        var respuesta=new simbolo(tablaTipos.tipo_error); 
        var a=this.accesos.comprobacion(ts,er);
        if(a.tipo.indice==tablaTipos.error)
        {

        }else if(a.tipo.indice==tablaTipos.entero||a.tipo.indice==tablaTipos.doble
            ||a.tipo.indice==tablaTipos.caracter)
        {
            return new simbolo(a.tipo);
        }else
        {
            er.addError("Tipos incompatibles: no se puede incrementar un valor de tipo "+a.tipo.getName(),this.linea,this.columna,this.archivo,
                            "SEMANTICO");
        }
        return respuesta;
    }
    traducir(ts,traductor)
    {
        var tx=valores.getTemporal();var ty=valores.getTemporal();
        traductor.comentario("pre incremento");
        var a=this.accesos.traducir(ts,traductor);
        traductor.imprimir(ty+"="+a.aux+"+1;");
        if(a.modificaStack)
        {
            traductor.imprimir("stack["+a.referencia+"]="+ty+";");
        }else
        {
            traductor.imprimir("heap["+a.referencia+"]="+ty+";");
        }
        return new simbolo(a.tipo,ty);
    }
}

module.exports = o_preInc;