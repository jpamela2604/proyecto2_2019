var nodoArbol =require("../nodoArbol.js");
const tablaTipos= require("../tablaTipos.js");
const simbolo=require("../../mng_ts/simbolo");
const valores = require("../values_manager.js");
const identificador=require("../../mng_ts/identificador.js");
const vari = require("../../var");
class s_declaracion{
    constructor(modificadores,tipo,declas,linea,columna,archivo,hash) 
    {
        this.modificadores=modificadores;
        this.tipo=tipo;
        this.declas=declas;
        this.linea=linea; 
        this.columna=columna;
        this.archivo=archivo; 
        this.hash=hash;
        this.IsGlobal=false;
    }
    comprobacion_global(ts,er)
    {
        if(IsGlobal)
        {
            this.testthis(ts,er);
        }
    }
    traduccion_global(ts,traductor)
    {
        if(IsGlobal)
        {
            traductor.comentario("DECLARACION");
            var visibilidad=0;
            var modificador=0;
            for(var i=0;i<this.declas.length;i++)
            {
                var mide=this.declas[i];
                var posicion=ts.getPosicion(this.IsGlobal);
                var iden=new identificador(mide.id,null);
                var simb=new simbolo(this.tipo,null,iden,tablaTipos.rol_variable,posicion,
                ts.getAmbito(this.IsGlobal),mide.noDimensiones,visibilidad,modificador
                                );
                ts.AgregarSimbolo(simb,this.IsGlobal,mide.linea,mide.columna,mide.archivo);
                ts.AumentarPos(this.IsGlobal);
                //var tx=valores.getTemporal();
                //traductor.imprimir(tx+"=p+"+posicion+";");
                if(mide.valor==null)
                {
                    traductor.imprimir("stack[p]="+this.getValorDefault()+";");

                }else
                {
                    var val=mide.valor. traducir(ts,traductor);
                    if(val.tipo.indice==tablaTipos.booleano)
                    {
                        tablaTipos.etiquetaToTemp(val,traductor);
                    }
                    traductor.imprimir("stack[p]="+val.aux+";");
                }
                traductor.imprimir("p=p+1;");
            }
        }
    }
    getTree()
    {
        var raiz =new nodoArbol("DECLARACION",this.hash);
        vari.hash++; 
        var MOD=new nodoArbol("MODIFICADORES",vari.hash);
        for(var x=0;x<this.modificadores.length;x++)
        {
            MOD.agregarHijo(tablaTipos.getMod(this.modificadores[x]));
        }
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
        raiz.agregarHijo(MOD);
        raiz.agregarHijo(type);
        raiz.agregarHijo(variables);
        return raiz;
    }
    comprobacion(ts,er)
    {
        if(!this.IsGlobal)
        {
            this.testthis(ts,er);
        }
    }
    traducir(ts,traductor)
    {
        if(!this.IsGlobal)
        {
            traductor.comentario("DECLARACION");
            var visibilidad=0;
            var modificador=0;
            for(var i=0;i<this.declas.length;i++)
            {
                var mide=this.declas[i];
                var posicion=ts.getPosicion(this.IsGlobal);
                var iden=new identificador(mide.id,null);
                var simb=new simbolo(this.tipo,null,iden,tablaTipos.rol_variable,posicion,
                ts.getAmbito(this.IsGlobal),mide.noDimensiones,visibilidad,modificador
                                );
                ts.AgregarSimbolo(simb,this.IsGlobal,mide.linea,mide.columna,mide.archivo);
                ts.AumentarPos(this.IsGlobal);
                var tx=valores.getTemporal();
                traductor.imprimir(tx+"=p+"+posicion+";");
                if(mide.valor==null)
                {
                    traductor.imprimir("stack["+tx+"]="+this.getValorDefault()+";");

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
    }

    getValorDefault()
    {
        if(this.tipo.indice==tablaTipos.entero)
        {
            return 0;
        }else if(this.tipo.indice==tablaTipos.doble)
        {
            return 0.0;
        }else if(this.tipo.indice==tablaTipos.caracter)
        {
            return tablaTipos.caracter_nulo;
        }else if(this.tipo.indice==tablaTipos.booleano)
        {
            return 0;
        }else
        {
            return tablaTipos.valor_nulo;
        }

    }

    testthis(ts,er)
    {
        if(this.tipo.indice==tablaTipos.vacio)
        {
            er.addError("void no es un tipo de variable permitida",
                this.linea,this.columna,this.archivo,
            "SEMANTICO");
            return;
        }
        
        for(var i=0;i<this.declas.length;i++)
        {
            var mide=this.declas[i];
            var visibilidad=0;
            var modificador=0;

            if(mide.valor==null)
            {
                //si se puede declarar
                //tipo,aux,id,rol,posicion,ambito,dimensiones,visibilidad,modificador)
                var posicion=0;//ts.getPosicion(this.IsGlobal);
                var iden=new identificador(mide.id,null);
                var simb=new simbolo(this.tipo,null,iden,tablaTipos.rol_variable,posicion,
                ts.getAmbito(this.IsGlobal),mide.noDimensiones,visibilidad,modificador
                );
                ts.AgregarSimbolo(simb,this.IsGlobal,mide.linea,mide.columna,mide.archivo);
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
                       
                        
                        if(tablaTipos.AsignValid(this.tipo,myval.tipo))
                        {
                            var posicion=0;//ts.getPosicion(this.IsGlobal);
                            var iden=new identificador(mide.id,null);
                            var simb=new simbolo(this.tipo,null,iden,tablaTipos.rol_variable,posicion,
                            ts.getAmbito(this.IsGlobal),mide.noDimensiones,visibilidad,modificador
                            );
                            ts.AgregarSimbolo(simb,this.IsGlobal,mide.linea,mide.columna,mide.archivo);
                        }else
                        {
                            er.addError("Tipos incompatibles: declaracion "+this.tipo.getName()+" = "+myval.tipo.getName(),this.linea,this.columna,this.archivo,
                            "SEMANTICO");
                        }
                    }
                }
            }
        }

    }
}

module.exports = s_declaracion;