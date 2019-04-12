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
        exec.byInstr(this.correlativo);   
        //console.log(this.id);
        exec.agregardeb("llamada "+this.id+" apuntador:"+exec.getTemp("p")+"\n");
        
        var posicion=exec.getMetodo(this.id);
        exec.stacksp.push(exec.sp);
        //console.log("size "+exec.stacksp.size());
        return parseInt(posicion-1);
    }
}

module.exports = s_llamada;