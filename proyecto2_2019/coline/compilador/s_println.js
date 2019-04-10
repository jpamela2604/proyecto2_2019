var nodoArbol =require("../nodoArbol.js");
const etiqueta= require("../etiqueta.js");
const tablaTipos= require("../tablaTipos.js");
const valores = require("../values_manager.js");
const s_print=require("./s_print.js");
class s_println{
    constructor(valor,linea,columna,archivo,hash) 
    {
        this.valor=valor;
        this.linea=linea; 
        this.columna=columna;
        this.archivo=archivo;
        this.hash=hash;
        this.otro=null;
    }
    comprobacion_global(ts,er)
    {

    }
    traduccion_global(ts,traductor)
    {
        
    }
    getTree()
    {
        var raiz =new nodoArbol("println",this.hash);
        raiz.agregarHijo(this.valor.getTree());
        return raiz;
    }
    comprobacion(ts,er)
    {
        this.otro=new s_print(this.valor,this.linea,this.columna,this.archivo,this.hash);
        this.otro.texto="println";
        this.otro.comprobacion(ts,er);

    }
    traducir(ts,traductor)
    {
        this.otro.traducir(ts,traductor);
        traductor.imprimir("print(\"%c\",10);");  
    }
        
    
}

module.exports = s_println;