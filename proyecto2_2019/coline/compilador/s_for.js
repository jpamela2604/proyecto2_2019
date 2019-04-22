
const valores = require("../values_manager.js");
var nodoArbol =require("../nodoArbol.js");
const tablaTipos= require("../tablaTipos.js");
const vari=require("../../var.js");
const nodoDisplay=require("../nodoDisplay.js");
const etiqueta=require("../etiqueta.js");
class s_for{
    constructor(declaracion,cond,cambio,sentencias,linea,columna,archivo,hash) 
    {
        this.declaracion=declaracion;
        this.cond=cond;
        this.cambio=cambio;
        this.sentencias=sentencias;
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
        var raiz =new nodoArbol("FOR",this.hash);
        vari.hash++;
        raiz.agregarHijo(this.declaracion.getTree());
        vari.hash++;
        raiz.agregarHijo(this.cond.getTree());
        vari.hash++;
        raiz.agregarHijo(this.cambio.getTree());
        vari.hash++;
        var sent =new nodoArbol("LSENT",vari.hash);
        for(var i=0;i<this.sentencias.length;i++)
        {
            sent.agregarHijo(this.sentencias[i].getTree());
        }
        raiz.agregarHijo(sent);
        
        return raiz;
    }
    comprobacion(ts,er)
    {        
        var minodo=new nodoDisplay("c");
        ts.displayBreaks.push(minodo);
        ts.displayContinue.push(minodo);
        ts.cambiarAmbito(false);
        this.declaracion.comprobacion(ts,er);
        var t=this.cond.comprobacion(ts,er);
        if(t.tipo.indice==tablaTipos.error)
        {
            return;
        }else if(t.tipo.indice!=tablaTipos.booleano)
        {
            er.addError("Tipos incompatibles: La condicion del if debe ser tipo boolean, no "+t.tipo.getName(),
                this.linea,this.columna,this.archivo,
            "SEMANTICO");
        }
        for(var i=0;i<this.sentencias.length;i++)
        {
            this.sentencias[i].comprobacion(ts,er);
        }
        this.cambio.comprobacion(ts,er);
        ts.displayBreaks.pop();
        ts.displayContinue.pop();
        ts.regresarAmbito(false);
    }
    traducir(ts,traductor)
    {
        ts.cambiarAmbito(false);
        var inicio = valores.getEtiqueta();
        var incremento=valores.getEtiqueta();
        var minodo2=new nodoDisplay(incremento);
        ts.displayContinue.push(minodo2);
        traductor.comentario("SENTENCIA FOR");
        this.declaracion.traducir(ts,traductor);
        traductor.imprimir_L(inicio+": //etiqueta de inicio de ciclo");
        var c=this.cond.traducir(ts,traductor);
        if(!(c.aux instanceof etiqueta))
        {
            var temporal=new etiqueta();
            temporal.verdadero.push(valores.getEtiqueta());
            temporal.falso.push(valores.getEtiqueta());
            traductor.imprimir("if ("+c.aux+"==1)  goto "+temporal.verdadero[0]+";");
            traductor.imprimir("goto "+temporal.falso[0]+";");
            c= new simbolo(tablaTipos.tipo_booleano,temporal);
        }
        var minodo=new nodoDisplay(c.aux.falso[0]);
        ts.displayBreaks.push(minodo);
        for(var i=0;i<c.aux.verdadero.length;i++)
        {
            traductor.imprimir_L(c.aux.verdadero[i]+":");
        }
        traductor.comentarioSimple("sentencias"); 
        for(var x=0;x<this.sentencias.length;x++)
        {
            this.sentencias[x].traducir(ts,traductor);
        }
        traductor.imprimir_L(incremento+":");
        this.cambio.traducir(ts,traductor);
        traductor.imprimir("goto "+inicio+";")
        ts.regresarAmbito(false);
        for(var i=0;i<c.aux.falso.length;i++)
        {
            traductor.imprimir_L(c.aux.falso[i]+":");
        }
        ts.displayBreaks.pop();
        ts.displayContinue.pop();
    }
}

module.exports = s_for;