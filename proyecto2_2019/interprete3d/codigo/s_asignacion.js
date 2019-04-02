class s_asignacion{
    constructor(id,valor,linea,columna,archivo,correlativo) 
    {
        this.id=id;
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
        var v=this.valor.ejecutar(exec,er);
        exec.agregarTemp(this.id,v);
    }
}

module.exports = s_asignacion;