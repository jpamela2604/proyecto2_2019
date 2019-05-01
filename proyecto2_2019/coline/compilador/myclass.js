
var nodoArbol =require("../nodoArbol.js");
const simbolo=require("../../mng_ts/simbolo");
const vari=require("../../var.js");
const clase=require("../../mng_ts/clase");
const tablaTipos= require("../tablaTipos.js");
const s_declaracionG=require("./s_declaracionG.js");
var identificador=require("../../mng_ts/identificador.js");
class myclass{
    constructor(mods,id,extiende,sentencias,linea,columna,archivo,hash) 
    {
        this.mods=mods;
        this.id=id;
        this.extiende=extiende;
        this.sentencias=sentencias;
        this.linea=linea; 
        this.columna=columna;
        this.archivo=archivo;
        this.hash=hash;
        this.IsStatic=false;
        this.visibilidad="publico";
        this.IsFinal=false;
        this.IsAbstract=false;
        this.clase=null;
        this.AgregoVacio=false;
    }
    crearCl(ts,er)
    {
        if(this.testClass(ts,er))
        {
            var cl=new clase(this.id,null,this.visibilidad,ts.tipoClase);
            cl.IsStatic=this.IsStatic;
            cl.IsFinal=this.IsFinal;
            cl.IsAbstract=this.IsAbstract;
            this.clase=cl;
            return this.clase;
        }
        return null;
    }
    agregarExtend(ts,er)
    {
        ts.claseActual=this.clase;
        ts.globales=this.clase.globales;
        this.ambitoActual=this.clase.globales;
        ts.tiposPermitidos=this.clase.tipos;
        
        if(this.extiende==null)
        {
            var padre=ts.getpermitido("Object");
            padre.hijos.push(this.clase);
            this.clase.padre=padre;
        }else
        {
            var padre=ts.getpermitido(this.extiende);
            if(padre==null)
            {
                er.addError("No se encontro la clase "+this.extiende+", que se desea extender",this.linea,this.columna,this.archivo,
                        "SEMANTICO");
                this.clase=null;
            }
            if (padre.IsAbstract)
            {
                er.addError("No se puede extender la clase "+this.extiende+", porque es final",this.linea,this.columna,this.archivo,
                "SEMANTICO");
                this.clase=null;
            }else
            {
                padre.hijos.push(this.clase);
                this.clase.padre=padre;
                return;
            }

        }
    }
    comprobacion_global(ts,er)
    {
        //agregar al padre
        if(this.clase==null)
        {

        }else
        {
            //colocar la de globales y la de tipos
            ts.claseActual=this.clase;
            ts.globales=this.clase.globales;
            ts.tiposPermitidos=this.clase.tipos;
            //guardar sus metodos, constructores y main
            for(var x=0;x<this.sentencias.length;x++)
            {
                var a=this.sentencias[x];
                if(!(a instanceof s_declaracionG))
                {
                    a.comprobacion_global(ts,er);
                }
            }
            
            //si no tiene ningun constructor agregar el constructor vacio;
            //console.log(this.clase.globales);
            if(!this.clase.TieneConstructor)
            {              
                this.iden =new identificador(this.clase.nombre,new Array());
                var simb=new simbolo(tablaTipos.tipo_vacio,null,this.iden,tablaTipos.rol_constructor,-1,
                    ts.getAmbito(true),0,this.visibilidad,null
                    );
                ts.AgregarSimbolo(simb,true,this.linea,this.columna,this.archivo);
                this.AgregoVacio=true;
            }
            //console.log(this.clase.globales);
            //guardas las variables globales   
            
            for(var x=0;x<this.sentencias.length;x++)
            {
                var a=this.sentencias[x];
                if(a instanceof s_declaracionG)
                {
                    a.comprobacion_global(ts,er);
                }
            }
            this.clase.tam=ts.contadorGlobales;
            ts.contadorGlobales=0;
        }
    }
    traduccion_global(ts,traductor)
    {
        ts.claseActual=this.clase;
        ts.globales=this.clase.globales;
        ts.tiposPermitidos=this.clase.tipos;

        traductor.imprimirHead("void "+this.id+"_def"+"(){");
        traductor.imprimir("h=h+"+ts.contadorGlobales+";");
        for(var x=0;x<this.sentencias.length;x++)
        {
            this.sentencias[x].traduccion_global(ts,traductor);
        }
        traductor.imprimirHead("}");
        if(this.AgregoVacio)
        {
            traductor.imprimirHead("void "+this.id+"(){");
            traductor.imprimirHead("}");
        }
        
    }
    getTree()
    {
        
        var raiz =new nodoArbol("CLASS",this.hash);
        vari.hash++;
        var myid=new nodoArbol(this.id,vari.hash);        
        raiz.agregarHijo(myid);
        if(this.extiende!=null)
        {
            vari.hash++;
            var ex=new nodoArbol(this.extiende,vari.hash);
            raiz.agregarHijo(ex);
        }
        vari.hash++;
        var sent =new nodoArbol("LSENT",vari.hash);
        for(var i=0;i<this.sentencias.length;i++)
        {
            sent.agregarHijo(this.sentencias[i].getTree());
        }
        raiz.agregarHijo(sent);
        return raiz;
    }
    comprobacion(ts,er)
    {
        ts.claseActual=this.clase;
        ts.globales=this.clase.globales;
        ts.tiposPermitidos=this.clase.tipos;
        for(var x=0;x<this.sentencias.length;x++)
        {
            this.sentencias[x].comprobacion(ts,er);
        }
    }
    traducir(ts,traductor)
    {
        ts.claseActual=this.clase;
        ts.globales=this.clase.globales;
        ts.tiposPermitidos=this.clase.tipos;
        //si no tiene ningun constructor agregar el constructor vacio;
        if(this.AgregoVacio)
        {
            
        }
        for(var x=0;x<this.sentencias.length;x++)
        {
            this.sentencias[x].traducir(ts,traductor);
        }

    }
    
    testClass(ts,er)
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
            er.addError("(Class)Modificador static repetido",this.linea,this.columna,this.archivo,
            "SEMANTICO");
        }else if(n2>1)
        {
            er.addError("(Class)Modificador de visibilidad repetido",this.linea,this.columna,this.archivo,
            "SEMANTICO");
        }else if(n3>1)
        {
            er.addError("(Class)Modificador final repetido",this.linea,this.columna,this.archivo,
            "SEMANTICO");
        }else if(n4>1)
        {
            er.addError("(Class)Modificador abstract repetido",this.linea,this.columna,this.archivo,
            "SEMANTICO");
        }
        else
        {
            return true;
        }
        return false;
    }
}

module.exports = myclass;