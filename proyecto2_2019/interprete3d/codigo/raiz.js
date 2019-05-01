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
        exec.sp=0;
        //exec.sp=exec.getMetodo("main");
        //exec.stacksp.push(this.globales.length);        
        
        while(exec.sp<this.globales.length)
        {
            //console.log("cro: "+exec.sp);
            var aux=this.globales[exec.sp].ejecutar(exec,er); 
            
            if(Number.isInteger(aux))
            {
                exec.sp=aux;
            }
            exec.sp++;
        }
    }
}

module.exports = raiz;