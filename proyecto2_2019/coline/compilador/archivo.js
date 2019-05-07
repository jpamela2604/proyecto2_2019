
var nodoArbol =require("../nodoArbol.js");
const vari=require("../../var.js");
const Hashtable=require("../../hashtable");
const clase=require("../../mng_ts/clase");
const identificador=require("../../mng_ts/identificador");
const simbolo=require("../../mng_ts/simbolo");
const tablaTipos=require("../tablaTipos")
const parametro=require("../../mng_ts/parametro");
const nodoTipo=require("../../mng_ts/nodoTipo");
class archivo{
    constructor(importaciones,clases,linea,columna,archivo,hash) 
    {
        this.importaciones=importaciones;
        this.clases=clases;
        this.linea=linea; 
        this.columna=columna;
        this.archivo=archivo;
        this.hash=hash;

    }
    comprobacion_global(ts,er)
    {
        var tiposGlobales=this.iniciarTiposPermitidos(ts);
        //guardar nombres de las clases a utilizar
        for(var x=0;x<this.clases.length;x++)
        {
            var t=this.clases[x].crearCl(ts,er);
            if(t!=null)
            {
                tiposGlobales.setItem(t.nombre,t);
                //console.log(t);
            }
        }      
        //heredar
        
        for(var x=0;x<this.clases.length;x++)
        {
            this.clases[x].clase.tipos=tiposGlobales;
            var t=this.clases[x].agregarExtend(ts,er);
            if(t!=null)
            {
                tiposGlobales.setItem(t.nombre,t);
            }
        }
        //comprobar
        for(var x=0;x<this.clases.length;x++)
        {
            this.clases[x].comprobacion_global(ts,er);
        }
          
    }

    traduccion_global(ts,traductor)
    {
        for(var x=0;x<this.clases.length;x++)
        {
            this.clases[x].traduccion_global(ts,traductor);
        }
    }
    getTree()
    {
        var raiz =new nodoArbol("ARCHIVO",this.hash);
        if(this.importaciones.length>0)
        {vari.hash++;
        var imports=new nodoArbol("IMPORTS", vari.hash);     
        
        for(var x=0;x<this.importaciones.length;x++)
        {
            imports.agregarHijo(this.importaciones[x].getTree());
        }
        raiz.agregarHijo(imports);
        }
        if(this.clases.length>0)
        {
        vari.hash++;
        var clases=new nodoArbol("CLASES", vari.hash); 
        for(var x=0;x<this.clases.length;x++)
        {
            clases.agregarHijo(this.clases[x].getTree());
        }
        
        raiz.agregarHijo(clases);
        }
        return raiz;
    }
    comprobacion(ts,er)
    {
        for(var x=0;x<this.clases.length;x++)
        {
            this.clases[x].comprobacion(ts,er);
        }
    }
    traducir(ts,traductor)
    {
        for(var x=0;x<this.clases.length;x++)
        {
            this.clases[x].traducir(ts,traductor);
        }
    }
    iniciarTiposPermitidos(ts)
    {
        var tiposPermitidos=new Hashtable();  
        var obj=this.agregarClaseObject(tiposPermitidos,ts);
        this.agregarClaseArray(obj,tiposPermitidos,ts);
        this.agregarClaseString(obj,tiposPermitidos,ts); 
        return  tiposPermitidos;
    }
    agregarClaseObject(tiposPermitidos,ts)
    {
        //agregar la clase object
        var obje=new clase("Object",null,"public","super");
        var visibilidad="publico";
        var modificador=0;        
        //agregar el constructor
        var parametros=new Array();   
            var iden =new identificador("Object",parametros);
            //tipo,aux,id,rol,posicion,ambito,dimensiones,visibilidad,modificador)
            var simb=new simbolo(tablaTipos.tipo_vacio,null,iden,tablaTipos.rol_constructor,-1,ts.getAmbito(true),0,visibilidad,modificador );
            obje.globales.setItem(simb.getNombre(),simb);

        //agregar el getclass()   
            var parametros=new Array();   
            var iden =new identificador("getclass",parametros);
            //tipo,aux,id,rol,posicion,ambito,dimensiones,visibilidad,modificador)
            var simb=new simbolo(tablaTipos.tipo_cadena,null,iden,tablaTipos.rol_metodo,-1,ts.getAmbito(true),0,visibilidad,modificador );
            obje.globales.setItem(simb.getNombre(),simb);
        //agregar el toString()
            parametros=new Array();
            iden =new identificador("toString",parametros);
            //tipo,aux,id,rol,posicion,ambito,dimensiones,visibilidad,modificador)
            simb=new simbolo(tablaTipos.tipo_cadena,null,iden,tablaTipos.rol_metodo,-1,ts.getAmbito(true),0,visibilidad,modificador );
            obje.globales.setItem(simb.getNombre(),simb);
        //agregar el equals(Object o)
            parametros=new Array();
            vari.hash++;
            //tipo,nombre,valor,isFinal,noDimensiones,linea,columna,archivo,hash
            var nuevoTipo=tablaTipos.getTipoObjeto("Object");
            var p=new parametro(nuevoTipo,"o",null,false,0,0,0,"",vari.hash);
            parametros.push(p);
            iden =new identificador("equals",parametros);
            //tipo,aux,id,rol,posicion,ambito,dimensiones,visibilidad,modificador)
            simb=new simbolo(tablaTipos.tipo_booleano,null,iden,tablaTipos.rol_metodo,-1,ts.getAmbito(true),0,visibilidad,modificador );
            obje.globales.setItem(simb.getNombre(),simb);
        tiposPermitidos.setItem(obje.nombre,obje);
        return obje;
    }
    agregarClaseString(obje,tiposPermitidos,ts)
    {
        var visibilidad="publico";
        var modificador=0;    
        //agregar la clase string
        var cadena=new clase("String",obje,"public","super");
        //toCharArray() arreglo de caracter
            var parametros=new Array();   
            var iden =new identificador("toCharArray",parametros);
            var tipoA =tablaTipos.tipo_caracter;
            tipoA.dimen=1;
            var nuevoT=new nodoTipo(tablaTipos.arreglo,"",tipoA);
            nuevoT.dimen=1;
            //tipo,aux,id,rol,posicion,ambito,dimensiones,visibilidad,modificador)
            var simb=new simbolo(nuevoT,null,iden,tablaTipos.rol_metodo,-1,ts.getAmbito(true),0,visibilidad,modificador );
            simb.firma="_toCharArray_";
            cadena.globales.setItem(simb.getNombre(),simb);            
        // length() entero
            parametros=new Array();   
            var iden =new identificador("length",parametros);
            //tipo,aux,id,rol,posicion,ambito,dimensiones,visibilidad,modificador)
            simb=new simbolo(tablaTipos.tipo_entero,null,iden,tablaTipos.rol_metodo,-1,ts.getAmbito(true),0,visibilidad,modificador );
            simb.firma="_stringSize_";
            cadena.globales.setItem(simb.getNombre(),simb);            
        //toUpperCase() cadena
            parametros=new Array();   
            var iden =new identificador("toUpperCase",parametros);
            //tipo,aux,id,rol,posicion,ambito,dimensiones,visibilidad,modificador)
            simb=new simbolo(tablaTipos.tipo_cadena,null,iden,tablaTipos.rol_metodo,-1,ts.getAmbito(true),0,visibilidad,modificador );
            simb.firma="_toUpper_";
            cadena.globales.setItem(simb.getNombre(),simb);            
        //toLowerCase() cadena
            parametros=new Array();   
            var iden =new identificador("toLowerCase",parametros);
            //tipo,aux,id,rol,posicion,ambito,dimensiones,visibilidad,modificador)
            simb=new simbolo(tablaTipos.tipo_cadena,null,iden,tablaTipos.rol_metodo,-1,ts.getAmbito(true),0,visibilidad,modificador );
            simb.firma="_toLower_";
            cadena.globales.setItem(simb.getNombre(),simb);
        cadena.super=obje.getPila();        
        tiposPermitidos.setItem(cadena.nombre,cadena);
    }
    agregarClaseArray(obje,tiposPermitidos,ts)
    {
        var visibilidad="publico";
        var modificador=0;    
         //agregar arreglo
         var arreglo=new clase("Arreglo CAAS",obje,"public","super");
         //length() entero
             var parametros=new Array();   
             var iden =new identificador("length",parametros);
             //tipo,aux,id,rol,posicion,ambito,dimensiones,visibilidad,modificador)
             var simb=new simbolo(tablaTipos.tipo_entero,null,iden,tablaTipos.rol_metodo,-1,ts.getAmbito(true),0,visibilidad,modificador );
             arreglo.globales.setItem(simb.getNombre(),simb);
             simb.firma="_getSize_";
             arreglo.super=obje.getPila();
        tiposPermitidos.setItem(arreglo.nombre,arreglo);
    }
}

module.exports = archivo;