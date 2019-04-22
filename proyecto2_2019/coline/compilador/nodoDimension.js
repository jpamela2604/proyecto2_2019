const tablaTipos= require("../tablaTipos.js");
class nodoDimension{
    constructor(tipo,ta,mns) 
    {
        this.tipo=tipo;
        this.tam=ta;
        this.dimension=0;
        this.message=mns;
    }
    IsEqual(r)
    {
        if(this.tipo.indice==tablaTipos.error||r.tipo.indice==tablaTipos.error)
        {
            return false;
        }
        
        if(this.tipo.indice==r.tipo.indice&&this.tipo.nombre==r.tipo.nombre)
        {
            /*
            if(this.tam.length==r.tam.length)
            {
                for(var x=0;x<this.tam.length;x++)
                {
                    if(this.tam[x]!=r.tam[x])
                    {
                        r.message="Las dimensiones del arreglo no tienen el mismo tamaño";
                        return false;
                    }
                }
            }else
            {
                r.message="Las dimensiones del arreglo no tienen el mismo tamaño";
                return false;
            }
            */
        }else
        {
            
            r.message="Los valores del arreglo no son del mismo tipo";
            return false;
        }
        return true;
    }
}

module.exports = nodoDimension;