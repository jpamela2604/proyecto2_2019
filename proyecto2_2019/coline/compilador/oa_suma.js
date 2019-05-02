const valores = require("../values_manager.js");
var nodoArbol =require("../nodoArbol.js");
const tablaTipos= require("../tablaTipos.js");
var simbolo = require("../../mng_ts/simbolo.js");
const etiqueta= require("../etiqueta.js");
class oa_suma{
    constructor(op1,op2,linea,columna,archivo,hash) 
    {
        this.op1=op1;
        this.op2=op2;
        this.linea=linea; 
        this.columna=columna;
        this.archivo=archivo;
        this.hash=hash;
        this.ope=null;
    }
    comprobacion_global(ts,er)
    {

    }
    traduccion_global(ts,traductor)
    {
        
    }
    getTree()
    {
        var raiz =new nodoArbol("+",this.hash);
        raiz.agregarHijo(this.op1.getTree());
        raiz.agregarHijo(this.op2.getTree());
        return raiz;
    }
    comprobacion(ts,er)
    {
        var respuesta=new simbolo(tablaTipos.tipo_error);   
        var o1=this.op1.comprobacion(ts,er);
        var o2=this.op2.comprobacion(ts,er);
        this.ope=tablaTipos.suma[o1.tipo.indice][o2.tipo.indice];
        if(this.ope==tablaTipos.entero)
        {
            respuesta = new simbolo(tablaTipos.tipo_entero);   
        }else if(this.ope==tablaTipos.doble)
        {
            respuesta = new simbolo(tablaTipos.tipo_doble);   
        }else if(this.ope==tablaTipos.cadena)
        {
            respuesta = new simbolo(tablaTipos.tipo_cadena);   
        }else if(this.ope==tablaTipos.error)
        {
            er.addError("Tipos incompatibles: "+o1.tipo.getName()+" + "+o2.tipo.getName(),this.linea,this.columna,this.archivo,
            "SEMANTICO");
        }
        return respuesta;
    }
    traducir(ts,traductor)
    {
        
        if(this.ope==tablaTipos.entero)
        {
            var o1=this.op1.traducir(ts,traductor);
            var o2=this.op2.traducir(ts,traductor);
            var temporal=valores.getTemporal();
            traductor.imprimir(temporal+"="+o1.aux+"+"+o2.aux+";");
            return  new simbolo(tablaTipos.tipo_entero,temporal);   
        }else if(this.ope==tablaTipos.doble)
        {
            var o1=this.op1.traducir(ts,traductor);
            var o2=this.op2.traducir(ts,traductor);
            var temporal=valores.getTemporal();
            traductor.imprimir(temporal+"="+o1.aux+"+"+o2.aux+";");
            return  new simbolo(tablaTipos.tipo_doble,temporal);   
        }
        else
        {//es cadena
            var o1=this.op1.traducir(ts,traductor);
            this.getAp(o1,traductor,ts);
            var o2=this.op2.traducir(ts,traductor);
            this.getAp(o2,traductor,ts);
            var t1=valores.getTemporal();
            var t2=valores.getTemporal();
            var t3=valores.getTemporal();
            var t4=valores.getTemporal();
            traductor.imprimir(t1+"=p+"+ts.getTamActual()+";");
            traductor.imprimir(t2+"="+t1+"+1;");
            traductor.imprimir("stack["+t2+"]="+o1.aux+";//apuntador o1 heap");
            traductor.imprimir(t3+"="+t1+"+2;");
            traductor.imprimir("stack["+t3+"]="+o2.aux+";//apuntador o2 heap");
            traductor.imprimir("p=p+"+ts.getTamActual()+";");
            traductor.imprimir("call concat_olcp2jjps();");
            traductor.imprimir(t4+"=stack[p];");
            traductor.imprimir("p=p-"+ts.getTamActual()+";");
            return  new simbolo(tablaTipos.tipo_cadena,t4);
        } 
        
    }
    getAp(sim,traductor,ts)
    {
        if(sim.tipo.indice==tablaTipos.booleano)
        {
            tablaTipos.etiquetaToTemp(sim,traductor);
           
            var tsi=valores.getTemporal();var tsb=valores.getTemporal();var t174=valores.getTemporal();
            traductor.imprimir(tsi+"=p+"+ts.getTamActual()+";");
            traductor.imprimir(tsb+"="+tsi+"+1;");
            traductor.imprimir("stack["+tsb+"]="+sim.aux+";");
            traductor.imprimir("p=p+"+ts.getTamActual()+";");
            traductor.imprimir("call booltostr();");
            traductor.imprimir(t174+"=stack[p];");
            traductor.imprimir("p=p-"+ts.getTamActual()+";");
            sim.aux=t174;
        }else if(sim.tipo.indice==tablaTipos.entero||sim.tipo.indice==tablaTipos.doble)
        {
            var no_decimales=sim.tipo.indice==tablaTipos.entero?0:4;
            var tsim=valores.getTemporal();var tp1=valores.getTemporal();var tp2=valores.getTemporal();
            var r=valores.getTemporal();
            traductor.imprimir(tsim+"=p+"+ts.getTamActual()+";");
            traductor.imprimir(tp1+"="+tsim+"+1;");
            traductor.imprimir("stack["+tp1+"]="+sim.aux+";");
            traductor.imprimir(tp2+"="+tsim+"+2;");
            traductor.imprimir("stack["+tp2+"]="+no_decimales+";");

            traductor.imprimir("p=p+"+ts.getTamActual()+";");
            traductor.imprimir("call ftoa();");
            traductor.imprimir(r+"=stack[p];");
            traductor.imprimir("p=p-"+ts.getTamActual()+";");
            sim.aux=r;
            
        }else if(sim.tipo.indice==tablaTipos.caracter)
        {
            var tw=valores.getTemporal();
            traductor.imprimir(tw+"=h;");
            traductor.imprimir("heap[h]="+sim.aux+";");
            traductor.imprimir("h=h+1;");
            traductor.imprimir("heap[h]="+tablaTipos.fin_cadena+";");
            traductor.imprimir("h=h+1;");
            sim.aux=tw;
        }else if(sim.tipo.indice==tablaTipos.cadena)
        {
            var e=valores.getEtiqueta();
            traductor.imprimir("if("+sim.aux+"!="+tablaTipos.valor_nulo+") goto " +e+";");
            traductor.imprimir(sim.aux+"=h;");
            traductor.imprimir("heap[h]=110;");
            traductor.imprimir("h=h+1;");
            traductor.imprimir("heap[h]=117;");
            traductor.imprimir("h=h+1;");
            traductor.imprimir("heap[h]=108;");
            traductor.imprimir("h=h+1;");
            traductor.imprimir("heap[h]=108;");
            traductor.imprimir("h=h+1;");
            traductor.imprimir("heap[h]="+tablaTipos.fin_cadena+";");
            traductor.imprimir("h=h+1;");
            traductor.imprimir_L(e+":");
            //sim.aux=tw;
        }
    }
}

module.exports = oa_suma;