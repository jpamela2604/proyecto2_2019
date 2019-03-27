const valores = require("../values_manager.js");
var nodoArbol =require("../nodoArbol.js");
class oa_multi{
    constructor(op1,op2,linea,columna,archivo,hash) 
    {
        this.op1=op1;
        this.op2=op2;
        this.linea=linea; 
        this.columna=columna;
        this.archivo=archivo;
        this.hash=hash;
    }
    getTree()
    {
        var raiz =new nodoArbol("*",this.hash);
        raiz.agregarHijo(this.op1.getTree());
        raiz.agregarHijo(this.op2.getTree());
        return raiz;
    }
    traducir(ts,traductor)
    {
        var temporal=valores.getTemporal();
        traductor.imprimir(temporal+"="+this.op1.traducir(ts,traductor)+"*"+this.op2.traducir(ts,traductor));
        return temporal;
    }
}

module.exports = oa_multi;