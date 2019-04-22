const valores = require("../values_manager.js");
var nodoArbol =require("../nodoArbol.js");
const tablaTipos= require("../tablaTipos.js");
var simbolo = require("../../mng_ts/simbolo.js");
const vari=require("../../var.js");
const nodoDisplay=require("../nodoDisplay.js");
const etiqueta=require("../etiqueta.js");
class s_do_while{
    constructor(cond,sentencias,linea,columna,archivo,hash) 
    {
        this.cond=cond;
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
        var raiz =new nodoArbol("DOWHILE",this.hash);
        vari.hash++;
        var cond=new nodoArbol("COND",vari.hash);
        cond.agregarHijo(this.cond.getTree());
        vari.hash++;
        var sent =new nodoArbol("LSENT",vari.hash);
        for(var i=0;i<this.sentencias.length;i++)
        {
            sent.agregarHijo(this.sentencias[i].getTree());
        }
        raiz.agregarHijo(sent);
        raiz.agregarHijo(cond);        
        
        return raiz;
    }
    comprobacion(ts,er)
    {
       
        var minodo=new nodoDisplay("c");
        ts.displayBreaks.push(minodo);
        ts.displayContinue.push(minodo);
        ts.cambiarAmbito(false);
        for(var i=0;i<this.sentencias.length;i++)
        {
            this.sentencias[i].comprobacion(ts,er);
        }
        ts.regresarAmbito(false);
        this.testCond(ts,er);
        ts.displayBreaks.pop();
        ts.displayContinue.pop();
    }
    traducir(ts,traductor)
    {
        var inicio = valores.getEtiqueta();
        var lcondi = valores.getEtiqueta();
        var salida = valores.getEtiqueta();
        var minodo2=new nodoDisplay(lcondi);
        ts.displayContinue.push(minodo2);
        var minodo=new nodoDisplay(salida);
        ts.displayBreaks.push(minodo);
        
        traductor.comentario("SENTENCIA DOWHILE");
        traductor.imprimir_L(inicio+": //etiqueta de inicio de ciclo")
        
        traductor.comentarioSimple("sentencias do while");        
        ts.cambiarAmbito(false);
        for(var x=0;x<this.sentencias.length;x++)
        {
            this.sentencias[x].traducir(ts,traductor);
        }
        ts.regresarAmbito(false);
        //traductor.comentarioSimple("condicion");
        traductor.imprimir_L(lcondi+": //condicion do while");
        var c=this.cond.traducir(ts,traductor);
       // console.log(c);
        
        if(!(c.aux instanceof etiqueta))
        {
            var temporal=new etiqueta();
            temporal.verdadero.push(valores.getEtiqueta());
            temporal.falso.push(valores.getEtiqueta());
            traductor.imprimir("if ("+c.aux+"==1)  goto "+temporal.verdadero[0]+";");
            traductor.imprimir("goto "+temporal.falso[0]+";");
            c= new simbolo(tablaTipos.tipo_booleano,temporal);
        }
        /* guardar en el display la etiqueta de salida */        
        
        for(var i=0;i<c.aux.verdadero.length;i++)
        {
            traductor.imprimir_L(c.aux.verdadero[i]+":");
        }

        traductor.imprimir("goto "+inicio+";//goto inicio dowhile");
        for(var i=0;i<c.aux.falso.length;i++)
        {
            traductor.imprimir_L(c.aux.falso[i]+":");
        }
        traductor.imprimir_L(ts.displayBreaks.pop().etiqueta+"://salida del break");
        ts.displayContinue.pop();
    }

    testCond(ts,er)
    {
        if(this.cond!=null)
        {
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
        }
    }
}

module.exports = s_do_while;