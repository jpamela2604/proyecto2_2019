class s_llamada{
    constructor(id,linea,columna,archivo,correlativo) 
    {
        this.id=id;
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
        //console.log();
        exec.agregardeb("llamada "+this.id+" apuntador:"+exec.getTemp("p")+"\n");
        var sentencias=exec.getMetodo(this.id);
        for(var x=0;x<sentencias.length;x++)
        {
            var aux=sentencias[x].ejecutar(exec,er);
            if(Number.isInteger(aux))
            {
                x=aux;
            }
        }
    }
}

module.exports = s_llamada;