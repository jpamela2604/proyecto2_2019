const valores = require("../values_manager.js");
var nodoArbol =require("../nodoArbol.js");
const tablaTipos= require("../tablaTipos.js");
var simbolo = require("../../mng_ts/simbolo.js");
const vari=require("../../var.js");
class s_retornoEmpty{
    constructor(linea,columna,archivo,hash) 
    {
        this.linea=linea; 
        this.columna=columna;
        this.archivo=archivo;
        this.hash=hash;
    }
    getTree()
    {
        var raiz =new nodoArbol("RETORNO",this.hash);
        
        return raiz;
    }
    comprobacion(ts,er)
    {
        if(!(ts.displayRetornos.hasElements()))
        {
            er.addError("return fuera de metodo",this.linea,this.columna,this.archivo,
            "SEMANTICO");
        }else 
        {
            var  miNodo=ts.displayRetornos.getTopElement();
            miNodo.vino=true;
            if(miNodo.tipo.indice!=tablaTipos.vacio)
            {
                er.addError("Falta el valor de retorno",this.linea,this.columna,this.archivo,
                "SEMANTICO");
            }
        }
    }
    traducir(ts,traductor)
    {
        traductor.comentario("sentencia return");
        var miNodo=ts.displayRetornos.getTopElement();
        traductor.imprimir("goto "+miNodo.etiqueta+";");
    }
}

module.exports = s_retornoEmpty;