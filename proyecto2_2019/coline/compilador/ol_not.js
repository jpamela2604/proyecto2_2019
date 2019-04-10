const valores = require("../values_manager.js");
var nodoArbol =require("../nodoArbol.js");
const tablaTipos= require("../tablaTipos.js");
var simbolo = require("../../mng_ts/simbolo.js");
const etiqueta= require("../etiqueta.js");
class ol_not{
    constructor(op1,linea,columna,archivo,hash) 
    {
        this.op1=op1;
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
        var raiz =new nodoArbol("!",this.hash);
        raiz.agregarHijo(this.op1.getTree());
        raiz.agregarHijo(this.op2.getTree());
        return raiz;
    }
    comprobacion(ts,er)
    {
        var respuesta=new simbolo(tablaTipos.tipo_error);   
        var o1=this.op1.comprobacion(ts,er);
        if(o1.tipo.indice==tablaTipos.booleano)
        {
            respuesta = new simbolo(tablaTipos.tipo_booleano);
        }else 
        {
            er.addError("Tipos incompatibles: !"+o1.tipo.nombre,this.linea,this.columna,this.archivo,
            "SEMANTICO");
        }
        return respuesta;
    }
    traducir(ts,traductor)
    {
        var o1=this.op1.traducir(ts,traductor);
        
        if(!(o1.aux instanceof etiqueta))
        {
            var temporal=new etiqueta();
            temporal.verdadero.push(valores.getEtiqueta());
            temporal.falso.push(valores.getEtiqueta());
            traductor.imprimir("if ("+o1.aux+"==1)  goto "+temporal.verdadero[0]+";");
            traductor.imprimir("goto "+temporal.falso[0]+";");
            o1= new simbolo(tablaTipos.tipo_booleano,temporal);
        }
               
        var miaux=new etiqueta();
        miaux.verdadero=o1.aux.falso;
        miaux.falso=o1.aux.verdadero;
        return  new simbolo(tablaTipos.tipo_booleano,miaux);    
    }
}

module.exports = ol_not;