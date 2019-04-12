const vari=require("../../var.js");
class s_clean{
    constructor(posicion,tam,linea,columna,archivo,correlativo) 
    {
        this.posicion=posicion;
        this.tam=tam;
        this.linea=linea;
        this.columna=columna;
        this.archivo=archivo;
        this.correlativo=correlativo;
    }
    guardarValores(exec,er)
    {

    }
    ejecutar(exec,er)
    {
        exec.byInstr(this.correlativo);   
        var pos=this.posicion.ejecutar(exec,er);
        var t=this.tam.ejecutar(exec,er);
        for(var i=0;i<t;i++)
        {
            exec.SetStack(pos+i,vari.nulo);
        }
    }
}

module.exports = s_clean;