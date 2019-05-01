
var nodoArbol =require("../nodoArbol.js");
const tablaTipos= require("../tablaTipos.js");
const simbolo=require("../../mng_ts/simbolo");
const nodoTipo=require("../../mng_ts/nodoTipo.js")
class s_arregloV{
    constructor(val) 
    {
        this.val=val;
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
        var raiz =new nodoArbol("BREAK",this.hash);
        
        return raiz;
    }
    comprobacion(ts,er)
    {       
        var tipo=this.val.comprobacion(ts,er);
        if(tipo.indice==tablaTipos.error)
        {
            return new simbolo(tipo);
        }else
        {
           // console.log(tipo);
            var nuevo=new nodoTipo(tablaTipos.arreglo,"",tipo);
            
            nuevo.dimen=tipo.dimension;
            nuevo.tam=new Array();
            for(var x=0;x<tipo.tam.length;x++)
            {
                nuevo.tam.push(tipo.tam[tipo.tam.length-1-x]);
            }
            tipo.tipo.tam=nuevo.tam;
            tipo.tipo.dimen=nuevo.dimen;
            nuevo.tipoArr=tipo.tipo;
           // console.log(nuevo);
           this.elsimb=new simbolo(nuevo);
            //console.log(tipo);
           //console.log(tipo.indice+"="+tablaTipos.objeto);
           if(tipo.tipo.indice==tablaTipos.objeto)
           {
            
                this.elsimb.vars=ts.getpermitido(tipo.tipo.nombre);
                
            }
            return this.elsimb;
        }

    }

    traducir(ts,traductor)
    {
        var t=this.val.traducir(ts,traductor);
        this.elsimb.aux=t;
        return this.elsimb;
    }
}

module.exports = s_arregloV;