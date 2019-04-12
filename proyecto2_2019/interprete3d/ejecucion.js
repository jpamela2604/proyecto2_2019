var HashTable = require("../hashtable");
const Stack=require("../pila.js");
const fs = require('fs');
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
        this.stacksp=new Stack();
        this.sp=0;
    }
    agregardeb(cadena)
    {
        //this.deb=this.deb+"cadena\n";
        this.save(cadena);
    }
    printHeap()
    {
        var micad="monticulo|";
        for(var x=0;x<this.monticulo.length;x++)
        {
            micad=micad+x+","+this.monticulo[x]+"|";
        }
        //console.log(micad);
        this.save(micad+"\n");
        //this.deb=this.deb+micad+"\n";
    }
    printStack()
    {
        var micad="pila|";
        for(var x=0;x<this.pila.length;x++)
        {
            micad=micad+x+","+this.pila[x]+"|";
        }
        //console.log(micad);
        //this.deb=this.deb+micad+"\n";
        this.save(micad+"\n");
    }
    imprimir(cad)
    {
        this.cadena=this.cadena+cad;
        //console.log(cad);
    }
    byInstr(c)
    {
        //console.log("cro "+c);
    }

    agregarTemp(nombre,valor)
    {
        this.temporales.setItem(nombre,valor);
    }
    getTemp(nombre)
    {
        return this.temporales.getItem(nombre);
    }
    guardarMetodo(nombre,posicion)
    {
        this.funciones.setItem(nombre,posicion);
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
        this.printHeap();
        this.printStack();
        this.save("\n\n");
        //this.deb=this.deb+"\n\n";
        //console.log("\n\n");
    }
    SetHeap(posicion,valor)
    {
        this.monticulo[posicion]=valor;
        this.printHeap();
        this.printStack();
    }
    save(cad)
    {
        //fs.appendFileSync("debuggin.txt",cad);
    }

}

module.exports = ejecucion;