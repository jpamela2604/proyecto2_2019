class v_numerico{
    constructor(valor,linea,columna,archivo,correlativo) 
    {
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
        return parseFloat(this.valor.replace(",", "."));
    }
}

module.exports = v_numerico;