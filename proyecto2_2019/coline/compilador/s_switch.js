const valores = require("../values_manager.js");
var nodoArbol =require("../nodoArbol.js");
const tablaTipos= require("../tablaTipos.js");
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
    comprobacion_global(ts,er)
    {

    }
    traduccion_global(ts,traductor)
    {
        
    }
    getTree()
    {
        var raiz =new nodoArbol("SWITCH",this.hash);
        vari.hash++;
        var cond=new nodoArbol("VALOR",vari.hash);
        cond.agregarHijo(this.valor.getTree());
        vari.hash++;
        var sent =new nodoArbol("CASOS",vari.hash);
        for(var i=0;i<this.casos.length;i++)
        {
            sent.agregarHijo(this.casos[i].getTree());
        }
        // defecto 
        if(this.defecto!=null)
        {
            vari.hash++;
            var defecto =new nodoArbol("DEFAULT",vari.hash);
            vari.hash++;
            var sentdef =new nodoArbol("LSENT",vari.hash);
            for(var i=0;i<this.defecto.sentencias.length;i++)
            {
                sentdef.agregarHijo(this.defecto.sentencias[i].getTree());
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
            er.addError("La expresion que evalua el switch debe ser tipo primitivo, no "+t.tipo.getName(),
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
        var beout=valores.getEtiqueta();
        var e_defe=valores.getEtiqueta();    
        var minodo=new nodoDisplay(beout);
        ts.displayBreaks.push(minodo);
        //valor principal
        var v= this.valor.traducir(ts,traductor);
        //valor 
        tablaTipos.etiquetaToTemp(v,traductor);
        //traducir las condiciones tradCond(
        for(var i=0;i<this.casos.length;i++)
        {
            var c=this.casos[i];
            c.principal=v;
            c.tradCond(ts,traductor);
        }
        traductor.imprimir("goto "+e_defe+";//ir a etiqueta de defecto");
        //traducir los casos
        for(var i=0;i<this.casos.length;i++)
        {
            var c=this.casos[i];
            c.traducir(ts,traductor);
        }
        traductor.imprimir("goto "+beout+";//ir a etiqueta salida")
        traductor.imprimir_L(e_defe+"://etiqueta de defecto")
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