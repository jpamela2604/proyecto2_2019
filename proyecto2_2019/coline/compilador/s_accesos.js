
const nodoArbol =require("../nodoArbol.js");
const tablaTipos= require("../tablaTipos.js");
const simbolo = require("../../mng_ts/simbolo.js");
const s_acSuper=require("./s_acSuper")
const s_llamadaSuper=require("./s_llamadaSuper")
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
        var aux=ts.head;
        ts.head=null;
        var respuesta=new simbolo(tablaTipos.tipo_error);
        if(this.accesos.length==1&&(this.accesos[0] instanceof s_acSuper))
        {
            er.addError("se esperaba punto",this.accesos[0].linea,this.accesos[0].columna,this.accesos[0].archivo,
            "SEMANTICO");
            return respuesta;
        }

        for(var i=0;i<this.accesos.length;i++)
        {
           /*
            if((this.accesos[i] instanceof s_llamadaSuper)&&i!=0)
            {
                er.addError("se esperaba punto",this.accesos[0].linea,this.accesos[0].columna,this.accesos[0].archivo,
            "SEMANTICO");
                respuesta= new simbolo(tablaTipos.tipo_error);
                break;
            }*/
            respuesta=this.accesos[i].comprobacion(ts,er);
            
            
            if(respuesta.tipo.indice==tablaTipos.error)
            {
                break;
            }
            
            ts.head=respuesta;
            if(i!=this.accesos.length-1&&(ts.head instanceof simbolo))
            {
                if(ts.head.tipo.indice==tablaTipos.booleano||
                    ts.head.tipo.indice==tablaTipos.entero||
                    ts.head.tipo.indice==tablaTipos.doble||
                    ts.head.tipo.indice==tablaTipos.caracter||
                    ts.head.tipo.indice==tablaTipos.vacio)
                {
                    er.addError("no se puede acceder a un miembro de tipo "+ts.head.tipo.nombre,this.accesos[0].linea,this.accesos[0].columna,this.accesos[0].archivo,
            "SEMANTICO");
                    respuesta= new simbolo(tablaTipos.tipo_error);
                    break;
                }
            }
        }
        ts.head=aux;
        return respuesta;
    }
    traducir(ts,traductor)
    {
        //console.log("pasa");
        var respuesta=null;
        //traductor.comentario("accesos");
        var aux=ts.head;
        ts.head=null;
        for(var i=0;i<this.accesos.length;i++)
        {
            this.accesos[i].IsExp=this.IsExp;
            respuesta=this.accesos[i].traducir(ts,traductor);
            ts.head=respuesta;
        }
        ts.head=aux;
        return respuesta;
    }
}

module.exports = s_accesos;