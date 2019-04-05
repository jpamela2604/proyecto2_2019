
var nodoArbol =require("../nodoArbol.js");
class s_continue{
    constructor(linea,columna,archivo,hash) 
    {
        this.linea=linea; 
        this.columna=columna;
        this.archivo=archivo;
        this.hash=hash;
    }
    getTree()
    {
        var raiz =new nodoArbol("CONTINUE",this.hash);
        
        return raiz;
    }
    comprobacion(ts,er)
    {
        if(!(ts.displayContinue.hasElements()))
        {
            er.addError("continue fuera de ciclo",this.linea,this.columna,this.archivo,
            "SEMANTICO");
        }
    }
    traducir(ts,traductor)
    {
        traductor.comentario("sentencia continue");
        var miNodo=ts.displayContinue.getTopElement();
        traductor.imprimir("goto "+miNodo.etiqueta+";");
    }
}

module.exports = s_continue;