const valores = require("../values_manager.js");
var nodoArbol =require("../nodoArbol.js");
const etiqueta= require("../etiqueta.js");
const tablaTipos= require("../tablaTipos.js");
var simbolo = require("../../mng_ts/simbolo.js");
class or_relacional{
    constructor(oprel,op1,op2,linea,columna,archivo,hash) 
    {
        this.oprel=oprel;
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
        var raiz =new nodoArbol(this.oprel,this.hash);
        raiz.agregarHijo(this.op1.getTree());
        raiz.agregarHijo(this.op2.getTree());
        return raiz;
    }
    comprobacion(ts,er)
    {
        /*
        console.log(this.op1.constructor.name);
        console.log(this.op2.constructor.name);
        */
        var respuesta=new simbolo(tablaTipos.tipo_error);   
        var o1=this.op1.comprobacion(ts,er);
        var o2=this.op2.comprobacion(ts,er);
        var ope=tablaTipos.relacional[o1.tipo.indice][o2.tipo.indice];
        if(ope==tablaTipos.all)
        {
            respuesta = new simbolo(tablaTipos.tipo_booleano); 
        }else if(ope==tablaTipos.igual_booleano||ope==tablaTipos.igual_cadena||ope==tablaTipos.igual_dif)
        {
            if(this.oprel=="=="||this.oprel=="!=")
            {
                respuesta = new simbolo(tablaTipos.tipo_booleano); 
            }else
            {
                er.addError("Tipos incompatibles: "+o1.tipo.getName()+this.oprel+o2.tipo.getName(),this.linea,this.columna,this.archivo,
            "SEMANTICO");
            }              
        }else if(ope==tablaTipos.error)
        {
            er.addError("Tipos incompatibles: "+o1.tipo.nombre+this.oprel+o2.tipo.nombre,this.linea,this.columna,this.archivo,
            "SEMANTICO");
        }
        return respuesta;
    }
    traducir(ts,traductor)
    {
        var o1=this.op1.traducir(ts,traductor);
        var o2=this.op2.traducir(ts,traductor);
        var ope=tablaTipos.relacional[o1.tipo.indice][o2.tipo.indice];
       
        if(ope==tablaTipos.all||ope==tablaTipos.igual_dif)
        {
            
            var temporal=new etiqueta();
            temporal.verdadero.push(valores.getEtiqueta());
            temporal.falso.push(valores.getEtiqueta());
            traductor.imprimir("if ("+o1.aux+this.oprel+o2.aux+")  goto "+temporal.verdadero[0]+";");
            traductor.imprimir("goto "+temporal.falso[0]+";");
            return  new simbolo(tablaTipos.tipo_booleano,temporal);   
        }
        else if(ope==tablaTipos.igual_booleano)
        {
            var temporal=new etiqueta();
            temporal.verdadero.push(valores.getEtiqueta());
            temporal.falso.push(valores.getEtiqueta());
            //viene con etiquetas
            if(o1.aux instanceof etiqueta)
            {
                var aux=valores.getEtiqueta();
                var mitemp=valores.getTemporal();
                for(var i=0;i<o1.aux.verdadero.length;i++)
                {
                    traductor.imprimir_L(o1.aux.verdadero[i]+":");
                }
                traductor.imprimir(mitemp+"=1;");
                traductor.imprimir("goto "+aux+";");
                for(var i=0;i<o1.aux.falso.length;i++)
                {
                    traductor.imprimir_L(o1.aux.falso[i]+":");
                }
                traductor.imprimir(mitemp+"=0;");
                traductor.imprimir_L(aux+":");
                o1.aux=mitemp;
            }

            if(o2.aux instanceof etiqueta)
            {
                var aux=valores.getEtiqueta();
                var mitemp=valores.getTemporal();
                for(var i=0;i<o2.aux.verdadero.length;i++)
                {
                    traductor.imprimir_L(o2.aux.verdadero[i]+":");
                }
                traductor.imprimir(mitemp+"=1;");
                traductor.imprimir("goto "+aux+";");
                for(var i=0;i<o2.aux.falso.length;i++)
                {
                    traductor.imprimir_L(o2.aux.falso[i]+":");
                }
                traductor.imprimir(mitemp+"=0;");
                traductor.imprimir_L(aux+":");
                o2.aux=mitemp;
            }

            traductor.imprimir("if ("+o1.aux+this.oprel+o2.aux+")  goto "+temporal.verdadero[0]+";");
            traductor.imprimir("goto "+temporal.falso[0]+";");
            return  new simbolo(tablaTipos.tipo_booleano,temporal);  
        }else if(ope==tablaTipos.igual_cadena)
        {
            if(this.oprel=="=="||this.oprel=="!=")
            {
                var temporal=new etiqueta();
                 temporal.verdadero.push(valores.getEtiqueta());
                 temporal.falso.push(valores.getEtiqueta());
                var complemento=this.oprel=="=="?"==1":"==0";
                //llamada
                var tsim=valores.getTemporal();var tp1=valores.getTemporal();var tp2=valores.getTemporal();
                var r=valores.getTemporal();
                traductor.imprimir(tsim+"=p+"+ts.getTamActual()+";");
                traductor.imprimir(tp1+"="+tsim+"+1;");
                traductor.imprimir("stack["+tp1+"]="+o1.aux+";");
                traductor.imprimir(tp2+"="+tsim+"+2;");
                traductor.imprimir("stack["+tp2+"]="+o2.aux+";");
                traductor.imprimir("p=p+"+ts.getTamActual()+";");
                traductor.imprimir("call  cmpIgual();");
                traductor.imprimir(r+"=stack[p];");
                traductor.imprimir("p=p-"+ts.getTamActual()+";");
                traductor.imprimir("if("+r+complemento+") goto "+temporal.verdadero[0]+";");
                traductor.imprimir("goto "+temporal.falso[0]+";");
                return  new simbolo(tablaTipos.tipo_booleano,temporal);  
            }
        }
        
    }
}

module.exports = or_relacional;