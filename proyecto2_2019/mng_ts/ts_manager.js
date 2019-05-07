 const Stack=require("../pila.js");
 const Hashtable=require("../hashtable.js");
 const clase=require("./clase.js");
 /*
 const simbolo=require("./simbolo.js");
 const tablaTipos= require("../coline/tablaTipos.js");
 const identificador=require("./identificador.js");
 const parametro=require("./parametro.js");
 const vari=require("../var.js");
 const nodoTipo=require("./nodoTipo");
 */
 class ts_manager{
    constructor(er)
    {
        this.er=er;
        this.displayRetornos=new Stack();
        this.displayBreaks=new Stack();
        this.displayContinue=new Stack();
        this.tabla=new Stack();
        this.ambitoActual=new Hashtable();
        this.globales=new Hashtable();        
        this.posiciones=new Stack();
        this.posicion=0;
        this.contadorGlobales=0; 
        this.tamActual=0;
        this.auxiliar=new Stack();
        this.tiposPermitidos=null;        
        this.tipoClase="super";
        this.claseActual=null;
        this.head=null;
        this.super=new Stack();
        this.metodoActual=null;
    }

    setC(clase)
    {
        this.claseActual=clase;
        this.globales=clase.globales;
        this.tiposPermitidos=clase.tipos;
        this.super=clase.super;
        this.tabla=clase.getPila();        
        this.ambitoActual=new Hashtable();  
    }
    
    BuscarSimbolo(simb,linea,columna,archivo)
    {
       
        if(this.head==null)
        {
            
            return this.BuscarSim(simb,linea,columna,archivo);
        }else
        {
           
            if(this.head.vars instanceof clase)
            {
                var r=this.head.vars.getPila()  
            }else
            {
                var r=this.head.vars;
            }

            for(var x=r.size();x>0;x--)
            {              
                
                var g=r.get(x-1);              
                if(g.hasItem(simb.getNombre()))
                {
                    return g.getItem(simb.getNombre());
                }
            }  
            this.er.addError("No se encontro "+simb.getRol()+" "+simb.getPseudoNombre(),linea,columna,archivo,
                "SEMANTICO");
                return null;       
        }
    }
    getpermitido(nombre)
    {
        if(this.tiposPermitidos.hasItem(nombre))
        {
            return this.tiposPermitidos.getItem(nombre);
        }
        return null;
    }
    ispermitido(nombre)
    {
        if(this.tiposPermitidos.hasItem(nombre))
        {
            return true;
        }
        return false;
    }
    
    getTamActual()
    {
        return this.posicion+1;
    }

    getPosicion(IsGlobal)
    {
        var p=IsGlobal?this.contadorGlobales:this.posicion;
        return p;
    }
    getAmbito(IsGlobal)
    {
        return IsGlobal?"GLOBAL":"LOCAL";
    }
    
    AgregarSimbolo(simb,IsGlobal,linea,columna,archivo)
    {
        if(IsGlobal)
        {
            
            if(this.globales.hasItem(simb.getNombre()))
            {
                this.er.addError("ya exite "+simb.getRol()+" "+simb.getPseudoNombre(),linea,columna,archivo,
                "SEMANTICO");
                return false;
            }else
            {
                this.globales.setItem(simb.getNombre(),simb);
                //this.contadorGlobales++;
                //console.log("g "+simb.getNombre());
            }
        }else
        {
            if(this.ambitoActual.hasItem(simb.getNombre()))
            {
                this.er.addError("ya existe "+simb.getRol()+" "+simb.getPseudoNombre(),linea,columna,archivo,
                "SEMANTICO");
                //console.log("pos: "+simb.posicion);
                return false;
            }else
            {
                this.ambitoActual.setItem(simb.getNombre(),simb);
                //console.log("pos: "+simb.posicion);
            }
        }
    }

    AumentarPos(IsGlobal)
    {
        if(IsGlobal)
        {
            this.contadorGlobales++;
        }else
        {
            this.posicion++;
        }
    }
    
    BuscarSim(simb,linea,columna,archivo)
    {   
        //console.log(simb.getNombre());
       //console.log(this.globales);
        if(this.ambitoActual.hasItem(simb.getNombre()))
        {
            respuesta=this.ambitoActual.getItem(simb.getNombre());           
            return respuesta;
        }
        var respuesta=null;
        var a=new Stack();
        
        while(this.tabla.hasElements())
        {
            var recorre=this.tabla.pop();
            a.push(recorre);
            if(recorre.hasItem(simb.getNombre()))
            {
                respuesta=recorre.getItem(simb.getNombre());
               
                break;
            }
        }
        while(a.size()>0)
        {
            this.tabla.push(a.pop());
        }
        if(respuesta==null)
        {
            this.er.addError("No se encontro "+simb.getRol()+" "+simb.getPseudoNombre(),linea,columna,archivo,
                "SEMANTICO");
        }
        return respuesta;
    }

    cambiarAmbito(IsLlamada)
    {
        if(IsLlamada)
        {
            this.tabla.push(this.ambitoActual);
            this.auxiliar.push(this.tabla);
            this.tabla=new Stack();
            for(var x=0;x<this.super.size();x++)
            {
                this.tabla.push(this.super.get(x));
            }
            this.tabla.push(this.globales);
            this.ambitoActual=new Hashtable();            
            

        }else
        {
            this.tabla.push(this.ambitoActual);
            this.ambitoActual=new Hashtable();
        }
        this.posiciones.push(this.posicion);
        if(IsLlamada)
        {
            this.posicion=0;
        }
        
    }

    regresarAmbito(IsLlamada)
    {
        if(IsLlamada)
        {
            this.tabla=this.auxiliar.pop();
            this.ambitoActual=this.tabla.pop();
           
        }else
        {
            this.ambitoActual=this.tabla.pop();
        }
        this.posicion=this.posiciones.pop();
    }
}

module.exports = ts_manager;