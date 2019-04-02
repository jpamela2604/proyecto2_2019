var s_etiqueta = require("../codigo/s_etiqueta.js");
class metodo{
    constructor(id,sentencias,linea,columna,archivo,correlativo) 
    {
        this.id=id;
        this.sentencias=sentencias;
        this.linea=linea;
        this.columna=columna;
        this.archivo=archivo;
        this.correlativo=correlativo;
    }
    guardarValores(exec,er)
    {
        exec.guardarMetodo(this.id,this.sentencias);
        for(var x=0;x<this.sentencias.length;x++)
        {
           if(this.sentencias[x] instanceof s_etiqueta)
           {
               exec.posicionAux=x;
           }
           this.sentencias[x].guardarValores(exec,er);
       }
    }
    ejecutar(exec,er)
    {

    }
}

module.exports = metodo;