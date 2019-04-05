const valores = require("../values_manager.js");
var nodoArbol =require("../nodoArbol.js");
const tablaTipos= require("../tablaTipos.js");
var simbolo = require("../../mng_ts/simbolo.js");
const vari=require("../../var.js");
class s_retorno{
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
        var raiz =new nodoArbol("RETORNO",this.hash);
        raiz.agregarHijo(this.valor.getTree());
        
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
            var v=this.valor.comprobacion(ts,er);
            var  miNodo=ts.displayRetornos.getTopElement();
            miNodo.vino=true;
            if(!(miNodo.tipo.indice==v.tipo.indice&&miNodo.tipo.nombre==v.tipo.nombre))
            {
                if(miNodo.tipo.indice==tablaTipos.vacio)
                {
                    er.addError("valor inesperado en el return",this.linea,this.columna,this.archivo,
                "SEMANTICO");
                }else
                {
                    er.addError("return: "+v.tipo.nombre+" no puede ser convertido a tipo "+miNodo.tipo.nombre,
                    this.linea,this.columna,this.archivo,
                "SEMANTICO");
                }
                
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

module.exports = s_retorno;