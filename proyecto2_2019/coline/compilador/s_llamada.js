
var nodoArbol =require("../nodoArbol.js");
const tablaTipos= require("../tablaTipos.js");
var simbolo = require("../../mng_ts/simbolo.js");
const parametro = require("../../mng_ts/parametro.js");
const valores = require("../values_manager.js");
var identificador=require("../../mng_ts/identificador.js");
const vari = require("../../var"); 
class s_llamada{
    constructor(id,params,linea,columna,archivo,hash) 
    {
        this.id=id;
        this.params=params;
        this.linea=linea; 
        this.columna=columna;
        this.archivo=archivo;
        this.hash=hash;
        this.sim=null;
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
        var raiz =new nodoArbol("LLAMADA",this.hash);
        vari.hash++;
        var myid=new nodoArbol(this.id,vari.hash);
        raiz.agregarHijo(myid);
        vari.hash++;
        var mypar=new nodoArbol("PARAMETROS",vari.hash);
        
        for(var w=0;w<this.params.length;w++)
        {            
            mypar.agregarHijo(this.params[w].getTree());
        }
        raiz.agregarHijo(mypar);
        return raiz;
    }
    comprobacion(ts,er)
    {
        
        var respuesta=new simbolo(tablaTipos.tipo_error);
        //buscar que si exista el metodo
        var misparams=new Array();
        
        for(var i=0;i<this.params.length;i++)
        {
            var ti=this.params[i].comprobacion(ts,er);
            if(ti.tipo.indice==tablaTipos.error)
            {
                return respuesta;
            }else if(ti.tipo.indice==tablaTipos.vacio)
            {
                er.addError("Se invoco un metodo vacio",this.linea,this.columna,this.archivo,
                "SEMANTICO");
                return respuesta;
            }else
            {
                //tipo,nombre,valor,isFinal,noDimensiones,linea,columna,archivo,hash
                misparams.push(new parametro(ti.tipo));
            }
        }
        this.iden=new identificador(this.id,misparams);
        var simb=new simbolo(null,null,this.iden,tablaTipos.rol_metodo);
        var r=ts.BuscarSimbolo(simb,this.linea,this.columna,this.archivo);
        
        if(r!=null)
        {
            this.sim=r;
            this.sim.vars=r.vars;
           
            return r;
        }
        return respuesta;

    }
    traducir(ts,traductor)
    {
        traductor.comentario("SENTENCIA LLAMADA");
       
        // guardo los temporales en la pila;
        var lista=new Array();        
        var listanueva=valores.getLista();
        for(var n=0;n<listanueva.length;n++)
        {
            lista.push(listanueva[n]);
        }
        //console.log(lista);
        var pacon=valores.getTemporal();
        var contador=ts.getPosicion(false);
        for(var y=0;y<lista.length;y++)
        {
            traductor.imprimir(pacon+"=p+"+ts.getPosicion(false)+";");
            traductor.imprimir("stack["+pacon+"]="+lista[y]+";//guardo temporal")
            ts.AumentarPos(false);
        }
        //cambio simulado
        var tsim="";
        var tactual=ts.getTamActual()-1;

        ts.posicion++;
        tsim=valores.getTemporal();
        traductor.imprimir(tsim+"=p+"+tactual+";//cambio simulado");
        // envio el this o el apuntador q se necesita
        ts.posicion++;
        var w=valores.getTemporal();
        traductor.imprimir(w+"="+tsim+"+"+(1)+";");
        var a="";
        if(ts.head==null)
        {
            //obtengo el this
            var aux=ts.head;
            ts.head=null;
            var idena=new identificador("this",null);
            var simb=new simbolo(null,null,idena,tablaTipos.rol_variable);
            var ret=ts.BuscarSimbolo(simb,this.linea,this.columna,this.archivo);
            var tp=valores.getTemporal();var ty=valores.getTemporal();
            traductor.imprimir(tp+"=p+"+ret.posicion+";//posicion del this");
            traductor.imprimir(ty+"=stack["+tp+"];//obtengo posicion del this");
            ts.head=aux;
            a=ty;
        }else
        {
            a=ts.head.aux;var tp=valores.getTemporal();
            traductor.imprimir(traductor.l+"="+this.linea+";");
            traductor.imprimir(traductor.c+"="+this.columna+";");
            /*traductor.imprimir(tp+"=heap["+a+"];");
            traductor.imprimir("if("+tp+"=="+tablaTipos.valor_nulo+") goto "+"nullex"+";");*/
            //traductor.imprimir(tp+"=heap["+a+"];");
            traductor.imprimir("if("+a+"=="+tablaTipos.valor_nulo+") goto "+"nullex"+";");
        }
        traductor.imprimir("stack["+w+"]="+a+";")
        //paso de parametros
        for(var i=0;i<this.params.length;i++)
        {
            ts.posicion++;
            var tw=valores.getTemporal();
            traductor.imprimir(tw+"="+tsim+"+"+(i+2)+";");
            var valor=this.params[i].traducir(ts,traductor);
            if(valor.tipo.indice==tablaTipos.booleano)
            {
                tablaTipos.etiquetaToTemp(valor,traductor);
            }
            
            traductor.imprimir("stack["+tw+"]="+valor.aux+";")
            //ts.posicion=ts.posicion-i-1;
        }
        
        //cambio real
        traductor.imprimir("p=p+"+tactual+";//cambio real");
        //llamada
        traductor.imprimir("call "+this.sim.firma.substring(1,this.sim.firma.length-1)+"();")
        var aux=null;
        if(this.sim.tipo!=tablaTipos.vacio)
        {            
            //get return
            var taux=valores.getTemporal();
            var tback=valores.getTemporal();
            var idena=new identificador("return",null);
            var simb=new simbolo(null,null,idena,tablaTipos.rol_variable);
            var he=ts.head;
            ts.head=null;
            var ret=ts.BuscarSimbolo(simb,this.linea,this.columna,this.archivo);
            ts.head=he;
            traductor.comentarioSimple("valor retorno");
            traductor.imprimir(taux+"=p+"+ret.posicion+";");
            traductor.imprimir(tback+"=stack["+taux+"];");
            aux=tback;

        }
        //regresar el puntero
        traductor.imprimir("p=p-"+tactual+";//cambio real");
        //saco temporales
        for(var y=0;y<lista.length;y++)
        {
            traductor.imprimir(pacon+"=p+"+contador+";");
            traductor.imprimir(lista[y]+"=stack["+pacon+"];//saco temporal")
            ts.posicion--;
            contador++;
        }
        var mmm=new simbolo(this.sim.tipo,aux);
        mmm.vars=this.sim.vars;
        
        return  mmm;
    }
}

module.exports = s_llamada;