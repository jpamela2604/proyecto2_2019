
var nodoArbol =require("../nodoArbol.js");
class s_break{
    constructor(linea,columna,archivo,hash) 
    {
        this.linea=linea; 
        this.columna=columna;
        this.archivo=archivo;
        this.hash=hash;
    }
    getTree()
    {
        var raiz =new nodoArbol("BREAK",this.hash);
        
        return raiz;
    }
    comprobacion(ts,er)
    {
        if(!(ts.displayBreaks.hasElements()))
        {
            er.addError("break fuera de ciclo",this.linea,this.columna,this.archivo,
            "SEMANTICO");
        }
    }
    traducir(ts,traductor)
    {
        traductor.comentario("sentencia break");
        var miNodo=ts.displayBreaks.getTopElement();
        traductor.imprimir("goto "+miNodo.etiqueta+";");
    }
}

module.exports = s_break;