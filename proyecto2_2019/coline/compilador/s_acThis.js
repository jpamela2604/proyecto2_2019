
var nodoArbol =require("../nodoArbol.js");
var identificador=require("../../mng_ts/identificador.js");
var simbolo = require("../../mng_ts/simbolo.js");

const valores = require("../values_manager.js");
const tablaTipos= require("../tablaTipos.js");
class s_acThis{
    constructor(linea,columna,archivo,hash) 
    {
        this.linea=linea; 
        this.columna=columna;
        this.archivo=archivo;
        this.hash=hash;
        this.IsExp=false;
    }
    comprobacion_global(ts,er)
    {
        
    }
    traduccion_global(ts,traductor)
    {
        
    }
    getTree()
    {
       
    }
    comprobacion(ts,er)
    {
        //var aux=ts.head;
        //ts.head=null;
        var idena=new identificador("this",null);
        var simb=new simbolo(null,null,idena,tablaTipos.rol_variable);
        var ret=ts.BuscarSimbolo(simb,this.linea,this.columna,this.archivo);
        if(ret==null)
        {
            return new simbolo(tablaTipos.tipo_error);
        }
        var mm=new simbolo(ret.tipo);
        mm.vars=ret.vars;
        return mm;
    }
    traducir(ts,traductor)
    {
        //var aux=ts.head;
        //ts.head=null;
        var idena=new identificador("this",null);
        var simb=new simbolo(null,null,idena,tablaTipos.rol_variable);
        var ret=ts.BuscarSimbolo(simb,this.linea,this.columna,this.archivo);
       
        var tp=valores.getTemporal();var ty=valores.getTemporal();
        traductor.imprimir(tp+"=p+"+ret.posicion+";//posicion del this");
        traductor.imprimir(ty+"=stack["+tp+"];//obtengo posicion del this");
        //ts.head=aux;

        var mm=new simbolo(ret.tipo,ty);
        mm.referencia=tp;
        mm.vars=ret.vars;
        
        return mm;
    }
}

module.exports = s_acThis;