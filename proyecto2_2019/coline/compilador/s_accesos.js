
const nodoArbol =require("../nodoArbol.js");
const tablaTipos= require("../tablaTipos.js");
const simbolo = require("../../mng_ts/simbolo.js");
class s_accesos{
    constructor(accesos,hash) 
    {
        this.accesos=accesos;
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
        var raiz =new nodoArbol("ACCESO",this.hash);
        for(var i=0;i<this.accesos.length;i++)
        {
            raiz.agregarHijo(this.accesos[i].getTree());
        }
        return raiz;
    }
    comprobacion(ts,er)
    {
        
        var respuesta=new simbolo(tablaTipos.tipo_error);
        for(var i=0;i<this.accesos.length;i++)
        {
            respuesta=this.accesos[i].comprobacion(ts,er);
        }
        return respuesta;
    }
    traducir(ts,traductor)
    {
        //console.log("pasa");
        var respuesta=null;
        //traductor.comentario("accesos");

        for(var i=0;i<this.accesos.length;i++)
        {
            this.accesos[i].IsExp=this.IsExp;
            respuesta=this.accesos[i].traducir(ts,traductor);
            
        }

        return respuesta;
    }
}

module.exports = s_accesos;