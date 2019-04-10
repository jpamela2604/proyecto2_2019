var nodoArbol =require("../nodoArbol.js");
const etiqueta= require("../etiqueta.js");
const tablaTipos= require("../tablaTipos.js");
const valores = require("../values_manager.js");
class s_print{
    constructor(valor,linea,columna,archivo,hash) 
    {
        this.valor=valor;
        this.linea=linea; 
        this.columna=columna;
        this.archivo=archivo;
        this.hash=hash;
        this.texto="PRINT";
    }
    comprobacion_global(ts,er)
    {

    }
    traduccion_global(ts,traductor)
    {
        
    }
    getTree()
    {
        var raiz =new nodoArbol("print",this.hash);
        raiz.agregarHijo(this.valor.getTree());
        return raiz;
    }
    comprobacion(ts,er)
    {
        var va=this.valor.comprobacion(ts,er);
        if(va.tipo.indice==tablaTipos.error||va.tipo.indice==tablaTipos.booleano||
            va.tipo.indice==tablaTipos.entero||va.tipo.indice==tablaTipos.doble||
            va.tipo.indice==tablaTipos.caracter||va.tipo.indice==tablaTipos.cadena)
        {
           
        }
        else
        {
            er.addError("Tipos incompatibles: No se puede imprimir un valor de tipo "+va.tipo.nombre
            ,this.linea,this.columna,this.archivo,
            "SEMANTICO");
        }
        return null;
    }
    traducir(ts,traductor)
    {
        traductor.comentario("SENTENCIA "+this.texto);
        var va=this.valor.traducir(ts,traductor);
        if(va.tipo.indice==tablaTipos.booleano)
        {

            if(!(va.aux instanceof etiqueta))
            {
                var temporal=new etiqueta();
                temporal.verdadero.push(valores.getEtiqueta());
                temporal.falso.push(valores.getEtiqueta());
                traductor.imprimir("if ("+va.aux+"==1)  goto "+temporal.verdadero[0]+";");
                traductor.imprimir("goto "+temporal.falso[0]+";");
                va.aux=temporal;
                //va= new simbolo(tablaTipos.tipo_booleano,temporal);
            }
            var salida=valores.getEtiqueta();
            for(var i=0;i<va.aux.verdadero.length;i++)
            {
                traductor.imprimir_L(va.aux.verdadero[i]+":");
            }
            
            traductor.imprimir("print(\"%c\",116);");
            traductor.imprimir("print(\"%c\",114);");
            traductor.imprimir("print(\"%c\",117);");
            traductor.imprimir("print(\"%c\",101);");
            traductor.imprimir("goto "+salida+";");
            for(var i=0;i<va.aux.falso.length;i++)
            {
                traductor.imprimir_L(va.aux.falso[i]+":");
            }
            traductor.imprimir("print(\"%c\",102);");
            traductor.imprimir("print(\"%c\",97);");
            traductor.imprimir("print(\"%c\",108);");
            traductor.imprimir("print(\"%c\",115);");
            traductor.imprimir("print(\"%c\",101);");
            traductor.imprimir_L(salida+":")


        }else if(va.tipo.indice==tablaTipos.entero)
        {
            traductor.imprimir("print(\"%e\","+va.aux+");");
        }else if(va.tipo.indice==tablaTipos.doble)
        {
            
            traductor.imprimir("print(\"%d\","+va.aux+");");
        }else if(va.tipo.indice==tablaTipos.caracter)
        {
            traductor.imprimir("print(\"%c\","+va.aux+");");
        }else if(va.tipo.indice==tablaTipos.cadena)
        {
            //cambio de ambito simulado
            var t1=valores.getTemporal();
            traductor.imprimir(t1+"=p+"+ts.getTamActual()+";");
            //paso de parametro
            var t2=valores.getTemporal();
            traductor.imprimir(t2+"="+t1+"+1;");
            traductor.imprimir("stack["+t2+"]="+va.aux+";");
            traductor.imprimir("p=p+"+ts.getTamActual()+";");
            traductor.imprimir("call print_olcp2jjps();");
            traductor.imprimir("p=p-"+ts.getTamActual()+";");

        }
        return null;
    }
}

module.exports = s_print;