class s_etiqueta{
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
        exec.guardarEtiqueta(this.id,exec.posicionAux);
    }
    ejecutar(exec,er)
    {
        
    }
}

module.exports = s_etiqueta;