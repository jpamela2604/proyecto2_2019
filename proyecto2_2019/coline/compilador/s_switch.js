const valores = require("../values_manager.js");
var nodoArbol =require("../nodoArbol.js");
const tablaTipos= require("../tablaTipos.js");
var simbolo = require("../../mng_ts/simbolo.js");
const vari=require("../../var.js");
const nodoDisplay=require("../nodoDisplay.js");
class s_switch{
    constructor(valor,casos,defecto,linea,columna,archivo,hash) 
    {
        this.valor=valor;
        this.casos=casos;
        this.defecto=defecto;
        this.linea=linea; 
        this.columna=columna;
        this.archivo=archivo;
        this.hash=hash;
    }
    getTree()
    {
        var raiz =new nodoArbol("SWITCH",this.hash);
        vari.hash++;
        var cond=new nodoArbol("VALOR",this.hash);
        cond.agregarHijo(this.valor.getTree());
        vari.hash++;
        var sent =new nodoArbol("CASOS",vari.hash);
        for(var i=0;i<this.sentencias.length;i++)
        {
            sent.agregarHijo(this.sentencias[i].getTree());
        }
        // defecto 
        if(this.defecto!=null)
        {
            var defecto =new nodoArbol("DEFAULT",vari.hash);
            vari.hash++;
            var sentdef =new nodoArbol("LSENT",vari.hash);
            for(var i=0;i<this.defecto.sentencias.length;i++)
            {
                sent.agregarHijo(this.defecto.sentencias[i].getTree());
            }
            defecto.agregarHijo(sentdef);
            sent.agregarHijo(defecto);
        }
        raiz.agregarHijo(cond);
        raiz.agregarHijo(sent);
        
        
        return raiz;
    }
    comprobacion(ts,er)
    {
        //compruebo el valor del switch
        var v= this.valor.comprobacion(ts,er);
        var minodo=new nodoDisplay("");
        ts.displayBreaks.push(minodo);
        if(v.tipo.indice==tablaTipos.error)
        {
            
        }
        else if(v.tipo.indice>3)//no es primitivio
        {
            er.addError("La expresion que evalua el switch debe ser tipo primitivo, no "+t.tipo.nombre,
                this.linea,this.columna,this.archivo,
            "SEMANTICO");
            v=null;
        }
        //compruebo sus casos
        for(var i=0;i<this.casos.length;i++)
        {
            var c=this.casos[i];
            c.principal=v;
            c.comprobacion(ts,er);
        }
        //compruebo su defecto
        if(this.defecto!=null)
        {
            ts.cambiarAmbito(false);
            for(var x=0;x<this.defecto.sentencias.length;x++)
            {
                this.defecto.sentencias[x].comprobacion(ts,er);
            }
            ts.regresarAmbito(false);
        }
        ts.displayBreaks.pop();
    }
    traducir(ts,traductor)
    {
        traductor.comentario("SENTENCIA SWITCH");
        //generar la etiqueta de salida        
        var minodo=new nodoDisplay(valores.getEtiqueta());
        ts.displayBreaks.push(minodo);
        //valor principal
        var v= this.valor.traducir(ts,traductor);
        //traducir los casos
        for(var i=0;i<this.casos.length;i++)
        {
            var c=this.casos[i];
            c.principal=v;
            c.traducir(ts,traductor);
        }

        //traducir el defecto
        if(this.defecto!=null)
        {
            traductor.comentarioSimple("sentencias default");
            for(var x=0;x<this.defecto.sentencias.length;x++)
            {
                this.defecto.sentencias[x].traducir(ts,traductor);
            }
        }
        //escribir la etiqueta de salida
        traductor.imprimir(ts.displayBreaks.pop().etiqueta+": //etiqueta de salida del switch");

    }
}

module.exports = s_switch;

/* si ejecuta sentencias sin preguntar


if cond1 goto LX
if cond2 goto LY
goto Ldefault
LX: <SENT X>
LY: <SENT Y>
    goto SALIDA
Ldefault:
    <sent default>
SALIDA:

* */