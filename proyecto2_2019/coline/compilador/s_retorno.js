const valores = require("../values_manager.js");
var nodoArbol =require("../nodoArbol.js");
const tablaTipos= require("../tablaTipos.js");
var simbolo = require("../../mng_ts/simbolo.js");
const vari=require("../../var.js");
const identificador=require("../../mng_ts/identificador.js");
class s_retorno{
    constructor(valor,linea,columna,archivo,hash) 
    {
        this.valor=valor;
        this.linea=linea; 
        this.columna=columna;
        this.archivo=archivo;
        this.hash=hash;
    }
    comprobacion_global(ts,er)
    {

    }
    traduccion_global(ts,traductor)
    {
        
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
            /*console.log(miNodo.tipo);
            console.log(v.tipo);*/
            if(miNodo.tipo.indice==tablaTipos.vacio)
            {
                er.addError("valor inesperado en el return",this.linea,this.columna,this.archivo,
                "SEMANTICO");
            }else
            {
                if(!(tablaTipos.AsignValid(miNodo.tipo,v.tipo)))
                {
                    er.addError("valor de returno "+v.tipo.getName()+" no puede ser convertido a tipo "+miNodo.tipo.getName(),
                    this.linea,this.columna,this.archivo,
                "SEMANTICO");
                }   
            }
            
        }
    }
    traducir(ts,traductor)
    {
        traductor.comentario("sentencia return");
        //devolver el valor
        var tw=valores.getTemporal();
        var iden=new identificador("return",null);
        var simb=new simbolo(null,null,iden,tablaTipos.rol_variable);
        var r=ts.BuscarSimbolo(simb,this.linea,this.columna,this.archivo);
        traductor.imprimir(tw+"=p+"+r.posicion+";");
        var val=this.valor.traducir(ts,traductor);
        if(val.tipo.indice==tablaTipos.booleano)
        {
            tablaTipos.etiquetaToTemp(val,traductor);
        }
        traductor.imprimir("stack["+tw+"]="+val.aux+";");


        var miNodo=ts.displayRetornos.getTopElement();
        traductor.imprimir("goto "+miNodo.etiqueta+";");
    }
}

module.exports = s_retorno;