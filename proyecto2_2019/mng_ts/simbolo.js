
const identificador=require("./identificador.js");
const tablaTipos=require("../coline/tablaTipos.js");
class simbolo{
    constructor(tipo,aux,id,rol,posicion,ambito,dimensiones,visibilidad,modificador)
    {        
        this.tipo=tipo;
        this.aux=aux;//valor
        this.id=id;
        this.rol=rol;
        this.posicion=posicion;
        this.ambito=ambito;
        this.dimensiones=dimensiones;        
        this.visibilidad=visibilidad;
        this.modificador=modificador;
        this.referencia=null;
        this.modificaStack=true;
        if(this.id!=undefined){
        this.firma=this.getNombre();}
        this.IsStatic=false;
        this.IsFinal=false;
        this.IsAbstract=false;
        this.vars=null;
    }
    IsGlobal()
    {
        if(this.ambito=="GLOBAL")
        {
            return true;
        }
        return false;
    }
    getNombre()
    {
        var aux="";
        if(this.rol==tablaTipos.rol_variable)
        {
            aux="v";
        }
        else if(this.rol==tablaTipos.rol_metodo)
        {
            aux="m";
        }else if(this.rol==tablaTipos.rol_constructor)
        {
            aux="c";
        }
        return aux+this.id.getNombre();
    }

    getPseudoNombre()
    {
        return this.id.getPseudoNombre();
    }
    getRol()
    {
        if(this.rol==tablaTipos.rol_metodo)
        {
            return "metodo";
        }else if(this.rol==tablaTipos.rol_variable)
        {
            return "variable";
        }
    }
    
}

module.exports = simbolo;