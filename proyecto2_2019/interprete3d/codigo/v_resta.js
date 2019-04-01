class v_resta{
    constructor(op1,op2,linea,columna,archivo,correlativo) 
    {
        this.op1=op1;
        this.op2=op2;
        this.linea=linea;
        this.columna=columna;
        this.archivo=archivo;
        this.correlativo=correlativo;
    }
    ejecutar(exec,er)
    {
        var o1=this.op1.ejecutar(exec,er);
        var o2=this.op2.ejecutar(exec,er);
        var r=o1-o2;
        return r;
    }
}

module.exports = v_resta;