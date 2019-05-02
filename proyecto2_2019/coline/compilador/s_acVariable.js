
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
        var raiz =new nodoArbol(this.id,this.hash);
        
        return raiz;
    }
    comprobacion(ts,er)
    {
        var respuesta=new simbolo(tablaTipos.tipo_error);
        //tipo,aux,id,rol,p osicion,ambito,dimensiones,visibilidad,modificador)
        var iden=new identificador(this.id,null);
        var simb=new simbolo(null,null,iden,tablaTipos.rol_variable);
        var r=ts.BuscarSimbolo(simb,this.linea,this.columna,this.archivo);
        //console.log(r);
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
        
        
        var tx=r.posicion;
        var tw="";
        var bandera=true;
        if((r.IsGlobal())) 
        {       
            var tp=valores.getTemporal();var ty=valores.getTemporal();tx=valores.getTemporal();
            if(ts.head==null)
            {
                traductor.imprimir(tp+"=p+1;//posicion del this");
                traductor.imprimir(ty+"=stack["+tp+"];//obtengo posicion del this");
            }else
            {
                ty=ts.head.aux;var tp=valores.getTemporal();
                traductor.imprimir(traductor.l+"="+this.linea+";");
                traductor.imprimir(traductor.c+"="+this.columna+";");
                /*traductor.imprimir(tp+"=heap["+ty+"];");
                traductor.imprimir("if("+tp+"=="+tablaTipos.valor_nulo+") goto "+"nullex"+";");*/
               // traductor.imprimir(tp+"=heap["+ty+"];");
                traductor.imprimir("if("+ty +"=="+tablaTipos.valor_nulo+") goto "+"nullex"+";");

            }
            traductor.imprimir(tx+"="+ty+"+"+r.posicion+";//ref");
            bandera=false;
        }else
        {
            tx=valores.getTemporal();
            traductor.imprimir(tx+"=p+"+r.posicion+";//ref");
        }
            tw=valores.getTemporal();
            if(bandera)
            {
                traductor.imprimir(tw+"=stack["+tx+"];//valor");
            }else
            {
                traductor.imprimir(tw+"=heap["+tx+"];//valor");
            }
            
        
        var retorno=new simbolo(r.tipo,tw);
        retorno.referencia=tx;
        retorno.vars=r.vars;
        retorno.modificaStack=bandera;
        return retorno
        
    }
}

module.exports = s_acVariable;