class v_accesoHeap{
    constructor(posicion,linea,columna,archivo,correlativo) 
    {
        this.posicion=posicion;
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
        return exec.getFromHeap(pos);
    }
}

module.exports = v_accesoHeap;