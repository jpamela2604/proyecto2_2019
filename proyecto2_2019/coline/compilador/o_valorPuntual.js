var nodoArbol =require("../nodoArbol.js");
class o_valorPuntual{
    constructor(valor,linea,columna,archivo,hash) 
    {
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
    traducir(ts,traductor)
    {
        return this.valor;
    }
}

module.exports = o_valorPuntual;