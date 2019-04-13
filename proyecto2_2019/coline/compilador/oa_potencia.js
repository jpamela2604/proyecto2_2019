const valores = require("../values_manager.js");
var nodoArbol =require("../nodoArbol.js");
const tablaTipos= require("../tablaTipos.js");
var simbolo = require("../../mng_ts/simbolo.js");
class oa_potencia{
    constructor(op1,op2,linea,columna,archivo,hash) 
    {
        this.op1=op1;
        this.op2=op2;
        this.linea=linea; 
        this.columna=columna;
        this.archivo=archivo;
        this.hash=hash;
    }
    comprobacion_global(ts,er)
    {

    }
    traduccion_global(ts,traductor)
    {
        
    }
    getTree()
    {
        var raiz =new nodoArbol("POT",this.hash);
        raiz.agregarHijo(this.op1.getTree());
        raiz.agregarHijo(this.op2.getTree());
        return raiz;
    }
    comprobacion(ts,er)
    {
        var respuesta=new simbolo(tablaTipos.tipo_error);   
        var o1=this.op1.comprobacion(ts,er);
        var o2=this.op2.comprobacion(ts,er);
        var ope=tablaTipos.valores[o1.tipo.indice][o2.tipo.indice];
        if(ope==tablaTipos.entero)
        {
            respuesta = new simbolo(tablaTipos.tipo_entero);   
        }else if(ope==tablaTipos.doble)
        {
            respuesta = new simbolo(tablaTipos.tipo_doble);   
        }else if(ope==tablaTipos.error)
        {
            er.addError("Tipos incompatibles: pow( "+o1.tipo.nombre+","+o2.tipo.nombre+")",this.linea,this.columna,this.archivo,
            "SEMANTICO");
        }
        return respuesta;
    }
    traducir(ts,traductor)
    {
        var o1=this.op1.traducir(ts,traductor);
        var o2=this.op2.traducir(ts,traductor);
            var tsim=valores.getTemporal();var tp1=valores.getTemporal();var tp2=valores.getTemporal();
            var r=valores.getTemporal();
            traductor.imprimir(tsim+"=p+"+ts.getTamActual()+";");
            traductor.imprimir(tp1+"="+tsim+"+1;");
            traductor.imprimir("stack["+tp1+"]="+o1.aux+";");
            traductor.imprimir(tp2+"="+tsim+"+2;");
            traductor.imprimir("stack["+tp2+"]="+o2.aux+";");

            traductor.imprimir("p=p+"+ts.getTamActual()+";");
            traductor.imprimir("call potencia();");
            traductor.imprimir(r+"=stack[p];");
            traductor.imprimir("p=p-"+ts.getTamActual()+";");
        
        return  new simbolo(tablaTipos.tipo_doble,r);   
    }
}

module.exports = oa_potencia;