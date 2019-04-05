const valores = require("../values_manager.js");
var nodoArbol =require("../nodoArbol.js");
const tablaTipos= require("../tablaTipos.js");
var simbolo = require("../../mng_ts/simbolo.js");
class oa_suma{
    constructor(op1,op2,linea,columna,archivo,hash) 
    {
        this.op1=op1;
        this.op2=op2;
        this.linea=linea; 
        this.columna=columna;
        this.archivo=archivo;
        this.hash=hash;
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
        var ope=tablaTipos.suma[o1.tipo.indice][o2.tipo.indice];
        if(ope==tablaTipos.entero)
        {
            respuesta = new simbolo(tablaTipos.tipo_entero);   
        }else if(ope==tablaTipos.doble)
        {
            respuesta = new simbolo(tablaTipos.tipo_doble);   
        }else if(ope==tablaTipos.cadena)
        {
            respuesta = new simbolo(tablaTipos.tipo_cadena);   
        }else if(ope==tablaTipos.error)
        {
            er.addError("Tipos incompatibles: "+o1.tipo.nombre+" + "+o2.tipo.nombre,this.linea,this.columna,this.archivo,
            "SEMANTICO");
        }
        return respuesta;
    }
    traducir(ts,traductor)
    {
        var o1=this.op1.traducir(ts,traductor);
        var o2=this.op2.traducir(ts,traductor);
        var ope=tablaTipos.suma[o1.tipo.indice][o2.tipo.indice];
        if(ope==tablaTipos.entero)
        {
            var temporal=valores.getTemporal();
            traductor.imprimir(temporal+"="+o1.aux+"+"+o2.aux+";");
            return  new simbolo(tablaTipos.tipo_entero,temporal);   
        }else if(ope==tablaTipos.doble)
        {
            var temporal=valores.getTemporal();
            traductor.imprimir(temporal+"="+o1.aux+"+"+o2.aux+";");
            return  new simbolo(tablaTipos.tipo_doble,temporal);   
        }
        else
        {//es cadena
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
}

module.exports = oa_suma;