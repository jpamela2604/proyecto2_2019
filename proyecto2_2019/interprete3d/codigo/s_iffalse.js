class s_iffalse{
    constructor(oprel,op1,op2,etiqueta,linea,columna,archivo,correlativo) 
    {
        this.oprel=oprel;
        this.op1=op1;
        this.op2=op2;
        this.etiqueta=etiqueta;
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
        var o1=this.op1.ejecutar(exec,er);
        var o2=this.op2.ejecutar(exec,er);
        switch(this.oprel)
        {
            case ">":
            {
                if(!(o1 > o2))
                {
                    return parseInt(exec.getEtiqueta(this.etiqueta)-1);
                }
            }break;
            case "<":
            {
                if(!(o1 < o2))
                {
                    return parseInt(exec.getEtiqueta(this.etiqueta)-1);
                }
            }break;
            case ">=":
            {
                if(!(o1 >= o2))
                {
                    return parseInt(exec.getEtiqueta(this.etiqueta)-1);
                }
            }break;
            case "<=":
            {
                if(!(o1 <= o2))
                {
                    return parseInt(exec.getEtiqueta(this.etiqueta)-1);
                }
            }break;
            case "==":
            {
                if(!(o1 == o2))
                {
                    return parseInt(exec.getEtiqueta(this.etiqueta)-1);
                }
            }break;
            case "!=":
            {
                if(!(o1 != o2))
                {
                    return parseInt(exec.getEtiqueta(this.etiqueta)-1);
                }
            }break;

        }
    }
}

module.exports = s_iffalse;