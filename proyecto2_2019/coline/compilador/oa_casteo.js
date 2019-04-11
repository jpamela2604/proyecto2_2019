
var nodoArbol =require("../nodoArbol.js");
const tablaTipos= require("../tablaTipos.js");
var simbolo = require("../../mng_ts/simbolo.js");
const oa_casteotoChar=require("./oa_casteotoChar.js");
const oa_casteotoDoble=require("./oa_casteotoDoble.js");
const oa_casteotoInt=require("./oa_casteotoInt.js");
const oa_casteotoString=require("./oa_casteotoString");
class oa_casteo{
    constructor(tipo,valor,linea,columna,archivo,hash) 
    {
        this.tipo=tipo;
        this.valor=valor;
        this.linea=linea; 
        this.columna=columna;
        this.archivo=archivo;
        this.hash=hash;
        this.casting=null;
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
        if(this.tipo.indice==tablaTipos.entero)
        {
            this.casting=new oa_casteotoInt(this.valor,this.linea,this.columna,this.archivo,this.hash);
            respuesta=this.casting.comprobacion(ts,er);
        }else if(this.tipo.indice==tablaTipos.cadena)
        {
            this.casting=new oa_casteotoString(this.valor,this.linea,this.columna,this.archivo,this.hash);
            respuesta=this.casting.comprobacion(ts,er);
        }else if(this.tipo.indice==tablaTipos.doble)
        {
            this.casting=new oa_casteotoDoble(this.valor,this.linea,this.columna,this.archivo,this.hash);
            respuesta=this.casting.comprobacion(ts,er);
        }else if(this.tipo.indice==tablaTipos.caracter)
        {
            this.casting=new oa_casteotoChar(this.valor,this.linea,this.columna,this.archivo,this.hash);
            respuesta=this.casting.comprobacion(ts,er);
        }else
        {
            er.addError("Casteo invalido ("+this.tipo.nombre+")",this.linea,this.columna,this.archivo,
            "SEMANTICO");   
        }
        return respuesta;
    }
    traducir(ts,traductor)
    {
        return this.casting.traducir(ts,traductor);
    }
}

module.exports = oa_casteo;

/**
 * char=string
 * char=int         done
 * char=doble       done
 * string=char      done
 * string=doble     done
 * string=int       done
 * int=doble        done
 * int=string
 * doble=string 
 */