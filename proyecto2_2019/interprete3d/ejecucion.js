var HashTable = require("../hashtable");
class ejecucion{
    constructor() 
    {
        this.cadena="";
        this.temporales = new HashTable();
        this.funciones = new HashTable();
        this.etiquetas = new HashTable();
        this.posicionAux=0;
        this.pila=new Array();
        this.monticulo=new Array();
    }



    imprimir(cad)
    {
        this.cadena=this.cadena+cad;
        //console.log(cad);
    }
    
    agregarTemp(nombre,valor)
    {
        this.temporales.setItem(nombre,valor);
    }
    getTemp(nombre)
    {
        return this.temporales.getItem(nombre);
    }
    guardarMetodo(nombre,sentencias)
    {
        this.funciones.setItem(nombre,sentencias);
    }
    getMetodo(nombre)
    {
        return this.funciones.getItem(nombre);
    }
    guardarEtiqueta(nombre,pos)
    {
        this.etiquetas.setItem(nombre,pos);
    }
    getEtiqueta(nombre)
    {
        return this.etiquetas.getItem(nombre);
    }

    getFromStack(posicion)
    {
        //console.log("sle");
        //console.log("get "+posicion+":"+this.pila[posicion]);
        return this.pila[posicion];
    }
    getFromHeap(posicion)
    {
        return this.monticulo[posicion];
    }
    SetStack(posicion,valor)
    {
        //onsole.log("set "+posicion+":"+valor);
        this.pila[posicion]=valor;
    }
    SetHeap(posicion,valor)
    {
        this.monticulo[posicion]=valor;
    }

}

module.exports = ejecucion;