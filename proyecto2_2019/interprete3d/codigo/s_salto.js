class s_salto{
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

    }
    ejecutar(exec,er)
    {
        exec.byInstr(this.correlativo);   
        return parseInt(exec.getEtiqueta(this.id)-1);
    }
}

module.exports = s_salto;