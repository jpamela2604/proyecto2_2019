 const Stack=require("../pila.js");
 const Hashtable=require("../hashtable.js");
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
    }

    getTamActual()
    {
        return this.tamActual;
    }

    AgregarSimbolo(simb,IsGlobal,linea,columna,archivo)
    {
        if(IsGlobal)
        {
            if(this.globales.hasItem(simb.getNombre()))
            {
                this.er.addError("ya exite "+simb.getRol()+" "+simb.getNombre(),linea,columna,archivo,
                "SEMANTICO");
                return false;
            }else
            {
                this.globales.setItem(simb.getNombre(),simb);
                this.contadorGlobales++;
            }
        }else
        {
            if(this.ambitoActual.hasItem(simb.getNombre()))
            {
                this.er.addError("ya exite "+simb.getRol()+" "+simb.getNombre(),linea,columna,archivo,
                "SEMANTICO");
                return false;
            }else
            {
                this.ambitoActual.setItem(simb.getNombre(),simb);
                this.posicion++;
            }
        }
    }
    BuscarSimbolo(simb,linea,columna,archivo)
    {
        if(this.ambitoActual.hasItem(simb.getNombre()))
        {
            return this.ambitoActual.getItem(simb.getNombre());
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
            this.er.addError("No se encontro "+simb.getRol()+" "+simb.getNombre(),linea,columna,archivo,
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
            this.tabla.push(this.globales);
            this.ambitoActual=new Hashtable();
            

        }else
        {
            this.tabla.push(this.ambitoActual);
            this.ambitoActual=new Hashtable();
        }
        this.posiciones.push(this.posicion);
        this.posicion=0;
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