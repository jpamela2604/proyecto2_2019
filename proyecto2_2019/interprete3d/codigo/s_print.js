class s_print{
    constructor(tipo,valor,linea,columna,archivo,correlativo) 
    {
        this.tipo=tipo;
        this.valor=valor;
        this.linea=linea;
        this.columna=columna;
        this.archivo=archivo;
        this.correlativo=correlativo;
    }
    ejecutar(exec,er)
    {
        var v=this.valor.ejecutar(exec,er);
        //console.log("oh: "+v+" |tipo: "+this.tipo);
        if(this.tipo=="c")
        {
            v= String.fromCharCode(parseInt(v));
        }else if(this.tipo=="e")
        {
            v=parseInt(v);
        }else
        {
            v=parseFloat(v.replace(",", "."));
        }
        exec.imprimir(v);
    }
}

module.exports = s_print;