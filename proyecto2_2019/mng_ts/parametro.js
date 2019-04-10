class parametro{
    constructor(tipo,nombre,valor,isFinal,noDimensiones,linea,columna,archivo,hash)
    {
        this.tipo=tipo;
        this.nombre=nombre;
        this.valor=valor;
        this.isFinal=isFinal;
        this.noDimensiones=noDimensiones;
        this.linea=linea;
        this.columna=columna;
        this.archivo=archivo;
        this.hash=hash;
    }
}

module.exports = parametro;