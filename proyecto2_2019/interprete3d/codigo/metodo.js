var s_etiqueta = require("../codigo/s_etiqueta.js");
class metodo{
    constructor(id,linea,columna,archivo,correlativo) 
    {
        this.id=id;
        this.linea=linea;
        this.columna=columna;
        this.archivo=archivo;
        this.correlativo=correlativo;
    }
    guardarValores(exec,er)
    {
        exec.guardarMetodo(this.id,this.correlativo);
        
    }
    ejecutar(exec,er)
    {
        exec.byInstr("|m:"+this.correlativo);
    }
}

module.exports = metodo;