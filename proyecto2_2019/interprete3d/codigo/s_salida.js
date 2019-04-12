class s_salida{
    constructor(linea,columna,archivo,correlativo) 
    {
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
        var num=exec.stacksp.pop();
        exec.byInstr("|salida|"+this.correlativo+"|"+num);   
        return parseInt(num);
    }
}

module.exports = s_salida;