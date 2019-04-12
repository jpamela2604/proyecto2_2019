
var nodoArbol =require("../nodoArbol.js");
const tablaTipos= require("../tablaTipos.js");
const valores = require("../values_manager.js");
var simbolo = require("../../mng_ts/simbolo.js");
const etiqueta=require("../etiqueta.js");
class o_ternario{
    constructor(cond,valor1,valor2,linea,columna,archivo,hash) 
    {
        this.cond=cond;
        this.valor1=valor1;
        this.valor2=valor2;
        this.linea=linea; 
        this.columna=columna;
        this.archivo=archivo;
        this.hash=hash;
        this.tipo=null;
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
    comprobacion(ts,er)
    {
        var respuesta=new simbolo(tablaTipos.tipo_error); 
        var c=this.cond.comprobacion(ts,er);
        if(c.tipo.indice==tablaTipos.booleano)
        {
            //console.log(this.valor1);
            //console.log(this.valor2);
            var v1=this.valor1.comprobacion(ts,er);
            var v2=this.valor2.comprobacion(ts,er);
            if(v1.tipo.indice==tablaTipos.error||v2.tipo.indice==tablaTipos.error)
            {}else
            {
                if(v1.tipo.indice==v2.tipo.indice&&v1.tipo.nombre==v2.tipo.nombre)
                {
                    this.tipo=v1.tipo;
                    return new simbolo(this.tipo);   
                }else
                {
                    er.addError("Tipos incompatibles: ambos valores de operacion ternaria deben ser del mismo tipo ("+v1.tipo.nombre+"!="+v2.tipo.nombre+")",
                this.linea,this.columna,this.archivo,
            "SEMANTICO");
                }
            }
        }else
        {
            er.addError("Tipos incompatibles: La condicion del if ternario debe ser tipo boolean, no "+c.tipo.nombre,
                this.linea,this.columna,this.archivo,
            "SEMANTICO");
        }
        return respuesta;
    }
    traducir(ts,traductor)
    {
        traductor.comentario("OPERACION TERNARIA");
        var tx=valores.getTemporal();
        var salida=valores.getEtiqueta();
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
        
        for(var i=0;i<c.aux.verdadero.length;i++)
        {
            traductor.imprimir_L(c.aux.verdadero[i]+":");
        }
        var v1=this.valor1.traducir(ts,traductor)
        if(v1.tipo.indice==tablaTipos.booleano)
        {
            tablaTipos.etiquetaToTemp(v1,traductor);
        }
        traductor.imprimir(tx+"="+v1.aux+";");
        traductor.imprimir("goto "+salida+";")
        for(var i=0;i<c.aux.falso.length;i++)
        {
            traductor.imprimir_L(c.aux.falso[i]+":");
        }
        var v2=this.valor2.traducir(ts,traductor)
        if(v2.tipo.indice==tablaTipos.booleano)
        {
            tablaTipos.etiquetaToTemp(v2,traductor);
        }
        traductor.imprimir(tx+"="+v2.aux+";");
        traductor.imprimir_L(salida+":");
        return  new simbolo(this.tipo,tx);   
    }
}

module.exports = o_ternario;