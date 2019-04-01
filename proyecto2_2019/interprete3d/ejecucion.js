var HashTable = require("../hashtable");
class ejecucion{
    constructor() 
    {
        this.cadena="";
        this.temporales = new HashTable();
    }

    imprimir(cad)
    {
        //this.cadena=this.cadena+cad;
        console.log(cad);
    }

    agregarTemp(nombre,valor)
    {
        this.temporales.setItem(nombre,valor);
    }
    getTemp(nombre)
    {
        return this.temporales.getItem(nombre);
    }
}

module.exports = ejecucion;