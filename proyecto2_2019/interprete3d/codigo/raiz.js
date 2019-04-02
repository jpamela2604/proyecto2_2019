var s_etiqueta = require("../codigo/s_etiqueta.js");
class raiz{
    constructor(globales) 
    {
        this.globales=globales;
    }
    guardarValores(exec,er)
    {
       for(var x=0;x<this.globales.length;x++)
       {
           if(this.globales[x] instanceof s_etiqueta)
           {
               exec.posicionAux=x;
           }
           this.globales[x].guardarValores(exec,er);
       }
    }
    ejecutar(exec,er)
    {
        for(var x=0;x<this.globales.length;x++)
        {
            var aux=this.globales[x].ejecutar(exec,er);
            if(Number.isInteger(aux))
            {
                x=aux;
            }
        }
    }
}

module.exports = raiz;