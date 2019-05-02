
var nodoArbol =require("../nodoArbol.js");
const tablaTipos= require("../tablaTipos.js");
var simbolo = require("../../mng_ts/simbolo.js");
const parametro = require("../../mng_ts/parametro.js");
const valores = require("../values_manager.js");
var identificador=require("../../mng_ts/identificador.js");
const vari = require("../../var");
class nuevaInstancia{
    constructor(id,parametros,linea,columna,archivo,hash) 
    {
        this.id=id;
        this.params=parametros;
        this.linea=linea; 
        this.columna=columna;
        this.archivo=archivo;
        this.hash=hash;
        this.s=null;
        this.no="";
    }
    comprobacion_global(ts,er)
    {
        /* ver que sea un tipo permitido */

        /* ver que la clase no sea abstracat xq si no no se puede instanciar  */

        
    }
    traduccion_global(ts,traductor)
    {
        
    }
    getTree()
    {
       
    }
    comprobacion(ts,er)
    {
        var respuesta=new simbolo(tablaTipos.tipo_error);
        //comprobar que sesa un tipo permitido
        //console.log(ts.tiposPermitidos);
        if(!ts.ispermitido(this.id))
        {
            er.addError("No se encontro la clase "+this.id,this.linea,this.columna,this.archivo,
            "SEMANTICO");
            return respuesta;
        }
        //comprobar los parametros
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
        var simb=new simbolo(null,null,this.iden,tablaTipos.rol_constructor);
       // console.log(simb.getNombre());
        var u = ts.head;
        ts.head=new simbolo();
        ts.head.vars=ts.getpermitido(this.id);
        
        var r=ts.BuscarSimbolo(simb,this.linea,this.columna,this.archivo);
       
        ts.head=u;
        if(r!=null)
        {
            this.no=simb.getNombre();
            var ti=tablaTipos.getTipoObjeto(this.id);
            //regresar el tipo de objeto
            var aux=ts.getpermitido(this.id);
            respuesta=new simbolo(ti);
            respuesta.vars=aux;
            this.s=respuesta;
            
            //agregarle el aux de los globales
        }
        //ver si existe el constructor con esos parametros
        return respuesta;
    }
    traducir(ts,traductor)
    {
        var tactual=ts.getTamActual()-1;
        var tx=valores.getTemporal();
        this.s.aux=tx;
        traductor.imprimir(tx+"=h;");
        traductor.imprimir("heap["+tx+"]="+tx+";")
        traductor.imprimir("h=h+"+(this.s.vars.tam+1)+";");
        var tsim1=valores.getTemporal();
        traductor.imprimir(tsim1+"=p+"+tactual+";//cambio simulado");
        traductor.imprimir("stack["+tsim1+"]="+tx+";");
        traductor.imprimir("p=p+"+tactual+";//cambio real");
        traductor.imprimir("call "+this.id+"_def();");
        traductor.imprimir("$$_clean_scope("+tsim1+","+tactual+");");
        traductor.imprimir("p=p-"+tactual+";//cambio real");

       
        //ts.posicion++;
        var tsim=valores.getTemporal();
        traductor.imprimir(tsim+"=p+"+tactual+";//cambio simulado");
        var ta1=valores.getTemporal();
        traductor.imprimir(ta1+"="+tsim+"+"+1+";");
        traductor.imprimir("stack["+ta1+"]="+tx+";");

        for(var i=0;i<this.params.length;i++)
        {
            //ts.posicion++;
            var tw=valores.getTemporal();
            traductor.imprimir(tw+"="+tsim+"+"+(i+2)+";");
            var valor=this.params[i].traducir(ts,traductor);
            if(valor.tipo.indice==tablaTipos.booleano)
            {
                tablaTipos.etiquetaToTemp(valor,traductor);
            }            
            traductor.imprimir("stack["+tw+"]="+valor.aux+";");
            //ts.posicion=ts.posicion-i-1;
        }
        traductor.imprimir("p=p+"+tactual+";//cambio real");
        //llamada
        traductor.imprimir("call "+this.no.substring(1,this.no.length-1)+"();")
        traductor.imprimir("$$_clean_scope("+tsim+","+tactual+");");
        traductor.imprimir("p=p-"+tactual+";//cambio real");
        return this.s;
    }
}

module.exports = nuevaInstancia;