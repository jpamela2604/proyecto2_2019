var nodoArbol =require("../nodoArbol.js");
const tablaTipos= require("../tablaTipos.js");
const simbolo=require("../../mng_ts/simbolo");
const valores = require("../values_manager.js");
const identificador=require("../../mng_ts/identificador.js");
const vari = require("../../var");
class s_declaracionL{
    constructor(IsFinal,tipo,declas,linea,columna,archivo,hash) 
    {
        this.IsFinal=IsFinal;
        this.tipo=tipo;
        this.declas=declas;
        this.linea=linea; 
        this.columna=columna;
        this.archivo=archivo; 
        this.hash=hash;
        this.v=null;
        //console.log(tipo);
    }
    comprobacion_global(ts,er)
    {
       
    }
    traduccion_global(ts,traductor)
    {
        
    }
    getTree()
    {
        var raiz =new nodoArbol("DECLARACION",this.hash);
        vari.hash++;
        var type=new nodoArbol("TIPO",vari.hash);
        vari.hash++;
        //console.log(this.tipo);
        var def=new nodoArbol(this.tipo.nombre,vari.hash);
        type.agregarHijo(def);
        vari.hash++;
        var variables=new nodoArbol("VARIABLES",vari.hash);
        for(var x=0;x<this.declas.length;x++)
        {
            variables.agregarHijo(this.declas[x].getTree());
        }
        //console.log(MOD);
        //console.log(type);
        //console.log(variables);
        //raiz.agregarHijo(MOD);
        raiz.agregarHijo(type);
        raiz.agregarHijo(variables);
        return raiz;
    }
    comprobacion(ts,er)
    {
        this.testthis(ts,er);
    }
    traducir(ts,traductor)
    {
        
       traductor.comentario("DECLARACION");
            var visibilidad=0;
            var modificador=0;
            for(var i=0;i<this.declas.length;i++)
            {                
                var mide=this.declas[i];
                var posicion=ts.getPosicion(false);
                var iden=new identificador(mide.id,null);
                var simb=new simbolo(mide.tipo,null,iden,tablaTipos.rol_variable,posicion,
                ts.getAmbito(false),mide.noDimensiones,visibilidad,modificador
                                );
                simb.vars=this.v;
                ts.AgregarSimbolo(simb,false,mide.linea,mide.columna,mide.archivo);
                ts.AumentarPos(false);
                
                var tx=valores.getTemporal();
                traductor.imprimir(tx+"=p+"+posicion+";");
                if(mide.valor==null)
                {
                    traductor.imprimir("stack["+tx+"]="+this.getValorDefault(mide.tipo,traductor)+";");

                }else
                {
                    var val=mide.valor. traducir(ts,traductor);
                   
                    if(val.tipo.indice==tablaTipos.booleano)
                    {
                        tablaTipos.etiquetaToTemp(val,traductor);
                    }
                    traductor.imprimir("stack["+tx+"]="+val.aux+";");
                }
            }
        
    }

    getValorDefault(tipo,traductor)
    {
        if(tipo.indice==tablaTipos.entero)
        {
            return 0;
        }else if(tipo.indice==tablaTipos.doble)
        {
            return 0.0;
        }else if(tipo.indice==tablaTipos.caracter)
        {
            return tablaTipos.caracter_nulo;
        }else if(tipo.indice==tablaTipos.booleano)
        {
            return 0;
        }else
        {
             /*var tx=valores.getTemporal();
            traductor.imprimir(tx+"=h;");
            traductor.imprimir("heap[h]="+tablaTipos.valor_nulo+";");
            traductor.imprimir("h=h+1;");
            return tx;*/
            return tablaTipos.valor_nulo;
        }

    }

    testthis(ts,er)
    {
        var miv=null;
        //comprobar que el tipo sea valido
        if(this.tipo.indice==tablaTipos.objeto)
        {
            //console.log(this.tipo);
            if(!ts.ispermitido(this.tipo.nombre))
            {
                er.addError("No se encontro la clase "+this.tipo.nombre,this.linea,this.columna,this.archivo,
                "SEMANTICO");
                return ;
            }else
            {
                miv=ts.getpermitido(this.tipo.nombre);
            }
        }else if(this.tipo.indice==tablaTipos.cadena)
        {
            miv=ts.getpermitido(this.tipo.nombre);
        }
        //console.log(this.declas);
        if(this.tipo.indice==tablaTipos.vacio)
        {
            er.addError("void no es un tipo de variable permitida",
                this.linea,this.columna,this.archivo,
            "SEMANTICO");
            return;
        }
        
        for(var i=0;i<this.declas.length;i++)
        {
            this.declas[i].setTipo(this.tipo);
            var mide=this.declas[i];
            var visibilidad=0;
            var modificador=0;

            if(mide.valor==null)
            {
                //si se puede declarar
                //tipo,aux,id,rol,posicion,ambito,dimensiones,visibilidad,modificador)
                var posicion=0;//ts.getPosicion(this.IsGlobal);
                var iden=new identificador(mide.id,null);
                var simb=new simbolo(mide.tipo,null,iden,tablaTipos.rol_variable,posicion,
                ts.getAmbito(false),mide.noDimensiones,visibilidad,modificador
                );
                simb.vars=miv;
                ts.AgregarSimbolo(simb,false,mide.linea,mide.columna,mide.archivo);
            }else
            {
                var myval=mide.valor.comprobacion(ts,er);
                if(myval.tipo.indice!=tablaTipos.error)
                {
                    if(myval.tipo.indice==tablaTipos.vacio)
                    {
                        er.addError("Se invoco a un metodo vacio",
                        mide.linea,mide.columna,mide.archivo,
                        "SEMANTICO");
                    }else
                    {
                        
                        if(tablaTipos.AsignValid(mide.tipo,myval.tipo))
                        {
                            var posicion=0;//ts.getPosicion(this.IsGlobal);
                            var iden=new identificador(mide.id,null);
                            var simb=new simbolo(mide.tipo,null,iden,tablaTipos.rol_variable,posicion,
                            ts.getAmbito(false),mide.noDimensiones,visibilidad,modificador
                            );
                            simb.vars=miv;
                            ts.AgregarSimbolo(simb,false,mide.linea,mide.columna,mide.archivo);

                        }else
                        {
                            //console.log(myval);
                            er.addError("Tipos incompatibles: declaracion "+mide.tipo.getName()+" = "+myval.tipo.getName(),this.linea,this.columna,this.archivo,
                            "SEMANTICO");
                        }
                    }
                }
            }
        }
        this.v=miv;
    }
}

module.exports = s_declaracionL;