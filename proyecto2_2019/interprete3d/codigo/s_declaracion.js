class s_declaracion{
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
        var v=this.valor. ejecutar(exec,er);
        exec.agregarTemp(this.id,v);
    }
    ejecutar(exec,er)
    {
        exec.byInstr(this.correlativo);   
    }
}

module.exports = s_declaracion;