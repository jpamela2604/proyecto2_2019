class identificador{
    constructor(nombre,parametros)
    {
        this.nombre=nombre;
        this.parametros=parametros;
    }
    getNombre()
    {
        var myname=this.nombre;
        if(this.parametros!=null)
        {            
            for(var x=0;x<this.parametros.length;x++)
            {
                //myname=myname+"_"+this.parametros[x].tipo.nombre;
                myname=myname+"_"+(this.parametros[x].tipo.nombre==""?"ArrayCAAS":this.parametros[x].tipo.nombre);
            }
            myname=myname+"_";
        }
        return myname;
    }

    getPseudoNombre()
    {
        var myname=this.nombre;
        if(this.parametros!=null)
        {
            myname=myname+"(";
            var aux="";
            for(var x=0;x<this.parametros.length;x++)
            {
                //myname=myname+aux+this.parametros[x].tipo.nombre;
                myname=myname+"_"+(this.parametros[x].tipo.nombre==""?"ArrayCAAS":this.parametros[x].tipo.nombre);
                aux=",";
            }
            myname=myname+")";
        }
        return myname;
    }
}

module.exports = identificador;