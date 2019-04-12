
var nodoArbol =require("../nodoArbol.js");
const tablaTipos= require("../tablaTipos.js");
var simbolo = require("../../mng_ts/simbolo.js");
const valores = require("../values_manager.js");
class oa_casteotoChar{
    constructor(valor,linea,columna,archivo,hash) 
    {
        this.valor=valor;
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
        var raiz =new nodoArbol("BREAK",this.hash);
        
        return raiz;
    }
   comprobacion (ts,er)
    {
        var respuesta=new simbolo(tablaTipos.tipo_error); 
        var val=this.valor.comprobacion (ts,er);
        if(val.tipo.indice==tablaTipos.error)
        {
            return respuesta;
        }
        if(val.tipo.indice==tablaTipos.entero||val.tipo.indice==tablaTipos.cadena||
            val.tipo.indice==tablaTipos.doble|| val.tipo.indice==tablaTipos.caracter)
        {
            respuesta=new simbolo(tablaTipos.tipo_caracter,null);
        }else
        {
            er.addError("No se puede castear(toChar) un "+val.tipo.nombre,this.linea,this.columna,this.archivo,
            "SEMANTICO");
        }
        return respuesta;
    }
    traducir(ts,traductor)
    {
        var val=this.valor.traducir(ts,traductor);
        /*else if(val.tipo.indice==tablaTipos.doble)
        {

        }
        else if(val.tipo.indice==tablaTipos.entero)
        {

        }else*/ if(val.tipo.indice==tablaTipos.cadena)
        {
            var tx=valores.getTemporal(); var lv=valores.getEtiqueta();var lf=valores.getEtiqueta();
            traductor.imprimir("if("+val.aux+"!="+tablaTipos.valor_nulo+") goto "+lv+";");
            traductor.imprimir_L(lf+":");
            traductor.imprimir("print(\"%c\",99);");
            traductor.imprimir("print(\"%c\",97);");
            traductor.imprimir("print(\"%c\",115);");
            traductor.imprimir("print(\"%c\",116);");
            traductor.imprimir("print(\"%c\",32);");
            traductor.imprimir("print(\"%c\",101);");
            traductor.imprimir("print(\"%c\",114);");
            traductor.imprimir("print(\"%c\",114);");
            traductor.imprimir("print(\"%c\",111);");
            traductor.imprimir("print(\"%c\",114);");
            traductor.imprimir("print(\"%c\",32);");
            traductor.imprimir("print(\"%e\","+this.linea+");");
            traductor.imprimir("print(\"%c\",44);");
            traductor.imprimir("print(\"%e\","+this.columna+");");
            traductor.imprimir("goto "+traductor.salida+";");
            traductor.imprimir_L(lv+":");
            traductor.imprimir(tx+"=heap["+val.aux+"];");
            traductor.imprimir("if ("+tx+"=="+tablaTipos.fin_cadena+") goto "+lf+";");
            val.aux=tx;
        }else
        {
            var lv=valores.getEtiqueta();var lf=valores.getEtiqueta();
            traductor.imprimir("if("+val.aux+"<0) goto "+lf+";");
            traductor.imprimir("if("+val.aux+"<255) goto "+lv+";");
            traductor.imprimir_L(lf+":");
            traductor.imprimir("print(\"%c\",99);");
            traductor.imprimir("print(\"%c\",97);");
            traductor.imprimir("print(\"%c\",115);");
            traductor.imprimir("print(\"%c\",116);");
            traductor.imprimir("print(\"%c\",32);");
            traductor.imprimir("print(\"%c\",101);");
            traductor.imprimir("print(\"%c\",114);");
            traductor.imprimir("print(\"%c\",114);");
            traductor.imprimir("print(\"%c\",111);");
            traductor.imprimir("print(\"%c\",114);");
            traductor.imprimir("print(\"%c\",32);");
            traductor.imprimir("print(\"%e\","+this.linea+");");
            traductor.imprimir("print(\"%c\",44);");
            traductor.imprimir("print(\"%e\","+this.columna+");");
            traductor.imprimir("goto "+traductor.salida+";");
            traductor.imprimir_L(lv+":");
        }
        return new simbolo(tablaTipos.tipo_caracter,val.aux);
    }
}

module.exports = oa_casteotoChar;