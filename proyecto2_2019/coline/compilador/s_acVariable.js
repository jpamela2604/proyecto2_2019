
var nodoArbol =require("../nodoArbol.js");
var simbolo = require("../../mng_ts/simbolo.js");
const tablaTipos= require("../tablaTipos.js");
const valores = require("../values_manager.js");
const identificador=require("../../mng_ts/identificador.js");
class s_acVariable{
    constructor(id,linea,columna,archivo,hash) 
    {
        this.id=id;
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
        var raiz =new nodoArbol(id,this.hash);
        
        return raiz;
    }
    comprobacion(ts,er)
    {
        var respuesta=new simbolo(tablaTipos.tipo_error);
        //tipo,aux,id,rol,posicion,ambito,dimensiones,visibilidad,modificador)
        var iden=new identificador(this.id,null);
        var simb=new simbolo(null,null,iden,tablaTipos.rol_variable);
        var r=ts.BuscarSimbolo(simb,this.linea,this.columna,this.archivo);
        if(r!=null)
        {
            return r;
        }

        return respuesta;
    }
    traducir(ts,traductor)
    {
        //tipo,aux,id,rol,posicion,ambito,dimensiones,visibilidad,modificador)
        var iden=new identificador(this.id,null);
        var simb=new simbolo(null,null,iden,tablaTipos.rol_variable);
        var r=ts.BuscarSimbolo(simb,this.linea,this.columna,this.archivo);
        //console.log(r);
        var tx=r.posicion;
        if(!(r.IsGlobal()))
        {
            var tx=valores.getTemporal();
            traductor.imprimir(tx+"=p+"+r.posicion+";");
        }
        if(this.IsExp)
        {
            var tw=valores.getTemporal();
            traductor.imprimir(tw+"=stack["+tx+"];");
            tx=tw;
        }
        return new simbolo(r.tipo,tx);
        
    }
}

module.exports = s_acVariable;