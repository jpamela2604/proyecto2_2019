const valores = require("../values_manager.js");
var nodoArbol =require("../nodoArbol.js");
const tablaTipos= require("../tablaTipos.js");
var simbolo = require("../../mng_ts/simbolo.js");
const etiqueta= require("../etiqueta.js");
class ol_or{
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
        var raiz =new nodoArbol("||",this.hash);
        raiz.agregarHijo(this.op1.getTree());
        raiz.agregarHijo(this.op2.getTree());
        return raiz;
    }
    comprobacion(ts,er)
    {
        var respuesta=new simbolo(tablaTipos.tipo_error);   
        var o1=this.op1.comprobacion(ts,er);
        var o2=this.op2.comprobacion(ts,er);
        if(o1.tipo.indice==tablaTipos.booleano&&o2.tipo.indice==tablaTipos.booleano)
        {
            respuesta = new simbolo(tablaTipos.tipo_booleano);
        }else 
        {
            er.addError("Tipos incompatibles: "+o1.tipo.nombre+" || "+o2.tipo.nombre,this.linea,this.columna,this.archivo,
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
        
        for(var i=0;i<o1.aux.falso.length;i++)
        {
            traductor.imprimir_L(o1.aux.falso[i]+":");
        }
        
        var o2=this.op2.traducir(ts,traductor);
        if(!(o2.aux instanceof etiqueta))
        {
            var temporal=new etiqueta();
            temporal.verdadero.push(valores.getEtiqueta());
            temporal.falso.push(valores.getEtiqueta());
            traductor.imprimir("if ("+o2.aux+"==1)  goto "+temporal.verdadero[0]+";");
            traductor.imprimir("goto "+temporal.falso[0]+";");
            o2= new simbolo(tablaTipos.tipo_booleano,temporal);
        }
        
        var miaux=new etiqueta();
        for(var a=0;a<o2.aux.falso.length;a++)
        {
            miaux.falso.push(o2.aux.falso[a]);
        }
        for(var b=0;b<o1.aux.verdadero.length;b++)
        {
            miaux.verdadero.push(o1.aux.verdadero[b]);
        }
        for(var c=0;c<o2.aux.verdadero.length;c++)
        {
            miaux.verdadero.push(o2.aux.verdadero[c]);
        }
        return  new simbolo(tablaTipos.tipo_booleano,miaux);   
    }
}

module.exports = ol_or;