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
    guardarValores(exec,er)
    {

    }
    ejecutar(exec,er)
    {
        exec.byInstr(this.correlativo);   
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
            /*
            v=v+"";
            v=parseFloat(v.replace(",", "."));
            */
            v=(v).toFixed(4);
        }
        exec.imprimir(v);
    }
}

module.exports = s_print;