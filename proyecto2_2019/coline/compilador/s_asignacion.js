
var nodoArbol =require("../nodoArbol.js");
var simbolo = require("../../mng_ts/simbolo.js");
const tablaTipos= require("../tablaTipos.js");
const valores = require("../values_manager.js");
class s_asignacion{
    constructor(accesos,valor,linea,columna,archivo,hash) 
    {
        this.accesos=accesos;
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
        var raiz =new nodoArbol("ASIGNACION",this.hash);
        raiz.agregarHijo(this.accesos.getTree());
        raiz.agregarHijo(this.valor.getTree());
        return raiz;
    }
    comprobacion(ts,er)
    {
        //console.log(this.accesos);
        
        var a=this.accesos.comprobacion(ts,er);
        var b=this.valor.comprobacion(ts,er);
        if(a.tipo.indice!=tablaTipos.error&&b.tipo.indice!=tablaTipos.error)
        {
            if(!(tablaTipos.AsignValid(a.tipo,b.tipo)))
            {
                er.addError("Tipos incompatibles: asignacion "+a.tipo.nombre+" = "+b.tipo.nombre,this.linea,this.columna,this.archivo,
                            "SEMANTICO");
            }
        }
    }
    traducir(ts,traductor)
    {
        var a=this.accesos.traducir(ts,traductor);
        var b=this.valor.traducir(ts,traductor);
        if(b.tipo.indice==tablaTipos.booleano)
        {
            tablaTipos.etiquetaToTemp(b,traductor);
        }
        traductor.imprimir("stack["+a.aux+"]="+b.aux+";");
        
    }
}

module.exports = s_asignacion;