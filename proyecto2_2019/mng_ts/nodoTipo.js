const tablaTipos=require("../coline/tablaTipos.js")
class nodoTipo{
    constructor(indice,nombre,tipo)
    {
        this.indice=indice;
        this.nombre=nombre;
        this.tipoArr=tipo;
        this.bandera=false;
        this.dimen=0;
        this.tam=0;
    }

    getName()
    {
        if(this.indice==tablaTipos.arreglo)
        {
            
            var nombre=this.tipoArr.nombre;
            //console.log(this.tipoArr);
            for(var x=0;x<this.dimen;x++)
            {
                nombre=nombre+"[]";
            }
            return nombre;
        }else
        {
            return this.nombre;
        }
    }
}

module.exports = nodoTipo;