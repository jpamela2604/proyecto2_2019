const nodoError = require("./nodoError.js");
class error_manager{
    constructor()
    {
        this.errores=new Array();
    }
    addError(descripcion,linea,columna,archivo,tipo)
    {
        var err=new nodoError(descripcion,linea,columna,archivo,tipo);
        this.errores.push(err);
    }
    imprimir()
    {
        var x=0;
        for (x=0;x<this.errores.length;x++)
        {
            console.log("Descripcion: "+this.errores[x].descripcion+
            "| Linea: "+this.errores[x].linea+"| Columna: "+this.errores[x].columna+
            "| Archivo: "+this.errores[x].archivo+"| tipo: "+this.errores[x].tipo);
        }
    }
    size()
    {
        return this.errores.length;
    }
}

module.exports = error_manager;