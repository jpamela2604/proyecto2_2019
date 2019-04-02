class s_asignaStack{
    constructor(posicion,valor,linea,columna,archivo,correlativo) 
    {
        this.posicion=posicion;
        this.valor=valor;
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
        var pos=this.posicion.ejecutar(exec,er);
        var val=this.valor.ejecutar(exec,er);
        
        exec.SetStack(pos,val);
    }
}

module.exports = s_asignaStack;