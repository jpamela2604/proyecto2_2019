
var nodoArbol =require("../nodoArbol.js");
const tablaTipos= require("../tablaTipos.js");
const valores = require("../values_manager.js");
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
         var l=this.lista.comprobacion_global(ts,er);
         if(l.tipo==tablaTipos.error)
         {
             return;
         }else if(l.tipo!=tablaTipos.arreglo)
         {
             er.addError("Tipos incompatibles(foreach): solo se puede recorrer un arrglo, no un miembro "+l.tipo.getName(),this.linea,this.columna,this.archivo,
             "SEMANTICO");
             return;
         }
         //variable 1 tenga el mismlo tipo que los de la lista
         if(!AsignValid(l.tipo,this.parametro.tipo))
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
        var tx=valores.getTemporal();
        
        
        var inicio = valores.getEtiqueta();
        var incremento=valores.getEtiqueta();
        var minodo2=new nodoDisplay(incremento);
        ts.displayContinue.push(minodo2);
        ts.cambiarAmbito(false);
        

    }
}

module.exports = s_foreach;