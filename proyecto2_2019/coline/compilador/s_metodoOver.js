
var identificador=require("../../mng_ts/identificador.js");
const simbolo=require("../../mng_ts/simbolo");
const tablaTipos= require("../tablaTipos.js");
const valores = require("../values_manager.js");
const nodoDisplay=require("../nodoDisplay.js");
const vari = require("../../var");
const nodoArbol =require("../nodoArbol.js");
class s_metodoOver{
    constructor(modificadores,tipo,id,parametros,noDimensiones,sentencias,
        linea,columna,archivo,hash) 
    {
        this.isAbstract=false;
        this.id=id;
        this.sentencias=sentencias;
        this.parametros=parametros;
        this.mods=modificadores;
        this.tipo=tipo;
        this.noDimensiones=noDimensiones;
        this.linea=linea; 
        this.columna=columna;
        this.archivo=archivo;
        this.hash=hash;
        this.iden=null;
        this.sim=null;
    }
    comprobacion_global(ts,er)
    {
        var auxil=null;
        if(this.tipo.indice==tablaTipos.objeto)
        {
           // console.log(this.tipo);
            if(!ts.ispermitido(this.tipo.nombre))
            {
                er.addError("No se encontro la clase "+this.tipo.nombre,this.linea,this.columna,this.archivo,
                "SEMANTICO");
                return ;
            }else
            {
                auxil=ts.getpermitido(this.tipo.nombre);
            }
        }else if(this.tipo.indice==tablaTipos.arreglo)
        {
            if(this.tipo.tipoArr.indice==tablaTipos.objeto)
            {
                if(!ts.ispermitido(this.tipo.tipoArr.nombre))
                {
                    er.addError("No se encontro la clase "+this.tipo.tipoArr.nombre,this.linea,this.columna,this.archivo,
                    "SEMANTICO");
                    return ;
                }else
                {
                    auxil=ts.getpermitido(this.tipo.tipoArr.nombre);
                }
            }
        }
        

        if(this.testMethod(ts,er))
        {
            this.iden =new identificador(this.id,this.parametros);
            //tipo,aux,id,rol,posicion,ambito,dimensiones,visibilidad,modificador,pert
            var simb=new simbolo(this.tipo,null,this.iden,tablaTipos.rol_metodo,-1,
            ts.getAmbito(true),this.noDimensiones,this.visibilidad,null,ts.claseActual.nombre
            );
            simb.IsStatic=this.IsStatic;
            simb.IsFinal=this.IsFinal;
            simb.IsAbstract=this.isAbstract;
            simb.vars=auxil;
            //simb.pert=ts.claseActual.nombre;            
            this.sim=simb;
            //buscar el metodo en lo super
            var r=ts.super;
            var aux=null;
           
            for(var x=r.size();x>0;x--)
            {              
                
                var g=r.get(x-1);              
                if(g.hasItem(simb.getNombre()))
                {
                    aux= g.getItem(simb.getNombre());
                }
            }  
            //si si existe preguntar si ambos son estaticos
            var bandera=true;
            if(aux==null)
            {
                er.addError("No hay metodo que sobreescribir ",this.linea,this.columna,this.archivo,
            "SEMANTICO");
            bandera=false;
            }else if(aux.IsStatic)
            {
                er.addError("No se puede sobreescribir un metodo estatico ",this.linea,this.columna,this.archivo,
            "SEMANTICO");
            }else if(!(aux.visibilidad=="public"||aux.visibilidad=="protected"))
            {
                er.addError("La visibilidad de la clase superior no permite sobreescribir el metodo",this.linea,this.columna,this.archivo,
            "SEMANTICO");
            }

            //comprobar y/o agregar a la tabla de globales actual
            if(bandera)
            {ts.AgregarSimbolo(simb,true,this.linea,this.columna,this.archivo);}
         
        }
    }
    traduccion_global(ts,traductor)
    {
        
    }
    getTree()
    {
        var raiz =new nodoArbol("FUNCION",this.hash);
        var type=this.tipo.nombre;
        for(var i=0;i<this.noDimensiones;i++)
        {
            type=type+"[]";
        }
        vari.hash++; 
        var tipo= new nodoArbol(type,vari.hash);
        raiz.agregarHijo(tipo);
        vari.hash++; 
        var name =new nodoArbol(this.id,vari.hash);
        raiz.agregarHijo(name);
        vari.hash++; 
        var mypar=new nodoArbol("PARAMETROS",vari.hash);
        for(var w=0;w<this.parametros.length;w++)
        {
            vari.hash++;
            var p=new nodoArbol("PARAMETRO",vari.hash);
            vari.hash++
            var myt=new nodoArbol(this.parametros[w].tipo.nombre,vari.hash);
            vari.hash++
            var myn=new nodoArbol(this.parametros[w].nombre,vari.hash);
            p.agregarHijo(myt);
            p.agregarHijo(myn);
            mypar.agregarHijo(p);
        }
        raiz.agregarHijo(mypar);
        vari.hash++;
        var sent =new nodoArbol("LSENT",vari.hash);
        for(var i=0;i<this.sentencias.length;i++)
        {
            var apo=this.sentencias[i].getTree();
            //console.log(apo);
            sent.agregarHijo(apo);
        }
        raiz.agregarHijo(sent);
        return raiz;
    }
    comprobacion(ts,er)
    {
        ts.metodoActual=this.sim;
        //guardar una pseudo etiqueta de salida
        var minodo=new nodoDisplay("c",this.tipo);
        //guardar en el display para encontrar el return etiqueta,tipo        
        ts.displayRetornos.push(minodo);
        //cambiar de ambito
        ts.cambiarAmbito(true);
        //declarar el return
        var identif=new identificador("return",null);
        var posicion=ts.getPosicion(false);
        var simb=new simbolo(this.tipo,null,identif,tablaTipos.rol_variable,posicion,
        ts.getAmbito(false),this.noDimensiones,"publico");
        ts.AgregarSimbolo(simb,false,this.linea,this.columna,this.archivo);
        ts.AumentarPos(false);
        //declarar el this
        var ti=tablaTipos.getTipoObjeto(ts.claseActual.nombre);
        identif=new identificador("this",null);
        posicion=ts.getPosicion(false);
        simb=new simbolo(ti,null,identif,tablaTipos.rol_variable,posicion,
            ts.getAmbito(false),0,"publico");
            ts.AgregarSimbolo(simb,false,this.linea,this.columna,this.archivo);
            ts.AumentarPos(false);
        simb.vars=ts.getpermitido(ts.claseActual.nombre);
        //declarar los parametros        
        for(var y=0;y<this.parametros.length;y++)
        {
            var mide=this.parametros[y];
            var posicion=ts.getPosicion(false);
            var iden=new identificador(mide.nombre,null);
            //tipo,aux,id,rol,posicion,ambito,dimensiones,visibilidad,modificador
            var simb=new simbolo(mide.tipo,null,iden,tablaTipos.rol_variable,posicion,
            ts.getAmbito(false),mide.noDimensiones,"publico");
            ts.AgregarSimbolo(simb,false,mide.linea,mide.columna,mide.archivo);
            ts.AumentarPos(false);
        }

        
        //ejecutar sentencias
        for(var j=0;j<this.sentencias.length;j++)
        {
            this.sentencias[j].comprobacion(ts,er);
        }
        //regresar de ambito
        ts.regresarAmbito(true);
        //sacar la etiqueta de salida        
        //comprobar que si necesitaba un retorno si venga
        if(!(ts.displayRetornos.pop().vino)&&this.tipo.indice!=tablaTipos.vacio)
        {
            er.addError("Falta return",this.linea,this.columna,this.archivo,
            "SEMANTICO");
        }

    }
    traducir(ts,traductor)
    {
       
        if(!this.isAbstract)
        {
            valores.iniciarLista();
            traductor.imprimirHead("void "+this.sim.firma.substring(1,this.sim.firma.length-1)+"(){");            
            //cambiar ambito
            ts.cambiarAmbito(true);
            //declarar el retorno
            var iden=new identificador("return",null);
            var posicion=ts.getPosicion(false);
            var simb=new simbolo(this.tipo,null,iden,tablaTipos.rol_variable,posicion,
            ts.getAmbito(false),this.noDimensiones,this.visibilidad);
            ts.AgregarSimbolo(simb,false,this.linea,this.columna,this.archivo);
            ts.AumentarPos(false);
            //declarar el this
            var ti=tablaTipos.getTipoObjeto(ts.claseActual.nombre);
            var identif=new identificador("this",null);
            posicion=ts.getPosicion(false);
            var simb=new simbolo(ti,null,identif,tablaTipos.rol_variable,posicion,
                ts.getAmbito(false),0,"publico");
                ts.AgregarSimbolo(simb,false,this.linea,this.columna,this.archivo);
                ts.AumentarPos(false);
            simb.vars=ts.getpermitido(ts.claseActual.nombre);
            //declarar los parametros
            for(var y=0;y<this.parametros.length;y++)
            {
                var mide=this.parametros[y];
                var posicion=ts.getPosicion(false);
                var iden=new identificador(mide.nombre,null);
                //tipo,aux,id,rol,posicion,ambito,dimensiones,visibilidad,modificador
                var simb=new simbolo(mide.tipo,null,iden,tablaTipos.rol_variable,posicion,
                ts.getAmbito(false),mide.noDimensiones,"publico");
                ts.AgregarSimbolo(simb,false,mide.linea,mide.columna,mide.archivo);
                ts.AumentarPos(false);
            }
            //generar la etiqueta de salida
            var salida=valores.getEtiqueta();
            //guardarla en el display
            var minodo2=new nodoDisplay(salida);
            ts.displayRetornos.push(minodo2);
            //console.log(this.sentencias);
            for(var x=0;x<this.sentencias.length;x++)
            {
                this.sentencias[x].traducir(ts,traductor);
            }
            //regresar ambito
            ts.regresarAmbito(true);
            //escribir la etiqueta de salida
            traductor.imprimir_L(ts.displayRetornos.pop().etiqueta+":");
            traductor.imprimirHead("}");
        }
    }
    testMethod(ts,er)
    {   var n1=0;var n2=0;var n3=0; var n4=0;
        for(var x=0;x<this.mods.length;x++)
        {
            if(this.mods[x]==tablaTipos.estatico)
            {
                this.IsStatic=true;  n1++;
            }else if(this.mods[x]==tablaTipos.abstracto)
            {
                this.IsAbstract=true; n4++;
                
            }else if(this.mods[x]==tablaTipos.ffinal)
            {
                this.IsFinal=true; n3++;
            }else if(this.mods[x]==tablaTipos.publico)
            {
                this.visibilidad="public";  n2++;
            }else if(this.mods[x]==tablaTipos.protegido)
            {
                this.visibilidad="protected";  n2++;
            }else if(this.mods[x]==tablaTipos.privado)
            {
                this.visibilidad="private";  n2++;
            }
        }
        if(n1>1)
        {
            er.addError("(method override)Modificador static repetido",this.linea,this.columna,this.archivo,
            "SEMANTICO");
        }else if(n2>1)
        {
            er.addError("(method override)Modificador de visibilidad repetido",this.linea,this.columna,this.archivo,
            "SEMANTICO");
        }else if(n3>1)
        {
            er.addError("(method override)Modificador final repetido",this.linea,this.columna,this.archivo,
            "SEMANTICO");
        }else if(n4>1)
        {
            er.addError("(method override)Modificador abstract repetido",this.linea,this.columna,this.archivo,
            "SEMANTICO");
        }
        else
        {
            return true;
        }
        return false;
    }
}

module.exports = s_metodoOver;