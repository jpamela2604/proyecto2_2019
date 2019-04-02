class v_negativo{
    constructor(op1,op2,linea,columna,archivo,correlativo) 
    {
        this.op1=op1;
        this.op2=op2;
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
        var o1=this.op1.ejecutar(exec,er);
        var r=o1*-1;
        return r;
    }
}

module.exports = v_negativo;