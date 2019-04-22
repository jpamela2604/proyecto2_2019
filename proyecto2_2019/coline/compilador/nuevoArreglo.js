
var nodoArbol =require("../nodoArbol.js");
const tablaTipos= require("../tablaTipos.js");
const nodoTipo=require("../../mng_ts/nodoTipo.js");
const valores = require("../values_manager.js");
var simbolo = require("../../mng_ts/simbolo.js");
class nuevoArreglo{
    constructor(tipo,dimensiones,linea,columna,archivo,hash) 
    {
        this.tipo=tipo;
        this.dimensiones=dimensiones;
        this.linea=linea; 
        this.columna=columna;
        this.archivo=archivo;
        this.hash=hash;
        this.elsimb=null;
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
        var respuesta=new simbolo(tablaTipos.tipo_error);
        //comprobar que sea un tipo permitido

        //comprobar que todo lo de las dimensiones sea de tipo entero
        for(var x=0;x<this.dimensiones.length;x++)
        {
            var s=this.dimensiones[x].comprobacion(ts,er);
            if(s.tipo.indice==tablaTipos.error)
            {
                return respuesta;
            }else if(s.tipo.indice!=tablaTipos.entero)
            {
                er.addError("Tipos incompatibles: el tamaño de acceso de un arreglo no puede ser tipo "+s.tipo.getName(),this.linea,this.columna,this.archivo,
                            "SEMANTICO");
                return respuesta;
            }
        }
        var nuevo=new nodoTipo(tablaTipos.arreglo,"",this.tipo);
        nuevo.dimen=this.dimensiones.length;
        this.elsimb=new simbolo(nuevo);
        return this.elsimb;

    }
    traducir(ts,traductor)
    {
        var tx=valores.getTemporal();
        traductor.imprimir(tx+"=h;");
        for(var x=0;x<this.dimensiones.length;x++)
        {
            var v=this.dimensiones[x].traducir(ts,traductor);
            traductor.imprimir("heap[h]="+v.aux+";");
            traductor.imprimir('h=h+1;');
        }
        var tsim=valores.getTemporal();var tp1=valores.getTemporal();var tp2=valores.getTemporal();
        var tp3=valores.getTemporal();var tp4=valores.getTemporal();
        var r=valores.getTemporal();

        traductor.imprimir(tsim+"=p+"+ts.getTamActual()+";");
        traductor.imprimir(tp1+"="+tsim+"+1;");
        traductor.imprimir("stack["+tp1+"]="+0+";");
        traductor.imprimir(tp2+"="+tsim+"+2;");
        traductor.imprimir("stack["+tp2+"]="+tx+";");
        traductor.imprimir(tp3+"="+tsim+"+3;");
        traductor.imprimir("stack["+tp3+"]="+this.dimensiones.length+";");
        traductor.imprimir(tp4+"="+tsim+"+4;");
        traductor.imprimir("stack["+tp4+"]="+this.getValorDefault()+";");

        traductor.imprimir("p=p+"+ts.getTamActual()+";");
        traductor.imprimir("call initArray();");
        traductor.imprimir(r+"=stack[p];");
        traductor.imprimir("p=p-"+ts.getTamActual()+";");
        this.elsimb.aux=r;
        return this.elsimb;

    }

    getValorDefault()
    {
        if(this.tipo.indice==tablaTipos.entero)
        {
            return 0;
        }else if(this.tipo.indice==tablaTipos.doble)
        {
            return 0.0;
        }else if(this.tipo.indice==tablaTipos.caracter)
        {
            return tablaTipos.caracter_nulo;
        }else if(this.tipo.indice==tablaTipos.booleano)
        {
            return 0;
        }else
        {
            return tablaTipos.valor_nulo;
        }

    }
}

module.exports = nuevoArreglo;