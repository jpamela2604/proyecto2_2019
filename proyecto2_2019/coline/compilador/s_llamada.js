
var nodoArbol =require("../nodoArbol.js");
const tablaTipos= require("../tablaTipos.js");
var simbolo = require("../../mng_ts/simbolo.js");
const parametro = require("../../mng_ts/parametro.js");
const valores = require("../values_manager.js");
var identificador=require("../../mng_ts/identificador.js");
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
            return r;
        }
        return respuesta;

    }
    traducir(ts,traductor)
    {
        traductor.comentario("SENTENCIA LLAMADA");
        //cambio simulado
        var tsim="";
        if(this.params.length>0)
        {
            tsim=valores.getTemporal();
            traductor.imprimir(tsim+"=p+"+ts.getTamActual()+";//cambio simulado");
        }
        //paso de parametros
        for(var i=0;i<this.params.length;i++)
        {
            var tw=valores.getTemporal();
            traductor.imprimir(tw+"="+tsim+"+"+(i+1)+";");
            var valor=this.params[i].traducir(ts,traductor);
            if(valor.tipo.indice==tablaTipos.booleano)
            {
                tablaTipos.etiquetaToTemp(valor,traductor);
            }
            
            traductor.imprimir("stack["+tw+"]="+valor.aux+";")
        }
        //cambio real
        traductor.imprimir("p=p+"+ts.getTamActual()+";//cambio real");
        //llamada
        traductor.imprimir("call "+this.sim.getNombre()+"();")
        var aux=null;
        if(this.sim.tipo!=tablaTipos.vacio)
        {            
            //get return
            var taux=valores.getTemporal();
            var tback=valores.getTemporal();
            var idena=new identificador("return",null);
            var simb=new simbolo(null,null,idena,tablaTipos.rol_variable);
            var ret=ts.BuscarSimbolo(simb,this.linea,this.columna,this.archivo);
            traductor.comentarioSimple("valor retorno");
            traductor.imprimir(taux+"=p+"+ret.posicion+";");
            traductor.imprimir(tback+"=stack["+taux+"];");
            aux=tback;

        }
        //regresar el puntero
        traductor.imprimir("p=p-"+ts.getTamActual()+";//cambio real");
        return  new simbolo(this.sim.tipo,aux);
    }
}

module.exports = s_llamada;