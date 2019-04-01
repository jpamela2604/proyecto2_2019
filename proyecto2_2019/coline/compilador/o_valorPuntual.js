var nodoArbol =require("../nodoArbol.js");
var simbolo = require("../../mng_ts/simbolo.js");
class o_valorPuntual{
    constructor(tipo,valor,linea,columna,archivo,hash) 
    {
        this.tipo=tipo;
        this.valor=valor;
        this.linea=linea; 
        this.columna=columna;
        this.archivo=archivo;
        this.hash=hash;
    }
    getTree()
    {
        return new nodoArbol(this.valor,this.hash);
    }
    comprobacion(ts,er)
    {  
        return new simbolo(this.tipo);
    }
    traducir(ts,traductor)
    {
        return new simbolo(this.tipo,this.valor);
    }
}

module.exports = o_valorPuntual;