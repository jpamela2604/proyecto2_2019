class nodoError{
    constructor(descripcion,linea,columna,archivo,tipo)
    {
        this.descripcion=descripcion;
        this.linea=linea;
        this.columna=columna;
        this.archivo=archivo;
        this.tipo=tipo;
    }
}

module.exports = nodoError;