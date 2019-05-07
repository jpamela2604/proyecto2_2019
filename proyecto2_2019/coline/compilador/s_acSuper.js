
var nodoArbol =require("../nodoArbol.js");
var simbolo = require("../../mng_ts/simbolo.js");
var tablaTipos=require("../tablaTipos")
var identificador=require("../../mng_ts/identificador.js");
const valores = require("../values_manager.js");
class s_acSuper{
    constructor(linea,columna,archivo,hash) 
    {
        this.linea=linea; 
        this.columna=columna;
        this.archivo=archivo;
        this.hash=hash;
        this.IsExp=false;
        this.r=null;
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
        if(ts.head!=null)
        {            
            er.addError("no existe variable super",this.linea,this.columna,this.archivo,
            "SEMANTICO");
            return new simbolo(tablaTipos.tipo_error);
        }
        var idena=new identificador("this",null);
        var simb=new simbolo(null,null,idena,tablaTipos.rol_variable);
        var ret=ts.BuscarSimbolo(simb,this.linea,this.columna,this.archivo);
        this.r=new simbolo(ret.tipo);
        this.r.vars=ts.super;
        return this.r;
    }
    traducir(ts,traductor)
    {
        var idena=new identificador("this",null);
        var simb=new simbolo(null,null,idena,tablaTipos.rol_variable);
        var ret=ts.BuscarSimbolo(simb,this.linea,this.columna,this.archivo);
        if(ret==null)
        {
            return new simbolo(tablaTipos.tipo_error);
        }
        var tp=valores.getTemporal();var ty=valores.getTemporal();
        traductor.imprimir(tp+"=p+"+ret.posicion+";//posicion del this");
        traductor.imprimir(ty+"=stack["+tp+"];//obtengo posicion del this");
        //ts.head=aux;
        this.r.aux=ty;
        this.r.referencia=tp;
        
        return this.r;   
    }
}

module.exports = s_acSuper;