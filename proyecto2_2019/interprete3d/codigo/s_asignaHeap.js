class s_asignaHeap{
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
        exec.byInstr(this.correlativo);   
        var pos=this.posicion.ejecutar(exec,er);
        var val=this.valor.ejecutar(exec,er);
        exec.SetHeap(pos,val);
    }
}

module.exports = s_asignaHeap;