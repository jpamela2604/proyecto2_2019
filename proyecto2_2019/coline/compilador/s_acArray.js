
var nodoArbol =require("../nodoArbol.js");
const tablaTipos= require("../tablaTipos.js");
const nodoTipo=require("../../mng_ts/nodoTipo.js");
const valores = require("../values_manager.js");
var simbolo = require("../../mng_ts/simbolo.js");
const identificador=require("../../mng_ts/identificador.js");
const s_acVariable=require("./s_acVariable");
class s_acArray{
    constructor(id,linea,columna,archivo,hash) 
    {
        this.id=id;
        this.dimensiones=new Array;
        this.linea=linea; 
        this.columna=columna;
        this.archivo=archivo;
        this.hash=hash;
        this.IsExp=false;
        this.elsimb=null;
        //this.c=null;
        this.acva=new s_acVariable(id,linea,columna,archivo,hash);
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
        var respuesta=new simbolo(tablaTipos.tipo_error);
        //compruebo que exista el id
        
        var r=this.acva.comprobacion(ts,er);
        if(r.tipo.indice==tablaTipos.error)
        {
            return respuesta;
        }
        /*console.log("-----");
       console.log(r);
       console.log("-----");*/
        //compruebo que todo sea entero
        for(var x=0;x<this.dimensiones.length;x++)
        {
            var s=this.dimensiones[x].comprobacion(ts,er);
            if(s.tipo.indice==tablaTipos.error)
            {
                return respuesta;
            }else if(s.tipo.indice!=tablaTipos.entero)
            {
                er.addError("Tipos incompatibles: la posicion de acceso de un arreglo no puede ser tipo "+s.tipo.getName(),this.linea,this.columna,this.archivo,
                            "SEMANTICO");
                return respuesta;
            }
        }
        //compruebo que tenga <= dimensiones que las dimensiones que quiero acceder
        if(this.dimensiones.length> r.tipo.dimen)
        {
            er.addError("El arreglo tiene "+r.tipo.dimen+" dimensiones, el acceso sobrepasa el numero de dimensiones",this.linea,this.columna,this.archivo,
                            "SEMANTICO");
            return respuesta;
        }
        //regresar el tipo que devuelve
        var nuevasdim=r.tipo.dimen-this.dimensiones.length;
        if(nuevasdim==0)
        {
            this.elsimb= new simbolo(new nodoTipo(r.tipo.tipoArr.indice,r.tipo.tipoArr.nombre));
            //console.log(r.tipo);
        }else
        {
            var nuevo=new nodoTipo(tablaTipos.arreglo,"",r.tipo.tipoArr);
            nuevo.dimen=nuevasdim;
            this.elsimb=new simbolo(nuevo);           
        }
        //this.c=r;
        this.elsimb.vars=r.vars;
        //console.log(this.elsimb);
        return this.elsimb;
    }
    traducir(ts,traductor)
    {
        //obtener la posicion del arreglo
        //var iden=new identificador(this.id,null);
        //var simb=new simbolo(null,null,iden,tablaTipos.rol_variable);
        /*
        this.c=ts.BuscarSimbolo(simb,this.linea,this.columna,this.archivo);
        var t1=valores.getTemporal();var t2=valores.getTemporal();
        traductor.imprimir(t1+"=p+"+this.c.posicion+";//pos arr");
        traductor.imprimir(t2+"=stack["+t1+"];//referencia al heap");
        */
       var r=this.acva.traducir(ts,traductor)
        var ant=r.aux;
        var re="";
        var tp=valores.getTemporal();
        traductor.imprimir(traductor.l+"="+this.linea+";");
        traductor.imprimir(traductor.c+"="+this.columna+";");
        /*traductor.imprimir(tp+"=heap["+ant+"];");
        traductor.imprimir("if("+tp+"=="+tablaTipos.valor_nulo+") goto "+"nullex"+";");*/
        //traductor.imprimir(tp+"=heap["+ant+"];");
        traductor.imprimir("if("+ant+"=="+tablaTipos.valor_nulo+") goto "+"nullex"+";");
        for(var x=0;x<this.dimensiones.length;x++)
        {
            var t3=valores.getTemporal();var t4=valores.getTemporal();var t5=valores.getTemporal();
            var t6=valores.getTemporal();
            var v=this.dimensiones[x].traducir(ts,traductor);
            traductor.imprimir(t3+"=heap["+ant+"];");
            traductor.imprimir("if ("+v.aux+">="+t3+") goto "+traductor.salida+";");
            traductor.imprimir(t4+"=1+"+v.aux+";");
            traductor.imprimir(t5+"="+ant+"+"+t4+";");
            re=t5;
            traductor.imprimir(t6+"=heap["+t5+"];");
            ant=t6;
        }
        this.elsimb.aux=ant;
        this.elsimb.referencia=re;
        this.elsimb.modificaStack=false;
       //console.log(r);
        return this.elsimb;
    }

    
}

module.exports = s_acArray;