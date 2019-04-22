
var nodoArbol =require("../nodoArbol.js");
const tablaTipos= require("../tablaTipos.js");
const valores = require("../values_manager.js");
const nodoDisplay=require("../nodoDisplay.js");
const identificador=require("../../mng_ts/identificador.js");
const simbolo=require("../../mng_ts/simbolo");
class s_foreach{
    constructor(parametro,lista,sentencias,linea,columna,archivo,hash) 
    {
        this.parametro=parametro;
        this.lista=lista;
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
       
    }
    comprobacion(ts,er)
    {
         //lista sea de tipo lista
         var l=this.lista.comprobacion(ts,er);
         //console.log(this.lista);
         if(l.tipo.indice==tablaTipos.error)
         {
             return;
         }else if(l.tipo.indice!=tablaTipos.arreglo)
         {
             er.addError("Tipos incompatibles(foreach): solo se puede recorrer un arrglo, no un miembro "+l.tipo.getName(),this.linea,this.columna,this.archivo,
             "SEMANTICO");
             return;
         }
         //variable 1 tenga el mismlo tipo que los de la lista
        
         if(!tablaTipos.AsignValid(l.tipo.tipoArr,this.parametro.tipo))
         {
             er.addError("Tipos incompatibles(foreach):"+l.tipo.getName()+" y "+this.parametro.tipo.getName(),this.linea,this.columna,this.archivo,
             "SEMANTICO");
             return;
         }
         //crear el ambito
         var minodo=new nodoDisplay("c");
         ts.displayBreaks.push(minodo);
         ts.displayContinue.push(minodo);
         ts.cambiarAmbito(false);
         //declarar variable
         var visibilidad=0;
         var modificador=0;
         var posicion=0;
         var iden=new identificador(this.parametro.nombre,null);
         var simb=new simbolo(this.parametro.tipo,null,iden,tablaTipos.rol_variable,posicion,
            ts.getAmbito(false),this.parametro.noDimensiones,visibilidad,modificador
            );
            ts.AgregarSimbolo(simb,false,this.parametro.linea,this.parametro.columna,this.parametro.archivo);
         //ejecutar sentencias
         for(var i=0;i<this.sentencias.length;i++)
         {
             this.sentencias[i].comprobacion(ts,er);
         }
         //regresar ambito
         ts.displayBreaks.pop();
         ts.displayContinue.pop();
         ts.regresarAmbito(false);
    }
    traducir(ts,traductor)
    {
        traductor.comentario("SENTENCIA FOREACH");
        var simb=this.lista.traducir(ts,traductor);
        
        var miap=valores.getTemporal(); var tam=valores.getTemporal();
        var pos=valores.getTemporal(); var val=valores.getTemporal();
        var tx=valores.getTemporal();
        //console.log("apuntador :"+simb.aux+"|dimensiones "+simb.tipo.dimen);
        /* obtener el tama;o del arreglo */
        var tsim=valores.getTemporal();var tp1=valores.getTemporal();var tp2=valores.getTemporal();
        traductor.imprimir(tsim+"=p+"+ts.getTamActual()+";");
        traductor.imprimir(tp1+"="+tsim+"+1;");
      
        traductor.imprimir("stack["+tp1+"]="+simb.aux+";");
        traductor.imprimir(tp2+"="+tsim+"+2;");
        traductor.imprimir("stack["+tp2+"]="+simb.tipo.dimen+";");
        traductor.imprimir("p=p+"+ts.getTamActual()+";");
        traductor.imprimir("call  getSize();");
        traductor.imprimir(tam+"=stack[p];");
        traductor.imprimir("p=p-"+ts.getTamActual()+";");
        
        /* obtener el apuntador del foreach */
        traductor.imprimir(miap+"=h;");
        traductor.imprimir(tsim+"=p+"+ts.getTamActual()+";");
        traductor.imprimir(tp1+"="+tsim+"+1;");
        traductor.imprimir("stack["+tp1+"]="+simb.aux+";");
        traductor.imprimir(tp2+"="+tsim+"+2;");
        traductor.imprimir("stack["+tp2+"]="+simb.tipo.dimen+";");
        traductor.imprimir("p=p+"+ts.getTamActual()+";");
        traductor.imprimir("call  getForEach();");
        traductor.imprimir("p=p-"+ts.getTamActual()+";");
        //traductor.imprimir("print(\"%e\","+miap+");");
        var i=valores.getTemporal(); var salida=valores.getEtiqueta();
        var inicio = valores.getEtiqueta();
        var incremento=valores.getEtiqueta();
        var minodo2=new nodoDisplay(incremento);ts.displayContinue.push(minodo2);
        var minodo=new nodoDisplay(salida);ts.displayBreaks.push(minodo);
        ts.cambiarAmbito(false);
        traductor.imprimir(i+"=0;");
        traductor.imprimir_L(inicio+": //etiqueta de inicio de ciclo");
        traductor.imprimir("if ("+i+">="+tam+") goto "+salida+";");

        //declarar variable
        var visibilidad=0;
        var modificador=0;
        var posicion=ts.getPosicion(false);
        var iden=new identificador(this.parametro.nombre,null);
        var simb=new simbolo(this.parametro.tipo,null,iden,tablaTipos.rol_variable,posicion,
        ts.getAmbito(false),this.parametro.noDimensiones,visibilidad,modificador
            );
        ts.AgregarSimbolo(simb,false,this.parametro.linea,this.parametro.columna,this.parametro.archivo);
        ts.AumentarPos(false);
        traductor.imprimir(pos+"="+i+"+"+miap+";");
        traductor.imprimir(val+"=heap["+pos+"];");
        traductor.imprimir(tx+"=p+"+posicion+";");
        traductor.imprimir("stack["+tx+"]="+val+";");

        traductor.comentarioSimple("sentencias"); 
        for(var x=0;x<this.sentencias.length;x++)
        {
            this.sentencias[x].traducir(ts,traductor);
        }        
        traductor.imprimir_L(incremento+":");
        traductor.imprimir(i+"="+i+"+1;");
        traductor.imprimir("goto "+inicio+";");
        ts.regresarAmbito(false);
        traductor.imprimir_L(salida+":");
        ts.displayBreaks.pop();
        ts.displayContinue.pop();
    }
}

module.exports = s_foreach;