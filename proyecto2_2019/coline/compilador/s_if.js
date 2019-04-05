const valores = require("../values_manager.js");
var nodoArbol =require("../nodoArbol.js");
const tablaTipos= require("../tablaTipos.js");
var simbolo = require("../../mng_ts/simbolo.js");
const vari=require("../../var.js");
class s_if{
    constructor(bloques,hash) 
    {
        this.bloques=bloques;
        this.hash=hash;
    }
    getTree()
    {
        var raiz =new nodoArbol("IF",this.hash);
        for(var i=0;i<this.bloques.length;i++)
        {
            raiz.agregarHijo(this.bloques[i].getTree());
        }
        
        return raiz;
    }
    comprobacion(ts,er)
    {
        var respuesta=null;
        for(var i=0;i<this.bloques.length;i++)
        {
            respuesta=this.bloques[i].comprobacion(ts,er);
        }
        return respuesta;
    }
    traducir(ts,traductor)
    {
        traductor.comentario("SENTENCIA IF");
        var respuesta=null;
        var salida=valores.getEtiqueta();
        for(var i=0;i<this.bloques.length;i++)
        {
            var bl=this.bloques[i];
            bl.salida=salida;
            respuesta=bl.traducir(ts,traductor);
            
        }
        traductor.imprimir_L(salida+":");
        return respuesta;
    }
}

module.exports = s_if;