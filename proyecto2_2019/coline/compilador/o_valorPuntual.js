class o_valorPuntual{
    constructor(valor,linea,columna,archivo,hash) 
    {
        this.valor=valor;
        this.linea=linea; 
        this.columna=columna;
        this.archivo=archivo;
        this.hash=hash;
    }

    traducir(ts,traductor)
    {
        return this.valor;
    }
}

module.exports = o_valorPuntual;