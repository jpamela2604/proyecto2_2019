const valores = require("../values_manager.js");
class oa_suma{
    constructor(op1,op2,linea,columna,archivo,hash) 
    {
        this.op1=op1;
        this.op2=op2;
        this.linea=linea; 
        this.columna=columna;
        this.archivo=archivo;
        this.hash=hash;
    }

    traducir(ts,traductor)
    {
        var temporal=valores.getTemporal();
        traductor.imprimir(temporal+"="+this.op1.traducir(ts,traductor)+"+"+this.op2.traducir(ts,traductor));
        return temporal;
    }
}

module.exports = oa_suma;